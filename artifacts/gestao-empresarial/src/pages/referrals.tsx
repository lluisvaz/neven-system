import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, TrendingUp, DollarSign, Copy, Share2, ArrowRight } from "lucide-react";

const stats = [
  { title: "Indicações Totais", value: "124", icon: Users },
  { title: "Conversões", value: "31", icon: TrendingUp },
  { title: "Taxa de Conversão", value: "25%", icon: TrendingUp },
  { title: "Receita Gerada", value: "R$ 186.000", icon: DollarSign },
];

const referrals = [
  { id: 1, referrer: "João Silva", referrerCompany: "Tech Solutions Ltda", referred: "Marcos Ferreira", referredCompany: "LogiTech BR", date: "08/04/2026", status: "Convertido", value: "R$ 9.600", reward: "R$ 960,00" },
  { id: 2, referrer: "Fernanda Souza", referrerCompany: "Criativa Design", referred: "Ana Oliveira", referredCompany: "Nexus Digital", date: "15/03/2026", status: "Convertido", value: "R$ 5.200", reward: "R$ 520,00" },
  { id: 3, referrer: "João Silva", referrerCompany: "Tech Solutions Ltda", referred: "Pedro Costa", referredCompany: "Innovare Consultoria", date: "01/04/2026", status: "Em qualificação", value: "-", reward: "-" },
  { id: 4, referrer: "Marcos Ferreira", referrerCompany: "LogiTech BR", referred: "Laura Santos", referredCompany: "EduTech Brasil", date: "12/04/2026", status: "Aguardando", value: "-", reward: "-" },
  { id: 5, referrer: "Juliana Martins", referrerCompany: "Saúde+ Clínicas", referred: "Roberto Andrade", referredCompany: "Pharma Plus", date: "10/04/2026", status: "Descartado", value: "-", reward: "-" },
];

const statusBadge: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Convertido: "default", 
  "Em qualificação": "secondary", 
  "Aguardando": "outline", 
  Descartado: "destructive"
};

export function ReferralsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Programa de Indicações</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Gerencie links e comissionamento</p>
        </div>
        <Button size="sm" className="rounded-sm"><Share2 className="w-3.5 h-3.5 mr-2" />Novo Convite</Button>
      </div>

      <div className="border border-border rounded-sm bg-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Link Global da Empresa</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm">Compartilhe este link para receber indicações sem vincular a um parceiro específico.</p>
        </div>
        <div className="flex items-center gap-2 max-w-md w-full">
          <Input value="https://gestorpro.com.br/ref/GP-CORP-2026" readOnly className="font-mono text-xs rounded-sm bg-muted/50" />
          <Button variant="outline" size="icon" className="rounded-sm flex-shrink-0 w-9 h-9"><Copy className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-y border-border">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col space-y-1">
            <div className="flex items-center text-muted-foreground gap-2">
              <stat.icon className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-medium">{stat.title}</span>
            </div>
            <span className="text-2xl font-mono text-foreground">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Histórico de Indicações</h2>
        
        <div className="border border-border rounded-sm overflow-hidden bg-card">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Quem Indicou</TableHead>
                <TableHead className="w-8"></TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Empresa Indicada</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Data</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-center">Status</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Contrato</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Comissão</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.map((r) => (
                <TableRow key={r.id} className={`hover:bg-muted/30 transition-colors ${r.status === 'Descartado' ? 'opacity-60' : ''}`}>
                  <TableCell className="py-3">
                    <div className="text-sm font-medium">{r.referrer}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{r.referrerCompany}</div>
                  </TableCell>
                  <TableCell className="py-3 text-muted-foreground/30">
                    <ArrowRight className="w-4 h-4" />
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="text-sm font-medium">{r.referredCompany}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">A/C: {r.referred}</div>
                  </TableCell>
                  <TableCell className="py-3 text-sm font-mono text-muted-foreground">{r.date}</TableCell>
                  <TableCell className="py-3 text-center">
                    <Badge variant={statusBadge[r.status]} className={`rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 ${r.status === 'Convertido' ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}`}>
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-sm font-mono text-right text-muted-foreground">{r.value}</TableCell>
                  <TableCell className="py-3 text-sm font-mono font-medium text-right text-foreground">{r.reward}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
