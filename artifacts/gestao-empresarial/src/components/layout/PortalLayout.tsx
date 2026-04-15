import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboard, FileText, CreditCard, HelpCircle, FolderOpen, User, LogOut, Hexagon } from "lucide-react";

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
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-accent">
              <Hexagon className="w-5 h-5 fill-current" />
              <span className="font-bold text-sm tracking-tight text-foreground">GestorPro</span>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {portalNav.map(item => {
                const isActive = location === item.href || (item.href !== "/portal" && location.startsWith(item.href));
                return (
                  <Link key={item.name} href={item.href}>
                    <Button 
                      variant={isActive ? "secondary" : "ghost"} 
                      size="sm" 
                      className={`gap-2 rounded-sm ${isActive ? 'font-medium' : 'text-muted-foreground'}`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-sm font-medium leading-none">João Silva</p>
              <p className="text-xs text-muted-foreground mt-1">Tech Solutions Ltda</p>
            </div>
            <Avatar className="w-8 h-8 rounded-sm">
              <AvatarFallback className="text-[10px] font-mono bg-accent text-accent-foreground rounded-sm">JS</AvatarFallback>
            </Avatar>
            <div className="w-px h-6 bg-border mx-1" />
            <Link href="/">
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm text-muted-foreground hover:text-foreground">
                <LogOut className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        <div className="animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
