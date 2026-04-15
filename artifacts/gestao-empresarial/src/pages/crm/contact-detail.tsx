import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Mail, CheckSquare, Plus, Phone, FileText, DollarSign, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const contact = {
  id: "1", name: "João Silva", company: "Tech Solutions Ltda", cargo: "Diretor de Tecnologia",
  email: "joao@techsolutions.com.br", phone: "+55 11 99887-6655", cpf: "123.456.789-00",
  status: "Cliente Ativo", responsible: "Maria Santos", score: 85,
  address: "Rua Augusta, 1500, Sala 301 - Consolação, São Paulo - SP, 01304-001",
  origin: "Indicação", tags: ["Enterprise", "Tecnologia", "Upsell"],
  nextActivity: { type: "Reunião", date: "18/04/2026", time: "14:00" },
};

const timeline = [
  { type: "email", title: "E-mail enviado: Proposta Comercial v2", date: "14/04/2026 10:32", author: "Maria Santos" },
  { type: "note", title: "Nota adicionada: Cliente demonstrou interesse no plano Enterprise", date: "12/04/2026 16:15", author: "Maria Santos" },
  { type: "call", title: "Ligação realizada - 12min - Contato feito", date: "10/04/2026 11:00", author: "Carlos Lima" },
  { type: "status", title: "Status alterado: Prospect → Cliente Ativo", date: "08/04/2026 09:45", author: "Sistema" },
  { type: "task", title: "Tarefa concluída: Enviar documentação técnica", date: "05/04/2026 14:20", author: "Maria Santos" },
];

const opportunities = [
  { title: "Upgrade Plano Enterprise", value: "R$ 12.000/mês", stage: "Negociação", probability: "70%" },
  { title: "Módulo Analytics Adicional", value: "R$ 3.500/mês", stage: "Proposta", probability: "50%" },
];

const tasks = [
  { title: "Follow-up pós reunião", responsible: "Maria Santos", due: "18/04/2026", priority: "P1", done: false },
  { title: "Enviar case studies", responsible: "Carlos Lima", due: "20/04/2026", priority: "P2", done: false },
  { title: "Reunião de kick-off", responsible: "Maria Santos", due: "10/04/2026", priority: "P1", done: true },
];

const billings = [
  { date: "01/04/2026", value: "R$ 8.500,00", status: "Pago", method: "Cartão de Crédito" },
  { date: "01/03/2026", value: "R$ 8.500,00", status: "Pago", method: "PIX" },
  { date: "01/02/2026", value: "R$ 7.200,00", status: "Pago", method: "Boleto" },
];

const iconMap: Record<string, typeof Mail> = { email: Mail, note: FileText, call: Phone, status: CheckSquare, task: CheckSquare };

