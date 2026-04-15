import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Search, Filter } from "lucide-react";

const products = [
  { sku: "PLN-BAS", name: "Plano Básico", type: "Assinatura Recorrente", price: "R$ 1.800,00", unit: "Mês", recurrence: "Mensal", active: true },
  { sku: "PLN-PRO", name: "Plano Pro", type: "Assinatura Recorrente", price: "R$ 5.200,00", unit: "Mês", recurrence: "Mensal", active: true },
  { sku: "PLN-ENT", name: "Plano Enterprise", type: "Assinatura Recorrente", price: "R$ 12.000,00", unit: "Mês", recurrence: "Mensal", active: true },
  { sku: "SRV-SET", name: "Setup e Implantação", type: "Serviço Avulso", price: "R$ 4.000,00", unit: "Unidade", recurrence: "-", active: true },
  { sku: "SRV-CON", name: "Consultoria Técnica", type: "Serviço Avulso", price: "R$ 350,00", unit: "Hora", recurrence: "-", active: true },
  { sku: "MOD-ANA", name: "Módulo Analytics", type: "Assinatura Recorrente", price: "R$ 3.500,00", unit: "Mês", recurrence: "Mensal", active: true },
  { sku: "MOD-API", name: "API Avançada", type: "Assinatura Recorrente", price: "R$ 2.000,00", unit: "Mês", recurrence: "Mensal", active: false },
  { sku: "TRN-ONL", name: "Treinamento Online", type: "Produto Digital", price: "R$ 800,00", unit: "Unidade", recurrence: "-", active: true },
];

const typeColors: Record<string, "default" | "secondary" | "outline"> = { 
  "Assinatura Recorrente": "default", 
  "Serviço Avulso": "secondary", 
  "Produto Digital": "outline" 
};

export function ProductsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Catálogo</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">{products.length} produtos e serviços</p>
        </div>
        <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Novo Item</Button>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar por SKU, nome..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" data-testid="input-search-products" />
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-24">SKU</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Nome</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Tipo</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Preço</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Unidade</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Recorrência</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-center w-24">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(p => (
              <TableRow key={p.sku} className={`hover:bg-muted/30 transition-colors ${!p.active ? "opacity-50" : ""}`}>
                <TableCell className="text-sm font-mono py-3 text-muted-foreground">{p.sku}</TableCell>
                <TableCell className="py-3 font-medium text-sm">{p.name}</TableCell>
                <TableCell className="py-3">
                  <Badge variant={typeColors[p.type]} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                    {p.type}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-sm font-mono font-medium text-right">{p.price}</TableCell>
                <TableCell className="py-3 text-sm text-muted-foreground">{p.unit}</TableCell>
                <TableCell className="py-3 text-sm text-muted-foreground">{p.recurrence}</TableCell>
                <TableCell className="py-3 text-center">
                  <div className="flex justify-center">
                    <Switch checked={p.active} data-testid={`switch-product-${p.sku}`} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
