import { Link } from "react-router-dom";
import { ArrowRight, Beaker, FileText, Calendar, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Beaker,
    title: "Fórmulas & Produtos",
    description: "Compostos naturais desenvolvidos com precisão, organizados por sistema biológico e objetivo terapêutico.",
    href: "/produtos",
    cta: "Ver Catálogo"
  },
  {
    icon: FileText,
    title: "Protocolos & Programas",
    description: "Programas estruturados de 7, 14 e 30 dias. Receitas e guias para aplicação consciente.",
    href: "/protocolos",
    cta: "Explorar Protocolos"
  },
  {
    icon: Calendar,
    title: "Consultas & Orientação",
    description: "Agendamento com profissionais qualificados para orientação personalizada e acompanhamento.",
    href: "/agendamento",
    cta: "Agendar Consulta"
  },
  {
    icon: BookOpen,
    title: "Conhecimento & Educação",
    description: "Artigos, glossário científico e materiais educacionais para aprofundamento contínuo.",
    href: "/conhecimento",
    cta: "Acessar Conteúdo"
  }
];

export function ServicesSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-caption mb-4">O que oferecemos</p>
          <h2 className="text-headline mb-6">
            Conhecimento aplicado à prática
          </h2>
          <div className="divider-gold" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="group card-institutional flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl text-foreground">
                  {service.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed flex-1">
                {service.description}
              </p>
              <div className="mt-6 flex items-center text-primary font-medium">
                <span>{service.cta}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
