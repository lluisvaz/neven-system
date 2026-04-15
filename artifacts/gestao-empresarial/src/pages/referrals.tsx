import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, TrendingUp, DollarSign, Link2, Copy, Share2 } from "lucide-react";

const stats = [
  { title: "Indicações Totais", value: "124", icon: Users, color: "text-blue-500" },
  { title: "Conversões", value: "31", icon: TrendingUp, color: "text-emerald-500" },
  { title: "Taxa de Conversão", value: "25%", icon: TrendingUp, color: "text-amber-500" },
  { title: "Receita Gerada", value: "R$ 186.000", icon: DollarSign, color: "text-purple-500" },
];

const referrals = [
  { referrer: "João Silva", referrerCompany: "Tech Solutions Ltda", referred: "Marcos Ferreira", referredCompany: "LogiTech BR", date: "08/04/2026", status: "Convertido", value: "R$ 9.600/mês", reward: "R$ 960,00" },
  { referrer: "Fernanda Souza", referrerCompany: "Criativa Design", referred: "Ana Oliveira", referredCompany: "Nexus Digital", date: "15/03/2026", status: "Convertido", value: "R$ 5.200/mês", reward: "R$ 520,00" },
  { referrer: "João Silva", referrerCompany: "Tech Solutions Ltda", referred: "Pedro Costa", referredCompany: "Innovare Consultoria", date: "01/04/2026", status: "Em qualificação", value: "-", reward: "-" },
  { referrer: "Marcos Ferreira", referrerCompany: "LogiTech BR", referred: "Laura Santos", referredCompany: "EduTech Brasil", date: "12/04/2026", status: "Aguardando contato", value: "-", reward: "-" },
  { referrer: "Juliana Martins", referrerCompany: "Saúde+ Clínicas", referred: "Roberto Andrade", referredCompany: "Pharma Plus", date: "10/04/2026", status: "Descartado", value: "-", reward: "-" },
];

const statusBadge: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Convertido: "default", "Em qualificação": "secondary", "Aguardando contato": "outline", Descartado: "destructive"
};

export function ReferralsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold tracking-tight">Programa de Indicações</h1><p className="text-muted-foreground mt-1">Gerencie indicações e recompensas</p></div>
        <Button size="sm"><Share2 className="w-4 h-4 mr-2" />Enviar Convite</Button>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-4 flex items-center justify-between">
          <div><p className="text-sm font-medium">Link de Indicação</p><p className="text-xs text-muted-foreground mt-1">Compartilhe com seus clientes para gerar novas indicações</p></div>
          <div className="flex items-center gap-2">
            <Input value="https://gestorpro.com.br/ref/GP-CORP-2026" readOnly className="w-80 text-xs" />
            <Button variant="outline" size="icon"><Copy className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}><CardContent className="pt-4 flex items-center gap-3"><div className={`p-2 rounded-lg bg-muted ${stat.color}`}><stat.icon className="w-5 h-5" /></div><div><p className="text-xs text-muted-foreground">{stat.title}</p><p className="text-xl font-bold">{stat.value}</p></div></CardContent></Card>
        ))}
      </div>

      <Card><CardHeader><CardTitle>Indicações Recentes</CardTitle></CardHeader><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Indicador</TableHead><TableHead>Indicado</TableHead><TableHead>Data</TableHead><TableHead>Status</TableHead><TableHead>Valor Contrato</TableHead><TableHead>Recompensa</TableHead></TableRow></TableHeader>
          <TableBody>
            {referrals.map((r, i) => (
              <TableRow key={i}>
                <TableCell><div><p className="text-sm font-medium">{r.referrer}</p><p className="text-xs text-muted-foreground">{r.referrerCompany}</p></div></TableCell>
                <TableCell><div><p className="text-sm font-medium">{r.referred}</p><p className="text-xs text-muted-foreground">{r.referredCompany}</p></div></TableCell>
                <TableCell className="text-sm">{r.date}</TableCell>
                <TableCell><Badge variant={statusBadge[r.status]}>{r.status}</Badge></TableCell>
                <TableCell className="text-sm font-medium">{r.value}</TableCell>
                <TableCell className="text-sm font-medium text-emerald-600">{r.reward}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
