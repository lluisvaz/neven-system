/**
 * ============================================================
 * FINANCIAL DATA SERVICE — GestorPro
 * ============================================================
 *
 * This file is the single source of truth for all financial
 * aggregation in the system. It combines balances from Stripe
 * and Asaas, converts everything to BRL using LIVE exchange
 * rates, and exposes React hooks consumed by every financial page.
 *
 * ──────────────────────────────────────────────────────────
 * EXCHANGE RATES — LIVE (no API key required)
 * ──────────────────────────────────────────────────────────
 * Source: economia.awesomeapi.com.br — aggregates from B3,
 * Banco Central do Brasil, and commercial banks. Updates
 * every ~15 min during market hours.
 * Endpoint: GET https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,ARS-BRL,COP-BRL,MXN-BRL
 * Cache TTL: 15 minutes (stored in sessionStorage)
 *
 * ──────────────────────────────────────────────────────────
 * HOW TO INTEGRATE STRIPE + ASAAS (future AI / developer):
 * ──────────────────────────────────────────────────────────
 *
 * 1. STRIPE BALANCE
 *    Endpoint: GET https://api.stripe.com/v1/balance
 *    Auth:     Authorization: Bearer sk_live_YOUR_STRIPE_SECRET_KEY
 *    Docs:     https://stripe.com/docs/api/balance/retrieve
 *    Response: { available: [{ amount, currency }], pending: [...] }
 *    amount is in cents — divide by 100. Convert to BRL using
 *    the live rates returned by useExchangeRates().
 *    Store STRIPE_SECRET_KEY in Replit Secrets (never hardcode).
 *
 * 2. ASAAS BALANCE
 *    Endpoint: GET https://www.asaas.com/api/v3/finance/balance
 *    Auth:     access_token: $aact_YOUR_ASAAS_TOKEN (header)
 *    Docs:     https://docs.asaas.com/reference/retornar-saldo
 *    Response: { balance: number } — already in BRL, no conversion needed.
 *    Store ASAAS_API_KEY in Replit Secrets.
 *
 * 3. WHERE TO CALL STRIPE + ASAAS
 *    Create a backend route (api-server):
 *      GET /api/financial/summary
 *    This route fetches Stripe balance + Asaas balance server-side,
 *    receives live rates from this file (or re-fetches them on the server),
 *    and returns a FinancialSummary payload.
 *    Then in fetchGatewayBalances() below, replace the mock return with:
 *      return fetch('/api/financial/summary').then(r => r.json())
 *
 * 4. SECRETS SETUP (Replit)
 *    Add in Replit Secrets panel:
 *      STRIPE_SECRET_KEY   = sk_live_...
 *      ASAAS_API_KEY       = $aact_...
 * ============================================================
 */

import { useState, useEffect, useRef, useCallback } from "react";

// ─── TYPES ──────────────────────────────────────────────────

export interface LiveRate {
  /** 1 unit of this currency = X BRL */
  rate: number;
  /** Commercial buy price (bid) */
  bid: number;
  /** Commercial sell price (ask) */
  ask: number;
  /** Highest rate today */
  high: number;
  /** Lowest rate today */
  low: number;
  /** Change vs previous close (e.g. "+0.02") */
  varBid: string;
  /** % change vs previous close */
  pctChange: string;
  /** When this quote was last updated (from source) */
  quoteTime: string;
}

export interface ExchangeRates {
  USD: LiveRate;
  EUR: LiveRate;
  GBP: LiveRate;
  ARS: LiveRate;
  COP: LiveRate;
  MXN: LiveRate;
  /** When rates were last fetched from the API */
  fetchedAt: string;
  /** True if rates came from the live API, false if fallback */
  isLive: boolean;
  /** Name of the source */
  source: string;
}

export interface StripeBalance {
  availableBRL: number;
  pendingBRL: number;
  originalCurrency: string;
  originalAvailable: number;
  exchangeRate: number;
  lastSyncedAt: string;
}

export interface AsaasBalance {
  balanceBRL: number;
  lastSyncedAt: string;
}

export interface FinancialSummary {
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
  /** False until Stripe + Asaas APIs are integrated */
  isLiveData: boolean;
  lastRefreshedAt: string;
}

// ─── CONSTANTS ──────────────────────────────────────────────

const RATES_CACHE_KEY = "gestorpro-exchange-rates-v2";
const RATES_TTL_MS = 15 * 60 * 1000; // 15 minutes

// Primary: AwesomeAPI — Brazilian-focused, B3/Banco Central data, updates ~15min, no key needed
const AWESOMEAPI_URL =
  "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,ARS-BRL,COP-BRL,MXN-BRL";

// Fallback: Frankfurter.app — ECB-based, free, no key, reliable CORS. Less granular for ARS/COP.
const FRANKFURTER_URL = "https://api.frankfurter.app/latest?from=USD&to=BRL,EUR,GBP,ARS,MXN";

