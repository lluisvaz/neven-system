import { Link, useLocation } from "wouter";
import { ClientsPage } from "./clients";
import { DistributionPage } from "./distribution";
import { ProductsPage } from "./products";
import { ContractsPage } from "./contracts";

const tabs = [
  { label: "Clientes",     path: "/erp/clients" },
  { label: "Distribuição", path: "/erp/distribution" },
  { label: "Produtos",     path: "/erp/products" },
  { label: "Contratos",    path: "/erp/contracts" },
];

export function ErpPage() {
  const [location] = useLocation();

  const activeTab = tabs.find(t =>
    location === t.path || location.startsWith(t.path + "/")
  ) ?? tabs[0];

  return (
    <div>
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

      <div>
        {activeTab.path === "/erp/clients"      && <ClientsPage />}
        {activeTab.path === "/erp/distribution" && <DistributionPage />}
        {activeTab.path === "/erp/products"     && <ProductsPage />}
        {activeTab.path === "/erp/contracts"    && <ContractsPage />}
      </div>
    </div>
  );
}
