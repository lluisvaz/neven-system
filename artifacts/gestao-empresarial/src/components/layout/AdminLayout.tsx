import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Briefcase, FileText, Settings, ChevronRight, Menu, X,
  LayoutDashboard, Users, CheckSquare, Building2,
  ArrowDownLeft, ArrowUpRight, TrendingUp, Package,
  FileCheck2, RefreshCw, LifeBuoy,
  MessageSquare, Plus
} from "lucide-react";
import { motion } from "framer-motion";

type NavItem = { name: string; href: string; icon: React.ElementType };
type NavGroup = { name: string; items: NavItem[] };
type NavSingle = { name: string; href: string; icon: React.ElementType; single: true };
type NavEntry = NavGroup | NavSingle;

const navigation: NavEntry[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, single: true },
  {
    name: "CRM", items: [
      { name: "Leads",        href: "/crm/contacts",      icon: Users },
      { name: "Atividades",   href: "/crm/activities",    icon: CheckSquare },
      { name: "Comunicações", href: "/crm/communications", icon: MessageSquare },
    ]
  },
  {
    name: "ERP", items: [
      { name: "Clientes",  href: "/erp/clients",   icon: Building2 },
      { name: "Produtos",  href: "/erp/products",  icon: Package },
      { name: "Contratos", href: "/erp/contracts", icon: FileCheck2 },
    ]
  },
  {
    name: "Faturamento", items: [
      { name: "Visão Geral",    href: "/billing",                icon: LayoutDashboard },
      { name: "A Receber",      href: "/billing/receivables",    icon: ArrowDownLeft },
      { name: "A Pagar",        href: "/billing/payables",       icon: ArrowUpRight },
      { name: "Fluxo de Caixa", href: "/billing/cashflow",       icon: TrendingUp },
      { name: "Assinaturas",    href: "/billing/subscriptions",  icon: RefreshCw },
      { name: "Nova Cobrança",  href: "/billing/new",            icon: Plus },
    ]
  },
  {
    name: "Suporte", items: [
      { name: "Tickets", href: "/support/tickets", icon: LifeBuoy },
    ]
  },
  { name: "Configurações", href: "/settings", icon: Settings, single: true },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location === href || location.startsWith(href + "/");

  const linkClass = (href: string) =>
    `flex items-center gap-2.5 px-2.5 h-8 rounded-sm text-sm transition-colors ${
      isActive(href)
        ? "bg-foreground text-background font-medium"
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {mobileNavOpen && (
        <button
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <aside className={`${mobileNavOpen ? "flex" : "hidden"} fixed inset-y-0 left-0 z-50 w-60 flex-shrink-0 border-r border-border bg-sidebar flex-col overflow-hidden shadow-xl md:static md:z-auto md:flex md:w-52 md:shadow-none`}>
        <div className="h-14 flex items-center justify-between px-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-foreground rounded-sm flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-3 h-3 text-background" />
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

        <nav className="no-scrollbar flex-1 overflow-y-auto py-3 px-2.5 space-y-0.5">
          {navigation.map((entry) => {
            if ("single" in entry) {
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={linkClass(entry.href)}
                  onClick={() => setMobileNavOpen(false)}
                  data-testid={`nav-${entry.href === "/" ? "dashboard" : entry.href.replace(/\//g, "-").slice(1)}`}
                >
                  <entry.icon className="w-3.5 h-3.5 flex-shrink-0" />
                  {entry.name}
                </Link>
              );
            }

            return (
              <div key={entry.name} className="pt-4 first:pt-0">
                <p className="px-2.5 mb-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50 select-none">
                  {entry.name}
                </p>
                <div className="space-y-px">
                  {entry.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={linkClass(item.href)}
                      onClick={() => setMobileNavOpen(false)}
                      data-testid={`nav-${item.href.replace(/\//g, "-").slice(1)}`}
                    >
                      <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="px-2.5 py-3 border-t border-border flex-shrink-0">
          <Link
            href="/portal"
            className="flex items-center justify-between px-2.5 h-8 rounded-sm text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileNavOpen(false)}
          >
            <span className="flex items-center gap-2.5">
              <FileText className="w-3.5 h-3.5 flex-shrink-0" />
              Portal do Cliente
            </span>
            <ChevronRight className="w-3 h-3 opacity-40" />
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
