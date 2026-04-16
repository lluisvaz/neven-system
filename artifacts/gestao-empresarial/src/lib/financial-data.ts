/**
 * ============================================================
 * FINANCIAL DATA SERVICE — GestorPro
 * ============================================================
 *
 * Single source of truth for all financial aggregation.
 * Combines balances/receipts from Stripe + Asaas, converts
 * everything to BRL, and exposes React hooks consumed by
 * every financial page.
 *
 * DATA FLOW:
 *   Frontend hook → GET /api/financial/summary?month=YYYY-MM
 *   Backend route → Asaas API + Stripe API (if keys present)
 *                → fallback: realistic mock data per month
 *
 * SECRETS (add in Replit Secrets panel to go live):
 *   ASAAS_API_KEY      = $aact_...
 *   STRIPE_SECRET_KEY  = sk_live_...
 * ============================================================
 */

import { useState, useEffect, useRef, useCallback } from "react";

// ─── TYPES ──────────────────────────────────────────────────

export interface LiveRate {
  rate: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
  varBid: string;
  pctChange: string;
  quoteTime: string;
}

export interface ExchangeRates {
  USD: LiveRate;
  EUR: LiveRate;
  GBP: LiveRate;
  ARS: LiveRate;
  COP: LiveRate;
  MXN: LiveRate;
  fetchedAt: string;
  isLive: boolean;
  source: string;
}

export interface StripeBalance {
  availableBRL: number;
  pendingBRL: number;
  receivedThisMonthBRL: number;
  originalCurrency: string;
  originalAvailable: number;
  exchangeRate: number;
  lastSyncedAt: string;
  isLive?: boolean;
}

export interface AsaasBalance {
  balanceBRL: number;
  receivedThisMonthBRL: number;
  lastSyncedAt: string;
  isLive?: boolean;
}

export interface FinancialSummary {
  month: string;
  totalBalanceBRL: number;
  mrrBRL: number;
  arrBRL: number;
  receivableBRL: number;
  overdueBRL: number;
  receivedThisMonthBRL: number;
  delinquencyRate: number;
  activeSubscriptions: number;
  stripe: StripeBalance;
  asaas: AsaasBalance;
  exchangeRates: ExchangeRates;
  isLiveData: boolean;
  lastRefreshedAt: string;
}

// ─── CONSTANTS ──────────────────────────────────────────────

const RATES_CACHE_KEY = "gestorpro-exchange-rates-v2";
const RATES_TTL_MS = 15 * 60 * 1000;

const AWESOMEAPI_URL =
  "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,ARS-BRL,COP-BRL,MXN-BRL";
const FRANKFURTER_URL =
  "https://api.frankfurter.app/latest?from=USD&to=BRL,EUR,GBP,ARS,MXN";

const FALLBACK_RATES: Record<string, Partial<LiveRate>> = {
  USD: { rate: 5.15, bid: 5.14, ask: 5.16, high: 5.18, low: 5.12, varBid: "0", pctChange: "0" },
  EUR: { rate: 5.72, bid: 5.71, ask: 5.73, high: 5.75, low: 5.68, varBid: "0", pctChange: "0" },
  GBP: { rate: 6.65, bid: 6.64, ask: 6.66, high: 6.68, low: 6.60, varBid: "0", pctChange: "0" },
  ARS: { rate: 0.0058, bid: 0.0057, ask: 0.0059, high: 0.006, low: 0.0055, varBid: "0", pctChange: "0" },
  COP: { rate: 0.00126, bid: 0.00125, ask: 0.00127, high: 0.0013, low: 0.00122, varBid: "0", pctChange: "0" },
  MXN: { rate: 0.296, bid: 0.295, ask: 0.297, high: 0.30, low: 0.292, varBid: "0", pctChange: "0" },
};

// ─── EXCHANGE RATE FETCHER ───────────────────────────────────

interface AwesomeApiEntry {
  bid: string; ask: string; high: string; low: string;
  varBid: string; pctChange: string; create_date: string;
}

function parseLiveRate(entry: AwesomeApiEntry): LiveRate {
  const bid = parseFloat(entry.bid);
  return {
    rate: bid, bid,
    ask: parseFloat(entry.ask),
    high: parseFloat(entry.high),
    low: parseFloat(entry.low),
    varBid: entry.varBid,
    pctChange: entry.pctChange,
    quoteTime: entry.create_date,
  };
}

