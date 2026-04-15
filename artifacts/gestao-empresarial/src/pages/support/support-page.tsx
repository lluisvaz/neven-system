import { Link, useLocation } from "wouter";
import { TicketsPage } from "./tickets";
import { TicketDetailPage } from "./ticket-detail";

const tabs = [
  { label: "Tickets", path: "/support/tickets" },
];

export function SupportPage() {
  const [location] = useLocation();

  const activeTab = tabs.find(t =>
    location === t.path || location.startsWith(t.path + "/")
  ) ?? tabs[0];

  const isTicketDetail =
    location.startsWith("/support/tickets/") && location !== "/support/tickets";

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
        {activeTab.path === "/support/tickets" && !isTicketDetail && <TicketsPage />}
        {isTicketDetail                                             && <TicketDetailPage />}
      </div>
    </div>
  );
}
