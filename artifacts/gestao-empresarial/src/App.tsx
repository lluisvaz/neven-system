import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Dashboard } from "@/pages/dashboard";
import { ContactsPage } from "@/pages/crm/contacts";
import { ContactDetailPage } from "@/pages/crm/contact-detail";
import { ActivitiesPage } from "@/pages/crm/activities";
import { ClientsPage } from "@/pages/erp/clients";
import { DistributionPage } from "@/pages/erp/distribution";
import { ProductsPage } from "@/pages/erp/products";
import { ContractsPage } from "@/pages/erp/contracts";
import { BillingPage } from "@/pages/billing/billing-page";
import { TicketsPage } from "@/pages/support/tickets";
import { TicketDetailPage } from "@/pages/support/ticket-detail";
import { SettingsCompanyPage } from "@/pages/settings/settings-company";
import { SettingsUsersPage } from "@/pages/settings/settings-users";
import { SettingsIntegrationsPage } from "@/pages/settings/settings-integrations";
import { SettingsAuditPage } from "@/pages/settings/settings-audit";
import { PortalDashboardPage } from "@/pages/portal/portal-dashboard";
import { PortalInvoicesPage } from "@/pages/portal/portal-invoices";
import { PortalTicketsPage } from "@/pages/portal/portal-tickets";
import { PortalDocumentsPage } from "@/pages/portal/portal-documents";
import { PortalProfilePage } from "@/pages/portal/portal-profile";
import { OnboardingPage } from "@/pages/onboarding";
import { ProposalsPage } from "@/pages/proposals";
import { CommunicationsPage } from "@/pages/communications";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/"><AdminLayout><Dashboard /></AdminLayout></Route>

      <Route path="/crm/contacts"><AdminLayout><ContactsPage /></AdminLayout></Route>
      <Route path="/crm/contacts/:id"><AdminLayout><ContactDetailPage /></AdminLayout></Route>
      <Route path="/crm/activities"><AdminLayout><ActivitiesPage /></AdminLayout></Route>

      <Route path="/erp/clients"><AdminLayout><ClientsPage /></AdminLayout></Route>
      <Route path="/erp/receivables"><Redirect to="/billing/receivables" /></Route>
      <Route path="/erp/payables"><Redirect to="/billing/payables" /></Route>
      <Route path="/erp/cashflow"><Redirect to="/billing/cashflow" /></Route>
      <Route path="/erp/distribution"><AdminLayout><DistributionPage /></AdminLayout></Route>
      <Route path="/erp/products"><AdminLayout><ProductsPage /></AdminLayout></Route>
      <Route path="/erp/contracts"><AdminLayout><ContractsPage /></AdminLayout></Route>

      <Route path="/billing"><AdminLayout><BillingPage /></AdminLayout></Route>
      <Route path="/billing/receivables"><AdminLayout><BillingPage /></AdminLayout></Route>
      <Route path="/billing/payables"><AdminLayout><BillingPage /></AdminLayout></Route>
      <Route path="/billing/cashflow"><AdminLayout><BillingPage /></AdminLayout></Route>
      <Route path="/billing/subscriptions"><AdminLayout><BillingPage /></AdminLayout></Route>
      <Route path="/billing/new"><AdminLayout><BillingPage /></AdminLayout></Route>

      <Route path="/support/tickets"><AdminLayout><TicketsPage /></AdminLayout></Route>
      <Route path="/support/tickets/:id"><AdminLayout><TicketDetailPage /></AdminLayout></Route>

      <Route path="/settings"><AdminLayout><SettingsCompanyPage /></AdminLayout></Route>
      <Route path="/settings/users"><AdminLayout><SettingsUsersPage /></AdminLayout></Route>
      <Route path="/settings/integrations"><AdminLayout><SettingsIntegrationsPage /></AdminLayout></Route>
      <Route path="/settings/audit"><AdminLayout><SettingsAuditPage /></AdminLayout></Route>

      <Route path="/onboarding"><AdminLayout><OnboardingPage /></AdminLayout></Route>
      <Route path="/proposals"><AdminLayout><ProposalsPage /></AdminLayout></Route>
      <Route path="/communications"><AdminLayout><CommunicationsPage /></AdminLayout></Route>

      <Route path="/portal"><PortalLayout><PortalDashboardPage /></PortalLayout></Route>
      <Route path="/portal/invoices"><PortalLayout><PortalInvoicesPage /></PortalLayout></Route>
      <Route path="/portal/tickets"><PortalLayout><PortalTicketsPage /></PortalLayout></Route>
      <Route path="/portal/documents"><PortalLayout><PortalDocumentsPage /></PortalLayout></Route>
      <Route path="/portal/profile"><PortalLayout><PortalProfilePage /></PortalLayout></Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
