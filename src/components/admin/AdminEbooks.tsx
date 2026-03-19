import { AdminCrudTable } from "./AdminCrudTable";

export function AdminEbooks() {
  return (
    <AdminCrudTable
      table="ebooks"
      title="E-books"
      fields={[
        { name: "title", label: "Título", required: true },
        { name: "slug", label: "Slug (URL)", required: true },
        { name: "author", label: "Autor", required: true },
        { name: "description", label: "Descrição", type: "textarea" },
        { name: "price", label: "Preço (R$)", type: "number" },
        { name: "cover_url", label: "URL da Capa" },
        { name: "file_url", label: "URL do Arquivo" },
        { name: "is_free", label: "Gratuito", type: "checkbox" },
        { name: "is_active", label: "Ativo", type: "checkbox" },
      ]}
      columns={[
        { key: "title", label: "Título" },
        { key: "author", label: "Autor" },
        { key: "price", label: "Preço", render: (v) => `R$ ${Number(v).toFixed(2)}` },
        { key: "is_free", label: "Gratuito", render: (v) => v ? "✓" : "✗" },
        { key: "is_active", label: "Ativo", render: (v) => v ? "✓" : "✗" },
      ]}
    />
  );
}
