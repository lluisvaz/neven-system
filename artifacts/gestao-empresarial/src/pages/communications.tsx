import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search, Send, Mail, MessageSquare, Phone, MoreVertical, Paperclip,
  Plus, Settings, ChevronDown, Filter, RefreshCw, QrCode, Trash2,
  CheckCheck, Check, X, AlertCircle, Smile, UserRound, ArrowRightLeft,
  Reply, ReplyAll, Forward, ChevronUp, Star, Archive, CornerUpLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// ─── Types ────────────────────────────────────────────────────────────────────

type ChannelType = "whatsapp" | "email" | "phone";

interface Agent {
  id: string;
  name: string;
  initials: string;
  role: string;
  online: boolean;
}

interface WhatsAppInstance {
  id: string;
  name: string;
  number: string;
  status: "connected" | "disconnected" | "connecting";
  profileName?: string;
  unreadTotal: number;
}

interface Conversation {
  id: number;
  contact: string;
  company: string;
  lastMessage: string;
  channel: ChannelType;
  whatsappInstanceId?: string;
  unread: number;
  time: string;
  email?: string;
  phone?: string;
  assignedTo: string;
  subject?: string;
}

interface Message {
  id: number;
  author: string;
  role: "agent" | "client";
  text: string;
  time: string;
  date?: string;
  status?: "sent" | "delivered" | "read";
  channel: ChannelType;
  whatsappInstanceId?: string;
  fromEmail?: string;
  toEmail?: string;
  subject?: string;
  collapsed?: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const agents: Agent[] = [
  { id: "ag-1", name: "Maria Santos", initials: "MS", role: "Comercial", online: true },
  { id: "ag-2", name: "Carlos Souza", initials: "CS", role: "Suporte", online: true },
  { id: "ag-3", name: "Rafaela Lima", initials: "RL", role: "Financeiro", online: false },
  { id: "ag-4", name: "Bruno Alves", initials: "BA", role: "Comercial", online: true },
  { id: "ag-5", name: "Juliana Costa", initials: "JC", role: "Suporte", online: false },
];

const whatsappInstances: WhatsAppInstance[] = [
  { id: "wa-1", name: "Comercial", number: "+55 11 98765-4321", status: "connected", profileName: "Empresa Comercial", unreadTotal: 3 },
  { id: "wa-2", name: "Suporte", number: "+55 21 99887-6655", status: "connected", profileName: "Suporte Técnico", unreadTotal: 1 },
  { id: "wa-3", name: "Financeiro", number: "+55 11 91234-5678", status: "disconnected", unreadTotal: 0 },
];

const initialConversations: Conversation[] = [
  { id: 1, contact: "João Silva", company: "Tech Solutions Ltda", lastMessage: "Entendido, vou revisar a proposta e retorno até sexta.", channel: "whatsapp", whatsappInstanceId: "wa-1", unread: 0, time: "14:32", phone: "+55 11 99001-1234", assignedTo: "ag-1" },
  { id: 2, contact: "Ana Oliveira", company: "Nexus Digital", lastMessage: "Podemos agendar uma call para discutir o upgrade?", channel: "email", unread: 1, time: "11:45", email: "ana@nexusdigital.com.br", assignedTo: "ag-2", subject: "Upgrade de plano — Proposta Enterprise" },
  { id: 3, contact: "Pedro Costa", company: "Innovare Consultoria", lastMessage: "O boleto da parcela 3 foi gerado?", channel: "whatsapp", whatsappInstanceId: "wa-2", unread: 2, time: "10:20", phone: "+55 21 98765-0001", assignedTo: "ag-2" },
  { id: 4, contact: "Fernanda Souza", company: "Criativa Design", lastMessage: "Perfeito, muito obrigada pelo suporte!", channel: "whatsapp", whatsappInstanceId: "wa-1", unread: 0, time: "Ontem", phone: "+55 11 97654-3210", assignedTo: "ag-1" },
  { id: 5, contact: "Marcos Ferreira", company: "LogiTech BR", lastMessage: "Segue em anexo o documento solicitado.", channel: "email", unread: 0, time: "Ontem", email: "marcos@logitech.com.br", assignedTo: "ag-3", subject: "Re: NF-e — Competência Abril/2026" },
  { id: 6, contact: "Camila Rocha", company: "Verde Energia", lastMessage: "Estou com problemas para logar, podem ajudar?", channel: "whatsapp", whatsappInstanceId: "wa-1", unread: 1, time: "Segunda", phone: "+55 11 92222-3333", assignedTo: "ag-4" },
  { id: 7, contact: "Rafael Nunes", company: "DataBrasil", lastMessage: "Recebi a nota fiscal, obrigado.", channel: "whatsapp", whatsappInstanceId: "wa-2", unread: 0, time: "Segunda", phone: "+55 21 93333-4444", assignedTo: "ag-1" },
  { id: 8, contact: "Lucia Mendes", company: "AgroMax Ltda", lastMessage: "Re: Contrato de Renovação — anexo", channel: "email", unread: 2, time: "Dom.", email: "lucia@agromax.com.br", assignedTo: "ag-5", subject: "Contrato de Renovação 2026" },
];

const messagesData: Record<number, Message[]> = {
  1: [
    { id: 1, author: "Maria Santos", role: "agent", text: "Olá João! Segue a proposta atualizada conforme conversamos. O valor do plano Enterprise com o módulo Analytics incluso ficou em R$ 15.500/mês.", time: "14:15", date: "Hoje", status: "read", channel: "whatsapp", whatsappInstanceId: "wa-1" },
    { id: 2, author: "João Silva", role: "client", text: "Recebido, Maria. Vou analisar com o time financeiro.", time: "14:20", channel: "whatsapp", whatsappInstanceId: "wa-1" },
    { id: 3, author: "João Silva", role: "client", text: "Entendido, vou revisar a proposta e retorno até sexta.", time: "14:32", channel: "whatsapp", whatsappInstanceId: "wa-1" },
  ],
  2: [
    { id: 1, author: "Carlos Souza", role: "agent", fromEmail: "contato@empresa.com.br", toEmail: "ana@nexusdigital.com.br", subject: "Upgrade de plano — Proposta Enterprise", text: "Olá Ana, tudo bem?\n\nPassando para apresentar as novidades do plano Enterprise que lançamos este mês. Temos melhorias significativas no módulo de relatórios e integrações nativas com ERP.\n\nGostaria de agendar uma demonstração?\n\nAtenciosamente,\nCarlos Souza\nEquipe Comercial", time: "10:00", date: "15 de Abril, 2026", status: "read", channel: "email", collapsed: false },
    { id: 2, author: "Ana Oliveira", role: "client", fromEmail: "ana@nexusdigital.com.br", toEmail: "contato@empresa.com.br", subject: "Re: Upgrade de plano — Proposta Enterprise", text: "Boa tarde!\n\nPodemos agendar uma call para discutir o upgrade? Nosso time está interessado especialmente no módulo de integrações.\n\nAguardo retorno.\n\nAna Oliveira\nNexus Digital", time: "11:45", date: "15 de Abril, 2026", channel: "email", collapsed: false },
  ],
  3: [
    { id: 1, author: "Suporte", role: "agent", text: "Olá Pedro! Em que podemos ajudar hoje?", time: "10:00", date: "Hoje", status: "read", channel: "whatsapp", whatsappInstanceId: "wa-2" },
    { id: 2, author: "Pedro Costa", role: "client", text: "O boleto da parcela 3 foi gerado?", time: "10:20", channel: "whatsapp", whatsappInstanceId: "wa-2" },
  ],
  5: [
    { id: 1, author: "Marcos Ferreira", role: "client", fromEmail: "marcos@logitech.com.br", toEmail: "contato@empresa.com.br", subject: "Re: NF-e — Competência Abril/2026", text: "Boa tarde,\n\nSegue em anexo o documento solicitado referente às NF-e de Abril. Favor confirmar o recebimento.\n\nAtenciosamente,\nMarcos Ferreira\nLogiTech BR", time: "16:30", date: "14 de Abril, 2026", channel: "email", collapsed: true },
    { id: 2, author: "Rafaela Lima", role: "agent", fromEmail: "contato@empresa.com.br", toEmail: "marcos@logitech.com.br", subject: "Re: NF-e — Competência Abril/2026", text: "Boa tarde, Marcos!\n\nDocumento recebido com sucesso. Iremos processar em até 2 dias úteis.\n\nObrigada!\nRafaela Lima\nDpto. Financeiro", time: "09:10", date: "15 de Abril, 2026", status: "read", channel: "email", collapsed: false },
  ],
  8: [
    { id: 1, author: "Lucia Mendes", role: "client", fromEmail: "lucia@agromax.com.br", toEmail: "contato@empresa.com.br", subject: "Contrato de Renovação 2026", text: "Prezados,\n\nGostaria de tratar sobre a renovação do contrato para 2026. Precisamos revisar algumas cláusulas do SLA antes de assinar.\n\nPodemos agendar uma reunião?\n\nAtenciosamente,\nLucia Mendes\nAgroMax Ltda", time: "09:00", date: "13 de Abril, 2026", channel: "email", collapsed: true },
    { id: 2, author: "Juliana Costa", role: "agent", fromEmail: "contato@empresa.com.br", toEmail: "lucia@agromax.com.br", subject: "Re: Contrato de Renovação 2026", text: "Boa tarde, Lucia!\n\nClaro, podemos sim! Nossa equipe jurídica irá revisar as cláusulas do SLA e retorno com uma proposta atualizada em breve.\n\nJuliana Costa\nGestão de Contratos", time: "14:20", date: "13 de Abril, 2026", status: "delivered", channel: "email", collapsed: false },
  ],
};

// ─── Helper components ────────────────────────────────────────────────────────

function StatusDot({ status }: { status: WhatsAppInstance["status"] }) {
  const colors = { connected: "bg-emerald-500", disconnected: "bg-red-400", connecting: "bg-yellow-400 animate-pulse" };
  return <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${colors[status]}`} />;
}

function AgentOnlineDot({ online }: { online: boolean }) {
  return <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${online ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />;
}

function ChannelBadge({ channel, instanceId }: { channel: ChannelType; instanceId?: string }) {
  const inst = whatsappInstances.find(i => i.id === instanceId);
  if (channel === "whatsapp") return (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
      <MessageSquare className="w-3 h-3" />WA{inst ? ` · ${inst.name}` : ""}
    </span>
  );
  if (channel === "email") return (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-blue-500">
      <Mail className="w-3 h-3" /> E-mail
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
      <Phone className="w-3 h-3" /> Telefone
    </span>
  );
}

function MessageStatus({ status }: { status?: Message["status"] }) {
  if (status === "read") return <CheckCheck className="w-3.5 h-3.5 text-accent" />;
  if (status === "delivered") return <CheckCheck className="w-3.5 h-3.5 text-muted-foreground" />;
  if (status === "sent") return <Check className="w-3.5 h-3.5 text-muted-foreground" />;
  return null;
}

// ─── Transfer Dialog ──────────────────────────────────────────────────────────

function TransferDialog({ open, onClose, currentAgent, onTransfer }: {
  open: boolean;
  onClose: () => void;
  currentAgent: Agent | undefined;
  onTransfer: (agentId: string) => void;
}) {
  const [note, setNote] = useState("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4" /> Transferir Conversa
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Selecione um colaborador para assumir esta conversa.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-1">
          <div className="space-y-1">
            {agents.map(agent => {
              const isCurrent = agent.id === currentAgent?.id;
              return (
                <button
                  key={agent.id}
                  disabled={isCurrent}
                  onClick={() => { onTransfer(agent.id); onClose(); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-sm border transition-all text-left ${
                    isCurrent
                      ? "border-accent bg-accent/5 opacity-60 cursor-not-allowed"
                      : "border-border hover:border-accent/50 hover:bg-accent/5"
                  }`}
                >
                  <div className="relative">
                    <Avatar className="w-9 h-9 rounded-sm">
                      <AvatarFallback className="text-[11px] font-mono rounded-sm bg-secondary text-secondary-foreground">
                        {agent.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${agent.online ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{agent.name} {isCurrent && <span className="text-[10px] font-mono text-muted-foreground ml-1">(atual)</span>}</p>
                    <p className="text-xs text-muted-foreground">{agent.role} · {agent.online ? "Online" : "Offline"}</p>
                  </div>
                  {!isCurrent && <ArrowRightLeft className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
                </button>
              );
            })}
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Nota de transferência (opcional)</Label>
            <Textarea
              placeholder="Ex: Cliente quer falar sobre renovação de contrato..."
              className="rounded-sm text-sm resize-none min-h-[72px]"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Channel Manager Dialog ───────────────────────────────────────────────────

function ChannelManagerDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [instances, setInstances] = useState<WhatsAppInstance[]>(whatsappInstances);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    setInstances(prev => [...prev, { id: `wa-${Date.now()}`, name: newName.trim(), number: newNumber.trim() || "Aguardando QR Code", status: "connecting", unreadTotal: 0 }]);
    setNewName(""); setNewNumber(""); setAdding(false);
  };

  const statusLabel: Record<WhatsAppInstance["status"], string> = { connected: "Conectado", disconnected: "Desconectado", connecting: "Aguardando QR" };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Gerenciar Canais Conectados</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Gerencie os números de WhatsApp. A integração com a Evolution API está pronta para ser ativada.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="flex items-center justify-between p-3 border border-border rounded-sm bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Mail className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium">E-mail</p>
                <p className="text-[11px] text-muted-foreground font-mono">contato@empresa.com.br</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600"><StatusDot status="connected" /> Ativo</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">WhatsApp — Evolution API</p>
              <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-sm">
                {instances.filter(i => i.status === "connected").length}/{instances.length} conectados
              </span>
            </div>
            {instances.map(inst => (
              <div key={inst.id} className="flex items-center justify-between p-3 border border-border rounded-sm bg-muted/10 group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{inst.name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono">{inst.number}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1.5 text-[11px] font-mono ${inst.status === "connected" ? "text-emerald-600" : inst.status === "connecting" ? "text-yellow-500" : "text-red-400"}`}>
                    <StatusDot status={inst.status} /> {statusLabel[inst.status]}
                  </span>
                  <Button variant="ghost" size="icon" className="w-7 h-7 rounded-sm text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity" title={inst.status !== "connected" ? "Gerar QR Code" : "Reconectar"}>
                    {inst.status !== "connected" ? <QrCode className="w-3.5 h-3.5" /> : <RefreshCw className="w-3.5 h-3.5" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="w-7 h-7 rounded-sm text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setInstances(p => p.filter(i => i.id !== inst.id))}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
            {adding ? (
              <div className="p-3 border border-dashed border-accent/50 rounded-sm bg-accent/5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nova instância</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Nome</Label>
                    <Input placeholder="Ex: Vendas" className="rounded-sm h-8 text-sm" value={newName} onChange={e => setNewName(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Número (opcional)</Label>
                    <Input placeholder="+55 11 99999-9999" className="rounded-sm h-8 text-sm font-mono" value={newNumber} onChange={e => setNewNumber(e.target.value)} />
                  </div>
                </div>
                <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-sm flex gap-2 items-start">
                  <AlertCircle className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-yellow-700 dark:text-yellow-400">
                    Configure <code className="font-mono">VITE_EVOLUTION_API_URL</code> e <code className="font-mono">VITE_EVOLUTION_API_KEY</code> para ativar a conexão via QR Code.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="rounded-sm h-8 text-xs px-4" onClick={handleAdd}>Criar instância</Button>
                  <Button size="sm" variant="ghost" className="rounded-sm h-8 text-xs" onClick={() => setAdding(false)}>Cancelar</Button>
                </div>
              </div>
            ) : (
              <button onClick={() => setAdding(true)} className="w-full flex items-center gap-2 p-3 border border-dashed border-border rounded-sm text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 hover:bg-accent/5 transition-all">
                <Plus className="w-4 h-4" /> Adicionar número de WhatsApp
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Email Thread View ────────────────────────────────────────────────────────

function EmailThread({ conv, messages, onSend }: {
  conv: Conversation;
  messages: Message[];
  onSend: (text: string) => void;
}) {
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>(
    Object.fromEntries(messages.map(m => [m.id, m.collapsed ?? false]))
  );
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleCollapse = (id: number) => setCollapsed(p => ({ ...p, [id]: !p[id] }));

  const handleSend = () => {
    const t = replyText.trim();
    if (!t) return;
    onSend(t);
    setReplyText("");
    setReplyOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background">
      {/* Subject header */}
      <div className="px-6 py-3 border-b border-border bg-muted/10 flex-shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-foreground leading-tight">{conv.subject ?? "Sem assunto"}</h3>
            <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{messages.length} {messages.length === 1 ? "mensagem" : "mensagens"}</p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button variant="ghost" size="icon" className="w-7 h-7 rounded-sm text-muted-foreground hover:text-foreground"><Star className="w-3.5 h-3.5" /></Button>
            <Button variant="ghost" size="icon" className="w-7 h-7 rounded-sm text-muted-foreground hover:text-foreground"><Archive className="w-3.5 h-3.5" /></Button>
            <Button variant="ghost" size="icon" className="w-7 h-7 rounded-sm text-muted-foreground hover:text-foreground"><MoreVertical className="w-3.5 h-3.5" /></Button>
          </div>
        </div>
      </div>

      {/* Email messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 min-h-0">
        {messages.map((msg, idx) => {
          const isCollapsed = collapsed[msg.id];
          const isLast = idx === messages.length - 1;

          return (
            <div key={msg.id} className={`border border-border rounded-sm overflow-hidden bg-card transition-all ${isLast ? "shadow-sm" : ""}`}>
              {/* Email card header */}
              <div
                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => !isLast && toggleCollapse(msg.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="w-8 h-8 rounded-sm flex-shrink-0">
                    <AvatarFallback className={`text-[10px] font-mono rounded-sm ${msg.role === "agent" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
                      {msg.author.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold truncate">{msg.author}</span>
                      {msg.role === "agent" && <Badge variant="outline" className="text-[9px] px-1 py-0 rounded-sm font-mono border-accent/40 text-accent">Equipe</Badge>}
                    </div>
                    {isCollapsed ? (
                      <p className="text-xs text-muted-foreground truncate max-w-[280px]">{msg.text.split("\n")[0]}</p>
                    ) : (
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                        <span>para</span>
                        <span className="text-foreground">{msg.toEmail}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className="text-[11px] font-mono text-muted-foreground">{msg.date ? `${msg.date}, ` : ""}{msg.time}</span>
                  {msg.role === "agent" && <MessageStatus status={msg.status} />}
                  {!isLast && (
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Email body (expanded) */}
              {!isCollapsed && (
                <div className="px-4 pb-4">
                  {/* From / To metadata */}
                  <div className="text-[11px] font-mono text-muted-foreground space-y-0.5 mb-4 pb-3 border-b border-border/50">
                    <div><span className="text-muted-foreground/60 w-12 inline-block">De:</span> <span className="text-foreground">{msg.fromEmail}</span></div>
                    <div><span className="text-muted-foreground/60 w-12 inline-block">Para:</span> <span className="text-foreground">{msg.toEmail}</span></div>
                    <div><span className="text-muted-foreground/60 w-12 inline-block">Data:</span> {msg.date}, {msg.time}</div>
                  </div>
                  {/* Body */}
                  <div className="text-sm leading-relaxed whitespace-pre-line text-foreground">{msg.text}</div>
                  {/* Quick actions */}
                  {isLast && (
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50">
                      <Button variant="outline" size="sm" className="rounded-sm h-7 text-xs gap-1.5" onClick={() => setReplyOpen(true)}>
                        <CornerUpLeft className="w-3 h-3" /> Responder
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-sm h-7 text-xs gap-1.5 text-muted-foreground">
                        <ReplyAll className="w-3 h-3" /> Responder todos
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-sm h-7 text-xs gap-1.5 text-muted-foreground">
                        <Forward className="w-3 h-3" /> Encaminhar
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply compose box */}
      {replyOpen ? (
        <div className="px-6 pb-5 flex-shrink-0">
          <div className="border border-border rounded-sm overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-accent focus-within:border-accent transition-all">
            {/* Compose toolbar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/20 border-b border-border text-[11px] font-mono text-muted-foreground">
              <span>Para:</span>
              <span className="text-foreground">{conv.email}</span>
              <span className="mx-2 text-border">|</span>
              <span>Assunto: Re: {conv.subject ?? "Sem assunto"}</span>
            </div>
            <Textarea
              placeholder="Escreva sua resposta..."
              className="border-0 rounded-none focus-visible:ring-0 resize-none min-h-[100px] p-3 text-sm bg-transparent"
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              autoFocus
            />
            <div className="flex items-center justify-between p-2 bg-muted/10 border-t border-border">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="w-7 h-7 rounded-sm text-muted-foreground hover:text-foreground"><Paperclip className="w-3.5 h-3.5" /></Button>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="rounded-sm h-7 text-xs" onClick={() => setReplyOpen(false)}>Cancelar</Button>
                <Button size="sm" className="rounded-sm h-7 px-4 text-xs gap-1.5" onClick={handleSend} disabled={!replyText.trim()}>
                  <Send className="w-3 h-3" /> Enviar
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-6 pb-5 flex-shrink-0">
          <button
            onClick={() => setReplyOpen(true)}
            className="w-full flex items-center gap-3 p-3 border border-border rounded-sm text-sm text-muted-foreground hover:bg-muted/30 hover:text-foreground transition-all text-left"
          >
            <CornerUpLeft className="w-4 h-4 flex-shrink-0" />
            <span>Clique para responder a <strong className="text-foreground font-medium">{conv.contact}</strong>...</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── WhatsApp Chat View ───────────────────────────────────────────────────────

function WhatsAppChat({ conv, messages, onSend }: {
  conv: Conversation;
  messages: Message[];
  onSend: (text: string, instanceId: string) => void;
}) {
  const [replyText, setReplyText] = useState("");
  const [replyInstance, setReplyInstance] = useState<string>(conv.whatsappInstanceId ?? whatsappInstances[0].id);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const t = replyText.trim();
    if (!t) return;
    onSend(t, replyInstance);
    setReplyText("");
  };

  const activeInstance = whatsappInstances.find(i => i.id === replyInstance);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-muted/5 min-h-0">
        {messages.map((msg, idx) => {
          const prevMsg = messages[idx - 1];
          const showDate = !prevMsg || prevMsg.date !== msg.date;
          return (
            <div key={msg.id}>
              {showDate && msg.date && (
                <div className="flex justify-center my-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider bg-muted/50 px-2 py-1 rounded-sm text-muted-foreground">{msg.date}</span>
                </div>
              )}
              <div className={`flex ${msg.role === "agent" ? "justify-end" : "justify-start"}`}>
                <div className="flex flex-col gap-1 max-w-[72%]">
                  <div className={`flex items-baseline gap-2 ${msg.role === "agent" ? "justify-end" : "justify-start"} px-1`}>
                    <span className="text-[11px] font-medium text-muted-foreground">{msg.author}</span>
                  </div>
                  <div className={`p-3.5 text-sm leading-relaxed rounded-sm ${msg.role === "agent" ? "bg-accent/10 border border-accent/20 rounded-tr-none" : "bg-card border border-border rounded-tl-none"}`}>
                    {msg.text}
                  </div>
                  <div className={`flex items-center gap-1.5 px-1 ${msg.role === "agent" ? "justify-end" : "justify-start"}`}>
                    <span className="text-[10px] font-mono text-muted-foreground">{msg.time}</span>
                    {msg.role === "agent" && <MessageStatus status={msg.status} />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2">
            <MessageSquare className="w-8 h-8 opacity-20" />
            <p className="text-xs">Nenhuma mensagem ainda.</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply */}
      <div className="p-4 border-t border-border bg-card flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Via:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border border-border bg-muted/30 text-[11px] font-mono hover:bg-muted/60 transition-colors">
                <StatusDot status={activeInstance?.status ?? "disconnected"} />
                {activeInstance ? `WA · ${activeInstance.name} (${activeInstance.number})` : "Selecionar número"}
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="rounded-sm text-sm min-w-[220px]">
              {whatsappInstances.map(inst => (
                <DropdownMenuItem key={inst.id} onClick={() => setReplyInstance(inst.id)} disabled={inst.status === "disconnected"} className="flex items-center gap-2">
                  <StatusDot status={inst.status} />
                  <div>
                    <p className="text-xs font-medium">{inst.name}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{inst.number}</p>
                  </div>
                  {replyInstance === inst.id && <Check className="w-3.5 h-3.5 ml-auto text-accent" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="border border-border rounded-sm overflow-hidden focus-within:ring-1 focus-within:ring-accent focus-within:border-accent transition-all flex flex-col">
          <Textarea
            placeholder={`Mensagem para ${conv.contact}...`}
            className="border-0 rounded-none focus-visible:ring-0 resize-none min-h-[72px] p-3 text-sm bg-transparent"
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center justify-between p-2 bg-muted/20 border-t border-border">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="w-7 h-7 rounded-sm text-muted-foreground hover:text-foreground"><Paperclip className="w-3.5 h-3.5" /></Button>
              <Button variant="ghost" size="icon" className="w-7 h-7 rounded-sm text-muted-foreground hover:text-foreground"><Smile className="w-3.5 h-3.5" /></Button>
            </div>
            <Button size="sm" className="rounded-sm h-7 px-4 text-xs gap-1.5" onClick={handleSend} disabled={!replyText.trim()}>
              <Send className="w-3 h-3" /> Enviar
            </Button>
          </div>
        </div>
        <p className="text-[10px] font-mono text-muted-foreground mt-1.5 px-1">Enter para enviar · Shift+Enter para quebrar linha</p>
      </div>
    </div>
  );
}

// ─── Filter types ─────────────────────────────────────────────────────────────

type FilterOption = { type: "all" } | { type: "channel"; channel: ChannelType } | { type: "whatsapp-instance"; id: string };

function filterLabel(f: FilterOption): string {
  if (f.type === "all") return "Todos";
  if (f.type === "channel" && f.channel === "email") return "E-mail";
  if (f.type === "channel" && f.channel === "phone") return "Telefone";
  if (f.type === "whatsapp-instance") return `WA · ${whatsappInstances.find(i => i.id === f.id)?.name ?? f.id}`;
  return "WhatsApp";
}

function filterMatch(conv: Conversation, filter: FilterOption): boolean {
  if (filter.type === "all") return true;
  if (filter.type === "channel") return conv.channel === filter.channel;
  if (filter.type === "whatsapp-instance") return conv.channel === "whatsapp" && conv.whatsappInstanceId === filter.id;
  return true;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CommunicationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedId, setSelectedId] = useState<number>(conversations[0].id);
  const [activeFilter, setActiveFilter] = useState<FilterOption>({ type: "all" });
  const [search, setSearch] = useState("");
  const [channelManagerOpen, setChannelManagerOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [localMessages, setLocalMessages] = useState<Record<number, Message[]>>(messagesData);

  const activeConv = conversations.find(c => c.id === selectedId) ?? conversations[0];
  const messages = localMessages[activeConv.id] ?? [];
  const assignedAgent = agents.find(a => a.id === activeConv.assignedTo);

  const filtered = conversations.filter(conv => {
    const matchFilter = filterMatch(conv, activeFilter);
    const q = search.toLowerCase();
    const matchSearch = !q || conv.contact.toLowerCase().includes(q) || conv.company.toLowerCase().includes(q) || conv.lastMessage.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const totalUnread = conversations.reduce((acc, c) => acc + c.unread, 0);

  const filterOptions: FilterOption[] = [
    { type: "all" },
    { type: "channel", channel: "email" },
    ...whatsappInstances.map(inst => ({ type: "whatsapp-instance" as const, id: inst.id })),
  ];

  const filterKey = (f: FilterOption) => f.type === "all" ? "all" : f.type === "channel" ? f.channel : f.id;
  const isActive = (f: FilterOption) => filterKey(f) === filterKey(activeFilter);

  const handleTransfer = (agentId: string) => {
    setConversations(prev => prev.map(c => c.id === selectedId ? { ...c, assignedTo: agentId } : c));
  };

  const handleSendWA = (text: string, instanceId: string) => {
    const newMsg: Message = {
      id: Date.now(), author: "Você", role: "agent", text,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      date: "Hoje", status: "sent", channel: "whatsapp", whatsappInstanceId: instanceId,
    };
    setLocalMessages(prev => ({ ...prev, [activeConv.id]: [...(prev[activeConv.id] ?? []), newMsg] }));
  };

  const handleSendEmail = (text: string) => {
    const newMsg: Message = {
      id: Date.now(), author: "Você", role: "agent", text,
      fromEmail: "contato@empresa.com.br", toEmail: activeConv.email,
      subject: `Re: ${activeConv.subject ?? "Sem assunto"}`,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }),
      status: "sent", channel: "email", collapsed: false,
    };
    setLocalMessages(prev => ({ ...prev, [activeConv.id]: [...(prev[activeConv.id] ?? []), newMsg] }));
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between flex-shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">Comunicações</h1>
            {totalUnread > 0 && <Badge className="rounded-sm px-2 py-0.5 text-xs bg-accent text-accent-foreground">{totalUnread} não lidas</Badge>}
          </div>
          <p className="text-sm font-mono text-muted-foreground mt-1">Caixa de entrada unificada — WhatsApp, E-mail</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-sm text-xs gap-1.5" onClick={() => setChannelManagerOpen(true)}>
            <Settings className="w-3.5 h-3.5" /> Canais
            <span className="flex items-center gap-1 ml-1">{whatsappInstances.map(inst => <StatusDot key={inst.id} status={inst.status} />)}</span>
          </Button>
          <Button size="sm" className="rounded-sm text-xs gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Nova Conversa
          </Button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 border border-border rounded-sm overflow-hidden bg-card min-h-0">

        {/* LEFT: Sidebar */}
        <div className="lg:col-span-4 border-r border-border flex flex-col h-full bg-muted/10 min-h-0">
          {/* Search */}
          <div className="p-3 border-b border-border bg-card flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input placeholder="Buscar conversas..." className="pl-9 rounded-sm border-muted-foreground/20 bg-background h-8 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
              {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5" /></button>}
            </div>
          </div>

          {/* Filters */}
          <div className="px-3 py-2 border-b border-border bg-card flex-shrink-0">
            <div className="flex items-center gap-1 mb-1.5">
              <Filter className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Filtrar canais</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {filterOptions.map(opt => {
                const key = filterKey(opt);
                const active = isActive(opt);
                let unread = 0;
                if (opt.type === "all") unread = totalUnread;
                else if (opt.type === "channel") unread = conversations.filter(c => c.channel === opt.channel).reduce((a, c) => a + c.unread, 0);
                else if (opt.type === "whatsapp-instance") unread = whatsappInstances.find(i => i.id === opt.id)?.unreadTotal ?? 0;

                return (
                  <button key={key} onClick={() => setActiveFilter(opt)}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-sm text-[11px] font-mono border transition-all ${active ? "bg-accent text-accent-foreground border-accent" : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/60 hover:text-foreground"}`}>
                    {opt.type === "whatsapp-instance" && <StatusDot status={whatsappInstances.find(i => i.id === opt.id)?.status ?? "disconnected"} />}
                    {filterLabel(opt)}
                    {unread > 0 && <span className={`ml-0.5 rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold ${active ? "bg-accent-foreground/20 text-accent-foreground" : "bg-accent text-accent-foreground"}`}>{unread}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2 p-8">
                <MessageSquare className="w-8 h-8 opacity-30" />
                <p className="text-xs text-center">Nenhuma conversa encontrada</p>
              </div>
            ) : filtered.map(conv => {
              const isSelected = selectedId === conv.id;
              const inst = whatsappInstances.find(i => i.id === conv.whatsappInstanceId);
              const convAgent = agents.find(a => a.id === conv.assignedTo);

              return (
                <div key={conv.id} onClick={() => setSelectedId(conv.id)}
                  className={`p-3.5 border-b border-border/50 cursor-pointer transition-colors ${isSelected ? "bg-accent/5 border-l-2 border-l-accent" : "hover:bg-muted/30 border-l-2 border-l-transparent"}`}>
                  <div className="flex items-start gap-3">
                    <Avatar className="w-9 h-9 rounded-sm mt-0.5 flex-shrink-0">
                      <AvatarFallback className={`text-[10px] font-mono rounded-sm ${isSelected ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
                        {conv.contact.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className={`text-sm truncate ${conv.unread > 0 ? "font-semibold text-foreground" : "font-medium"}`}>{conv.contact}</p>
                        <span className="text-[10px] font-mono text-muted-foreground flex-shrink-0 ml-2">{conv.time}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate mb-1">{conv.company}</p>
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          {conv.channel === "whatsapp" ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                              <MessageSquare className="w-2.5 h-2.5" />{inst?.name ?? "WA"}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-blue-500 flex-shrink-0">
                              <Mail className="w-2.5 h-2.5" />Email
                            </span>
                          )}
                          <span className="text-muted-foreground/40 text-[10px]">·</span>
                          <p className={`text-[11px] truncate ${conv.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                            {conv.subject ?? conv.lastMessage}
                          </p>
                        </div>
                        {/* Assignee mini avatar */}
                        {convAgent && (
                          <div className="relative flex-shrink-0" title={convAgent.name}>
                            <Avatar className="w-5 h-5 rounded-sm">
                              <AvatarFallback className="text-[8px] font-mono rounded-sm bg-muted text-muted-foreground">{convAgent.initials}</AvatarFallback>
                            </Avatar>
                            <span className={`absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full border border-card ${convAgent.online ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
                          </div>
                        )}
                      </div>
                    </div>
                    {conv.unread > 0 && (
                      <span className="ml-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center flex-shrink-0">{conv.unread}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Active conversation */}
        <div className="lg:col-span-8 flex flex-col h-full bg-background relative min-h-0">
          {/* Conversation header */}
          <div className="px-5 py-3 border-b border-border flex items-center justify-between bg-card flex-shrink-0">
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9 rounded-sm">
                <AvatarFallback className="text-[10px] font-mono bg-accent text-accent-foreground rounded-sm">
                  {activeConv.contact.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold">{activeConv.contact}</h2>
                  <ChannelBadge channel={activeConv.channel} instanceId={activeConv.whatsappInstanceId} />
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{activeConv.company}</span>
                  {(activeConv.phone || activeConv.email) && (
                    <><span className="text-[10px] text-muted-foreground/40">·</span>
                    <span className="text-[11px] font-mono text-muted-foreground">{activeConv.phone ?? activeConv.email}</span></>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Assignee */}
              <div className="flex items-center gap-2 border border-border rounded-sm px-2.5 py-1.5 bg-muted/20">
                <UserRound className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <Avatar className="w-5 h-5 rounded-sm">
                      <AvatarFallback className="text-[8px] font-mono rounded-sm bg-secondary text-secondary-foreground">
                        {assignedAgent?.initials ?? "??"}
                      </AvatarFallback>
                    </Avatar>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full border border-card ${assignedAgent?.online ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
                  </div>
                  <span className="text-xs font-medium text-foreground">{assignedAgent?.name ?? "Sem responsável"}</span>
                </div>
                <button
                  onClick={() => setTransferOpen(true)}
                  className="ml-1 flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-accent transition-colors border-l border-border pl-2"
                  title="Transferir conversa"
                >
                  <ArrowRightLeft className="w-3 h-3" /> Transferir
                </button>
              </div>

              <div className="flex items-center gap-1">
                {activeConv.phone && (
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm text-muted-foreground hover:text-foreground">
                    <Phone className="w-3.5 h-3.5" />
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm text-muted-foreground hover:text-foreground">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-sm text-sm">
                    <DropdownMenuItem>Ver perfil do contato</DropdownMenuItem>
                    <DropdownMenuItem>Abrir chamado vinculado</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setTransferOpen(true)}>
                      <ArrowRightLeft className="w-3.5 h-3.5 mr-2" /> Transferir conversa
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Marcar como resolvida</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Arquivar conversa</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Channel-specific content */}
          {activeConv.channel === "email" ? (
            <EmailThread conv={activeConv} messages={messages} onSend={handleSendEmail} />
          ) : (
            <WhatsAppChat conv={activeConv} messages={messages} onSend={handleSendWA} />
          )}
        </div>
      </div>

      <ChannelManagerDialog open={channelManagerOpen} onClose={() => setChannelManagerOpen(false)} />
      <TransferDialog
        open={transferOpen}
        onClose={() => setTransferOpen(false)}
        currentAgent={assignedAgent}
        onTransfer={handleTransfer}
      />
    </div>
  );
}
