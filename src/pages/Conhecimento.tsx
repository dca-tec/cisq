import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { searchSchema } from "@/lib/validations";

const articles = [
  {
    id: 1,
    title: "Introdução aos Sistemas Autogênicos",
    excerpt: "Compreenda como o organismo possui mecanismos inatos de autorregulação e como podemos apoiá-los.",
    category: "Fundamentos",
    readTime: "8 min",
    level: "Iniciante"
  },
  {
    id: 2,
    title: "Osmorregulação: O Equilíbrio Invisível",
    excerpt: "A regulação hídrica e iônica é fundamental para todas as funções celulares. Entenda como funciona.",
    category: "Fisiologia",
    readTime: "12 min",
    level: "Intermediário"
  },
  {
    id: 3,
    title: "Tropismo Celular e Especificidade de Resposta",
    excerpt: "Como as células reconhecem e respondem a estímulos específicos do ambiente.",
    category: "Biologia Celular",
    readTime: "15 min",
    level: "Avançado"
  },
  {
    id: 4,
    title: "Homeostase: O Estado de Equilíbrio Dinâmico",
    excerpt: "O conceito de homeostase e sua importância para a manutenção da saúde.",
    category: "Fundamentos",
    readTime: "10 min",
    level: "Iniciante"
  },
  {
    id: 5,
    title: "Fitoquímicos e Sinalização Celular",
    excerpt: "Como compostos vegetais interagem com receptores e vias de sinalização do organismo.",
    category: "Bioquímica",
    readTime: "18 min",
    level: "Avançado"
  },
];

const glossaryTerms = [
  {
    term: "Autogênico",
    definition: "Que se origina ou é produzido dentro do próprio organismo. Refere-se a processos de autorregulação.",
    related: ["Homeostase", "Autorregulação"]
  },
  {
    term: "Homeostase",
    definition: "Estado de equilíbrio dinâmico interno do organismo, mantido por processos regulatórios.",
    related: ["Autogênico", "Osmorregulação"]
  },
  {
    term: "Tropismo",
    definition: "Resposta direcional de células ou organismos a estímulos externos específicos.",
    related: ["Sinalização Celular", "Especificidade"]
  },
  {
    term: "Osmorregulação",
    definition: "Regulação ativa das concentrações de água e solutos para manter o equilíbrio osmótico.",
    related: ["Homeostase", "Equilíbrio Iônico"]
  },
  {
    term: "Adaptógeno",
    definition: "Substância natural que ajuda o organismo a adaptar-se ao estresse e normalizar funções.",
    related: ["Fitoquímicos", "Homeostase"]
  },
];

export default function Conhecimento() {
  const [searchQuery, setSearchQuery] = useState("");

  // Sanitize and validate search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Apply length limit
    if (value.length > 200) {
      return;
    }
    
    // Validate and sanitize using zod schema
    const result = searchSchema.safeParse({ query: value });
    if (result.success) {
      setSearchQuery(result.data.query);
    } else {
      // Still allow typing but sanitize dangerous characters
      setSearchQuery(value.replace(/[<>]/g, ""));
    }
  };

  // Filter articles based on sanitized search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) {
      return articles;
    }
    const query = searchQuery.toLowerCase();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Filter glossary based on sanitized search query
  const filteredGlossary = useMemo(() => {
    if (!searchQuery.trim()) {
      return glossaryTerms;
    }
    const query = searchQuery.toLowerCase();
    return glossaryTerms.filter(
      (item) =>
        item.term.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32 pb-12">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="text-caption mb-4">Biblioteca</p>
            <h1 className="text-display mb-6">
              Conhecimento &<br />
              <em className="text-primary">Educação</em>
            </h1>
            <p className="text-body-large">
              Artigos, estudos e glossário para aprofundar sua compreensão 
              sobre biologia autossômica, etnobotânica e fisiologia.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-6 border-y border-border">
        <div className="container-wide">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar artigos e termos..." 
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
              maxLength={200}
              aria-label="Buscar artigos e termos"
            />
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-headline">Artigos</h2>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Todos
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Fundamentos
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Fisiologia
              </Badge>
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              Nenhum artigo encontrado para "{searchQuery}"
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/conhecimento/artigos/${article.id}`}
                  className="group card-institutional flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground flex-1">
                    {article.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {article.level}
                    </Badge>
                    <span className="text-sm text-primary flex items-center">
                      Ler mais
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Glossary */}
      <section id="glossario" className="section-padding bg-card">
        <div className="container-wide">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              <p className="text-caption">Referência</p>
            </div>
            <h2 className="text-headline">Glossário Biológico</h2>
            <p className="text-muted-foreground mt-2">
              Termos essenciais para compreensão dos conceitos apresentados.
            </p>
          </div>

          {filteredGlossary.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              Nenhum termo encontrado para "{searchQuery}"
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredGlossary.map((item) => (
                <div 
                  key={item.term}
                  className="bg-background p-6 rounded-sm"
                >
                  <h3 className="font-serif text-xl mb-3 text-primary">
                    {item.term}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {item.definition}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.related.map((rel) => (
                      <span 
                        key={rel}
                        className="text-xs px-2 py-1 bg-muted rounded-sm text-muted-foreground"
                      >
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              to="/conhecimento/glossario"
              className="text-primary hover:underline inline-flex items-center"
            >
              Ver glossário completo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
