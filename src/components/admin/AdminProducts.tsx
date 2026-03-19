import { AdminCrudTable } from "./AdminCrudTable";

export function AdminProducts() {
  return (
    <AdminCrudTable
      table="products"
      title="Produtos"
      fields={[
        { name: "name", label: "Nome", required: true },
        { name: "slug", label: "Slug (URL)", required: true },
        { name: "category", label: "Categoria", required: true },
        { name: "description", label: "Descrição", type: "textarea" },
        { name: "long_description", label: "Descrição Longa", type: "textarea" },
        { name: "price", label: "Preço (R$)", type: "number", required: true },
        { name: "stock", label: "Estoque", type: "number" },
        { name: "image_url", label: "URL da Imagem" },
        { name: "is_active", label: "Ativo", type: "checkbox" },
      ]}
      columns={[
        { key: "name", label: "Nome" },
        { key: "category", label: "Categoria" },
        { key: "price", label: "Preço", render: (v) => `R$ ${Number(v).toFixed(2)}` },
        { key: "stock", label: "Estoque" },
        { key: "is_active", label: "Ativo", render: (v) => v ? "✓" : "✗" },
      ]}
    />
  );
}
