import { Link, useLocation } from "wouter";
import { SettingsProfilePage } from "./settings-profile";
import { SettingsCompanyPage } from "./settings-company";
import { SettingsUsersPage } from "./settings-users";
import { DistributionPage } from "@/pages/erp/distribution";
import { SettingsIntegrationsPage } from "./settings-integrations";
import { SettingsAuditPage } from "./settings-audit";

const tabs = [
  { label: "Perfil",        path: "/settings/profile" },
  { label: "Empresa",       path: "/settings/company" },
  { label: "Usuários",      path: "/settings/users" },
  { label: "Distribuição",  path: "/settings/distribution" },
  { label: "Integrações",   path: "/settings/integrations" },
  { label: "Auditoria",     path: "/settings/audit" },
];

export function SettingsPage() {
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
        {activeTab.path === "/settings/profile"      && <SettingsProfilePage />}
        {activeTab.path === "/settings/company"      && <SettingsCompanyPage />}
        {activeTab.path === "/settings/users"        && <SettingsUsersPage />}
        {activeTab.path === "/settings/distribution" && <DistributionPage />}
        {activeTab.path === "/settings/integrations" && <SettingsIntegrationsPage />}
        {activeTab.path === "/settings/audit"        && <SettingsAuditPage />}
      </div>
    </div>
  );
}
