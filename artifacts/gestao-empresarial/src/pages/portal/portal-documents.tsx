import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Eye, FileText, File, FileSpreadsheet, FileImage } from "lucide-react";

const documents = [
  { id: 1, name: "Contrato Anual 2026.pdf", type: "Contrato", size: "2.4 MB", date: "01/01/2026", icon: FileText },
  { id: 2, name: "NF Abril-2026.pdf", type: "Nota Fiscal", size: "145 KB", date: "01/04/2026", icon: File },
  { id: 3, name: "NF Março-2026.pdf", type: "Nota Fiscal", size: "142 KB", date: "01/03/2026", icon: File },
  { id: 4, name: "Proposta Upgrade Enterprise.pdf", type: "Proposta", size: "1.8 MB", date: "15/03/2026", icon: FileText },
  { id: 5, name: "Relatório Mensal - Março.xlsx", type: "Relatório", size: "856 KB", date: "05/04/2026", icon: FileSpreadsheet },
  { id: 6, name: "Certificado de Treinamento.png", type: "Certificado", size: "3.2 MB", date: "20/02/2026", icon: FileImage },
  { id: 7, name: "NF Fevereiro-2026.pdf", type: "Nota Fiscal", size: "140 KB", date: "01/02/2026", icon: File },
  { id: 8, name: "SLA e Termos de Serviço.pdf", type: "Legal", size: "520 KB", date: "01/01/2026", icon: FileText },
];

export function PortalDocumentsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Documentos</h1>
        <p className="text-sm font-mono text-muted-foreground mt-1">Arquivos e contratos compartilhados com você</p>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar por nome, tipo..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" data-testid="input-search-documents" />
        </div>
      </div>

      <div className="border border-border rounded-sm overflow-hidden bg-card">
        <div className="overflow-x-auto no-scrollbar">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-12"></TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Nome do Arquivo</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 hidden sm:table-cell">Tipo</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 hidden md:table-cell">Tamanho</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 hidden sm:table-cell">Data</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id} className="hover:bg-muted/30 transition-colors group cursor-pointer">
                <TableCell className="py-4">
                  <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center">
                    <doc.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="text-sm font-medium group-hover:text-accent transition-colors">{doc.name}</div>
                </TableCell>
                <TableCell className="py-4 hidden sm:table-cell">
                  <Badge variant="outline" className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                    {doc.type}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-sm font-mono text-muted-foreground hidden md:table-cell">{doc.size}</TableCell>
                <TableCell className="py-4 text-sm font-mono text-muted-foreground hidden sm:table-cell">{doc.date}</TableCell>
                <TableCell className="py-4 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm" title="Visualizar">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm text-accent hover:text-accent hover:bg-accent/10" title="Baixar">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>
    </div>
  );
}
