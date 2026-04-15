import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Upload, Download, Filter } from "lucide-react";
import { Link } from "wouter";

const contacts = [
  { id: "1", name: "João Silva", company: "Tech Solutions Ltda", email: "joao@techsolutions.com.br", phone: "+55 11 99887-6655", status: "Cliente Ativo", responsible: "Maria Santos", lastContact: "12/04/2026", score: 85 },
  { id: "2", name: "Ana Oliveira", company: "Nexus Digital", email: "ana@nexusdigital.com.br", phone: "+55 21 98765-4321", status: "Lead Quente", responsible: "Carlos Lima", lastContact: "10/04/2026", score: 72 },
  { id: "3", name: "Pedro Costa", company: "Innovare Consultoria", email: "pedro@innovare.com.br", phone: "+55 31 97654-3210", status: "Prospect", responsible: "Maria Santos", lastContact: "08/04/2026", score: 45 },
  { id: "4", name: "Fernanda Souza", company: "Criativa Design", email: "fernanda@criativa.com.br", phone: "+55 41 96543-2109", status: "Cliente Ativo", responsible: "Rafael Mendes", lastContact: "14/04/2026", score: 92 },
  { id: "5", name: "Ricardo Almeida", company: "DataFlow Sistemas", email: "ricardo@dataflow.com.br", phone: "+55 51 95432-1098", status: "Lead Frio", responsible: "Carlos Lima", lastContact: "01/04/2026", score: 18 },
  { id: "6", name: "Camila Rocha", company: "Verde Energia", email: "camila@verdeenergia.com.br", phone: "+55 11 94321-0987", status: "Cliente Inativo", responsible: "Maria Santos", lastContact: "15/03/2026", score: 30 },
  { id: "7", name: "Marcos Ferreira", company: "LogiTech BR", email: "marcos@logitech.com.br", phone: "+55 21 93210-9876", status: "Cliente Ativo", responsible: "Rafael Mendes", lastContact: "13/04/2026", score: 78 },
  { id: "8", name: "Juliana Martins", company: "Saúde+ Clínicas", email: "juliana@saudemais.com.br", phone: "+55 31 92109-8765", status: "Lead Quente", responsible: "Carlos Lima", lastContact: "11/04/2026", score: 65 },
];

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  "Cliente Ativo": "default",
  "Lead Quente": "secondary",
  "Prospect": "outline",
  "Lead Frio": "outline",
  "Cliente Inativo": "destructive",
};

export function ContactsPage() {
  const [search, setSearch] = useState("");
  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Contatos</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">{contacts.length} registros</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-sm"><Upload className="w-3.5 h-3.5 mr-2" />Importar</Button>
          <Button variant="outline" size="sm" className="rounded-sm"><Download className="w-3.5 h-3.5 mr-2" />Exportar</Button>
          <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Novo</Button>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por nome, empresa ou e-mail..." 
            className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            data-testid="input-search-contacts" 
          />
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Contato</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">E-mail</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Telefone</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Status</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Responsável</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Último Contato</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(contact => (
              <TableRow key={contact.id} className="cursor-pointer hover:bg-muted/30 transition-colors">
                <TableCell className="py-3">
                  <Link href={`/crm/contacts/${contact.id}`} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 rounded-sm">
                      <AvatarFallback className="text-[10px] font-mono bg-secondary text-secondary-foreground rounded-sm">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm text-foreground hover:text-accent transition-colors" data-testid={`text-contact-name-${contact.id}`}>
                        {contact.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{contact.company}</div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-sm py-3">{contact.email}</TableCell>
                <TableCell className="text-sm font-mono py-3">{contact.phone}</TableCell>
                <TableCell className="py-3">
                  <Badge variant={statusColors[contact.status] || "outline"} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                    {contact.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm py-3 text-muted-foreground">{contact.responsible}</TableCell>
                <TableCell className="text-sm font-mono py-3 text-right text-muted-foreground">{contact.lastContact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
