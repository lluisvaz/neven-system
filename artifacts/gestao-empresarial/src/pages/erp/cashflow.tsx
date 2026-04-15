import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Download, TrendingUp, TrendingDown, Wallet } from "lucide-react";

const cashflowData = [
  { day: "01/04", projected: 320000, actual: 315000 },
  { day: "05/04", projected: 310000, actual: 308000 },
  { day: "10/04", projected: 295000, actual: 290000 },
  { day: "15/04", projected: 340000, actual: 345000 },
  { day: "20/04", projected: 355000, actual: 0 },
  { day: "25/04", projected: 370000, actual: 0 },
  { day: "30/04", projected: 385000, actual: 0 },
];

const entries = [
  { date: "15/04/2026", description: "Recebimento - Tech Solutions", category: "Receita Recorrente", type: "Entrada", value: "R$ 8.500,00" },
  { date: "14/04/2026", description: "Recebimento - Criativa Design", category: "Receita Recorrente", type: "Entrada", value: "R$ 5.200,00" },
  { date: "12/04/2026", description: "Pagamento - AWS Brasil", category: "Infraestrutura", type: "Saída", value: "R$ 12.400,00" },
  { date: "10/04/2026", description: "Recebimento - LogiTech BR", category: "Receita Avulsa", type: "Entrada", value: "R$ 9.120,00" },
  { date: "05/04/2026", description: "Pagamento - Aluguel", category: "Administrativo", type: "Saída", value: "R$ 18.500,00" },
];

export function CashflowPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fluxo de Caixa</h1>
          <p className="text-muted-foreground mt-1">Projeção e realização financeira</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30d"><SelectTrigger className="w-32"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="7d">7 dias</SelectItem><SelectItem value="30d">30 dias</SelectItem><SelectItem value="90d">90 dias</SelectItem></SelectContent></Select>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Exportar PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="pt-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-muted text-blue-500"><Wallet className="w-5 h-5" /></div><div><p className="text-xs text-muted-foreground">Saldo Atual</p><p className="text-xl font-bold">R$ 345.000,00</p></div></CardContent></Card>
        <Card><CardContent className="pt-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-muted text-emerald-500"><TrendingUp className="w-5 h-5" /></div><div><p className="text-xs text-muted-foreground">Entradas Previstas (Abril)</p><p className="text-xl font-bold">R$ 186.400,00</p></div></CardContent></Card>
        <Card><CardContent className="pt-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-muted text-red-500"><TrendingDown className="w-5 h-5" /></div><div><p className="text-xs text-muted-foreground">Saídas Previstas (Abril)</p><p className="text-xl font-bold">R$ 67.300,00</p></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Saldo Projetado vs Realizado</CardTitle></CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cashflowData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={v => `R$${v/1000}k`} />
              <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`} />
              <Legend />
              <Line type="monotone" dataKey="projected" name="Projetado" stroke="hsl(var(--chart-1))" strokeDasharray="5 5" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="actual" name="Realizado" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Movimentações</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Data</TableHead><TableHead>Descrição</TableHead><TableHead>Categoria</TableHead><TableHead>Tipo</TableHead><TableHead className="text-right">Valor</TableHead></TableRow></TableHeader>
            <TableBody>
              {entries.map((e, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm">{e.date}</TableCell>
                  <TableCell className="text-sm font-medium">{e.description}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{e.category}</Badge></TableCell>
                  <TableCell><Badge variant={e.type === "Entrada" ? "default" : "destructive"} className="text-xs">{e.type}</Badge></TableCell>
                  <TableCell className={`text-sm font-medium text-right ${e.type === "Entrada" ? "text-emerald-600" : "text-red-600"}`}>{e.type === "Saída" ? "-" : "+"}{e.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
