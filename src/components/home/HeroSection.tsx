import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Content */}
      <div className="container-narrow relative z-10 text-center py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-8 animate-fade-up">
          <Leaf className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            Laboratório de Etnobotânica e Biosciência
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-display mb-8 animate-fade-up delay-100">
          <span className="block text-foreground">Não empurramos</span>
          <span className="block text-foreground">o sistema.</span>
          <span className="block mt-2">
            <em className="text-primary">Nós o lembramos</em>
          </span>
          <span className="block text-primary">
            <em>de quem ele é.</em>
          </span>
        </h1>

        {/* Divider */}
        <div className="divider-gold my-10 animate-fade-up delay-200" />

        {/* Subheadline */}
        <p className="text-body-large max-w-2xl mx-auto mb-12 animate-fade-up delay-300">
          Ciência aplicada ao estímulo de sistemas autogênicos, auto-osmorregulação 
          e homeostase celular. Uma abordagem ética, precisa e fundamentada na 
          biologia autossômica universal.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-400">
          <Button size="lg" asChild>
            <Link to="/produtos">
              Explorar Fórmulas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/sobre">
              Conhecer o Instituto
            </Link>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 pt-10 border-t border-border animate-fade-up delay-500">
          <p className="text-caption mb-6">Fundamentado em</p>
          <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
            <span className="font-serif text-lg">Etnobotânica</span>
            <span className="text-border">|</span>
            <span className="font-serif text-lg">Bioquímica</span>
            <span className="text-border">|</span>
            <span className="font-serif text-lg">Fisiologia Celular</span>
            <span className="text-border">|</span>
            <span className="font-serif text-lg">Tropismo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
