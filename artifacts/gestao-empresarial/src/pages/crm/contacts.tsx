import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contatos</h1>
          <p className="text-muted-foreground mt-1">{contacts.length} contatos cadastrados</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Upload className="w-4 h-4 mr-2" />Importar CSV</Button>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Exportar</Button>
          <Button size="sm"><Plus className="w-4 h-4 mr-2" />Novo Contato</Button>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar por nome, empresa ou e-mail..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-search-contacts" />
        </div>
        <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contato</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Último Contato</TableHead>
                <TableHead>Engajamento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(contact => (
                <TableRow key={contact.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <Link href={`/crm/contacts/${contact.id}`} className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium" data-testid={`text-contact-name-${contact.id}`}>{contact.name}</div>
                        <div className="text-xs text-muted-foreground">{contact.company}</div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm">{contact.email}</TableCell>
                  <TableCell className="text-sm">{contact.phone}</TableCell>
                  <TableCell><Badge variant={statusColors[contact.status] || "outline"}>{contact.status}</Badge></TableCell>
                  <TableCell className="text-sm">{contact.responsible}</TableCell>
                  <TableCell className="text-sm">{contact.lastContact}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={contact.score} className="w-16 h-2" />
                      <span className="text-xs text-muted-foreground">{contact.score}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
