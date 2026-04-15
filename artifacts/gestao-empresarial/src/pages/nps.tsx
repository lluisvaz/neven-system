import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ThumbsUp, ThumbsDown, Minus, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, Cell } from "recharts";

const npsHistory = [
  { month: "Jan", score: 62 }, { month: "Fev", score: 65 }, { month: "Mar", score: 68 },
  { month: "Abr", score: 72 }, { month: "Mai", score: 70 }, { month: "Jun", score: 72 },
];

const distribution = [
  { range: "0-6", count: 8, label: "Detratores", color: "#ef4444" },
  { range: "7-8", count: 12, label: "Neutros", color: "#eab308" },
  { range: "9-10", count: 38, label: "Promotores", color: "#22c55e" },
];

const recentResponses = [
  { client: "Tech Solutions Ltda", contact: "João Silva", score: 10, comment: "Excelente plataforma! Transformou nossa gestão.", date: "14/04/2026" },
  { client: "Nexus Digital", contact: "Ana Oliveira", score: 9, comment: "Muito satisfeita com o suporte e a evolução do produto.", date: "12/04/2026" },
  { client: "LogiTech BR", contact: "Marcos Ferreira", score: 7, comment: "Bom produto, mas poderia ter mais relatórios customizáveis.", date: "10/04/2026" },
  { client: "Innovare Consultoria", contact: "Pedro Costa", score: 5, comment: "Tivemos problemas de performance no módulo ERP. Esperamos melhorias.", date: "08/04/2026" },
  { client: "Saúde+ Clínicas", contact: "Juliana Martins", score: 9, comment: "Atendeu todas as nossas expectativas. Recomendo!", date: "05/04/2026" },
];

function getScoreColor(score: number) {
  if (score >= 9) return "text-emerald-600";
  if (score >= 7) return "text-amber-600";
  return "text-red-600";
}

export function NpsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">NPS - Net Promoter Score</h1><p className="text-muted-foreground mt-1">Acompanhe a satisfação dos seus clientes</p></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1"><CardContent className="pt-6 text-center">
          <p className="text-5xl font-bold text-emerald-600">72</p>
          <p className="text-sm text-muted-foreground mt-2">NPS Atual</p>
          <div className="flex items-center justify-center gap-1 mt-1 text-xs text-emerald-600"><TrendingUp className="w-3 h-3" />+4 vs mês anterior</div>
        </CardContent></Card>

        <Card><CardContent className="pt-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-50"><ThumbsUp className="w-5 h-5 text-emerald-600" /></div>
          <div><p className="text-xs text-muted-foreground">Promotores (9-10)</p><p className="text-2xl font-bold">65%</p><p className="text-xs text-muted-foreground">38 respostas</p></div>
        </CardContent></Card>

        <Card><CardContent className="pt-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-50"><Minus className="w-5 h-5 text-amber-600" /></div>
          <div><p className="text-xs text-muted-foreground">Neutros (7-8)</p><p className="text-2xl font-bold">21%</p><p className="text-xs text-muted-foreground">12 respostas</p></div>
        </CardContent></Card>

        <Card><CardContent className="pt-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-50"><ThumbsDown className="w-5 h-5 text-red-600" /></div>
          <div><p className="text-xs text-muted-foreground">Detratores (0-6)</p><p className="text-2xl font-bold">14%</p><p className="text-xs text-muted-foreground">8 respostas</p></div>
        </CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle>Evolução NPS</CardTitle></CardHeader><CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={npsHistory}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} /><YAxis domain={[0, 100]} axisLine={false} tickLine={false} /><Tooltip /><Line type="monotone" dataKey="score" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 4 }} /></LineChart>
          </ResponsiveContainer>
        </CardContent></Card>

        <Card><CardHeader><CardTitle>Distribuição de Respostas</CardTitle></CardHeader><CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distribution}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="label" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip /><Bar dataKey="count" radius={[4,4,0,0]}>{distribution.map((d, i) => <Cell key={i} fill={d.color} />)}</Bar></BarChart>
          </ResponsiveContainer>
        </CardContent></Card>
      </div>

      <Card><CardHeader><CardTitle>Respostas Recentes</CardTitle></CardHeader><CardContent className="space-y-4">
        {recentResponses.map((r, i) => (
          <div key={i} className="flex gap-4 pb-4 border-b last:border-0">
            <div className={`text-2xl font-bold w-12 text-center ${getScoreColor(r.score)}`}>{r.score}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2"><p className="text-sm font-medium">{r.contact}</p><span className="text-xs text-muted-foreground">{r.client}</span></div>
              <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>
              <p className="text-xs text-muted-foreground mt-1">{r.date}</p>
            </div>
          </div>
        ))}
      </CardContent></Card>
    </div>
  );
}
