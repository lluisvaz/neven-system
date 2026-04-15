import { ThumbsUp, ThumbsDown, Minus, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";

const npsHistory = [
  { month: "Jan", score: 62 }, { month: "Fev", score: 65 }, { month: "Mar", score: 68 },
  { month: "Abr", score: 72 }, { month: "Mai", score: 70 }, { month: "Jun", score: 72 },
];

const distribution = [
  { range: "Detratores (0-6)", count: 8, color: "hsl(var(--destructive))" },
  { range: "Neutros (7-8)", count: 12, color: "hsl(var(--muted-foreground))" },
  { range: "Promotores (9-10)", count: 38, color: "hsl(var(--accent))" },
];

const recentResponses = [
  { client: "Tech Solutions Ltda", contact: "João Silva", score: 10, comment: "Excelente plataforma! Transformou nossa gestão. O módulo de relatórios é muito intuitivo.", date: "14/04/2026" },
  { client: "Nexus Digital", contact: "Ana Oliveira", score: 9, comment: "Muito satisfeita com o suporte e a evolução do produto. Tivemos uma implantação super rápida.", date: "12/04/2026" },
  { client: "LogiTech BR", contact: "Marcos Ferreira", score: 7, comment: "Bom produto, mas poderia ter mais relatórios customizáveis no pacote base.", date: "10/04/2026" },
  { client: "Innovare Consultoria", contact: "Pedro Costa", score: 5, comment: "Tivemos problemas de performance no módulo ERP no fechamento do mês. Esperamos melhorias.", date: "08/04/2026" },
  { client: "Saúde+ Clínicas", contact: "Juliana Martins", score: 9, comment: "Atendeu todas as nossas expectativas de organização financeira. Recomendo fortemente!", date: "05/04/2026" },
];

function getScoreColor(score: number) {
  if (score >= 9) return "text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50";
  if (score >= 7) return "text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50";
  return "text-destructive bg-destructive/10 border-destructive/20";
}

export function NpsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">NPS</h1>
        <p className="text-sm font-mono text-muted-foreground mt-1">Net Promoter Score e Satisfação</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 border border-border rounded-sm bg-card p-8 flex flex-col items-center justify-center text-center">
          <p className="text-sm uppercase tracking-wider font-medium text-muted-foreground mb-4">Score Atual</p>
          <p className="text-6xl font-mono font-bold text-accent tracking-tighter">72</p>
          <div className="flex items-center justify-center gap-1 mt-4 text-xs font-mono text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-sm border border-emerald-200 dark:border-emerald-800/50">
            <TrendingUp className="w-3.5 h-3.5" />+4 pontos vs mês anterior
          </div>
        </div>

        <div className="md:col-span-8 border border-border rounded-sm bg-card divide-y divide-border flex flex-col">
          <div className="p-5 flex items-center justify-between flex-1">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center border border-accent/20">
                <ThumbsUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground">Promotores (9-10)</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-mono font-bold">65%</p>
                  <p className="text-xs font-mono text-muted-foreground">38 respostas</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-5 flex items-center justify-between flex-1">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center border border-border">
                <Minus className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground">Neutros (7-8)</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-mono font-bold">21%</p>
                  <p className="text-xs font-mono text-muted-foreground">12 respostas</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-5 flex items-center justify-between flex-1">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-destructive/10 flex items-center justify-center border border-destructive/20">
                <ThumbsDown className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground">Detratores (0-6)</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-mono font-bold">14%</p>
                  <p className="text-xs font-mono text-muted-foreground">8 respostas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Evolução Histórica</h2>
          <div className="h-[250px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={npsHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} dy={10} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '2px', border: '1px solid hsl(var(--border))', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
                  cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Line type="monotone" dataKey="score" name="Score" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Distribuição</h2>
          <div className="h-[250px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribution} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} />
                <YAxis type="category" dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontFamily: 'var(--font-mono)', fill: 'hsl(var(--muted-foreground))' }} width={120} />
                <Tooltip 
                  contentStyle={{ borderRadius: '2px', border: '1px solid hsl(var(--border))', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
                  cursor={{ fill: 'hsl(var(--muted))' }}
                />
                <Bar dataKey="count" name="Respostas" radius={[0, 2, 2, 0]} barSize={32}>
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Respostas Recentes</h2>
        <div className="border border-border rounded-sm bg-card divide-y divide-border">
          {recentResponses.map((r, i) => (
            <div key={i} className="p-5 flex gap-5 hover:bg-muted/20 transition-colors">
              <div className={`w-12 h-12 rounded-sm border flex items-center justify-center flex-shrink-0 ${getScoreColor(r.score)}`}>
                <span className="text-lg font-mono font-bold tracking-tighter">{r.score}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{r.contact}</span>
                    <span className="text-xs text-muted-foreground px-1">•</span>
                    <span className="text-xs font-mono text-muted-foreground">{r.client}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{r.date}</span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">{r.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
