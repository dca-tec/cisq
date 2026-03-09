import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import imgEquilibrio from "@/assets/produto-equilibrio-celular.jpg";
import imgTropismo from "@/assets/produto-tropismo-hepatico.jpg";
import imgOsmorregulador from "@/assets/produto-osmorregulador-renal.jpg";
import imgImunomodulador from "@/assets/produto-imunomodulador.jpg";
import imgEndocrino from "@/assets/produto-regulador-endocrino.jpg";
import imgVasoequilibrio from "@/assets/produto-vasoequilibrio.jpg";

const categories = [
  { id: "all", name: "Todos os Sistemas" },
  { id: "nervous", name: "Sistema Nervoso" },
  { id: "digestive", name: "Sistema Digestivo" },
  { id: "immune", name: "Sistema Imunológico" },
  { id: "endocrine", name: "Sistema Endócrino" },
  { id: "circulatory", name: "Sistema Circulatório" },
  { id: "urinary", name: "Sistema Urinário" },
];

const products = [
  {
    id: 1,
    name: "Equilíbrio Celular",
    category: "nervous",
    categoryName: "Sistema Nervoso",
    description: "Fórmula para suporte à homeostase do sistema nervoso autônomo. Compostos adaptogênicos selecionados.",
    price: 189,
    image: imgEquilibrio
  },
  {
    id: 2,
    name: "Tropismo Hepático",
    category: "digestive",
    categoryName: "Sistema Digestivo",
    description: "Compostos selecionados para apoio à função hepatobiliar e processos de desintoxicação natural.",
    price: 159,
    image: "https://images.unsplash.com/photo-1608228068998-5bd0a880ee1f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Osmorregulador Renal",
    category: "urinary",
    categoryName: "Sistema Urinário",
    description: "Suporte natural ao equilíbrio hídrico, função renal e manutenção da pressão osmótica.",
    price: 145,
    image: "https://images.unsplash.com/photo-1550605336-1216503c53ea?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Imunomodulador Alpha",
    category: "immune",
    categoryName: "Sistema Imunológico",
    description: "Complexo de beta-glucanos e adaptógenos para suporte à resposta imune equilibrada.",
    price: 210,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Regulador Endócrino",
    category: "endocrine",
    categoryName: "Sistema Endócrino",
    description: "Suporte à regulação hormonal natural através de fitoquímicos específicos.",
    price: 195,
    image: "https://images.unsplash.com/photo-1564277352822-777e3bd32832?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Vasoequilíbrio",
    category: "circulatory",
    categoryName: "Sistema Circulatório",
    description: "Compostos para suporte à função cardiovascular e fluidez sanguínea.",
    price: 175,
    image: "https://images.unsplash.com/photo-1615397323215-62df860cc448?auto=format&fit=crop&q=80&w=800"
  },
];

export default function Produtos() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32 pb-12">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="text-caption mb-4">Catálogo</p>
            <h1 className="text-display mb-6">
              Produtos &<br />
              <em className="text-primary">Fórmulas</em>
            </h1>
            <p className="text-body-large">
              Compostos naturais desenvolvidos com precisão científica, 
              organizados por sistema biológico para facilitar sua escolha.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-y border-border sticky top-20 bg-background/95 backdrop-blur-sm z-40">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}
              </span>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Filtrar por sistema" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/produtos/${product.id}`}
                className="group bg-card rounded-sm overflow-hidden transition-all duration-300 hover:shadow-elevated"
              >
                {/* Image */}
                <div className="aspect-square bg-secondary/50 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-muted-foreground">
                      {product.categoryName}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-2 text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-sm text-primary flex items-center">
                      Ver detalhes
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-8 bg-card border-t border-border">
        <div className="container-wide">
          <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto">
            <strong>Aviso Legal:</strong> Os produtos apresentados são suplementos alimentares ou 
            fórmulas naturais. Não substituem tratamento médico. Consulte um profissional de saúde 
            antes de iniciar qualquer suplementação. Resultados individuais podem variar.
          </p>
        </div>
      </section>
    </Layout>
  );
}
