import { Button } from "@/components/ui/button";
import { Building2, Users, Puzzle, Settings2, Shield } from "lucide-react";
import { Link, useLocation } from "wouter";

const settingsNav = [
  { name: "Empresa", href: "/settings", icon: Building2 },
  { name: "Usuários", href: "/settings/users", icon: Users },
  { name: "Integrações", href: "/settings/integrations", icon: Puzzle },
  { name: "Campos Customizados", href: "/settings/custom-fields", icon: Settings2 },
  { name: "Auditoria", href: "/settings/audit", icon: Shield },
];

const StripeSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#635BFF"/>
    <path d="M11.01 9.677c0-.567.464-.784 1.232-.784 1.102 0 2.493.333 3.595.926V6.67a9.56 9.56 0 0 0-3.595-.666c-2.94 0-4.9 1.537-4.9 4.1 0 4.002 5.513 3.363 5.513 5.09 0 .67-.581.888-1.39.888-1.2 0-2.737-.494-3.953-1.16v3.198c1.348.582 2.71.83 3.952.83 3.006 0 5.071-1.49 5.071-4.084-.014-4.323-5.525-3.553-5.525-5.09Z" fill="white"/>
  </svg>
);

const N8NSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#EA4B71"/>
    <text x="3" y="17" fontSize="11" fontWeight="800" fill="white" fontFamily="monospace">n8n</text>
  </svg>
);

const WhatsAppSvg = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#25D366"/>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" fill="white"/>
    <path d="M12.05 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 1.71.44 3.317 1.21 4.717L2.25 21.75l5.155-1.235a9.712 9.712 0 0 0 4.645 1.185c5.385 0 9.75-4.365 9.75-9.75S17.435 2.25 12.05 2.25ZM12 20.197A8.197 8.197 0 0 1 7.59 18.93l-.29-.176-3.058.733.763-2.982-.192-.308A8.196 8.196 0 0 1 3.803 12C3.803 7.487 7.487 3.803 12 3.803S20.197 7.487 20.197 12 16.513 20.197 12 20.197Z" fill="white" fillOpacity="0.4"/>
  </svg>
);

const SmtpSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#4A5568"/>
    <rect x="3" y="6" width="18" height="13" rx="1.5" fill="none" stroke="white" strokeWidth="1.5"/>
    <path d="M3 8l9 6 9-6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const GoogleCalendarSvg = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="white" stroke="#E0E0E0" strokeWidth="0.5"/>
    <rect x="3" y="4" width="18" height="17" rx="1.5" fill="white"/>
    <rect x="3" y="4" width="18" height="5" rx="1.5" fill="#4285F4"/>
    <rect x="3" y="7" width="18" height="2" fill="#4285F4"/>
    <text x="8" y="18" fontSize="8" fontWeight="700" fill="#4285F4" fontFamily="sans-serif">15</text>
    <line x1="8" y1="4" x2="8" y2="2" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="16" y1="4" x2="16" y2="2" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const GoogleDriveSvg = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.28 19.5l2.571-4.5H21l-2.571 4.5H6.28Z" fill="#0066DA"/>
    <path d="M3 19.5l2.571-4.5 5.143-9 2.572 4.5-5.143 9L3 19.5Z" fill="#00AC47"/>
    <path d="M10.714 6l5.143 9H4.571L9.714 6h1Z" fill="#EA4335"/>
    <path d="M15.857 15l-5.143-9H12l5.143 9h-1.286Z" fill="#FFBA00"/>
  </svg>
);

const AsaasSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#0072FF"/>
    <path d="M5 17l4.5-10 2.5 5.5L14.5 7 19 17H5Z" fill="white" fillOpacity="0.15"/>
    <text x="3.5" y="16" fontSize="6.5" fontWeight="800" fill="white" fontFamily="sans-serif" letterSpacing="-0.3">ASAAS</text>
  </svg>
);

type Integration = {
  id: number;
  name: string;
  SvgIcon: React.ComponentType;
  description: string;
  status: "Conectado" | "Não conectado";
  config: string;
  category: string;
};

const integrations: Integration[] = [
  { id: 1, name: "Stripe", SvgIcon: StripeSvg, description: "Gateway de pagamento — cobranças, assinaturas, reembolsos", status: "Conectado", config: "API Key configurada", category: "Financeiro" },
  { id: 2, name: "Asaas", SvgIcon: AsaasSvg, description: "Plataforma financeira brasileira — boleto, Pix, cartão e cobranças recorrentes", status: "Não conectado", config: "", category: "Financeiro" },
  { id: 3, name: "N8N", SvgIcon: N8NSvg, description: "Orquestrador de automações — WhatsApp, fluxos e integrações", status: "Conectado", config: "URL da instância configurada", category: "Automação" },
  { id: 4, name: "WhatsApp Business", SvgIcon: WhatsAppSvg, description: "Envio de mensagens transacionais e de cobrança", status: "Conectado", config: "Número verificado", category: "Comunicação" },
  { id: 5, name: "SMTP / IMAP", SvgIcon: SmtpSvg, description: "Envio e recebimento de e-mails da equipe", status: "Conectado", config: "OAuth2 Google configurado", category: "Comunicação" },
  { id: 6, name: "Google Calendar", SvgIcon: GoogleCalendarSvg, description: "Sincronização de reuniões e tarefas com o calendário", status: "Não conectado", config: "", category: "Produtividade" },
  { id: 7, name: "Google Drive", SvgIcon: GoogleDriveSvg, description: "Armazenamento de documentos e contratos na nuvem", status: "Não conectado", config: "", category: "Armazenamento" },
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
          <div
            key={integ.id}
            className={`p-5 rounded-sm border transition-colors flex flex-col justify-between h-full ${
              integ.status === "Conectado" ? "border-border bg-card" : "border-transparent bg-muted/30"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-sm overflow-hidden flex items-center justify-center">
                <integ.SvgIcon />
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
