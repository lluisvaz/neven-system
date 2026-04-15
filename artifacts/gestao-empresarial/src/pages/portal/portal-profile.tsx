import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function PortalProfilePage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div><h1 className="text-2xl font-bold tracking-tight">Meu Perfil</h1><p className="text-muted-foreground mt-1">Gerencie suas informações pessoais</p></div>

      <Card>
        <CardHeader><CardTitle>Dados Pessoais</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16"><AvatarFallback className="text-xl">JS</AvatarFallback></Avatar>
            <Button variant="outline" size="sm">Alterar Foto</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Nome</Label><Input defaultValue="João Silva" data-testid="input-profile-name" /></div>
            <div className="space-y-2"><Label>Cargo</Label><Input defaultValue="Diretor de Tecnologia" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>E-mail</Label><Input defaultValue="joao@techsolutions.com.br" type="email" /></div>
            <div className="space-y-2"><Label>Telefone</Label><Input defaultValue="+55 11 99887-6655" /></div>
          </div>
          <div className="space-y-2"><Label>CPF</Label><Input defaultValue="123.456.789-00" disabled /></div>
          <Button size="sm">Salvar Alterações</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Preferências de Comunicação</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Receber lembretes de cobrança por e-mail", checked: true },
            { label: "Receber lembretes de cobrança por WhatsApp", checked: true },
            { label: "Receber newsletters e novidades", checked: false },
            { label: "Notificações de atualização do chamado por e-mail", checked: true },
          ].map((pref, i) => (
            <div key={i} className="flex items-center justify-between">
              <Label className="text-sm font-normal">{pref.label}</Label>
              <Switch checked={pref.checked} data-testid={`switch-pref-${i}`} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Alterar Senha</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Senha Atual</Label><Input type="password" placeholder="Digite a senha atual" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Nova Senha</Label><Input type="password" placeholder="Mínimo 8 caracteres" /></div>
            <div className="space-y-2"><Label>Confirmar Nova Senha</Label><Input type="password" placeholder="Confirme a nova senha" /></div>
          </div>
          <Button size="sm">Alterar Senha</Button>
        </CardContent>
      </Card>
    </div>
  );
}