export function ContactDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/crm/contacts"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-2xl font-bold tracking-tight">Perfil do Contato</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 space-y-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-20 h-20 mb-3">
                <AvatarFallback className="text-2xl">JS</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{contact.name}</h2>
              <p className="text-sm text-muted-foreground">{contact.cargo}</p>
              <Link href="/crm/contacts/1" className="text-sm text-primary hover:underline">{contact.company}</Link>
              <Badge className="mt-2">{contact.status}</Badge>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Engajamento</p>
              <div className="flex items-center gap-2">
                <Progress value={contact.score} className="flex-1 h-2" />
                <span className="text-sm font-medium">{contact.score}/100</span>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="w-full"><MessageSquare className="w-3 h-3 mr-1" />WhatsApp</Button>
              <Button variant="outline" size="sm" className="w-full"><Mail className="w-3 h-3 mr-1" />E-mail</Button>
              <Button variant="outline" size="sm" className="w-full"><CheckSquare className="w-3 h-3 mr-1" />Tarefa</Button>
              <Button variant="outline" size="sm" className="w-full"><DollarSign className="w-3 h-3 mr-1" />Cobrança</Button>
            </div>

            <Separator />

            <div className="space-y-3 text-sm">
              <div><span className="text-muted-foreground">E-mail:</span> <span className="ml-2">{contact.email}</span></div>
              <div><span className="text-muted-foreground">Telefone:</span> <span className="ml-2">{contact.phone}</span></div>
              <div><span className="text-muted-foreground">CPF:</span> <span className="ml-2">{contact.cpf}</span></div>
              <div><span className="text-muted-foreground">Endereço:</span> <span className="ml-2">{contact.address}</span></div>
              <div><span className="text-muted-foreground">Origem:</span> <span className="ml-2">{contact.origin}</span></div>
              <div><span className="text-muted-foreground">Responsável:</span> <span className="ml-2">{contact.responsible}</span></div>
              <div className="flex flex-wrap gap-1 mt-2">{contact.tags.map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}</div>
            </div>

            <Separator />

            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">Próxima Atividade</p>
              <p className="text-sm font-medium">{contact.nextActivity.type}</p>
              <p className="text-xs text-muted-foreground">{contact.nextActivity.date} às {contact.nextActivity.time}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <Tabs defaultValue="timeline">
              <TabsList className="mb-4">
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
                <TabsTrigger value="tasks">Tarefas</TabsTrigger>
                <TabsTrigger value="notes">Notas</TabsTrigger>
                <TabsTrigger value="billing">Cobranças</TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="space-y-4">
                {timeline.map((item, i) => {
                  const Icon = iconMap[item.type] || FileText;
                  return (
                    <div key={i} className="flex gap-3 pb-4 border-b last:border-0">
                      <div className="mt-1 p-2 rounded-lg bg-muted"><Icon className="w-4 h-4 text-muted-foreground" /></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.date} - {item.author}</p>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>

              <TabsContent value="opportunities" className="space-y-3">
                <div className="flex justify-end"><Button size="sm"><Plus className="w-3 h-3 mr-1" />Nova Oportunidade</Button></div>
                {opportunities.map((opp, i) => (
                  <Card key={i}>
                    <CardContent className="pt-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{opp.title}</p>
                        <p className="text-sm text-muted-foreground">{opp.value}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{opp.stage}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">Prob. {opp.probability}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="tasks">
                <div className="flex justify-end mb-3"><Button size="sm"><Plus className="w-3 h-3 mr-1" />Nova Tarefa</Button></div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tarefa</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((t, i) => (
                      <TableRow key={i}>
                        <TableCell className={t.done ? "line-through text-muted-foreground" : ""}>{t.title}</TableCell>
                        <TableCell className="text-sm">{t.responsible}</TableCell>
                        <TableCell className="text-sm">{t.due}</TableCell>
                        <TableCell><Badge variant={t.priority === "P1" ? "destructive" : "outline"} className="text-xs">{t.priority}</Badge></TableCell>
                        <TableCell><Badge variant={t.done ? "default" : "secondary"}>{t.done ? "Concluída" : "Pendente"}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="notes" className="space-y-4">
                <Card><CardContent className="pt-4">
                  <p className="text-sm">Cliente demonstrou forte interesse no plano Enterprise após a demonstração. Pediu proposta formal com comparativo de funcionalidades. Próximo passo: agendar reunião com time técnico deles.</p>
                  <p className="text-xs text-muted-foreground mt-2">Maria Santos - 12/04/2026 16:15</p>
                </CardContent></Card>
                <Card><CardContent className="pt-4">
                  <p className="text-sm">Primeiro contato realizado via indicação do Ricardo (DataFlow). João é o tomador de decisão para ferramentas de gestão na empresa.</p>
                  <p className="text-xs text-muted-foreground mt-2">Carlos Lima - 01/04/2026 10:00</p>
                </CardContent></Card>
              </TabsContent>

              <TabsContent value="billing">
                <div className="flex justify-end mb-3"><Button size="sm"><Plus className="w-3 h-3 mr-1" />Nova Cobrança</Button></div>
                <Table>
                  <TableHeader><TableRow><TableHead>Data</TableHead><TableHead>Valor</TableHead><TableHead>Status</TableHead><TableHead>Método</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {billings.map((b, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-sm">{b.date}</TableCell>
                        <TableCell className="text-sm font-medium">{b.value}</TableCell>
                        <TableCell><Badge variant="default">{b.status}</Badge></TableCell>
                        <TableCell className="text-sm">{b.method}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
