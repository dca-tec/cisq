import { AdminCrudTable } from "./AdminCrudTable";

export function AdminProfessionals() {
  return (
    <AdminCrudTable
      table="professionals"
      title="Profissionais"
      fields={[
        { name: "name", label: "Nome", required: true },
        { name: "specialty", label: "Especialidade", required: true },
        { name: "bio", label: "Biografia", type: "textarea" },
        { name: "image_url", label: "URL da Foto" },
        { name: "is_active", label: "Ativo", type: "checkbox" },
      ]}
      columns={[
        { key: "name", label: "Nome" },
        { key: "specialty", label: "Especialidade" },
        { key: "is_active", label: "Ativo", render: (v) => v ? "✓" : "✗" },
      ]}
    />
  );
}
