import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Briefcase, FileText, Settings, HelpCircle, DollarSign,
  Package, Send, ThumbsUp, Share2, MessageSquare, Rocket,
  BarChart3, ChevronRight, Users, Menu, X
} from "lucide-react";
import { motion } from "framer-motion";

const navigation = [
  { name: "Dashboard", href: "/" },
  {
    name: "CRM", items: [
      { name: "Contatos", href: "/crm/contacts" },
      { name: "Pipeline", href: "/crm/pipeline" },
      { name: "Atividades", href: "/crm/activities" },
      { name: "Automações", href: "/crm/automations" },
    ]
  },
  {
    name: "ERP", items: [
      { name: "Clientes", href: "/erp/clients" },
      { name: "A Receber", href: "/erp/receivables" },
      { name: "A Pagar", href: "/erp/payables" },
      { name: "Fluxo de Caixa", href: "/erp/cashflow" },
      { name: "Distribuição", href: "/erp/distribution" },
      { name: "DRE", href: "/erp/dre" },
      { name: "Produtos", href: "/erp/products" },
      { name: "Contratos", href: "/erp/contracts" },
      { name: "Estoque", href: "/erp/inventory" },
    ]
  },
  {
    name: "Faturamento", items: [
      { name: "Visão Geral", href: "/billing" },
      { name: "Nova Cobrança", href: "/billing/new" },
      { name: "Assinaturas", href: "/billing/subscriptions" },
    ]
  },
  {
    name: "Relatórios", items: [
      { name: "Dashboard", href: "/reports" },
      { name: "Biblioteca", href: "/reports/library" },
    ]
  },
  {
    name: "Suporte", items: [
      { name: "Tickets", href: "/support/tickets" },
      { name: "Base de Conhecimento", href: "/support/knowledge" },
    ]
  },
  { name: "Propostas", href: "/proposals" },
  { name: "Onboarding", href: "/onboarding" },
  { name: "NPS", href: "/nps" },
  { name: "Indicações", href: "/referrals" },
  { name: "Comunicações", href: "/communications" },
  { name: "Configurações", href: "/settings" },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location === href || location.startsWith(href + "/");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {mobileNavOpen && (
        <button
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <aside className={`${mobileNavOpen ? "flex" : "hidden"} fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 border-r border-border bg-sidebar flex-col overflow-hidden shadow-xl md:static md:z-auto md:flex md:w-56 md:shadow-none`}>
        <div className="h-14 flex items-center justify-between px-4 sm:px-5 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-foreground rounded-sm flex items-center justify-center">
              <Briefcase className="w-2.5 h-2.5 text-background" />
            </div>
            <span className="text-sm font-semibold tracking-tight">GestorPro</span>
          </div>
          <button
            aria-label="Fechar menu"
            className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => setMobileNavOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="no-scrollbar flex-1 overflow-y-auto py-3 px-3 space-y-4">
          {navigation.map((group) => (
            <div key={group.name}>
              {"items" in group ? (
                <div>
                  <p className="px-2 mb-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 select-none">
                    {group.name}
                  </p>
                  <div className="space-y-px">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center px-2 h-7 rounded-sm text-sm transition-colors ${
                          isActive(item.href)
                            ? "bg-foreground text-background font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                        onClick={() => setMobileNavOpen(false)}
                        data-testid={`nav-${item.href.replace(/\//g, "-").slice(1)}`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={group.href!}
                  className={`flex items-center px-2 h-7 rounded-sm text-sm transition-colors ${
                    isActive(group.href!)
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setMobileNavOpen(false)}
                  data-testid={`nav-${group.href === "/" ? "dashboard" : group.href!.replace(/\//g, "-").slice(1)}`}
                >
                  {group.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="px-3 py-3 border-t border-border flex-shrink-0">
          <Link
            href="/portal"
            className="flex items-center justify-between px-2 h-7 rounded-sm text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileNavOpen(false)}
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-3 h-3" />
              Portal do Cliente
            </span>
            <ChevronRight className="w-3 h-3 opacity-50" />
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-background">
        <div className="sticky top-0 z-30 md:hidden h-12 border-b border-border bg-background/95 backdrop-blur flex items-center justify-between px-3">
          <button
            aria-label="Abrir menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold tracking-tight">GestorPro</span>
          <div className="h-8 w-8" />
        </div>
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="app-compact-page w-full max-w-none px-3 py-4 sm:px-4 lg:px-5 md:py-5"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
