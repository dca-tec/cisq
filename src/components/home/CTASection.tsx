import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-narrow text-center">
        {/* Quote */}
        <blockquote className="mb-12">
          <p className="text-display text-primary-foreground/90 mb-6">
            "A saúde não é um destino,<br />
            mas um estado de consciência<br />
            do próprio sistema."
          </p>
          <footer className="text-sm opacity-70 tracking-widest uppercase">
            — Princípio Fundador
          </footer>
        </blockquote>

        <div className="divider-gold opacity-50 !bg-primary-foreground/30 mb-12" />

        {/* CTA */}
        <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
          Inicie sua jornada de autoconhecimento biológico. 
          Agende uma consulta ou explore nossos recursos.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="secondary" 
            size="lg" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            asChild
          >
            <Link to="/agendamento">
              Agendar Consulta
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            asChild
          >
            <Link to="/produtos">
              Explorar Produtos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