/** Fallback rates — used ONLY if the API is unreachable */
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
    rate: bid,
    bid,
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
    rate: FALLBACK_RATES[k]!.rate!,
    bid: FALLBACK_RATES[k]!.bid!,
    ask: FALLBACK_RATES[k]!.ask!,
    high: FALLBACK_RATES[k]!.high!,
    low: FALLBACK_RATES[k]!.low!,
    varBid: "0",
    pctChange: "0",
    quoteTime: now,
  });
  return {
    USD: make("USD"), EUR: make("EUR"), GBP: make("GBP"),
    ARS: make("ARS"), COP: make("COP"), MXN: make("MXN"),
    fetchedAt: now,
    isLive: false,
    source: "fallback (API indisponível)",
  };
}

async function fetchLiveRates(): Promise<ExchangeRates> {
  // Check cache first
  try {
    const cached = sessionStorage.getItem(RATES_CACHE_KEY);
    if (cached) {
      const parsed: ExchangeRates = JSON.parse(cached);
      const age = Date.now() - new Date(parsed.fetchedAt).getTime();
      if (age < RATES_TTL_MS && parsed.isLive) return parsed;
    }
  } catch { /* ignore bad cache */ }

  try {
    const res = await fetch(AWESOMEAPI_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    const rates: ExchangeRates = {
      USD: parseLiveRate(json.USDBRL),
      EUR: parseLiveRate(json.EURBRL),
      GBP: parseLiveRate(json.GBPBRL),
      ARS: parseLiveRate(json.ARSBRL),
      COP: parseLiveRate(json.COPBRL),
      MXN: parseLiveRate(json.MXNBRL),
      fetchedAt: new Date().toISOString(),
      isLive: true,
      source: "AwesomeAPI (B3 / Banco Central)",
    };

    try { sessionStorage.setItem(RATES_CACHE_KEY, JSON.stringify(rates)); } catch { /* ignore */ }
    return rates;
  } catch {
    // Return cached stale data if available, otherwise static fallback
    try {
      const stale = sessionStorage.getItem(RATES_CACHE_KEY);
      if (stale) {
        const parsed: ExchangeRates = JSON.parse(stale);
        return { ...parsed, source: `${parsed.source} (cache desatualizado)` };
      }
    } catch { /* ignore */ }
    return buildFallbackRates();
  }
}

// ─── MOCK GATEWAY BALANCES ──────────────────────────────────
// ⚠️  Replace fetchGatewayBalances() body with a real call once integrated.
// See instructions at the top of this file.

async function fetchGatewayBalances(rates: ExchangeRates): Promise<{
  stripe: StripeBalance;
  asaas: AsaasBalance;
}> {
  // TODO: Replace with:
  //   const res = await fetch('/api/financial/summary');
  //   const json = await res.json();
  //   return { stripe: json.stripe, asaas: json.asaas };

  const usdRate = rates.USD.rate;

  const stripe: StripeBalance = {
    originalCurrency: "usd",
    originalAvailable: 4800,
    exchangeRate: usdRate,
    availableBRL: Math.round(4800 * usdRate),
    pendingBRL: Math.round(1200 * usdRate),
    lastSyncedAt: new Date().toISOString(),
  };

  const asaas: AsaasBalance = {
    balanceBRL: 320424,
    lastSyncedAt: new Date().toISOString(),
  };

  return { stripe, asaas };
}

// ─── COMBINED FETCH ─────────────────────────────────────────

async function buildFinancialSummary(): Promise<FinancialSummary> {
  const rates = await fetchLiveRates();
  const { stripe, asaas } = await fetchGatewayBalances(rates);
  const totalBalanceBRL = asaas.balanceBRL + stripe.availableBRL;

  return {
    totalBalanceBRL,
    mrrBRL: 156000,
    arrBRL: 156000 * 12,
    receivableBRL: 248500,
    overdueBRL: 32400,
    receivedThisMonthBRL: 156200,
    delinquencyRate: 4.8,
    activeSubscriptions: 87,
    stripe,
    asaas,
    exchangeRates: rates,
    isLiveData: false, // set to true once Stripe + Asaas APIs are live
    lastRefreshedAt: new Date().toISOString(),
  };
}

// ─── HOOKS ──────────────────────────────────────────────────

interface UseFinancialDataReturn {
  data: FinancialSummary | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/** Auto-refreshes exchange rates every 15 min. */
export function useFinancialData(): UseFinancialDataReturn {
  const [data, setData] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    buildFinancialSummary()
      .then(setData)
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    // Auto-refresh every 15 min to pick up new exchange rates
    intervalRef.current = setInterval(load, RATES_TTL_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [tick, load]);

  return { data, loading, error, refresh: () => setTick(t => t + 1) };
}

/** Lightweight hook for components that only need exchange rates (e.g. client creation form). */
interface UseExchangeRatesReturn {
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
    const id = setInterval(() => {
      fetchLiveRates().then(setRates);
    }, RATES_TTL_MS);
    return () => clearInterval(id);
  }, [tick]);

  return { rates, loading, refresh: () => setTick(t => t + 1) };
}

// ─── UTILITIES ──────────────────────────────────────────────

export function fmtBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
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
  return amount * entry.rate;
}
