import { Link, useLocation } from "wouter";
import { BillingDashboardPage } from "./billing-dashboard";
import { ReceivablesPage } from "@/pages/erp/receivables";
import { PayablesPage } from "@/pages/erp/payables";
import { CashflowPage } from "@/pages/erp/cashflow";
import { SubscriptionsPage } from "./subscriptions";
import { NewChargePage } from "./new-charge";

const tabs = [
  { label: "Visão Geral",     path: "/billing" },
  { label: "A Receber",       path: "/billing/receivables" },
  { label: "A Pagar",         path: "/billing/payables" },
  { label: "Fluxo de Caixa",  path: "/billing/cashflow" },
  { label: "Assinaturas",     path: "/billing/subscriptions" },
  { label: "Nova Cobrança",   path: "/billing/new" },
];

export function BillingPage() {
  const [location] = useLocation();

  const activeTab = tabs.find(t =>
    t.path === "/billing"
      ? location === "/billing"
      : location === t.path || location.startsWith(t.path + "/")
  ) ?? tabs[0];

  return (
    <div>
      {/* Tab bar */}
      <div className="border-b border-border mb-8 -mt-1">
        <nav className="-mb-px flex gap-0 overflow-x-auto no-scrollbar">
          {tabs.map(tab => {
            const isActive = tab.path === activeTab.path;
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`flex-shrink-0 px-4 py-2.5 text-sm border-b-2 transition-colors font-medium ${
                  isActive
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Tab content */}
      <div>
        {activeTab.path === "/billing"               && <BillingDashboardPage />}
        {activeTab.path === "/billing/receivables"   && <ReceivablesPage />}
        {activeTab.path === "/billing/payables"      && <PayablesPage />}
        {activeTab.path === "/billing/cashflow"      && <CashflowPage />}
        {activeTab.path === "/billing/subscriptions" && <SubscriptionsPage />}
        {activeTab.path === "/billing/new"           && <NewChargePage />}
      </div>
    </div>
  );
}
