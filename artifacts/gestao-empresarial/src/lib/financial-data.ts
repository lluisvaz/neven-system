/**
 * ============================================================
 * FINANCIAL DATA SERVICE — GestorPro
 * ============================================================
 *
 * This file is the single source of truth for all financial
 * aggregation in the system. It combines balances from Stripe
 * and Asaas, converts everything to BRL, and exposes a React
 * hook (`useFinancialData`) consumed by every financial page.
 *
 * ──────────────────────────────────────────────────────────
 * HOW TO INTEGRATE (future AI / developer):
 * ──────────────────────────────────────────────────────────
 *
 * 1. STRIPE BALANCE
 *    Endpoint: GET https://api.stripe.com/v1/balance
 *    Auth:     Authorization: Bearer sk_live_YOUR_STRIPE_SECRET_KEY
 *    Docs:     https://stripe.com/docs/api/balance/retrieve
 *    Response shape (relevant fields):
 *      {
 *        available: [{ amount: number, currency: string }],  // amount in cents
 *        pending:   [{ amount: number, currency: string }],
 *      }
 *    Map to StripeBalance type below. Divide amount by 100 for real value.
 *    Store STRIPE_SECRET_KEY in environment variables (never hardcode).
 *
 * 2. ASAAS BALANCE
 *    Endpoint: GET https://www.asaas.com/api/v3/finance/balance
 *    Auth:     access_token: $aact_YOUR_ASAAS_TOKEN  (header)
 *    Docs:     https://docs.asaas.com/reference/retornar-saldo
 *    Response shape:
 *      { balance: number }   // already in BRL
 *    Map to AsaasBalance type below.
 *    Store ASAAS_API_KEY in environment variables.
 *
 * 3. EXCHANGE RATE (USD → BRL and others → BRL)
 *    Option A (free): GET https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL
 *    Option B (paid): https://openexchangerates.org/api/latest.json?app_id=YOUR_KEY
 *    Response (AwesomeAPI):
 *      { USDBRL: { bid: "5.12" }, EURBRL: { bid: "5.68" } }
 *    Store the rate in ExchangeRates type below.
 *
 * 4. WHERE TO MAKE THE API CALLS
 *    These calls must happen server-side (Express route in api-server)
 *    to avoid exposing API keys in the browser. Create:
 *      GET /api/financial/summary
 *    This route fetches Stripe + Asaas + exchange rates, aggregates,
 *    and returns a `FinancialSummary` payload (type defined below).
 *    Then replace the mock `fetchFinancialSummary` function below
 *    with a real `fetch('/api/financial/summary')` call.
 *
 * 5. SECRETS SETUP (Replit)
 *    Set these in Replit Secrets (never commit to code):
 *      STRIPE_SECRET_KEY   = sk_live_...
 *      ASAAS_API_KEY       = $aact_...
 *      (optional) EXCHANGE_RATE_API_KEY = ...
 * ============================================================
 */

// ─── TYPE DEFINITIONS ─────────────────────────────────────

/** Stripe balance as returned by GET /v1/balance (values in BRL after conversion) */
export interface StripeBalance {
  /** Available balance (settled, ready to payout) in BRL */
  availableBRL: number;
  /** Pending balance (not yet settled) in BRL */
  pendingBRL: number;
  /** Original currency of the Stripe account (e.g. "usd") */
  originalCurrency: string;
  /** Original available amount in the account's native currency */
  originalAvailable: number;
  /** Exchange rate used for conversion (e.g. USD/BRL = 5.12) */
  exchangeRate: number;
  /** ISO timestamp of the last sync */
  lastSyncedAt: string;
}

/** Asaas balance as returned by GET /api/v3/finance/balance (already in BRL) */
export interface AsaasBalance {
  /** Current balance in BRL */
  balanceBRL: number;
  /** ISO timestamp of the last sync */
  lastSyncedAt: string;
}

/** Exchange rates relative to BRL */
export interface ExchangeRates {
  USD: number;  // 1 USD = X BRL
  EUR: number;
  GBP: number;
  ARS: number;
  COP: number;
  MXN: number;
  /** Timestamp of when rates were fetched */
  fetchedAt: string;
}

