import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SettingsProfilePage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Meu Perfil</h1>
        <p className="text-sm font-mono text-muted-foreground mt-1">Dados pessoais, senha e preferências da sua conta</p>
      </div>

      <div className="space-y-10">
        {/* Dados Pessoais */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Dados Pessoais</h2>
            <p className="text-xs text-muted-foreground mt-1">Nome, foto e informações de contato.</p>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-5">
              <Avatar className="w-16 h-16 rounded-sm">
                <AvatarFallback className="text-lg font-mono bg-secondary text-secondary-foreground rounded-sm">MS</AvatarFallback>
              </Avatar>
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-sm h-8 text-xs">Alterar foto</Button>
                  <Button variant="ghost" size="sm" className="rounded-sm h-8 text-xs text-destructive hover:text-destructive">Remover</Button>
                </div>
                <p className="text-[10px] text-muted-foreground">Recomendado: 256x256px, PNG ou JPG.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nome</Label>
                <Input defaultValue="Maria" className="rounded-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Sobrenome</Label>
                <Input defaultValue="Santos" className="rounded-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">E-mail</Label>
              <Input defaultValue="maria@gestorpro.com.br" type="email" className="rounded-sm font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Telefone</Label>
              <Input defaultValue="+55 11 99000-0000" className="rounded-sm font-mono" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Cargo</Label>
              <Input defaultValue="Administradora" className="rounded-sm" />
            </div>
          </div>
        </section>

        <div className="h-px bg-border w-full" />

        {/* Segurança */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Segurança</h2>
            <p className="text-xs text-muted-foreground mt-1">Senha e autenticação em duas etapas.</p>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Senha atual</Label>
              <Input type="password" placeholder="••••••••" className="rounded-sm font-mono" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nova senha</Label>
                <Input type="password" placeholder="••••••••" className="rounded-sm font-mono" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Confirmar senha</Label>
                <Input type="password" placeholder="••••••••" className="rounded-sm font-mono" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-sm border border-border bg-muted/20 mt-2">
              <div>
                <p className="text-sm font-medium">Autenticação em duas etapas</p>
                <p className="text-xs text-muted-foreground mt-0.5">Adicione uma camada extra de segurança à sua conta.</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-sm h-8 text-xs">Ativar 2FA</Button>
            </div>
          </div>
        </section>

        <div className="h-px bg-border w-full" />

        {/* Preferências */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Preferências</h2>
            <p className="text-xs text-muted-foreground mt-1">Idioma e notificações da interface.</p>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Idioma</Label>
              <Select defaultValue="pt-BR">
                <SelectTrigger className="rounded-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Fuso Horário</Label>
              <Select defaultValue="brt">
                <SelectTrigger className="rounded-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brt">Brasília (BRT −03:00)</SelectItem>
                  <SelectItem value="amt">Manaus (AMT −04:00)</SelectItem>
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
