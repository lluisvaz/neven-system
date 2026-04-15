import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Search, Filter } from "lucide-react";

const products = [
  { sku: "PLN-BAS", name: "Plano Básico", type: "Assinatura Recorrente", price: "R$ 1.800,00/mês", unit: "Mês", recurrence: "Mensal", trial: 14, stock: null, active: true },
  { sku: "PLN-PRO", name: "Plano Pro", type: "Assinatura Recorrente", price: "R$ 5.200,00/mês", unit: "Mês", recurrence: "Mensal", trial: 14, stock: null, active: true },
  { sku: "PLN-ENT", name: "Plano Enterprise", type: "Assinatura Recorrente", price: "R$ 12.000,00/mês", unit: "Mês", recurrence: "Mensal", trial: 30, stock: null, active: true },
  { sku: "SRV-SET", name: "Setup e Implantação", type: "Serviço Avulso", price: "R$ 4.000,00", unit: "Un", recurrence: "-", trial: 0, stock: null, active: true },
  { sku: "SRV-CON", name: "Consultoria Técnica", type: "Serviço Avulso", price: "R$ 350,00/hora", unit: "Hora", recurrence: "-", trial: 0, stock: null, active: true },
  { sku: "MOD-ANA", name: "Módulo Analytics", type: "Assinatura Recorrente", price: "R$ 3.500,00/mês", unit: "Mês", recurrence: "Mensal", trial: 7, stock: null, active: true },
  { sku: "MOD-API", name: "API Avançada", type: "Assinatura Recorrente", price: "R$ 2.000,00/mês", unit: "Mês", recurrence: "Mensal", trial: 0, stock: null, active: false },
  { sku: "TRN-ONL", name: "Treinamento Online", type: "Produto Digital", price: "R$ 800,00", unit: "Un", recurrence: "-", trial: 0, stock: null, active: true },
];

const typeColors: Record<string, "default" | "secondary" | "outline"> = { "Assinatura Recorrente": "default", "Serviço Avulso": "secondary", "Produto Digital": "outline" };

export function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos e Serviços</h1>
          <p className="text-muted-foreground mt-1">{products.length} itens no catálogo</p>
        </div>
        <Button size="sm"><Plus className="w-4 h-4 mr-2" />Novo Produto</Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar por nome, SKU..." className="pl-9" data-testid="input-search-products" /></div>
        <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>SKU</TableHead><TableHead>Nome</TableHead><TableHead>Tipo</TableHead><TableHead>Preço</TableHead><TableHead>Unidade</TableHead><TableHead>Recorrência</TableHead><TableHead>Trial</TableHead><TableHead>Ativo</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {products.map(p => (
              <TableRow key={p.sku} className={!p.active ? "opacity-50" : ""}>
                <TableCell className="text-sm font-mono">{p.sku}</TableCell>
                <TableCell className="text-sm font-medium">{p.name}</TableCell>
                <TableCell><Badge variant={typeColors[p.type]} className="text-xs">{p.type}</Badge></TableCell>
                <TableCell className="text-sm font-medium">{p.price}</TableCell>
                <TableCell className="text-sm">{p.unit}</TableCell>
                <TableCell className="text-sm">{p.recurrence}</TableCell>
                <TableCell className="text-sm">{p.trial > 0 ? `${p.trial} dias` : "-"}</TableCell>
                <TableCell><Switch checked={p.active} data-testid={`switch-product-${p.sku}`} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