/** Aggregated financial summary used by all pages */
export interface FinancialSummary {
  /** Combined total from Stripe + Asaas, in BRL */
  totalBalanceBRL: number;
  /** MRR across all active subscriptions, in BRL */
  mrrBRL: number;
  /** ARR (MRR × 12), in BRL */
  arrBRL: number;
  /** Amount receivable (pending invoices), in BRL */
  receivableBRL: number;
  /** Amount overdue, in BRL */
  overdueBRL: number;
  /** Amount received this month, in BRL */
  receivedThisMonthBRL: number;
  /** Delinquency rate as percentage */
  delinquencyRate: number;
  /** Active subscription count */
  activeSubscriptions: number;
  /** Breakdown by gateway */
  stripe: StripeBalance;
  asaas: AsaasBalance;
  /** Exchange rates used for conversions */
  exchangeRates: ExchangeRates;
  /** Whether data is from live API (true) or mock (false) */
  isLiveData: boolean;
  /** ISO timestamp of last full refresh */
  lastRefreshedAt: string;
}

// ─── MOCK DATA ─────────────────────────────────────────────
// ⚠️  REPLACE THIS with a real API call to /api/financial/summary
// See integration instructions at the top of this file.

const MOCK_EXCHANGE_RATES: ExchangeRates = {
  USD: 5.12,
  EUR: 5.68,
  GBP: 6.61,
  ARS: 0.0058,
  COP: 0.00126,
  MXN: 0.296,
  fetchedAt: new Date().toISOString(),
};

const MOCK_STRIPE_BALANCE: StripeBalance = {
  // Acme Corp (USD $2,400) + other international clients
  originalCurrency: "usd",
  originalAvailable: 4800,       // $4,800 USD available in Stripe
  exchangeRate: MOCK_EXCHANGE_RATES.USD,
  availableBRL: 4800 * MOCK_EXCHANGE_RATES.USD,   // ≈ R$ 24.576
  pendingBRL: 1200 * MOCK_EXCHANGE_RATES.USD,     // ≈ R$ 6.144 pending
  lastSyncedAt: new Date().toISOString(),
};

const MOCK_ASAAS_BALANCE: AsaasBalance = {
  // Brazilian clients (BRL)
  balanceBRL: 320424,     // R$ 320.424 in Asaas
  lastSyncedAt: new Date().toISOString(),
};

const MOCK_SUMMARY: FinancialSummary = {
  totalBalanceBRL: MOCK_ASAAS_BALANCE.balanceBRL + MOCK_STRIPE_BALANCE.availableBRL,
  mrrBRL: 156000,
  arrBRL: 156000 * 12,
  receivableBRL: 248500,
  overdueBRL: 32400,
  receivedThisMonthBRL: 156200,
  delinquencyRate: 4.8,
  activeSubscriptions: 87,
  stripe: MOCK_STRIPE_BALANCE,
  asaas: MOCK_ASAAS_BALANCE,
  exchangeRates: MOCK_EXCHANGE_RATES,
  isLiveData: false,
  lastRefreshedAt: new Date().toISOString(),
};

// ─── FETCH FUNCTION ────────────────────────────────────────
// INTEGRATION POINT: Replace the mock return below with:
//   const res = await fetch('/api/financial/summary');
//   return res.json() as FinancialSummary;

async function fetchFinancialSummary(): Promise<FinancialSummary> {
  // TODO: Replace with real API call once backend is integrated.
  // return fetch('/api/financial/summary').then(r => r.json());
  return Promise.resolve(MOCK_SUMMARY);
}

// ─── REACT HOOK ────────────────────────────────────────────
import { useState, useEffect } from "react";

interface UseFinancialDataReturn {
  data: FinancialSummary | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useFinancialData(): UseFinancialDataReturn {
  const [data, setData] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchFinancialSummary()
      .then(setData)
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false));
  }, [tick]);

  return { data, loading, error, refresh: () => setTick(t => t + 1) };
}

// ─── UTILITY ───────────────────────────────────────────────

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

export function convertToBRL(amount: number, currency: string, rates: ExchangeRates): number {
  const key = currency.toUpperCase() as keyof ExchangeRates;
  if (key === "BRL") return amount;
  const rate = typeof rates[key] === "number" ? (rates[key] as number) : 1;
  return amount * rate;
}
