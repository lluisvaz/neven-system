import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search, Send, Mail, MessageSquare, Phone, MoreVertical, Paperclip,
  Plus, Settings, Wifi, WifiOff, ChevronDown, ChevronRight, Filter,
  RefreshCw, QrCode, Trash2, CheckCheck, Check, X, AlertCircle, Smile,
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
}

interface Message {
  id: number;
  author: string;
  role: "agent" | "client";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
  channel: ChannelType;
  whatsappInstanceId?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const whatsappInstances: WhatsAppInstance[] = [
  { id: "wa-1", name: "Comercial", number: "+55 11 98765-4321", status: "connected", profileName: "Empresa Comercial", unreadTotal: 3 },
  { id: "wa-2", name: "Suporte", number: "+55 21 99887-6655", status: "connected", profileName: "Suporte Técnico", unreadTotal: 1 },
  { id: "wa-3", name: "Financeiro", number: "+55 11 91234-5678", status: "disconnected", unreadTotal: 0 },
];

const conversations: Conversation[] = [
  { id: 1, contact: "João Silva", company: "Tech Solutions Ltda", lastMessage: "Entendido, vou revisar a proposta e retorno até sexta.", channel: "whatsapp", whatsappInstanceId: "wa-1", unread: 0, time: "14:32", phone: "+55 11 99001-1234" },
  { id: 2, contact: "Ana Oliveira", company: "Nexus Digital", lastMessage: "Podemos agendar uma call para discutir o upgrade?", channel: "email", unread: 1, time: "11:45", email: "ana@nexusdigital.com.br" },
  { id: 3, contact: "Pedro Costa", company: "Innovare Consultoria", lastMessage: "O boleto da parcela 3 foi gerado?", channel: "whatsapp", whatsappInstanceId: "wa-2", unread: 2, time: "10:20", phone: "+55 21 98765-0001" },
  { id: 4, contact: "Fernanda Souza", company: "Criativa Design", lastMessage: "Perfeito, muito obrigada pelo suporte!", channel: "whatsapp", whatsappInstanceId: "wa-1", unread: 0, time: "Ontem", phone: "+55 11 97654-3210" },
  { id: 5, contact: "Marcos Ferreira", company: "LogiTech BR", lastMessage: "Segue em anexo o documento solicitado.", channel: "email", unread: 0, time: "Ontem", email: "marcos@logitech.com.br" },
  { id: 6, contact: "Camila Rocha", company: "Verde Energia", lastMessage: "Estou com problemas para logar, podem ajudar?", channel: "whatsapp", whatsappInstanceId: "wa-1", unread: 1, time: "Segunda", phone: "+55 11 92222-3333" },
  { id: 7, contact: "Rafael Nunes", company: "DataBrasil", lastMessage: "Recebi a nota fiscal, obrigado.", channel: "whatsapp", whatsappInstanceId: "wa-2", unread: 0, time: "Segunda", phone: "+55 21 93333-4444" },
  { id: 8, contact: "Lucia Mendes", company: "AgroMax Ltda", lastMessage: "Re: Contrato de Renovação — anexo", channel: "email", unread: 2, time: "Dom.", email: "lucia@agromax.com.br" },
];

const messagesData: Record<number, Message[]> = {
  1: [
    { id: 1, author: "Maria Santos", role: "agent", text: "Olá João! Segue a proposta atualizada conforme conversamos. O valor do plano Enterprise com o módulo Analytics incluso ficou em R$ 15.500/mês.", time: "14:15", status: "read", channel: "whatsapp", whatsappInstanceId: "wa-1" },
    { id: 2, author: "João Silva", role: "client", text: "Recebido, Maria. Vou analisar com o time financeiro.", time: "14:20", channel: "whatsapp", whatsappInstanceId: "wa-1" },
    { id: 3, author: "João Silva", role: "client", text: "Entendido, vou revisar a proposta e retorno até sexta.", time: "14:32", channel: "whatsapp", whatsappInstanceId: "wa-1" },
  ],
  2: [
    { id: 1, author: "Carlos Souza", role: "agent", text: "Olá Ana, tudo bem? Gostaríamos de apresentar as novidades do plano Enterprise.", time: "10:00", status: "read", channel: "email" },
    { id: 2, author: "Ana Oliveira", role: "client", text: "Boa tarde! Podemos agendar uma call para discutir o upgrade?", time: "11:45", channel: "email" },
  ],
  3: [
    { id: 1, author: "Suporte", role: "agent", text: "Olá Pedro! Em que podemos ajudar hoje?", time: "10:00", status: "read", channel: "whatsapp", whatsappInstanceId: "wa-2" },
    { id: 2, author: "Pedro Costa", role: "client", text: "O boleto da parcela 3 foi gerado?", time: "10:20", channel: "whatsapp", whatsappInstanceId: "wa-2" },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusDot({ status }: { status: WhatsAppInstance["status"] }) {
  const colors = { connected: "bg-emerald-500", disconnected: "bg-red-400", connecting: "bg-yellow-400 animate-pulse" };
  return <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${colors[status]}`} />;
}

function ChannelBadge({ channel, instanceId }: { channel: ChannelType; instanceId?: string }) {
  const inst = whatsappInstances.find(i => i.id === instanceId);
  if (channel === "whatsapp") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
        <MessageSquare className="w-3 h-3" />
        WA{inst ? ` · ${inst.name}` : ""}
      </span>
    );
  }
  if (channel === "email") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-blue-500">
        <Mail className="w-3 h-3" /> E-mail
      </span>
    );
  }
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

// ─── Channel Manager Dialog ───────────────────────────────────────────────────

function ChannelManagerDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [instances, setInstances] = useState<WhatsAppInstance[]>(whatsappInstances);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    const newInst: WhatsAppInstance = {
      id: `wa-${Date.now()}`,
      name: newName.trim(),
      number: newNumber.trim() || "Aguardando QR Code",
      status: "connecting",
      unreadTotal: 0,
    };
    setInstances(prev => [...prev, newInst]);
    setNewName("");
    setNewNumber("");
    setAdding(false);
  };

  const handleDelete = (id: string) => {
    setInstances(prev => prev.filter(i => i.id !== id));
  };

  const statusLabel: Record<WhatsAppInstance["status"], string> = {
    connected: "Conectado",
    disconnected: "Desconectado",
    connecting: "Aguardando QR",
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Gerenciar Canais Conectados</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Gerencie os números de WhatsApp e outros canais. A integração com a Evolution API está pronta para ser ativada.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Email channel — always present */}
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
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600">
              <StatusDot status="connected" /> Ativo
            </span>
          </div>

          {/* WhatsApp instances */}
          <div className="space-y-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">WhatsApp — Evolution API</p>
              <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-sm">
                {instances.filter(i => i.status === "connected").length}/{instances.length} conectados
              </span>
            </div>

            {instances.map((inst) => (
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
                  {inst.status === "disconnected" || inst.status === "connecting" ? (
                    <Button variant="ghost" size="icon" className="w-7 h-7 rounded-sm text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity" title="Gerar QR Code">
                      <QrCode className="w-3.5 h-3.5" />
                    </Button>
                  ) : (
                    <Button variant="ghost" size="icon" className="w-7 h-7 rounded-sm text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity" title="Reconectar">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="w-7 h-7 rounded-sm text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(inst.id)} title="Remover">
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
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Nome da instância</Label>
                    <Input
                      placeholder="Ex: Vendas"
                      className="rounded-sm h-8 text-sm"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Número (opcional)</Label>
                    <Input
                      placeholder="+55 11 99999-9999"
                      className="rounded-sm h-8 text-sm font-mono"
                      value={newNumber}
                      onChange={(e) => setNewNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-sm flex gap-2 items-start">
                  <AlertCircle className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-yellow-700 dark:text-yellow-400">
                    Para conectar, configure <code className="font-mono">VITE_EVOLUTION_API_URL</code> e <code className="font-mono">VITE_EVOLUTION_API_KEY</code> nas variáveis de ambiente. Um QR Code será gerado para vinculação.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="rounded-sm h-8 text-xs px-4" onClick={handleAdd}>Criar instância</Button>
                  <Button size="sm" variant="ghost" className="rounded-sm h-8 text-xs" onClick={() => setAdding(false)}>Cancelar</Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setAdding(true)}
                className="w-full flex items-center gap-2 p-3 border border-dashed border-border rounded-sm text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                <Plus className="w-4 h-4" />
                Adicionar número de WhatsApp
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type FilterOption =
  | { type: "all" }
  | { type: "channel"; channel: ChannelType }
  | { type: "whatsapp-instance"; id: string };

function filterLabel(f: FilterOption): string {
  if (f.type === "all") return "Todos";
  if (f.type === "channel" && f.channel === "email") return "E-mail";
  if (f.type === "channel" && f.channel === "phone") return "Telefone";
  if (f.type === "whatsapp-instance") {
    const inst = whatsappInstances.find(i => i.id === f.id);
    return `WA · ${inst?.name ?? f.id}`;
  }
  return "WhatsApp";
}

function filterMatch(conv: Conversation, filter: FilterOption): boolean {
  if (filter.type === "all") return true;
  if (filter.type === "channel") return conv.channel === filter.channel;
  if (filter.type === "whatsapp-instance") return conv.channel === "whatsapp" && conv.whatsappInstanceId === filter.id;
  return true;
}

export function CommunicationsPage() {
  const [selectedId, setSelectedId] = useState<number>(conversations[0].id);
  const [activeFilter, setActiveFilter] = useState<FilterOption>({ type: "all" });
  const [search, setSearch] = useState("");
  const [channelManagerOpen, setChannelManagerOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyInstance, setReplyInstance] = useState<string>(whatsappInstances[0].id);
  const [localMessages, setLocalMessages] = useState<Record<number, Message[]>>(messagesData);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === selectedId) ?? conversations[0];
  const messages = localMessages[activeConv.id] ?? [];

  const filtered = conversations.filter(conv => {
    const matchFilter = filterMatch(conv, activeFilter);
    const q = search.toLowerCase();
    const matchSearch = !q || conv.contact.toLowerCase().includes(q) || conv.company.toLowerCase().includes(q) || conv.lastMessage.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = replyText.trim();
    if (!text) return;
    const newMsg: Message = {
      id: Date.now(),
      author: "Você",
      role: "agent",
      text,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
      channel: activeConv.channel,
      whatsappInstanceId: activeConv.channel === "whatsapp" ? replyInstance : undefined,
    };
    setLocalMessages(prev => ({
      ...prev,
      [activeConv.id]: [...(prev[activeConv.id] ?? []), newMsg],
    }));
    setReplyText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const totalUnread = conversations.reduce((acc, c) => acc + c.unread, 0);

  // Build filter options
  const filterOptions: FilterOption[] = [
    { type: "all" },
    { type: "channel", channel: "email" },
    ...whatsappInstances.map(inst => ({ type: "whatsapp-instance" as const, id: inst.id })),
  ];

  const filterKey = (f: FilterOption) =>
    f.type === "all" ? "all" : f.type === "channel" ? f.channel : f.id;

  const isActive = (f: FilterOption) => filterKey(f) === filterKey(activeFilter);

  const activeInstanceForReply = activeConv.channel === "whatsapp"
    ? whatsappInstances.find(i => i.id === replyInstance)
    : null;

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between flex-shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">Comunicações</h1>
            {totalUnread > 0 && (
              <Badge className="rounded-sm px-2 py-0.5 text-xs bg-accent text-accent-foreground">
                {totalUnread} não lidas
              </Badge>
            )}
          </div>
          <p className="text-sm font-mono text-muted-foreground mt-1">Caixa de entrada unificada — WhatsApp, E-mail</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-sm text-xs gap-1.5" onClick={() => setChannelManagerOpen(true)}>
            <Settings className="w-3.5 h-3.5" />
            Canais
            <span className="flex items-center gap-1 ml-1">
              {whatsappInstances.map(inst => (
                <StatusDot key={inst.id} status={inst.status} />
              ))}
            </span>
          </Button>
          <Button size="sm" className="rounded-sm text-xs gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            Nova Conversa
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
              <Input
                placeholder="Buscar conversas..."
                className="pl-9 rounded-sm border-muted-foreground/20 bg-background h-8 text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
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
                else if (opt.type === "whatsapp-instance") {
                  const inst = whatsappInstances.find(i => i.id === opt.id);
                  unread = inst?.unreadTotal ?? 0;
                }

                return (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(opt)}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-sm text-[11px] font-mono border transition-all ${
                      active
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    {opt.type === "whatsapp-instance" && (
                      <StatusDot status={whatsappInstances.find(i => i.id === opt.id)?.status ?? "disconnected"} />
                    )}
                    {filterLabel(opt)}
                    {unread > 0 && (
                      <span className={`ml-0.5 rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold ${active ? "bg-accent-foreground/20 text-accent-foreground" : "bg-accent text-accent-foreground"}`}>
                        {unread}
                      </span>
                    )}
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
            ) : (
              filtered.map((conv) => {
                const isSelected = selectedId === conv.id;
                const inst = whatsappInstances.find(i => i.id === conv.whatsappInstanceId);

                return (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedId(conv.id)}
                    className={`p-3.5 border-b border-border/50 cursor-pointer transition-colors ${
                      isSelected ? "bg-accent/5 border-l-2 border-l-accent" : "hover:bg-muted/30 border-l-2 border-l-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-9 h-9 rounded-sm mt-0.5 flex-shrink-0">
                        <AvatarFallback className={`text-[10px] font-mono rounded-sm ${isSelected ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
                          {conv.contact.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className={`text-sm truncate ${conv.unread > 0 ? "font-semibold text-foreground" : "font-medium"}`}>
                            {conv.contact}
                          </p>
                          <span className="text-[10px] font-mono text-muted-foreground flex-shrink-0 ml-2">{conv.time}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate mb-1">{conv.company}</p>
                        <div className="flex items-center gap-1.5">
                          {conv.channel === "whatsapp" ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                              <MessageSquare className="w-2.5 h-2.5" />
                              {inst?.name ?? "WA"}
                            </span>
                          ) : conv.channel === "email" ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-blue-500 flex-shrink-0">
                              <Mail className="w-2.5 h-2.5" /> Email
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground flex-shrink-0">
                              <Phone className="w-2.5 h-2.5" /> Tel
                            </span>
                          )}
                          <span className="text-muted-foreground/40 text-[10px]">·</span>
                          <p className={`text-[11px] truncate ${conv.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                            {conv.lastMessage}
                          </p>
                        </div>
                      </div>
                      {conv.unread > 0 && (
                        <span className="ml-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT: Active conversation */}
        <div className="lg:col-span-8 flex flex-col h-full bg-background relative min-h-0">

          {/* Conversation header */}
          <div className="px-5 py-3.5 border-b border-border flex items-center justify-between bg-card flex-shrink-0">
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
                    <>
                      <span className="text-[10px] text-muted-foreground/40">·</span>
                      <span className="text-[11px] font-mono text-muted-foreground">{activeConv.phone ?? activeConv.email}</span>
                    </>
                  )}
                </div>
              </div>
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
                  <DropdownMenuItem>Marcar como resolvida</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">Arquivar conversa</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-muted/5 min-h-0">
            <div className="flex justify-center">
              <span className="text-[10px] font-mono uppercase tracking-wider bg-muted/50 px-2 py-1 rounded-sm text-muted-foreground">Hoje</span>
            </div>

            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2">
                <MessageSquare className="w-8 h-8 opacity-20" />
                <p className="text-xs">Nenhuma mensagem ainda. Inicie a conversa!</p>
              </div>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === "agent" ? "justify-end" : "justify-start"}`}>
                  <div className="flex flex-col gap-1 max-w-[72%]">
                    <div className={`flex items-baseline gap-2 ${msg.role === "agent" ? "justify-end" : "justify-start"} px-1`}>
                      <span className="text-[11px] font-medium text-muted-foreground">{msg.author}</span>
                    </div>
                    <div className={`p-3.5 text-sm leading-relaxed rounded-sm ${
                      msg.role === "agent"
                        ? "bg-accent/10 border border-accent/20 text-foreground rounded-tr-none"
                        : "bg-card border border-border rounded-tl-none"
                    }`}>
                      {msg.text}
                    </div>
                    <div className={`flex items-center gap-1.5 px-1 ${msg.role === "agent" ? "justify-end" : "justify-start"}`}>
                      <span className="text-[10px] font-mono text-muted-foreground">{msg.time}</span>
                      {msg.role === "agent" && <MessageStatus status={msg.status} />}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Reply area */}
          <div className="p-4 border-t border-border bg-card flex-shrink-0">
            {/* Instance selector for WhatsApp */}
            {activeConv.channel === "whatsapp" && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Responder via:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border border-border bg-muted/30 text-[11px] font-mono hover:bg-muted/60 transition-colors">
                      <StatusDot status={activeInstanceForReply?.status ?? "disconnected"} />
                      {activeInstanceForReply ? `WA · ${activeInstanceForReply.name} (${activeInstanceForReply.number})` : "Selecionar número"}
                      <ChevronDown className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="rounded-sm text-sm min-w-[220px]">
                    {whatsappInstances.map(inst => (
                      <DropdownMenuItem
                        key={inst.id}
                        onClick={() => setReplyInstance(inst.id)}
                        className="flex items-center gap-2"
                        disabled={inst.status === "disconnected"}
                      >
                        <StatusDot status={inst.status} />
                        <div>
                          <p className="text-xs font-medium">{inst.name}</p>
                          <p className="text-[10px] text-muted-foreground font-mono">{inst.number}</p>
                        </div>
                        {replyInstance === inst.id && <Check className="w-3.5 h-3.5 ml-auto text-accent" />}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setChannelManagerOpen(true)} className="text-xs text-muted-foreground">
                      <Plus className="w-3.5 h-3.5 mr-2" /> Gerenciar números
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            <div className="border border-border rounded-sm overflow-hidden focus-within:ring-1 focus-within:ring-accent focus-within:border-accent transition-all flex flex-col">
              <Textarea
                placeholder={`Mensagem para ${activeConv.contact}...`}
                className="border-0 rounded-none focus-visible:ring-0 resize-none min-h-[72px] p-3 text-sm bg-transparent"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="flex items-center justify-between p-2 bg-muted/20 border-t border-border">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="w-7 h-7 rounded-sm text-muted-foreground hover:text-foreground">
                    <Paperclip className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-7 h-7 rounded-sm text-muted-foreground hover:text-foreground">
                    <Smile className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <Button
                  size="sm"
                  className="rounded-sm h-7 px-4 text-xs gap-1.5"
                  onClick={handleSend}
                  disabled={!replyText.trim()}
                >
                  <Send className="w-3 h-3" />
                  Enviar
                </Button>
              </div>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground mt-1.5 px-1">
              Enter para enviar · Shift+Enter para quebrar linha
            </p>
          </div>
        </div>
      </div>

      <ChannelManagerDialog open={channelManagerOpen} onClose={() => setChannelManagerOpen(false)} />
    </div>
  );
}
