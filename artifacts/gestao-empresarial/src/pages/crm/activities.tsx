import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Phone, Mail, Calendar, CheckSquare, MessageSquare, FileText } from "lucide-react";

const activities = [
  { type: "task", icon: CheckSquare, title: "Follow-up João Silva - Tech Solutions", responsible: "Maria Santos", date: "18/04/2026", time: "14:00", priority: "P1", contact: "João Silva", done: false },
  { type: "call", icon: Phone, title: "Ligar para Ana Oliveira - Nexus Digital", responsible: "Carlos Lima", date: "18/04/2026", time: "10:30", priority: "P2", contact: "Ana Oliveira", done: false },
  { type: "meeting", icon: Calendar, title: "Reunião de kick-off - Saúde+ Clínicas", responsible: "Maria Santos", date: "19/04/2026", time: "09:00", priority: "P1", contact: "Juliana Martins", done: false },
  { type: "email", icon: Mail, title: "Enviar proposta atualizada - DataFlow", responsible: "Rafael Mendes", date: "19/04/2026", time: "11:00", priority: "P3", contact: "Ricardo Almeida", done: false },
  { type: "whatsapp", icon: MessageSquare, title: "Lembrete de pagamento - Verde Energia", responsible: "Carlos Lima", date: "20/04/2026", time: "09:00", priority: "P2", contact: "Camila Rocha", done: false },
  { type: "proposal", icon: FileText, title: "Revisar proposta comercial v3", responsible: "Maria Santos", date: "17/04/2026", time: "16:00", priority: "P1", contact: "Marcos Ferreira", done: true },
  { type: "task", icon: CheckSquare, title: "Atualizar dados cadastrais", responsible: "Rafael Mendes", date: "16/04/2026", time: "14:00", priority: "P3", contact: "Fernanda Souza", done: true },
];

const priorityColors: Record<string, "destructive" | "secondary" | "outline"> = { P1: "destructive", P2: "secondary", P3: "outline" };

export function ActivitiesPage() {
  const pending = activities.filter(a => !a.done);
  const completed = activities.filter(a => a.done);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Central de Atividades</h1>
          <p className="text-muted-foreground mt-1">{pending.length} atividades pendentes</p>
        </div>
        <Button size="sm"><Plus className="w-4 h-4 mr-2" />Nova Atividade</Button>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pendentes ({pending.length})</TabsTrigger>
          <TabsTrigger value="completed">Concluídas ({completed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3 mt-4">
          {pending.map((activity, i) => (
            <Card key={i}>
              <CardContent className="pt-4 flex items-center gap-4">
                <Checkbox data-testid={`checkbox-activity-${i}`} />
                <div className="p-2 rounded-lg bg-muted"><activity.icon className="w-4 h-4 text-muted-foreground" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="w-4 h-4"><AvatarFallback className="text-[8px]">{activity.responsible.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                    <span className="text-xs text-muted-foreground">{activity.responsible}</span>
                    <span className="text-xs text-muted-foreground">-</span>
                    <span className="text-xs text-muted-foreground">{activity.contact}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant={priorityColors[activity.priority]} className="text-xs">{activity.priority}</Badge>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.date} {activity.time}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-3 mt-4">
          {completed.map((activity, i) => (
            <Card key={i} className="opacity-60">
              <CardContent className="pt-4 flex items-center gap-4">
                <Checkbox checked disabled />
                <div className="p-2 rounded-lg bg-muted"><activity.icon className="w-4 h-4 text-muted-foreground" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate line-through">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.responsible} - {activity.contact}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.date}</span>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
