import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, CreditCard, QrCode, FileText } from "lucide-react";

export function NewChargePage() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Nova Cobrança</h1>
        <p className="text-sm font-mono text-muted-foreground mt-1">Gerar fatura ou link de pagamento</p>
      </div>

      <div className="flex items-center gap-2 border-b border-border pb-4">
        {[1, 2, 3].map((s, i) => (
          <div key={s} className="flex items-center">
            <span className={`text-xs font-mono uppercase tracking-wider ${step >= s ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              {s}. {s === 1 ? 'Dados' : s === 2 ? 'Recorrência' : 'Pagamento'}
            </span>
            {i < 2 && <span className="text-muted-foreground/30 mx-3">/</span>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Cliente</Label>
              <Input placeholder="Buscar cliente..." className="rounded-sm" data-testid="input-charge-client" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Tipo de Cobrança</Label>
              <Select defaultValue="avulsa">
                <SelectTrigger className="rounded-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="avulsa">Avulsa</SelectItem>
                  <SelectItem value="recorrente">Recorrente (Assinatura)</SelectItem>
                  <SelectItem value="parcelada">Parcelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-6 border-t border-border space-y-4">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Itens</Label>
            <div className="border border-border rounded-sm overflow-hidden">
              <div className="flex items-center gap-3 p-3 bg-muted/30 border-b border-border">
                <div className="flex-1"><p className="text-sm font-medium">Plano Enterprise</p></div>
                <div className="w-24"><Input className="h-8 rounded-sm text-right font-mono" defaultValue="12000.00" /></div>
                <div className="w-16"><Input className="h-8 rounded-sm text-center font-mono" type="number" defaultValue="1" /></div>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm"><Trash2 className="w-4 h-4 text-muted-foreground" /></Button>
              </div>
              <div className="p-2 bg-muted/10">
                <Button variant="ghost" size="sm" className="w-full text-muted-foreground rounded-sm h-8 text-xs"><Plus className="w-3 h-3 mr-2" />Adicionar Item</Button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Vencimento</Label>
              <Input type="date" className="rounded-sm font-mono" defaultValue="2026-04-30" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Desconto (R$)</Label>
              <Input placeholder="0,00" className="rounded-sm font-mono text-right" />
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-y border-border mt-6">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Total</span>
            <span className="text-2xl font-mono tracking-tight">R$ 12.000,00</span>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Notas Internas</Label>
            <Textarea className="rounded-sm min-h-[80px]" placeholder="Visível apenas para a equipe" />
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={() => setStep(2)} className="rounded-sm px-8" data-testid="button-next-step">Próximo</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Frequência</Label>
              <Select defaultValue="mensal">
                <SelectTrigger className="rounded-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Início</Label>
                <Input type="date" className="rounded-sm font-mono" defaultValue="2026-05-01" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Término (Opcional)</Label>
                <Input type="date" className="rounded-sm font-mono" />
              </div>
            </div>
          </div>
          <div className="flex justify-between pt-6 border-t border-border">
            <Button variant="outline" onClick={() => setStep(1)} className="rounded-sm">Voltar</Button>
            <Button onClick={() => setStep(3)} className="rounded-sm px-8">Próximo</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <p className="text-sm text-muted-foreground">Selecione as formas de pagamento que o cliente poderá utilizar.</p>
          
          <div className="space-y-3">
            {[
              { id: "pix", name: "PIX", icon: QrCode, desc: "Aprovação instantânea, taxa zero" },
              { id: "cc", name: "Cartão de Crédito", icon: CreditCard, desc: "D+30, taxa 2.99%" },
              { id: "boleto", name: "Boleto Bancário", icon: FileText, desc: "D+1, taxa fixa R$ 2,50" },
            ].map(method => (
              <label key={method.id} className="flex items-start gap-4 p-4 border border-border rounded-sm cursor-pointer hover:bg-muted/30 transition-colors [&:has(:checked)]:border-accent [&:has(:checked)]:bg-accent/5">
                <div className="mt-0.5">
                  <input type="checkbox" className="w-4 h-4 rounded-sm border-border text-accent focus:ring-accent" defaultChecked />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <method.icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{method.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{method.desc}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-between pt-6 border-t border-border">
            <Button variant="outline" onClick={() => setStep(2)} className="rounded-sm">Voltar</Button>
            <Button className="rounded-sm px-8 bg-accent hover:bg-accent/90 text-accent-foreground" data-testid="button-create-charge">Gerar Cobrança</Button>
          </div>
        </div>
      )}
    </div>
  );
}
