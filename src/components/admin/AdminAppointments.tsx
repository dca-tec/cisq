import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export function AdminAppointments() {
  const { data, isLoading } = useSupabaseQuery("appointments", {
    select: "*, professionals(name), consultation_types(name), profiles:user_id(first_name, last_name, email)",
    order: { column: "appointment_date", ascending: false },
  });

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Agendamentos ({data?.length || 0})</h2>
      {!data || data.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Nenhum agendamento encontrado.</p>
      ) : (
        <div className="border rounded-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Profissional</TableHead>
                <TableHead>Consulta</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((apt: any) => (
                <TableRow key={apt.id}>
                  <TableCell>{apt.profiles?.first_name} {apt.profiles?.last_name}</TableCell>
                  <TableCell>{apt.professionals?.name}</TableCell>
                  <TableCell>{apt.consultation_types?.name}</TableCell>
                  <TableCell>{new Date(apt.appointment_date).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{apt.appointment_time}</TableCell>
                  <TableCell className="capitalize">{apt.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
