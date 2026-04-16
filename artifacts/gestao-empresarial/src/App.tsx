import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Dashboard } from "@/pages/dashboard";
import { CrmPage } from "@/pages/crm/crm-page";
import { ErpPage } from "@/pages/erp/erp-page";
import { BillingPage } from "@/pages/billing/billing-page";
import { SupportPage } from "@/pages/support/support-page";
import { SettingsPage } from "@/pages/settings/settings-page";
import { PortalDashboardPage } from "@/pages/portal/portal-dashboard";
import { PortalInvoicesPage } from "@/pages/portal/portal-invoices";
import { PortalTicketsPage } from "@/pages/portal/portal-tickets";
import { PortalDocumentsPage } from "@/pages/portal/portal-documents";
import { PortalProfilePage } from "@/pages/portal/portal-profile";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/"><AdminLayout><Dashboard /></AdminLayout></Route>

      <Route path="/crm/contacts"><AdminLayout><CrmPage /></AdminLayout></Route>
      <Route path="/crm/contacts/:id"><AdminLayout><CrmPage /></AdminLayout></Route>
      <Route path="/crm/activities"><AdminLayout><CrmPage /></AdminLayout></Route>
      <Route path="/crm/communications"><AdminLayout mobileRestricted><CrmPage /></AdminLayout></Route>
      <Route path="/communications"><Redirect to="/crm/communications" /></Route>

      <Route path="/erp/clients"><AdminLayout><ErpPage /></AdminLayout></Route>
      <Route path="/erp/products"><AdminLayout><ErpPage /></AdminLayout></Route>
      <Route path="/erp/contracts"><AdminLayout><ErpPage /></AdminLayout></Route>
      <Route path="/erp/distribution"><Redirect to="/settings/distribution" /></Route>
      <Route path="/erp/receivables"><Redirect to="/billing/receivables" /></Route>
      <Route path="/erp/payables"><Redirect to="/billing/payables" /></Route>
      <Route path="/erp/cashflow"><Redirect to="/billing/cashflow" /></Route>

      <Route path="/billing"><AdminLayout><BillingPage /></AdminLayout></Route>
      <Route path="/billing/receivables"><AdminLayout><BillingPage /></AdminLayout></Route>
      <Route path="/billing/payables"><AdminLayout><BillingPage /></AdminLayout></Route>
      <Route path="/billing/cashflow"><AdminLayout><BillingPage /></AdminLayout></Route>
      <Route path="/billing/subscriptions"><AdminLayout><BillingPage /></AdminLayout></Route>
      <Route path="/billing/new"><AdminLayout><BillingPage /></AdminLayout></Route>

      <Route path="/support/tickets"><AdminLayout mobileRestricted><SupportPage /></AdminLayout></Route>
      <Route path="/support/tickets/:id"><AdminLayout mobileRestricted><SupportPage /></AdminLayout></Route>

      <Route path="/settings"><Redirect to="/settings/profile" /></Route>
      <Route path="/settings/profile"><AdminLayout><SettingsPage /></AdminLayout></Route>
      <Route path="/settings/company"><AdminLayout><SettingsPage /></AdminLayout></Route>
      <Route path="/settings/users"><AdminLayout><SettingsPage /></AdminLayout></Route>
      <Route path="/settings/distribution"><AdminLayout><SettingsPage /></AdminLayout></Route>
      <Route path="/settings/integrations"><AdminLayout><SettingsPage /></AdminLayout></Route>
      <Route path="/settings/audit"><AdminLayout><SettingsPage /></AdminLayout></Route>

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
