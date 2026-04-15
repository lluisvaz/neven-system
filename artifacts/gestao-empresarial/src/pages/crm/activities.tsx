import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Phone, Mail, Calendar, CheckSquare, MessageSquare, FileText, Filter } from "lucide-react";

const activities = [
  { id: 1, type: "task", icon: CheckSquare, title: "Follow-up João Silva - Tech Solutions", responsible: "Maria Santos", date: "18/04/2026", time: "14:00", priority: "P1", contact: "João Silva", done: false },
  { id: 2, type: "call", icon: Phone, title: "Ligar para Ana Oliveira - Nexus Digital", responsible: "Carlos Lima", date: "18/04/2026", time: "10:30", priority: "P2", contact: "Ana Oliveira", done: false },
  { id: 3, type: "meeting", icon: Calendar, title: "Reunião de kick-off - Saúde+ Clínicas", responsible: "Maria Santos", date: "19/04/2026", time: "09:00", priority: "P1", contact: "Juliana Martins", done: false },
  { id: 4, type: "email", icon: Mail, title: "Enviar proposta atualizada - DataFlow", responsible: "Rafael Mendes", date: "19/04/2026", time: "11:00", priority: "P3", contact: "Ricardo Almeida", done: false },
  { id: 5, type: "whatsapp", icon: MessageSquare, title: "Lembrete de pagamento - Verde Energia", responsible: "Carlos Lima", date: "20/04/2026", time: "09:00", priority: "P2", contact: "Camila Rocha", done: false },
  { id: 6, type: "proposal", icon: FileText, title: "Revisar proposta comercial v3", responsible: "Maria Santos", date: "17/04/2026", time: "16:00", priority: "P1", contact: "Marcos Ferreira", done: true },
  { id: 7, type: "task", icon: CheckSquare, title: "Atualizar dados cadastrais", responsible: "Rafael Mendes", date: "16/04/2026", time: "14:00", priority: "P3", contact: "Fernanda Souza", done: true },
];

const priorityColors: Record<string, "destructive" | "secondary" | "outline"> = { P1: "destructive", P2: "secondary", P3: "outline" };

export function ActivitiesPage() {
  const [data, setData] = useState(activities);
  
  const pending = data.filter(a => !a.done);
  const completed = data.filter(a => a.done);

  const toggleDone = (id: number) => {
    setData(data.map(a => a.id === id ? { ...a, done: !a.done } : a));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Atividades</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">{pending.length} atividades pendentes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-sm"><Filter className="w-3.5 h-3.5 mr-2" />Filtros</Button>
          <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Nova Atividade</Button>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0 space-x-6">
          <TabsTrigger value="pending" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-0 pb-2 text-sm uppercase tracking-wider font-medium">Pendentes ({pending.length})</TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-0 pb-2 text-sm uppercase tracking-wider font-medium text-muted-foreground">Concluídas ({completed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-0">
          {pending.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 py-4 border-b border-border hover:bg-muted/30 transition-colors px-2 -mx-2 rounded-sm group">
              <Checkbox 
                checked={activity.done} 
                onCheckedChange={() => toggleDone(activity.id)}
                data-testid={`checkbox-activity-${activity.id}`} 
                className="w-5 h-5 rounded-sm"
              />
              <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center">
                <activity.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-accent transition-colors cursor-pointer">{activity.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="w-4 h-4 rounded-sm"><AvatarFallback className="text-[8px] bg-secondary text-secondary-foreground rounded-sm">{activity.responsible.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                  <span className="text-xs text-muted-foreground">{activity.responsible}</span>
                  <span className="text-xs text-muted-foreground px-1">•</span>
                  <span className="text-xs text-muted-foreground">{activity.contact}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <Badge variant={priorityColors[activity.priority]} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                  {activity.priority}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground whitespace-nowrap text-right w-32">
                  {activity.date} às {activity.time}
                </span>
              </div>
            </div>
          ))}
          {pending.length === 0 && (
            <div className="py-12 text-center text-muted-foreground text-sm">
              Nenhuma atividade pendente no momento.
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-0">
          {completed.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 py-4 border-b border-border hover:bg-muted/30 transition-colors px-2 -mx-2 rounded-sm opacity-60">
              <Checkbox 
                checked={activity.done} 
                onCheckedChange={() => toggleDone(activity.id)}
                data-testid={`checkbox-activity-${activity.id}`} 
                className="w-5 h-5 rounded-sm"
              />
              <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center">
                <activity.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate line-through">{activity.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{activity.responsible}</span>
                  <span className="text-xs text-muted-foreground px-1">•</span>
                  <span className="text-xs text-muted-foreground">{activity.contact}</span>
                </div>
              </div>
              <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                {activity.date}
              </span>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
