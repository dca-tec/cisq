import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import imgEquilibrio from "@/assets/produto-equilibrio-celular.jpg";
import imgTropismo from "@/assets/produto-tropismo-hepatico.jpg";
import imgOsmorregulador from "@/assets/produto-osmorregulador-renal.jpg";

const featuredProducts = [
  {
    id: 1,
    name: "Equilíbrio Celular",
    category: "Sistema Nervoso",
    description: "Fórmula para suporte à homeostase do sistema nervoso autônomo.",
    price: "R$ 189,00",
    image: imgEquilibrio
  },
  {
    id: 2,
    name: "Tropismo Hepático",
    category: "Sistema Digestivo",
    description: "Compostos selecionados para apoio à função hepatobiliar.",
    price: "R$ 159,00",
    image: imgTropismo
  },
  {
    id: 3,
    name: "Osmorregulador Renal",
    category: "Sistema Urinário",
    description: "Suporte natural ao equilíbrio hídrico e função renal.",
    price: "R$ 145,00",
    image: "https://images.unsplash.com/photo-1550605336-1216503c53ea?auto=format&fit=crop&q=80&w=800"
  }
];

export function FeaturedProducts() {
  return (
    <section className="section-padding bg-card">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-caption mb-4">Fórmulas em Destaque</p>
            <h2 className="text-headline">
              Compostos selecionados
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/produtos">
              Ver Catálogo Completo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/produtos/${product.id}`}
              className="group bg-background rounded-sm overflow-hidden transition-all duration-300 hover:shadow-elevated"
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
                    {product.category}
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
                    {product.price}
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
  );
}
