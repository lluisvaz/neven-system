import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Eye, FileText, File, FileSpreadsheet, FileImage } from "lucide-react";

const documents = [
  { name: "Contrato Anual 2026.pdf", type: "Contrato", size: "2.4 MB", date: "01/01/2026", icon: FileText },
  { name: "NF Abril-2026.pdf", type: "Nota Fiscal", size: "145 KB", date: "01/04/2026", icon: File },
  { name: "NF Março-2026.pdf", type: "Nota Fiscal", size: "142 KB", date: "01/03/2026", icon: File },
  { name: "Proposta Upgrade Enterprise.pdf", type: "Proposta", size: "1.8 MB", date: "15/03/2026", icon: FileText },
  { name: "Relatório Mensal - Março.xlsx", type: "Relatório", size: "856 KB", date: "05/04/2026", icon: FileSpreadsheet },
  { name: "Certificado de Treinamento.png", type: "Certificado", size: "3.2 MB", date: "20/02/2026", icon: FileImage },
  { name: "NF Fevereiro-2026.pdf", type: "Nota Fiscal", size: "140 KB", date: "01/02/2026", icon: File },
  { name: "SLA e Termos de Serviço.pdf", type: "Legal", size: "520 KB", date: "01/01/2026", icon: FileText },
];

export function PortalDocumentsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight">Documentos</h1><p className="text-muted-foreground mt-1">{documents.length} documentos compartilhados</p></div>

      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar documentos..." className="pl-9" data-testid="input-search-documents" /></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors">
            <CardContent className="pt-4 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-muted flex-shrink-0"><doc.icon className="w-5 h-5 text-muted-foreground" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{doc.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                  <span className="text-xs text-muted-foreground">{doc.size}</span>
                  <span className="text-xs text-muted-foreground">{doc.date}</span>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon"><Download className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
