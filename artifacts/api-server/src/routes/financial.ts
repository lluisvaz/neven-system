import { Router } from "express";

const router: Router = Router();

function getMonthBounds(monthStr: string) {
  const [y, m] = monthStr.split("-").map(Number);
  const start = new Date(y, m - 1, 1);
  const end = new Date(y, m, 0);
  // Index relative to April 2026 baseline (0 = Apr 2026)
  const index = (y - 2026) * 12 + (m - 4);
  return { start, end, index, year: y, month: m };
}

function buildMockData(monthStr: string, usdRate: number) {
  const { index } = getMonthBounds(monthStr);
  const gf = Math.pow(1.03, index);
  const base = 156000 * gf;
  const asaasMonthly = Math.round(base * 0.85);
  const stripeMonthly = Math.round(base * 0.15);
  const asaasBal = Math.round(base * 2.1 + Math.max(0, index) * 5000);
  const stripeAvail = Math.round(base * 0.25);
  const stripePend = Math.round(base * 0.06);
  return {
    asaas: { balance: asaasBal, monthly: asaasMonthly },
    stripe: {
      availBRL: stripeAvail,
      pendBRL: stripePend,
      monthly: stripeMonthly,
      origAvail: Math.round(stripeAvail / usdRate),
    },
  };
}

router.get("/financial/summary", async (req, res) => {
  const raw = typeof req.query.month === "string" ? req.query.month : "";
  const monthParam = /^\d{4}-\d{2}$/.test(raw)
    ? raw
    : new Date().toISOString().slice(0, 7);

  const { start, end, index } = getMonthBounds(monthParam);

  let usdRate = 5.15;
  try {
    const r = await fetch(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL",
      { signal: AbortSignal.timeout(4000) },
    );
    if (r.ok) {
      const j = await r.json() as { USDBRL?: { bid?: string } };
      const parsed = parseFloat(j.USDBRL?.bid ?? "");
      if (isFinite(parsed) && parsed > 0) usdRate = parsed;
    }
  } catch { /* fallback rate */ }

  const asaasKey = process.env.ASAAS_API_KEY ?? "";
  const stripeKey = process.env.STRIPE_SECRET_KEY ?? "";

  let asaasBal = 0, asaasMonthly = 0, asaasLive = false;
  let stripeAvail = 0, stripePend = 0, stripeMonthly = 0, stripeLive = false;

  if (asaasKey) {
    try {
      const base = asaasKey.startsWith("$aact_")
        ? "https://www.asaas.com"
        : "https://sandbox.asaas.com";
      const h = { "access_token": asaasKey };
      const dateGe = start.toISOString().slice(0, 10);
      const dateLe = end.toISOString().slice(0, 10);
      const [balRes, pymRes] = await Promise.all([
        fetch(`${base}/api/v3/finance/balance`, { headers: h, signal: AbortSignal.timeout(10000) }),
        fetch(
          `${base}/api/v3/payments?status=RECEIVED&dateCreated[ge]=${dateGe}&dateCreated[le]=${dateLe}&limit=100`,
          { headers: h, signal: AbortSignal.timeout(10000) },
        ),
      ]);
      if (balRes.ok) {
        const j = await balRes.json() as { balance?: number };
        asaasBal = j.balance ?? 0;
        asaasLive = true;
      }
      if (pymRes.ok) {
        const j = await pymRes.json() as { data?: { value: number }[] };
        asaasMonthly = (j.data ?? []).reduce((s, p) => s + p.value, 0);
      }
    } catch { /* fall through */ }
  }

  if (stripeKey) {
    try {
      const h = { "Authorization": `Bearer ${stripeKey}` };
      const startTs = Math.floor(start.getTime() / 1000);
      const endTs = Math.floor(end.getTime() / 1000) + 86399;
      const [balRes, chgRes] = await Promise.all([
        fetch("https://api.stripe.com/v1/balance", { headers: h, signal: AbortSignal.timeout(10000) }),
        fetch(
          `https://api.stripe.com/v1/charges?created[gte]=${startTs}&created[lte]=${endTs}&status=succeeded&limit=100`,
          { headers: h, signal: AbortSignal.timeout(10000) },
        ),
      ]);
      if (balRes.ok) {
        const j = await balRes.json() as { available?: { amount: number; currency: string }[]; pending?: { amount: number; currency: string }[] };
        const toBRL = (arr: { amount: number; currency: string }[]) =>
          arr.reduce((s, b) => s + (b.currency === "brl" ? b.amount / 100 : (b.amount / 100) * usdRate), 0);
        stripeAvail = toBRL(j.available ?? []);
        stripePend = toBRL(j.pending ?? []);
        stripeLive = true;
      }
      if (chgRes.ok) {
        const j = await chgRes.json() as { data?: { amount: number; currency: string }[] };
        stripeMonthly = (j.data ?? []).reduce((s, c) =>
          s + (c.currency === "brl" ? c.amount / 100 : (c.amount / 100) * usdRate), 0);
      }
    } catch { /* fall through */ }
  }

  const isLive = asaasLive || stripeLive;

  if (!isLive) {
    const m = buildMockData(monthParam, usdRate);
    asaasBal = m.asaas.balance;
    asaasMonthly = m.asaas.monthly;
    stripeAvail = m.stripe.availBRL;
    stripePend = m.stripe.pendBRL;
    stripeMonthly = m.stripe.monthly;
  }

  const totalMonthly = Math.round(asaasMonthly + stripeMonthly);
  const totalBalance = Math.round(asaasBal + stripeAvail);
  const delinquency = Math.max(0, parseFloat((4.8 - index * 0.05).toFixed(1)));

  res.json({
    month: monthParam,
    isLiveData: isLive,
    exchangeRateUSD: usdRate,
    stripe: {
      availableBRL: Math.round(stripeAvail),
      pendingBRL: Math.round(stripePend),
      receivedThisMonthBRL: Math.round(stripeMonthly),
      originalCurrency: "usd",
      originalAvailable: Math.round(stripeAvail / usdRate),
      exchangeRate: usdRate,
      lastSyncedAt: new Date().toISOString(),
      isLive: stripeLive,
    },
    asaas: {
      balanceBRL: Math.round(asaasBal),
      receivedThisMonthBRL: Math.round(asaasMonthly),
      lastSyncedAt: new Date().toISOString(),
      isLive: asaasLive,
    },
    combined: {
      totalBalanceBRL: totalBalance,
      totalMonthlyRevenueBRL: totalMonthly,
      mrrBRL: totalMonthly,
      arrBRL: totalMonthly * 12,
      receivableBRL: Math.round(totalMonthly * 1.59),
      overdueBRL: Math.round(totalMonthly * 0.208),
      receivedThisMonthBRL: totalMonthly,
      delinquencyRate: delinquency,
      activeSubscriptions: 87 + Math.max(0, index) * 2,
    },
  });
});

export default router;
