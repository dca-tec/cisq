import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export function AdminUsers() {
  const { data: profiles, isLoading } = useSupabaseQuery("profiles", { order: { column: "created_at", ascending: false } });
  const { data: roles } = useSupabaseQuery("user_roles");

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  const getRoles = (userId: string) => roles?.filter((r: any) => r.user_id === userId).map((r: any) => r.role).join(", ") || "client";

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Usuários ({profiles?.length || 0})</h2>
      <div className="border rounded-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Papel</TableHead>
              <TableHead>Cadastro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles?.map((p: any) => (
              <TableRow key={p.id}>
                <TableCell>{p.first_name} {p.last_name}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell className="capitalize">{getRoles(p.id)}</TableCell>
                <TableCell>{new Date(p.created_at).toLocaleDateString("pt-BR")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
