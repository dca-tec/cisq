import { AdminCrudTable } from "./AdminCrudTable";

export function AdminProtocols() {
  return (
    <AdminCrudTable
      table="protocols"
      title="Protocolos"
      fields={[
        { name: "name", label: "Nome", required: true },
        { name: "slug", label: "Slug (URL)", required: true },
        { name: "type", label: "Tipo", required: true },
        { name: "duration", label: "Duração" },
        { name: "description", label: "Descrição", type: "textarea" },
        { name: "price", label: "Preço (R$)", type: "number", required: true },
        { name: "image_url", label: "URL da Imagem" },
        { name: "is_paid", label: "Pago", type: "checkbox" },
        { name: "is_active", label: "Ativo", type: "checkbox" },
      ]}
      columns={[
        { key: "name", label: "Nome" },
        { key: "type", label: "Tipo" },
        { key: "price", label: "Preço", render: (v) => `R$ ${Number(v).toFixed(2)}` },
        { key: "is_paid", label: "Pago", render: (v) => v ? "✓" : "Gratuito" },
        { key: "is_active", label: "Ativo", render: (v) => v ? "✓" : "✗" },
      ]}
    />
  );
}
