import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Filter } from "lucide-react";

const inventory = [
  { sku: "HW-SRV-01", name: "Servidor Dell PowerEdge R750", stock: 3, min: 2, location: "Depósito SP", lastMove: "10/04/2026", status: "Normal" },
  { sku: "HW-NOT-01", name: "Notebook ThinkPad X1 Carbon", stock: 1, min: 3, location: "Depósito SP", lastMove: "08/04/2026", status: "Baixo" },
  { sku: "HW-MON-01", name: "Monitor Dell 27'' 4K", stock: 8, min: 5, location: "Depósito SP", lastMove: "12/04/2026", status: "Normal" },
  { sku: "HW-TEC-01", name: "Teclado Mecânico Logitech MX", stock: 15, min: 10, location: "Depósito RJ", lastMove: "05/04/2026", status: "Normal" },
  { sku: "HW-MOU-01", name: "Mouse Logitech MX Master", stock: 0, min: 5, location: "Depósito SP", lastMove: "14/04/2026", status: "Esgotado" },
  { sku: "SW-LIC-01", name: "Licença Windows 11 Pro", stock: 42, min: 10, location: "Digital", lastMove: "15/04/2026", status: "Normal" },
];

const statusBadge: Record<string, "default" | "secondary" | "destructive"> = { 
  Normal: "default", 
  Baixo: "secondary", 
  Esgotado: "destructive" 
};

export function InventoryPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Estoque</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">{inventory.length} itens controlados</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-sm">Histórico</Button>
          <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Movimentar</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 py-4 border-y border-border">
        <div className="flex flex-col space-y-1">
          <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">Total de SKUs</span>
          <span className="text-2xl font-mono text-foreground">{inventory.length}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-xs uppercase tracking-wider font-medium text-amber-600">Estoque Baixo</span>
          <span className="text-2xl font-mono text-foreground">{inventory.filter(i => i.status === "Baixo").length}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-xs uppercase tracking-wider font-medium text-destructive">Esgotado</span>
          <span className="text-2xl font-mono text-foreground">{inventory.filter(i => i.status === "Esgotado").length}</span>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar SKU, produto..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" data-testid="input-search-inventory" />
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-32">SKU</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Produto</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right w-24">Saldo</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-32">Nível</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Localização</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map(item => (
              <TableRow key={item.sku} className={`hover:bg-muted/30 transition-colors ${item.status === 'Esgotado' ? 'opacity-70' : ''}`}>
                <TableCell className="text-sm font-mono py-3 text-muted-foreground">{item.sku}</TableCell>
                <TableCell className="py-3 font-medium text-sm">{item.name}</TableCell>
                <TableCell className="py-3 text-sm font-mono font-bold text-right">{item.stock}</TableCell>
                <TableCell className="py-3">
                  <div className="flex flex-col gap-1.5">
                    <Progress value={Math.min((item.stock / (item.min * 3)) * 100, 100)} className={`h-1.5 ${item.status === 'Esgotado' ? '[&>div]:bg-destructive' : item.status === 'Baixo' ? '[&>div]:bg-amber-500' : ''}`} />
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">Min: {item.min}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-sm text-muted-foreground">{item.location}</TableCell>
                <TableCell className="py-3 text-right">
                  <Badge variant={statusBadge[item.status]} className={`rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 ${item.status === 'Baixo' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200 dark:bg-amber-900/30 dark:text-amber-500 dark:border-amber-800/50' : ''}`}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
