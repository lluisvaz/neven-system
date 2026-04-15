import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PortalProfilePage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Meu Perfil</h1>
        <p className="text-sm font-mono text-muted-foreground mt-1">Gerencie suas informações e preferências</p>
      </div>

      <div className="space-y-10">
        <section className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
            Informações Pessoais
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="w-24 h-24 rounded-sm border border-border">
                <AvatarFallback className="text-2xl font-mono bg-muted text-muted-foreground rounded-sm">JS</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="rounded-sm text-xs w-full">Alterar Foto</Button>
            </div>

            <div className="flex-1 space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nome Completo</Label>
                  <Input defaultValue="João Silva" className="rounded-sm" data-testid="input-profile-name" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Cargo</Label>
                  <Input defaultValue="Diretor de Tecnologia" className="rounded-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">E-mail Profissional</Label>
                  <Input defaultValue="joao@techsolutions.com.br" type="email" className="rounded-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Celular Corporativo</Label>
                  <Input defaultValue="+55 11 99887-6655" className="rounded-sm font-mono" />
                </div>
              </div>
              <div className="space-y-2 max-w-[50%]">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">CPF</Label>
                <Input defaultValue="123.456.789-00" disabled className="rounded-sm font-mono opacity-60 bg-muted/50 cursor-not-allowed" />
                <p className="text-[10px] text-muted-foreground">Usado para fins contratuais. Não pode ser alterado diretamente.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
            Preferências de Localização
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Idioma</Label>
              <Select defaultValue="pt-br">
                <SelectTrigger className="rounded-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                  <SelectItem value="pt-pt">Português (Portugal)</SelectItem>
                  <SelectItem value="en-us">English (US)</SelectItem>
                  <SelectItem value="en-gb">English (UK)</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
            Segurança
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Senha Atual</Label>
                <Input type="password" placeholder="••••••••" className="rounded-sm font-mono" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nova Senha</Label>
                <Input type="password" placeholder="Mín. 8 caracteres" className="rounded-sm font-mono" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Confirmar Nova Senha</Label>
                <Input type="password" placeholder="Repita a senha" className="rounded-sm font-mono" />
              </div>
              <Button variant="outline" size="sm" className="rounded-sm w-full">Atualizar Senha</Button>
            </div>

            <div className="bg-muted/30 p-4 border border-border rounded-sm flex flex-col justify-center text-center items-center space-y-3">
              <div className="w-12 h-12 rounded-sm bg-muted flex items-center justify-center border border-border">
                <span className="text-xl">📱</span>
              </div>
              <div>
                <h3 className="text-sm font-medium">Autenticação em 2 Fatores</h3>
                <p className="text-xs text-muted-foreground mt-1 px-4">Aumente a segurança exigindo um código no celular ao fazer login.</p>
              </div>
              <Button variant="secondary" size="sm" className="rounded-sm text-xs mt-2">Configurar 2FA</Button>
            </div>
          </div>
        </section>

        <div className="pt-6 border-t border-border flex justify-end">
          <Button className="rounded-sm px-8">Salvar Alterações</Button>
        </div>
      </div>
    </div>
  );
}
