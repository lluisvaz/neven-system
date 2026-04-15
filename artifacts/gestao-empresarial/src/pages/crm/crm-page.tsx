import { Link, useLocation } from "wouter";
import { ContactsPage } from "./contacts";
import { ContactDetailPage } from "./contact-detail";
import { ActivitiesPage } from "./activities";
import { CommunicationsPage } from "@/pages/communications";

const tabs = [
  { label: "Leads",         path: "/crm/contacts" },
  { label: "Atividades",    path: "/crm/activities" },
  { label: "Comunicações",  path: "/crm/communications" },
];

export function CrmPage() {
  const [location] = useLocation();

  const activeTab = tabs.find(t =>
    location === t.path || location.startsWith(t.path + "/")
  ) ?? tabs[0];

  const isContactDetail =
    location.startsWith("/crm/contacts/") && location !== "/crm/contacts";

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
        {activeTab.path === "/crm/contacts" && !isContactDetail && <ContactsPage />}
        {isContactDetail                                           && <ContactDetailPage />}
        {activeTab.path === "/crm/activities"                     && <ActivitiesPage />}
        {activeTab.path === "/crm/communications"                 && <CommunicationsPage />}
      </div>
    </div>
  );
}
