import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useSupabaseQuery, useSupabaseInsert, useSupabaseUpdate, useSupabaseDelete } from "@/hooks/useSupabaseQuery";
import { useToast } from "@/hooks/use-toast";

export interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea" | "checkbox" | "select";
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface AdminCrudTableProps {
  table: any;
  title: string;
  fields: FieldDef[];
  columns: { key: string; label: string; render?: (value: any, row: any) => React.ReactNode }[];
  select?: string;
}

export function AdminCrudTable({ table, title, fields, columns, select }: AdminCrudTableProps) {
  const { data, isLoading } = useSupabaseQuery(table, { select, order: { column: "created_at", ascending: false } });
  const insert = useSupabaseInsert(table);
  const update = useSupabaseUpdate(table);
  const remove = useSupabaseDelete(table);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState<Record<string, any>>({});

  const openCreate = () => {
    setEditItem(null);
    const defaults: Record<string, any> = {};
    fields.forEach((f) => {
      defaults[f.name] = f.type === "checkbox" ? false : f.type === "number" ? 0 : "";
    });
    setForm(defaults);
    setOpen(true);
  };

  const openEdit = (item: any) => {
    setEditItem(item);
    const values: Record<string, any> = {};
    fields.forEach((f) => { values[f.name] = item[f.name] ?? (f.type === "checkbox" ? false : ""); });
    setForm(values);
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editItem) {
        await update.mutateAsync({ id: editItem.id, ...form });
        toast({ title: "Atualizado com sucesso" });
      } else {
        await insert.mutateAsync(form);
        toast({ title: "Criado com sucesso" });
      }
      setOpen(false);
    } catch (err: any) {
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    try {
      await remove.mutateAsync(id);
      toast({ title: "Excluído com sucesso" });
    } catch (err: any) {
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    }
  };

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{title}</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={openCreate}><Plus className="h-4 w-4 mr-1" />Adicionar</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editItem ? "Editar" : "Novo"} {title}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.name} className="space-y-1">
                  <Label>{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} required={field.required} />
                  ) : field.type === "checkbox" ? (
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={form[field.name] || false} onChange={(e) => setForm({ ...form, [field.name]: e.target.checked })} className="h-4 w-4" />
                      <span className="text-sm">{field.label}</span>
                    </div>
                  ) : field.type === "select" ? (
                    <select value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} className="w-full border rounded-sm p-2 bg-background" required={field.required}>
                      <option value="">Selecione</option>
                      {field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  ) : (
                    <Input type={field.type || "text"} value={form[field.name] ?? ""} onChange={(e) => setForm({ ...form, [field.name]: field.type === "number" ? Number(e.target.value) : e.target.value })} required={field.required} />
                  )}
                </div>
              ))}
              <Button type="submit" className="w-full" disabled={insert.isPending || update.isPending}>
                {(insert.isPending || update.isPending) ? "Salvando..." : "Salvar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {(!data || data.length === 0) ? (
        <p className="text-muted-foreground text-center py-8">Nenhum item encontrado.</p>
      ) : (
        <div className="border rounded-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => <TableHead key={col.key}>{col.label}</TableHead>)}
                <TableHead className="w-24">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any) => (
                <TableRow key={item.id}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render ? col.render(item[col.key], item) : String(item[col.key] ?? "")}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
