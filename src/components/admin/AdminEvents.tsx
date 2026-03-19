import { AdminCrudTable } from "./AdminCrudTable";

export function AdminEvents() {
  return (
    <AdminCrudTable
      table="events"
      title="Eventos"
      fields={[
        { name: "title", label: "Título", required: true },
        { name: "slug", label: "Slug (URL)", required: true },
        { name: "description", label: "Descrição", type: "textarea" },
        { name: "event_date", label: "Data do Evento", required: true },
        { name: "location", label: "Local" },
        { name: "is_online", label: "Online", type: "checkbox" },
        { name: "price", label: "Preço (R$)", type: "number" },
        { name: "max_participants", label: "Máx. Participantes", type: "number" },
        { name: "image_url", label: "URL da Imagem" },
        { name: "is_active", label: "Ativo", type: "checkbox" },
      ]}
      columns={[
        { key: "title", label: "Título" },
        { key: "event_date", label: "Data", render: (v) => new Date(v).toLocaleDateString("pt-BR") },
        { key: "location", label: "Local" },
        { key: "is_online", label: "Online", render: (v) => v ? "✓" : "Presencial" },
        { key: "is_active", label: "Ativo", render: (v) => v ? "✓" : "✗" },
      ]}
    />
  );
}
