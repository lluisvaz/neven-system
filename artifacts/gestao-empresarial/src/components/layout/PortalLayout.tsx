import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, FileText, CreditCard, HelpCircle, FolderOpen, User, LogOut, Briefcase, ChevronRight, Menu, X, Globe } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const portalNav = [
  { name: "Painel", href: "/portal", icon: LayoutDashboard },
  { name: "Faturas", href: "/portal/invoices", icon: FileText },
  { name: "Planos", href: "/portal/plans", icon: CreditCard },
  { name: "Chamados", href: "/portal/tickets", icon: HelpCircle },
  { name: "Documentos", href: "/portal/documents", icon: FolderOpen },
  { name: "Perfil", href: "/portal/profile", icon: User },
];

const client = {
  name: "João Silva",
  company: "Tech Solutions Ltda",
  country: "🇧🇷",
  currency: "BRL",
  initials: "JS",
};

export function PortalLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/portal" ? location === "/portal" : location === href || location.startsWith(href + "/");

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
            <div>
              <span className="text-sm font-semibold tracking-tight">GestorPro</span>
              <p className="text-[9px] text-muted-foreground leading-none mt-0.5 uppercase tracking-wider">Portal do Cliente</p>
            </div>
          </div>
          <button
            aria-label="Fechar menu"
            className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => setMobileNavOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="no-scrollbar flex-1 overflow-y-auto py-3 px-2.5 space-y-px">
          {portalNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.href)}
              onClick={() => setMobileNavOpen(false)}
            >
              <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="px-2.5 py-3 border-t border-border flex-shrink-0 space-y-1">
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-sm bg-muted/40">
            <Avatar className="w-6 h-6 rounded-sm flex-shrink-0">
              <AvatarFallback className="text-[9px] font-mono bg-foreground text-background rounded-sm">{client.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{client.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[9px]">{client.country}</span>
                <span className="text-[9px] font-mono text-muted-foreground">{client.currency}</span>
              </div>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center justify-between px-2.5 h-8 rounded-sm text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileNavOpen(false)}
          >
            <span className="flex items-center gap-2.5">
              <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
              Sair do Portal
            </span>
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
          <span className="text-sm font-semibold tracking-tight">Portal do Cliente</span>
          <div className="h-8 w-8" />
        </div>
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="w-full max-w-none px-3 py-4 sm:px-4 lg:px-5 md:py-5"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
