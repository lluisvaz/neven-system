import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Package, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";

const inventory = [
  { sku: "HW-SRV-01", name: "Servidor Dell PowerEdge R750", stock: 3, min: 2, location: "Depósito SP", lastMove: "10/04/2026", moveType: "Entrada", status: "Normal" },
  { sku: "HW-NOT-01", name: "Notebook ThinkPad X1 Carbon", stock: 1, min: 3, location: "Depósito SP", lastMove: "08/04/2026", moveType: "Saída", status: "Baixo" },
  { sku: "HW-MON-01", name: "Monitor Dell 27'' 4K", stock: 8, min: 5, location: "Depósito SP", lastMove: "12/04/2026", moveType: "Entrada", status: "Normal" },
  { sku: "HW-TEC-01", name: "Teclado Mecânico Logitech MX", stock: 15, min: 10, location: "Depósito RJ", lastMove: "05/04/2026", moveType: "Saída", status: "Normal" },
  { sku: "HW-MOU-01", name: "Mouse Logitech MX Master", stock: 0, min: 5, location: "Depósito SP", lastMove: "14/04/2026", moveType: "Saída", status: "Esgotado" },
  { sku: "SW-LIC-01", name: "Licença Windows 11 Pro", stock: 42, min: 10, location: "Digital", lastMove: "15/04/2026", moveType: "Saída", status: "Normal" },
];

const statusColors: Record<string, "default" | "secondary" | "destructive"> = { Normal: "default", Baixo: "secondary", Esgotado: "destructive" };

export function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estoque</h1>
          <p className="text-muted-foreground mt-1">Controle de estoque e movimentações</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Inventário</Button>
          <Button size="sm"><Plus className="w-4 h-4 mr-2" />Nova Movimentação</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="pt-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-muted text-blue-500"><Package className="w-5 h-5" /></div><div><p className="text-xs text-muted-foreground">Total de SKUs</p><p className="text-xl font-bold">{inventory.length}</p></div></CardContent></Card>
        <Card><CardContent className="pt-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-muted text-amber-500"><AlertTriangle className="w-5 h-5" /></div><div><p className="text-xs text-muted-foreground">Estoque Baixo</p><p className="text-xl font-bold">{inventory.filter(i => i.status === "Baixo").length}</p></div></CardContent></Card>
        <Card><CardContent className="pt-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-muted text-red-500"><Package className="w-5 h-5" /></div><div><p className="text-xs text-muted-foreground">Esgotado</p><p className="text-xl font-bold">{inventory.filter(i => i.status === "Esgotado").length}</p></div></CardContent></Card>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar por nome, SKU..." className="pl-9" data-testid="input-search-inventory" /></div>
      </div>

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>SKU</TableHead><TableHead>Produto</TableHead><TableHead>Estoque</TableHead><TableHead>Nível</TableHead><TableHead>Localização</TableHead><TableHead>Última Mov.</TableHead><TableHead>Tipo</TableHead><TableHead>Status</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {inventory.map(item => (
              <TableRow key={item.sku}>
                <TableCell className="text-sm font-mono">{item.sku}</TableCell>
                <TableCell className="text-sm font-medium">{item.name}</TableCell>
                <TableCell className="text-sm font-bold">{item.stock}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={Math.min((item.stock / (item.min * 3)) * 100, 100)} className="w-16 h-2" />
                    <span className="text-xs text-muted-foreground">min: {item.min}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{item.location}</TableCell>
                <TableCell className="text-sm">{item.lastMove}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-xs">
                    {item.moveType === "Entrada" ? <ArrowUpRight className="w-3 h-3 text-emerald-500" /> : <ArrowDownRight className="w-3 h-3 text-red-500" />}
                    {item.moveType}
                  </div>
                </TableCell>
                <TableCell><Badge variant={statusColors[item.status]}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
