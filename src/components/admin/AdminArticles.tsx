import { AdminCrudTable } from "./AdminCrudTable";

export function AdminArticles() {
  return (
    <AdminCrudTable
      table="articles"
      title="Artigos"
      fields={[
        { name: "title", label: "Título", required: true },
        { name: "slug", label: "Slug (URL)", required: true },
        { name: "category", label: "Categoria", required: true },
        { name: "excerpt", label: "Resumo", type: "textarea" },
        { name: "content", label: "Conteúdo", type: "textarea" },
        { name: "read_time", label: "Tempo de Leitura" },
        { name: "difficulty", label: "Nível", type: "select", options: [
          { value: "Iniciante", label: "Iniciante" },
          { value: "Intermediário", label: "Intermediário" },
          { value: "Avançado", label: "Avançado" },
        ]},
        { name: "image_url", label: "URL da Imagem" },
        { name: "is_published", label: "Publicado", type: "checkbox" },
      ]}
      columns={[
        { key: "title", label: "Título" },
        { key: "category", label: "Categoria" },
        { key: "difficulty", label: "Nível" },
        { key: "is_published", label: "Publicado", render: (v) => v ? "✓" : "Rascunho" },
      ]}
    />
  );
}
