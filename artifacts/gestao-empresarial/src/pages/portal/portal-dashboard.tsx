import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, HelpCircle, FileText, TrendingUp } from "lucide-react";
import { Link } from "wouter";

const recentInvoices = [
  { id: "FAT-0041", date: "01/04/2026", value: "R$ 15.500,00", status: "Pago" },
  { id: "FAT-0038", date: "01/03/2026", value: "R$ 15.500,00", status: "Pago" },
  { id: "FAT-0035", date: "01/02/2026", value: "R$ 15.500,00", status: "Pago" },
];

const recentDocuments = [
  { name: "Contrato Anual 2026.pdf", date: "01/01/2026" },
  { name: "NF Março-2026.pdf", date: "01/03/2026" },
];

export function PortalDashboardPage() {
  return (
    <div className="space-y-6">
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold">Bem-vindo, João!</h1>
          <p className="text-sm opacity-80 mt-1">Aqui está o resumo da sua conta na GestorPro.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="pt-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-muted text-blue-500"><CreditCard className="w-5 h-5" /></div><div><p className="text-xs text-muted-foreground">Plano Atual</p><p className="text-lg font-bold">Enterprise</p></div></CardContent></Card>
        <Card><CardContent className="pt-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-muted text-emerald-500"><Calendar className="w-5 h-5" /></div><div><p className="text-xs text-muted-foreground">Próxima Cobrança</p><p className="text-lg font-bold">01/05/2026</p></div></CardContent></Card>
        <Card><CardContent className="pt-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-muted text-amber-500"><HelpCircle className="w-5 h-5" /></div><div><p className="text-xs text-muted-foreground">Chamados Abertos</p><p className="text-lg font-bold">1</p></div></CardContent></Card>
        <Card><CardContent className="pt-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-muted text-purple-500"><TrendingUp className="w-5 h-5" /></div><div><p className="text-xs text-muted-foreground">Valor Mensal</p><p className="text-lg font-bold">R$ 15.500,00</p></div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Últimas Faturas</CardTitle>
            <Link href="/portal/invoices"><Button variant="ghost" size="sm">Ver todas</Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentInvoices.map((inv, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div><p className="text-sm font-medium">{inv.id}</p><p className="text-xs text-muted-foreground">{inv.date}</p></div>
                <div className="text-right"><p className="text-sm font-medium">{inv.value}</p><Badge variant="default" className="text-xs">{inv.status}</Badge></div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Documentos Recentes</CardTitle>
            <Link href="/portal/documents"><Button variant="ghost" size="sm">Ver todos</Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentDocuments.map((doc, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
                <div className="p-2 rounded-lg bg-muted"><FileText className="w-4 h-4 text-muted-foreground" /></div>
                <div className="flex-1"><p className="text-sm font-medium">{doc.name}</p><p className="text-xs text-muted-foreground">{doc.date}</p></div>
                <Button variant="outline" size="sm">Baixar</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
