import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, CreditCard, QrCode, FileText, Zap, Building, Globe } from "lucide-react";
import { GATEWAY_META, COUNTRIES, type Gateway } from "@/lib/client-config";

const mockClients = [
  { name: "Tech Solutions Ltda", gateway: "asaas" as Gateway, currency: "BRL", currencySymbol: "R$", country: "BR", methods: ["PIX", "Boleto Bancário", "Cartão de Crédito"] },
  { name: "Nexus Digital", gateway: "asaas" as Gateway, currency: "BRL", currencySymbol: "R$", country: "BR", methods: ["PIX", "Boleto Bancário", "Cartão de Crédito"] },
  { name: "Acme Corp", gateway: "stripe" as Gateway, currency: "USD", currencySymbol: "$", country: "US", methods: ["Credit Card", "ACH / Bank Transfer", "Wire Transfer"] },
  { name: "Innovare Consultoria", gateway: "asaas" as Gateway, currency: "BRL", currencySymbol: "R$", country: "BR", methods: ["PIX", "Boleto Bancário", "Cartão de Crédito"] },
];

const methodIcons: Record<string, React.ElementType> = {
  "PIX": QrCode,
  "Boleto Bancário": FileText,
  "Cartão de Crédito": CreditCard,
  "Cartão de Débito": CreditCard,
  "Credit Card": CreditCard,
  "ACH / Bank Transfer": Building,
  "Wire Transfer": Globe,
};

export function NewChargePage() {
  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState(mockClients[0]);

  const gMeta = GATEWAY_META[selectedClient.gateway];

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Nova Cobrança</h1>
        <p className="text-sm font-mono text-muted-foreground mt-1">Gerar fatura ou link de pagamento</p>
      </div>

      <div className="flex items-center gap-2 border-b border-border pb-4">
        {[1, 2, 3].map((s, i) => (
          <div key={s} className="flex items-center">
            <span className={`text-xs font-mono uppercase tracking-wider ${step >= s ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              {s}. {s === 1 ? "Dados" : s === 2 ? "Recorrência" : "Pagamento"}
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
              <Select value={selectedClient.name} onValueChange={v => setSelectedClient(mockClients.find(c => c.name === v) ?? mockClients[0])}>
                <SelectTrigger className="rounded-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockClients.map(c => (
                    <SelectItem key={c.name} value={c.name}>
                      <span className="flex items-center gap-2">
                        <span>{COUNTRIES.find(x => x.code === c.country)?.flag}</span>
                        <span>{c.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${GATEWAY_META[c.gateway].color} ${GATEWAY_META[c.gateway].bgColor} ${GATEWAY_META[c.gateway].borderColor}`}>
                          {GATEWAY_META[c.gateway].label}
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedClient && (
              <div className={`flex items-center gap-3 p-3 rounded-sm border ${gMeta.borderColor} ${gMeta.bgColor}`}>
                <Zap className={`w-4 h-4 flex-shrink-0 ${gMeta.color}`} />
                <div>
                  <p className={`text-xs font-semibold ${gMeta.color}`}>Processando via {gMeta.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{gMeta.description}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Tipo de Cobrança</Label>
              <Select defaultValue="avulsa">
                <SelectTrigger className="rounded-sm"><SelectValue /></SelectTrigger>
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
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground font-mono">{selectedClient.currencySymbol}</span>
                  <Input className="h-8 rounded-sm text-right font-mono w-28" defaultValue="12000.00" />
                </div>
                <Input className="h-8 rounded-sm text-center font-mono w-16" type="number" defaultValue="1" />
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm"><Trash2 className="w-4 h-4 text-muted-foreground" /></Button>
              </div>
              <div className="p-2 bg-muted/10">
                <Button variant="ghost" size="sm" className="w-full text-muted-foreground rounded-sm h-8 text-xs"><Plus className="w-3 h-3 mr-2" />Adicionar Item</Button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Vencimento</Label>
              <Input type="date" className="rounded-sm font-mono" defaultValue="2026-04-30" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Desconto ({selectedClient.currency})</Label>
              <Input placeholder="0,00" className="rounded-sm font-mono text-right" />
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-y border-border mt-6">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Total</span>
            <span className="text-2xl font-mono tracking-tight">{selectedClient.currencySymbol} 12.000,00</span>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Notas Internas</Label>
            <Textarea className="rounded-sm min-h-[80px]" placeholder="Visível apenas para a equipe" />
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={() => setStep(2)} className="rounded-sm px-8">Próximo</Button>
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
          <div className={`flex items-center gap-3 p-3 rounded-sm border ${gMeta.borderColor} ${gMeta.bgColor}`}>
            <Zap className={`w-4 h-4 flex-shrink-0 ${gMeta.color}`} />
            <p className={`text-xs font-semibold ${gMeta.color}`}>
              Métodos de pagamento disponíveis via {gMeta.label} para {selectedClient.name}
            </p>
          </div>

          <p className="text-sm text-muted-foreground">Selecione os métodos que o cliente poderá utilizar nesta cobrança.</p>

          <div className="space-y-3">
            {selectedClient.methods.map(method => {
              const Icon = methodIcons[method] ?? CreditCard;
              return (
                <label key={method} className="flex items-start gap-4 p-4 border border-border rounded-sm cursor-pointer hover:bg-muted/30 transition-colors [&:has(:checked)]:border-accent [&:has(:checked)]:bg-accent/5">
                  <div className="mt-0.5">
                    <input type="checkbox" className="w-4 h-4 rounded-sm border-border text-accent focus:ring-accent" defaultChecked />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{method}</span>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          <div className="flex justify-between pt-6 border-t border-border">
            <Button variant="outline" onClick={() => setStep(2)} className="rounded-sm">Voltar</Button>
            <Button className="rounded-sm px-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              Gerar Cobrança via {gMeta.label}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
