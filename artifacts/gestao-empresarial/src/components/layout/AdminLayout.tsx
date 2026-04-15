import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Briefcase, LayoutDashboard, Users, FileText, Settings, HelpCircle, DollarSign, Package, Send, ThumbsUp, Share2, MessageSquare, Rocket, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export function AdminLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    {
      name: "CRM", icon: Users, items: [
        { name: "Contatos", href: "/crm/contacts" },
        { name: "Pipeline", href: "/crm/pipeline" },
        { name: "Atividades", href: "/crm/activities" },
        { name: "Automações", href: "/crm/automations" },
      ]
    },
    {
      name: "ERP", icon: Package, items: [
        { name: "A Receber", href: "/erp/receivables" },
        { name: "A Pagar", href: "/erp/payables" },
        { name: "Fluxo de Caixa", href: "/erp/cashflow" },
        { name: "DRE", href: "/erp/dre" },
        { name: "Produtos", href: "/erp/products" },
        { name: "Contratos", href: "/erp/contracts" },
        { name: "Estoque", href: "/erp/inventory" },
      ]
    },
    {
      name: "Faturamento", icon: DollarSign, items: [
        { name: "Visão Geral", href: "/billing" },
        { name: "Nova Cobrança", href: "/billing/new" },
        { name: "Assinaturas", href: "/billing/subscriptions" },
      ]
    },
    {
      name: "Relatórios", icon: BarChart3, items: [
        { name: "Dashboard", href: "/reports" },
        { name: "Biblioteca", href: "/reports/library" },
      ]
    },
    {
      name: "Suporte", icon: HelpCircle, items: [
        { name: "Tickets", href: "/support/tickets" },
        { name: "Base de Conhecimento", href: "/support/knowledge" },
      ]
    },
    { name: "Propostas", href: "/proposals", icon: Send },
    { name: "Onboarding", href: "/onboarding", icon: Rocket },
    { name: "NPS", href: "/nps", icon: ThumbsUp },
    { name: "Indicações", href: "/referrals", icon: Share2 },
    { name: "Comunicações", href: "/communications", icon: MessageSquare },
    { name: "Configurações", href: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar className="w-64 border-r bg-sidebar text-sidebar-foreground">
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Briefcase className="w-6 h-6 text-primary-foreground" />
            <span>GestorPro</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="py-4 overflow-y-auto">
          {navigation.map((group) => (
            <SidebarGroup key={group.name}>
              {group.items ? (
                <>
                  <SidebarGroupLabel className="text-sidebar-foreground/70 px-4 mb-2 flex items-center gap-2">
                    <group.icon className="w-4 h-4" /> {group.name}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton asChild isActive={location === item.href}>
                            <Link href={item.href} className="pl-10">{item.name}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </>
              ) : (
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location === group.href || (group.href !== "/" && location.startsWith(group.href!))}>
                      <Link href={group.href!} className="px-4 flex items-center gap-2">
                        <group.icon className="w-4 h-4" />
                        <span>{group.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              )}
            </SidebarGroup>
          ))}

          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/70 px-4 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Portal do Cliente
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/portal" className="pl-10">Acessar Portal</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 overflow-y-auto bg-muted/20">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
