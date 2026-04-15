import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquare, Mail, CheckSquare, Plus, Phone, FileText, DollarSign, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const contact = {
  id: "1", name: "João Silva", company: "Tech Solutions Ltda", cargo: "Diretor de Tecnologia",
  email: "joao@techsolutions.com.br", phone: "+55 11 99887-6655", cpf: "123.456.789-00",
  status: "Cliente Ativo", responsible: "Maria Santos", score: 85,
  address: "Rua Augusta, 1500, Sala 301 - Consolação, São Paulo - SP, 01304-001",
  origin: "Indicação", tags: ["Enterprise", "Tecnologia", "Upsell"],
  nextActivity: { type: "Reunião de Follow-up", date: "18/04/2026", time: "14:00" },
};

const timeline = [
  { id: 1, type: "email", title: "E-mail enviado: Proposta Comercial v2", date: "14/04/2026", time: "10:32", author: "Maria Santos" },
  { id: 2, type: "note", title: "Nota adicionada: Cliente demonstrou interesse no plano Enterprise", date: "12/04/2026", time: "16:15", author: "Maria Santos" },
  { id: 3, type: "call", title: "Ligação realizada - 12min - Contato feito", date: "10/04/2026", time: "11:00", author: "Carlos Lima" },
  { id: 4, type: "status", title: "Status alterado: Prospect → Cliente Ativo", date: "08/04/2026", time: "09:45", author: "Sistema" },
  { id: 5, type: "task", title: "Tarefa concluída: Enviar documentação técnica", date: "05/04/2026", time: "14:20", author: "Maria Santos" },
];

const opportunities = [
  { id: 1, title: "Upgrade Plano Enterprise", value: "R$ 12.000/mês", stage: "Negociação", probability: "70%" },
  { id: 2, title: "Módulo Analytics Adicional", value: "R$ 3.500/mês", stage: "Proposta", probability: "50%" },
];

const tasks = [
  { id: 1, title: "Follow-up pós reunião", responsible: "Maria Santos", due: "18/04/2026", priority: "P1", done: false },
  { id: 2, title: "Enviar case studies", responsible: "Carlos Lima", due: "20/04/2026", priority: "P2", done: false },
  { id: 3, title: "Reunião de kick-off", responsible: "Maria Santos", due: "10/04/2026", priority: "P1", done: true },
];

const billings = [
  { id: "FAT-0041", date: "01/04/2026", value: "R$ 8.500,00", status: "Pago", method: "Cartão de Crédito" },
  { id: "FAT-0038", date: "01/03/2026", value: "R$ 8.500,00", status: "Pago", method: "PIX" },
  { id: "FAT-0035", date: "01/02/2026", value: "R$ 7.200,00", status: "Pago", method: "Boleto" },
];

const iconMap: Record<string, typeof Mail> = { email: Mail, note: FileText, call: Phone, status: CheckSquare, task: CheckSquare };

