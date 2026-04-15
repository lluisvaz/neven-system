import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, Puzzle, Shield } from "lucide-react";
import { Link, useLocation } from "wouter";

const settingsNav = [
  { name: "Empresa", href: "/settings", icon: Building2 },
  { name: "Usuários", href: "/settings/users", icon: Users },
  { name: "Integrações", href: "/settings/integrations", icon: Puzzle },
  { name: "Auditoria", href: "/settings/audit", icon: Shield },
];

export function SettingsCompanyPage() {
  const [location] = useLocation();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
        <p className="text-sm font-mono text-muted-foreground mt-1">Gerencie as preferências da sua conta</p>
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

      <div className="space-y-10">
        {/* Identidade Visual */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Identidade Visual</h2>
            <p className="text-xs text-muted-foreground mt-1">Logomarca e cores da sua empresa no portal do cliente.</p>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-3">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Logotipo</Label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-sm bg-muted flex items-center justify-center border border-border border-dashed">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">Logo</span>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-sm h-8 text-xs">Alterar</Button>
                    <Button variant="ghost" size="sm" className="rounded-sm h-8 text-xs text-destructive hover:text-destructive">Remover</Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Recomendado: 256x256px, PNG com fundo transparente.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Cor Primária</Label>
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-sm border border-border bg-[#1a1a2e]" />
                  <Input defaultValue="#1a1a2e" className="font-mono text-sm rounded-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Cor Secundária</Label>
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-sm border border-border bg-[#0066ff]" />
                  <Input defaultValue="#0066ff" className="font-mono text-sm rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-border w-full" />

        {/* Dados Cadastrais */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Dados Cadastrais</h2>
            <p className="text-xs text-muted-foreground mt-1">Informações legais e de faturamento da sua empresa.</p>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Razão Social / Nome da Empresa</Label>
              <Input defaultValue="GestorPro Tecnologia Ltda" className="rounded-sm" data-testid="input-company-name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">CNPJ / CPF</Label>
                <Input defaultValue="12.345.678/0001-90" className="rounded-sm font-mono" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Telefone Principal</Label>
                <Input defaultValue="+55 11 3000-0000" className="rounded-sm font-mono" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Endereço Completo</Label>
              <Input defaultValue="Rua Augusta, 1500, Sala 301 - Consolação" className="rounded-sm" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2 col-span-1">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">CEP</Label>
                <Input defaultValue="01304-001" className="rounded-sm font-mono" />
              </div>
              <div className="space-y-2 col-span-1">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Cidade</Label>
                <Input defaultValue="São Paulo" className="rounded-sm" />
              </div>
              <div className="space-y-2 col-span-1">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Estado</Label>
                <Input defaultValue="SP" className="rounded-sm" />
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-border w-full" />

        {/* Localização */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Localização</h2>
            <p className="text-xs text-muted-foreground mt-1">Configurações regionais e formatos.</p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Fuso Horário</Label>
              <Select defaultValue="brt">
                <SelectTrigger className="rounded-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brt">Brasília (BRT -03:00)</SelectItem>
                  <SelectItem value="amt">Manaus (AMT -04:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Moeda Padrão</Label>
              <Select defaultValue="brl">
                <SelectTrigger className="rounded-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brl">Real (BRL)</SelectItem>
                  <SelectItem value="usd">Dólar (USD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <Button className="rounded-sm px-8 bg-foreground hover:bg-foreground/90">Salvar Alterações</Button>
        </div>
      </div>
    </div>
  );
}
