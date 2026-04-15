import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, Puzzle, Settings2, Shield, CreditCard, Zap, MessageSquare, Mail, Calendar, HardDrive, FileSignature, Globe, Webhook, Code } from "lucide-react";
import { Link } from "wouter";

const settingsNav = [
  { name: "Empresa", href: "/settings", icon: Building2 },
  { name: "Usuários", href: "/settings/users", icon: Users },
  { name: "Integrações", href: "/settings/integrations", icon: Puzzle },
  { name: "Campos Customizados", href: "/settings/custom-fields", icon: Settings2 },
  { name: "Auditoria", href: "/settings/audit", icon: Shield },
];

const integrations = [
  { name: "Stripe", icon: CreditCard, description: "Gateway de pagamento - cobranças, assinaturas, reembolsos", status: "Conectado", config: "API Key configurada" },
  { name: "N8N", icon: Zap, description: "Orquestrador de automações - WhatsApp, fluxos, webhooks", status: "Conectado", config: "URL da instância configurada" },
  { name: "WhatsApp Business", icon: MessageSquare, description: "Envio de mensagens transacionais e de cobrança", status: "Conectado", config: "Número verificado" },
  { name: "SMTP / IMAP", icon: Mail, description: "Envio e recebimento de e-mails da equipe", status: "Conectado", config: "OAuth2 Google configurado" },
  { name: "Google Calendar", icon: Calendar, description: "Sincronização de reuniões e tarefas", status: "Não conectado", config: "" },
  { name: "Google Drive", icon: HardDrive, description: "Armazenamento de documentos/contratos", status: "Não conectado", config: "" },
  { name: "DocuSign", icon: FileSignature, description: "Assinatura digital de contratos e propostas", status: "Não conectado", config: "" },
  { name: "ViaCEP", icon: Globe, description: "Auto-preenchimento de endereço por CEP", status: "Conectado", config: "Sem autenticação necessária" },
  { name: "Webhooks (Saída)", icon: Webhook, description: "Enviar eventos do sistema para sistemas externos", status: "Conectado", config: "3 webhooks ativos" },
  { name: "API REST (Entrada)", icon: Code, description: "Receber dados de sistemas externos", status: "Conectado", config: "2 API Keys ativas" },
];

export function SettingsIntegrationsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Configurações</h1><p className="text-muted-foreground mt-1">Integrações com serviços externos</p></div>

      <div className="flex gap-2 border-b pb-4">
        {settingsNav.map(nav => (
          <Link key={nav.name} href={nav.href}><Button variant={nav.href === "/settings/integrations" ? "default" : "ghost"} size="sm"><nav.icon className="w-4 h-4 mr-2" />{nav.name}</Button></Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integ, i) => (
          <Card key={i} className={integ.status === "Não conectado" ? "opacity-70" : ""}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted"><integ.icon className="w-5 h-5 text-muted-foreground" /></div>
                  <div>
                    <p className="font-medium text-sm">{integ.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{integ.description}</p>
                    {integ.config && <p className="text-xs text-muted-foreground mt-1">{integ.config}</p>}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={integ.status === "Conectado" ? "default" : "outline"}>{integ.status}</Badge>
                  <Button variant="outline" size="sm">{integ.status === "Conectado" ? "Configurar" : "Conectar"}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
