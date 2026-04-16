import { Button } from "@/components/ui/button";

type Integration = {
  id: number;
  name: string;
  logoUrl: string;
  logoClass?: string;
  description: string;
  status: "Conectado" | "Não conectado";
  config: string;
  category: string;
};

const integrations: Integration[] = [
  {
    id: 1,
    name: "Stripe",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGluJhW7I1NYU7jF77E-9K9I46_ib_DUNHw&s",
    description: "Gateway de pagamento — cobranças, assinaturas, reembolsos",
    status: "Conectado",
    config: "API Key configurada",
    category: "Financeiro",
  },
  {
    id: 2,
    name: "Asaas",
    logoUrl: "https://cdn.brandfetch.io/idLRcDynC3/w/1080/h/1080/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1776118385575",
    description: "Plataforma financeira brasileira — boleto, Pix, cartão e cobranças recorrentes",
    status: "Não conectado",
    config: "",
    category: "Financeiro",
  },
  {
    id: 3,
    name: "N8N",
    logoUrl: "https://cdn.brandfetch.io/idO6_6uqJ9/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1763457415601",
    description: "Orquestrador de automações — WhatsApp, fluxos e integrações",
    status: "Conectado",
    config: "URL da instância configurada",
    category: "Automação",
  },
  {
    id: 4,
    name: "WhatsApp Business",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/960px-WhatsApp.svg.png?_=20220228223904",
    description: "Envio de mensagens transacionais e de cobrança",
    status: "Conectado",
    config: "Número verificado",
    category: "Comunicação",
  },
  {
    id: 5,
    name: "SMTP / IMAP",
    logoUrl: "https://cdn.brandfetch.io/id5o3EIREg/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1696475443284",
    description: "Envio e recebimento de e-mails da equipe",
    status: "Conectado",
    config: "OAuth2 Google configurado",
    category: "Comunicação",
  },
  {
    id: 6,
    name: "Google Calendar",
    logoUrl: "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/idMX2_OMSc.svg?c=1bxid64Mup7aczewSAYMX&t=1755572706253",
    description: "Sincronização de reuniões e tarefas com o calendário",
    status: "Não conectado",
    config: "",
    category: "Produtividade",
  },
  {
    id: 7,
    name: "Google Drive",
    logoUrl: "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/idncaAgFGT.svg?c=1bxid64Mup7aczewSAYMX&t=1755572716016",
    description: "Armazenamento de documentos e contratos na nuvem",
    status: "Não conectado",
    config: "",
    category: "Armazenamento",
  },
];

export function SettingsIntegrationsPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Integrações</h1>
        <p className="text-sm font-mono text-muted-foreground mt-1">Conecte o GestorPro a outros serviços</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {integrations.map((integ) => (
          <div
            key={integ.id}
            className={`p-5 rounded-sm border transition-colors flex flex-col justify-between h-full ${
              integ.status === "Conectado" ? "border-border bg-card" : "border-transparent bg-muted/30"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-sm overflow-hidden flex items-center justify-center bg-muted/40">
                <img
                  src={integ.logoUrl}
                  alt={integ.name}
                  className="w-7 h-7 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
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