export function ContactDetailPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 border-b border-border pb-6">
        <Link href="/crm/contacts"><Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 rounded-sm">
            <AvatarFallback className="text-sm font-mono bg-secondary text-secondary-foreground rounded-sm">
              {contact.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{contact.name}</h1>
            <p className="text-sm text-muted-foreground">{contact.cargo} em <Link href="#" className="text-foreground hover:text-accent transition-colors">{contact.company}</Link></p>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" className="rounded-sm"><MessageSquare className="w-3.5 h-3.5 mr-2" />WhatsApp</Button>
          <Button variant="outline" size="sm" className="rounded-sm"><Mail className="w-3.5 h-3.5 mr-2" />E-mail</Button>
          <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Nova Tarefa</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="space-y-4 border border-border p-4 rounded-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sobre o Contato</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <Badge variant="default" className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 mt-1">{contact.status}</Badge>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground">Score de Engajamento</p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={contact.score} className="h-1.5 flex-1" />
                  <span className="text-xs font-mono">{contact.score}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">E-mail</p>
                <p className="text-sm">{contact.email}</p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">Telefone</p>
                <p className="text-sm font-mono">{contact.phone}</p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">Responsável</p>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="w-5 h-5 rounded-sm"><AvatarFallback className="text-[8px] bg-secondary text-secondary-foreground rounded-sm">{contact.responsible.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                  <p className="text-sm">{contact.responsible}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1.5">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {contact.tags.map(t => <Badge key={t} variant="secondary" className="rounded-sm text-[10px] uppercase tracking-wider">{t}</Badge>)}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 border border-border p-4 rounded-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Próxima Ação</h3>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center mt-0.5">
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{contact.nextActivity.type}</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">{contact.nextActivity.date} às {contact.nextActivity.time}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-9">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0 space-x-6 mb-6">
              {['Timeline', 'Oportunidades', 'Tarefas', 'Cobranças'].map(tab => (
                <TabsTrigger 
                  key={tab}
                  value={tab.toLowerCase()} 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-0 pb-2 text-sm uppercase tracking-wider font-medium text-muted-foreground data-[state=active]:text-foreground"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="timeline" className="space-y-0 mt-0">
              {timeline.map((item) => {
                const Icon = iconMap[item.type] || FileText;
                return (
                  <div key={item.id} className="flex gap-4 py-4 border-b border-border hover:bg-muted/30 transition-colors px-2 -mx-2 rounded-sm group">
                    <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{item.author}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-mono text-muted-foreground">{item.date}</span>
                      <span className="text-xs font-mono text-muted-foreground">{item.time}</span>
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="oportunidades" className="space-y-4 mt-0">
              <div className="flex justify-end mb-4">
                <Button size="sm" variant="outline" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Nova Oportunidade</Button>
              </div>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Oportunidade</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Valor</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Fase</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Probabilidade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities.map((opp) => (
                    <TableRow key={opp.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
                      <TableCell className="py-3 font-medium text-sm">{opp.title}</TableCell>
                      <TableCell className="py-3 font-mono text-sm">{opp.value}</TableCell>
                      <TableCell className="py-3">
                        <Badge variant="outline" className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">{opp.stage}</Badge>
                      </TableCell>
                      <TableCell className="py-3 text-right font-mono text-sm text-muted-foreground">{opp.probability}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="tarefas" className="space-y-4 mt-0">
              <div className="flex justify-end mb-4">
                <Button size="sm" variant="outline" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Nova Tarefa</Button>
              </div>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-8"></TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Tarefa</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Responsável</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Vencimento</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Prioridade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((t) => (
                    <TableRow key={t.id} className={`hover:bg-muted/30 transition-colors ${t.done ? 'opacity-60' : ''}`}>
                      <TableCell className="py-3"><CheckSquare className={`w-4 h-4 ${t.done ? 'text-accent' : 'text-muted-foreground'}`} /></TableCell>
                      <TableCell className={`py-3 text-sm font-medium ${t.done ? 'line-through text-muted-foreground' : ''}`}>{t.title}</TableCell>
                      <TableCell className="py-3 text-sm text-muted-foreground">{t.responsible}</TableCell>
                      <TableCell className="py-3 text-sm font-mono text-muted-foreground">{t.due}</TableCell>
                      <TableCell className="py-3 text-right">
                        <Badge variant={t.priority === 'P1' ? 'destructive' : 'outline'} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">{t.priority}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="cobranças" className="space-y-4 mt-0">
               <div className="flex justify-end mb-4">
                <Button size="sm" variant="outline" className="rounded-sm"><DollarSign className="w-3.5 h-3.5 mr-2" />Nova Fatura</Button>
              </div>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">ID</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Data</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Valor</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Método</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billings.map((b) => (
                    <TableRow key={b.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="py-3 font-mono text-sm text-muted-foreground">{b.id}</TableCell>
                      <TableCell className="py-3 font-mono text-sm">{b.date}</TableCell>
                      <TableCell className="py-3 font-mono text-sm font-medium">{b.value}</TableCell>
                      <TableCell className="py-3 text-sm text-muted-foreground">{b.method}</TableCell>
                      <TableCell className="py-3 text-right">
                        <Badge variant={b.status === "Pago" ? "default" : "secondary"} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">{b.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}
