import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { LayoutDashboard, FileText, CreditCard, HelpCircle, FolderOpen, User, LogOut } from "lucide-react";

const portalNav = [
  { name: "Painel", href: "/portal", icon: LayoutDashboard },
  { name: "Faturas", href: "/portal/invoices", icon: FileText },
  { name: "Planos", href: "/portal/plans", icon: CreditCard },
  { name: "Chamados", href: "/portal/tickets", icon: HelpCircle },
  { name: "Documentos", href: "/portal/documents", icon: FolderOpen },
  { name: "Perfil", href: "/portal/profile", icon: User },
];

export function PortalLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 bg-background border-b">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-bold text-lg tracking-tight">GestorPro</span>
            <nav className="flex items-center gap-1">
              {portalNav.map(item => (
                <Link key={item.name} href={item.href}>
                  <Button variant={location === item.href || (item.href !== "/portal" && location.startsWith(item.href)) ? "secondary" : "ghost"} size="sm" className="gap-2">
                    <item.icon className="w-4 h-4" />
                    <span className="hidden md:inline">{item.name}</span>
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8"><AvatarFallback className="text-xs">JS</AvatarFallback></Avatar>
            <div className="hidden md:block"><p className="text-sm font-medium">João Silva</p><p className="text-xs text-muted-foreground">Tech Solutions Ltda</p></div>
            <Button variant="ghost" size="icon"><LogOut className="w-4 h-4" /></Button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {children}
        </motion.div>
      </main>
    </div>
  );
}