function buildFallbackRates(): ExchangeRates {
  const now = new Date().toISOString();
  const make = (k: string): LiveRate => ({
    rate: FALLBACK_RATES[k]!.rate!, bid: FALLBACK_RATES[k]!.bid!, ask: FALLBACK_RATES[k]!.ask!,
    high: FALLBACK_RATES[k]!.high!, low: FALLBACK_RATES[k]!.low!,
    varBid: "0", pctChange: "0", quoteTime: now,
  });
  return {
    USD: make("USD"), EUR: make("EUR"), GBP: make("GBP"),
    ARS: make("ARS"), COP: make("COP"), MXN: make("MXN"),
    fetchedAt: now, isLive: false, source: "fallback (API indisponível)",
  };
}

async function fetchLiveRates(): Promise<ExchangeRates> {
  try {
    const cached = sessionStorage.getItem(RATES_CACHE_KEY);
    if (cached) {
      const parsed: ExchangeRates = JSON.parse(cached);
      const age = Date.now() - new Date(parsed.fetchedAt).getTime();
      if (age < RATES_TTL_MS && parsed.isLive) return parsed;
    }
  } catch { /* ignore */ }

  try {
    const res = await fetch(AWESOMEAPI_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json() as Record<string, AwesomeApiEntry>;
    const rates: ExchangeRates = {
      USD: parseLiveRate(json.USDBRL),
      EUR: parseLiveRate(json.EURBRL),
      GBP: parseLiveRate(json.GBPBRL),
      ARS: parseLiveRate(json.ARSBRL),
      COP: parseLiveRate(json.COPBRL),
      MXN: parseLiveRate(json.MXNBRL),
      fetchedAt: new Date().toISOString(), isLive: true,
      source: "AwesomeAPI (B3 / Banco Central)",
    };
    try { sessionStorage.setItem(RATES_CACHE_KEY, JSON.stringify(rates)); } catch { /* ignore */ }
    return rates;
  } catch { /* fall through */ }

  try {
    interface FrankfurterRes { rates: Record<string, number> }
    const res = await fetch(FRANKFURTER_URL, { cache: "no-store" });
    if (res.ok) {
      const json: FrankfurterRes = await res.json();
      const r = json.rates;
      const now = new Date().toISOString();
      const makeF = (key: string, rate: number): LiveRate => ({
        rate, bid: rate, ask: rate, high: rate, low: rate,
        varBid: "0", pctChange: "0", quoteTime: now,
      });
      return {
        USD: makeF("USD", 1 / (1 / (r.BRL ?? FALLBACK_RATES.USD.rate!))),
        EUR: makeF("EUR", r.BRL ?? FALLBACK_RATES.EUR.rate!),
        GBP: makeF("GBP", r.GBP ? (r.BRL / r.GBP) : FALLBACK_RATES.GBP.rate!),
        ARS: makeF("ARS", r.ARS ? (r.BRL / r.ARS) : FALLBACK_RATES.ARS.rate!),
        COP: makeF("COP", FALLBACK_RATES.COP.rate!),
        MXN: makeF("MXN", r.MXN ? (r.BRL / r.MXN) : FALLBACK_RATES.MXN.rate!),
        fetchedAt: now, isLive: true, source: "Frankfurter (ECB)",
      };
    }
  } catch { /* ignore */ }

  try {
    const stale = sessionStorage.getItem(RATES_CACHE_KEY);
    if (stale) {
      const parsed: ExchangeRates = JSON.parse(stale);
      return { ...parsed, source: `${parsed.source} (cache desatualizado)` };
    }
  } catch { /* ignore */ }
  return buildFallbackRates();
}

// ─── BACKEND API CALL ────────────────────────────────────────

interface BackendSummary {
  month: string;
  isLiveData: boolean;
  exchangeRateUSD: number;
  stripe: StripeBalance & { isLive?: boolean };
  asaas: AsaasBalance & { isLive?: boolean };
  combined: {
    totalBalanceBRL: number;
    totalMonthlyRevenueBRL: number;
    mrrBRL: number;
    arrBRL: number;
    receivableBRL: number;
    overdueBRL: number;
    receivedThisMonthBRL: number;
    delinquencyRate: number;
    activeSubscriptions: number;
  };
}

async function fetchFromBackend(month: string): Promise<BackendSummary | null> {
  try {
    const res = await fetch(`/api/financial/summary?month=${month}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    return await res.json() as BackendSummary;
  } catch {
    return null;
  }
}

// ─── COMBINED FETCH ─────────────────────────────────────────

async function buildFinancialSummary(month: string): Promise<FinancialSummary> {
  const [rates, backend] = await Promise.all([
    fetchLiveRates(),
    fetchFromBackend(month),
  ]);

  if (backend) {
    return {
      month: backend.month,
      totalBalanceBRL: backend.combined.totalBalanceBRL,
      mrrBRL: backend.combined.mrrBRL,
      arrBRL: backend.combined.arrBRL,
      receivableBRL: backend.combined.receivableBRL,
      overdueBRL: backend.combined.overdueBRL,
      receivedThisMonthBRL: backend.combined.receivedThisMonthBRL,
      delinquencyRate: backend.combined.delinquencyRate,
      activeSubscriptions: backend.combined.activeSubscriptions,
      stripe: backend.stripe,
      asaas: backend.asaas,
      exchangeRates: rates,
      isLiveData: backend.isLiveData,
      lastRefreshedAt: new Date().toISOString(),
    };
  }

  // Backend unreachable — local fallback (same mock logic)
  const [y, m] = month.split("-").map(Number);
  const idx = (y - 2026) * 12 + (m - 4);
  const gf = Math.pow(1.03, idx);
  const base = 156000 * gf;
  const usdRate = rates.USD.rate;
  const asaasMonthly = Math.round(base * 0.85);
  const stripeMonthly = Math.round(base * 0.15);
  const asaasBal = Math.round(base * 2.1 + Math.max(0, idx) * 5000);
  const stripeAvail = Math.round(base * 0.25);
  const stripePend = Math.round(base * 0.06);
  const totalMonthly = asaasMonthly + stripeMonthly;
  const now = new Date().toISOString();

  return {
    month,
    totalBalanceBRL: asaasBal + stripeAvail,
    mrrBRL: totalMonthly,
    arrBRL: totalMonthly * 12,
    receivableBRL: Math.round(totalMonthly * 1.59),
    overdueBRL: Math.round(totalMonthly * 0.208),
    receivedThisMonthBRL: totalMonthly,
    delinquencyRate: Math.max(0, parseFloat((4.8 - idx * 0.05).toFixed(1))),
    activeSubscriptions: 87 + Math.max(0, idx) * 2,
    stripe: {
      availableBRL: stripeAvail,
      pendingBRL: stripePend,
      receivedThisMonthBRL: stripeMonthly,
      originalCurrency: "usd",
      originalAvailable: Math.round(stripeAvail / usdRate),
      exchangeRate: usdRate,
      lastSyncedAt: now,
      isLive: false,
    },
    asaas: {
      balanceBRL: asaasBal,
      receivedThisMonthBRL: asaasMonthly,
      lastSyncedAt: now,
      isLive: false,
    },
    exchangeRates: rates,
    isLiveData: false,
    lastRefreshedAt: now,
  };
}

// ─── HOOKS ──────────────────────────────────────────────────

export interface UseFinancialDataReturn {
  data: FinancialSummary | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Fetches financial summary for the given month (YYYY-MM).
 * Defaults to the current month. Auto-refreshes exchange rates every 15 min.
 */
export function useFinancialData(month?: string): UseFinancialDataReturn {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const resolvedMonth = month ?? currentMonth;

  const [data, setData] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    buildFinancialSummary(resolvedMonth)
      .then(setData)
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false));
  }, [resolvedMonth]);

  useEffect(() => {
    load();
    intervalRef.current = setInterval(load, RATES_TTL_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [tick, load]);

  return { data, loading, error, refresh: () => setTick(t => t + 1) };
}

/** Lightweight hook for components that only need exchange rates. */
export interface UseExchangeRatesReturn {
  rates: ExchangeRates | null;
  loading: boolean;
  refresh: () => void;
}

export function useExchangeRates(): UseExchangeRatesReturn {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchLiveRates().then(r => { setRates(r); setLoading(false); });
    const id = setInterval(() => { fetchLiveRates().then(setRates); }, RATES_TTL_MS);
    return () => clearInterval(id);
  }, [tick]);

  return { rates, loading, refresh: () => setTick(t => t + 1) };
}

// ─── UTILITIES ──────────────────────────────────────────────

export function fmtBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency", currency: "BRL", maximumFractionDigits: 0,
  }).format(value);
}

export function fmtBRLCompact(value: number): string {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(0)}k`;
  return fmtBRL(value);
}

export function fmtRate(rate: number): string {
  return rate.toLocaleString("pt-BR", { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}

export function convertToBRL(amount: number, currency: string, rates: ExchangeRates): number {
  if (currency.toUpperCase() === "BRL") return amount;
  const key = currency.toUpperCase() as keyof ExchangeRates;
  const entry = rates[key];
  if (!entry || typeof entry !== "object" || !("rate" in entry)) return amount;
  return amount * (entry as LiveRate).rate;
}

/** Returns an array of the last N months in YYYY-MM format, newest first */
export function getRecentMonths(n = 12): string[] {
  const months: string[] = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return months;
}

/** Format YYYY-MM as "Abril 2026" */
export function fmtMonth(yyyyMM: string): string {
  const [y, m] = yyyyMM.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}
