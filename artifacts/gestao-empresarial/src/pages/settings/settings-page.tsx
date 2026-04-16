import { Link, useLocation, Redirect } from "wouter";
import { SettingsProfilePage } from "./settings-profile";
import { SettingsCompanyPage } from "./settings-company";
import { SettingsUsersPage } from "./settings-users";
import { DistributionPage } from "@/pages/erp/distribution";
import { SettingsIntegrationsPage } from "./settings-integrations";
import { SettingsAuditPage } from "./settings-audit";
import { useAuth } from "@/contexts/auth-context";

type Tab = { label: string; path: string; adminOnly?: boolean };

const tabs: Tab[] = [
  { label: "Perfil",        path: "/settings/profile" },
  { label: "Empresa",       path: "/settings/company",      adminOnly: true },
  { label: "Usuários",      path: "/settings/users",        adminOnly: true },
  { label: "Distribuição",  path: "/settings/distribution", adminOnly: true },
  { label: "Integrações",   path: "/settings/integrations", adminOnly: true },
  { label: "Auditoria",     path: "/settings/audit",        adminOnly: true },
];

export function SettingsPage() {
  const [location] = useLocation();
  const { isAdmin } = useAuth();

  const visibleTabs = tabs.filter(t => !t.adminOnly || isAdmin);

  const activeTab = visibleTabs.find(t =>
    location === t.path || location.startsWith(t.path + "/")
  );

  if (!activeTab) {
    const requestedTab = tabs.find(t =>
      location === t.path || location.startsWith(t.path + "/")
    );
    if (requestedTab?.adminOnly && !isAdmin) {
      return <Redirect to="/settings/profile" />;
    }
    return <Redirect to="/settings/profile" />;
  }

  return (
    <div>
      <div className="border-b border-border mb-8 -mt-1">
        <nav className="-mb-px flex gap-0 overflow-x-auto no-scrollbar">
          {visibleTabs.map(tab => {
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
        {activeTab.path === "/settings/company"      && isAdmin && <SettingsCompanyPage />}
        {activeTab.path === "/settings/users"        && isAdmin && <SettingsUsersPage />}
        {activeTab.path === "/settings/distribution" && isAdmin && <DistributionPage />}
        {activeTab.path === "/settings/integrations" && isAdmin && <SettingsIntegrationsPage />}
        {activeTab.path === "/settings/audit"        && isAdmin && <SettingsAuditPage />}
      </div>
    </div>
  );
}
