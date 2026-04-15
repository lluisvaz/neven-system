import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, CreditCard, QrCode, FileText } from "lucide-react";

const products = [
  { name: "Plano Enterprise", price: "12.000,00" },
  { name: "Módulo Analytics", price: "3.500,00" },
  { name: "Setup e Implantação", price: "4.000,00" },
];

export function NewChargePage() {
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-6 max-w-3xl">
      <div><h1 className="text-3xl font-bold tracking-tight">Nova Cobrança</h1><p className="text-muted-foreground mt-1">Crie uma nova cobrança para um cliente</p></div>

      <div className="flex gap-4 mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s}</div>
            <span className={`text-sm ${step >= s ? 'font-medium' : 'text-muted-foreground'}`}>
              {s === 1 ? 'Dados da Cobrança' : s === 2 ? 'Recorrência' : 'Pagamento'}
            </span>
            {s < 3 && <Separator className="w-8" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader><CardTitle>Dados da Cobrança</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Cliente</Label>
              <Input placeholder="Buscar cliente..." data-testid="input-charge-client" />
            </div>
            <div className="space-y-2">
              <Label>Tipo de Cobrança</Label>
              <Select defaultValue="avulsa"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="avulsa">Avulsa</SelectItem><SelectItem value="recorrente">Recorrente</SelectItem><SelectItem value="parcelada">Parcelada</SelectItem></SelectContent></Select>
            </div>

            <div className="space-y-2">
              <Label>Produtos / Serviços</Label>
              {products.slice(0, 2).map((p, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="flex-1"><p className="text-sm font-medium">{p.name}</p><p className="text-xs text-muted-foreground">R$ {p.price}</p></div>
                  <Input className="w-20" type="number" defaultValue="1" placeholder="Qtd" />
                  <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-muted-foreground" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm"><Plus className="w-4 h-4 mr-2" />Adicionar Item</Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Desconto</Label><Input placeholder="R$ 0,00" /></div>
              <div className="space-y-2"><Label>Data de Vencimento</Label><Input type="date" defaultValue="2026-04-30" /></div>
            </div>

            <Separator />

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <span className="text-sm font-medium">Valor Total</span>
              <span className="text-2xl font-bold">R$ 15.500,00</span>
            </div>

            <div className="space-y-2"><Label>Descrição Interna</Label><Textarea placeholder="Notas para a equipe (não visível ao cliente)" /></div>
            <div className="space-y-2"><Label>Descrição para o Cliente</Label><Textarea placeholder="Texto que aparecerá na fatura" /></div>

            <div className="flex justify-end"><Button onClick={() => setStep(2)} data-testid="button-next-step">Próximo</Button></div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader><CardTitle>Configuração de Recorrência</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Frequência</Label><Select defaultValue="mensal"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="semanal">Semanal</SelectItem><SelectItem value="quinzenal">Quinzenal</SelectItem><SelectItem value="mensal">Mensal</SelectItem><SelectItem value="trimestral">Trimestral</SelectItem><SelectItem value="anual">Anual</SelectItem></SelectContent></Select></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Data de Início</Label><Input type="date" defaultValue="2026-05-01" /></div>
              <div className="space-y-2"><Label>Data de Término (opcional)</Label><Input type="date" /></div>
            </div>
            <div className="space-y-2"><Label>Tentativas de cobrança</Label><Select defaultValue="3"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1 tentativa</SelectItem><SelectItem value="2">2 tentativas</SelectItem><SelectItem value="3">3 tentativas</SelectItem><SelectItem value="5">5 tentativas</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Período de carência (dias)</Label><Input type="number" defaultValue="7" /></div>
            <div className="flex justify-between"><Button variant="outline" onClick={() => setStep(1)}>Voltar</Button><Button onClick={() => setStep(3)}>Próximo</Button></div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader><CardTitle>Métodos de Pagamento</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Selecione os métodos de pagamento disponíveis para esta cobrança</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Cartão de Crédito", icon: CreditCard, provider: "Stripe", desc: "Visa, Master, Amex" },
                { name: "PIX", icon: QrCode, provider: "Stripe", desc: "QR Code dinâmico" },
                { name: "Boleto", icon: FileText, provider: "Stripe", desc: "Vencimento configurável" },
              ].map((method, i) => (
                <Card key={i} className="cursor-pointer hover:border-primary transition-colors border-2 border-primary">
                  <CardContent className="pt-4 text-center space-y-2">
                    <method.icon className="w-8 h-8 mx-auto text-primary" />
                    <p className="font-medium text-sm">{method.name}</p>
                    <Badge variant="outline" className="text-xs">{method.provider}</Badge>
                    <p className="text-xs text-muted-foreground">{method.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between"><Button variant="outline" onClick={() => setStep(2)}>Voltar</Button><Button data-testid="button-create-charge">Criar Cobrança</Button></div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
