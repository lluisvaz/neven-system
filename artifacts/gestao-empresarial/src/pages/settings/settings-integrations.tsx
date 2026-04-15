import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, Puzzle, Settings2, Shield, CreditCard, Zap, MessageSquare, Mail, Calendar, HardDrive, FileSignature, Globe, Webhook, Code } from "lucide-react";
import { Link, useLocation } from "wouter";

const settingsNav = [
  { name: "Empresa", href: "/settings", icon: Building2 },
  { name: "Usuários", href: "/settings/users", icon: Users },
  { name: "Integrações", href: "/settings/integrations", icon: Puzzle },
  { name: "Campos Customizados", href: "/settings/custom-fields", icon: Settings2 },
  { name: "Auditoria", href: "/settings/audit", icon: Shield },
];

const integrations = [
  { id: 1, name: "Stripe", icon: CreditCard, description: "Gateway de pagamento - cobranças, assinaturas, reembolsos", status: "Conectado", config: "API Key configurada", category: "Financeiro" },
  { id: 2, name: "N8N", icon: Zap, description: "Orquestrador de automações - WhatsApp, fluxos, webhooks", status: "Conectado", config: "URL da instância configurada", category: "Automação" },
  { id: 3, name: "WhatsApp Business", icon: MessageSquare, description: "Envio de mensagens transacionais e de cobrança", status: "Conectado", config: "Número verificado", category: "Comunicação" },
  { id: 4, name: "SMTP / IMAP", icon: Mail, description: "Envio e recebimento de e-mails da equipe", status: "Conectado", config: "OAuth2 Google configurado", category: "Comunicação" },
  { id: 5, name: "Google Calendar", icon: Calendar, description: "Sincronização de reuniões e tarefas", status: "Não conectado", config: "", category: "Produtividade" },
  { id: 6, name: "Google Drive", icon: HardDrive, description: "Armazenamento de documentos/contratos", status: "Não conectado", config: "", category: "Armazenamento" },
  { id: 7, name: "DocuSign", icon: FileSignature, description: "Assinatura digital de contratos e propostas", status: "Não conectado", config: "", category: "Jurídico" },
  { id: 8, name: "ViaCEP", icon: Globe, description: "Auto-preenchimento de endereço por CEP", status: "Conectado", config: "Sem autenticação necessária", category: "Utilidades" },
  { id: 9, name: "Webhooks", icon: Webhook, description: "Enviar eventos do sistema para sistemas externos", status: "Conectado", config: "3 webhooks ativos", category: "Desenvolvedores" },
  { id: 10, name: "API REST", icon: Code, description: "Receber dados de sistemas externos", status: "Conectado", config: "2 API Keys ativas", category: "Desenvolvedores" },
];

export function SettingsIntegrationsPage() {
  const [location] = useLocation();

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Conecte o GestorPro a outros serviços</p>
        </div>
      </div>

      <div className="flex gap-6 border-b border-border pb-px overflow-x-auto hide-scrollbar">
        {settingsNav.map(nav => {
          const isActive = location === nav.href;
          return (
            <Link key={nav.name} href={nav.href}>
              <div className={`flex items-center gap-2 pb-3 text-sm font-medium uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap
                ${isActive ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                <nav.icon className="w-4 h-4" />
                {nav.name}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {integrations.map((integ) => (
          <div key={integ.id} className={`p-5 rounded-sm border transition-colors flex flex-col justify-between h-full ${integ.status === "Conectado" ? "border-border bg-card" : "border-transparent bg-muted/30"}`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 ${integ.status === "Conectado" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                <integ.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{integ.name}</h3>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider bg-muted px-1.5 py-0.5 rounded-sm">{integ.category}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{integ.description}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${integ.status === "Conectado" ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
                <span className={`text-xs font-mono ${integ.status === "Conectado" ? "text-emerald-600 dark:text-emerald-500" : "text-muted-foreground"}`}>
                  {integ.status === "Conectado" ? integ.config : "Não configurado"}
                </span>
              </div>
              <Button 
                variant={integ.status === "Conectado" ? "outline" : "default"} 
                size="sm" 
                className="rounded-sm h-8 text-xs font-medium"
              >
                {integ.status === "Conectado" ? "Configurar" : "Conectar"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
