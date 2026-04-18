import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Clock, FileText, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import imgReset from "@/assets/protocolo-reset-7dias.jpg";
import imgDetox from "@/assets/protocolo-detox-14dias.jpg";
import imgTransformacao from "@/assets/protocolo-transformacao-30dias.jpg";

const protocols = [
  {
    id: 1,
    name: "Protocolo Reset 7 Dias",
    duration: "7 dias",
    type: "Etapa 1 — Iniciante",
    description: "Programa introdutório para reequilíbrio básico. Primeira etapa da jornada — fundação do autoconhecimento biológico.",
    image: imgReset,
    features: ["Guia diário completo", "Lista de alimentos", "Práticas de consciência", "Suporte por email"]
  },
  {
    id: 2,
    name: "Detox Celular 14 Dias",
    duration: "14 dias",
    type: "Etapa 2 — Intermediário",
    description: "Aprofundamento dos processos de desintoxicação. Continuidade natural após a etapa de reset.",
    image: imgDetox,
    features: ["Protocolo detalhado", "Receitas exclusivas", "Monitoramento de sintomas", "Consulta de orientação"]
  },
  {
    id: 3,
    name: "Transformação 30 Dias",
    duration: "30 dias",
    type: "Etapa 3 — Avançado",
    description: "Mudança profunda de padrões biológicos e comportamentais. Etapa final da jornada estruturada.",
    image: imgTransformacao,
    features: ["Programa completo", "Acompanhamento semanal", "Protocolos personalizados", "Comunidade exclusiva"]
  },
];

const freeResources = [
  {
    id: 10,
    name: "Guia de Introdução à Homeostase",
    type: "PDF Gratuito",
    description: "Entenda os fundamentos da autorregulação corporal."
  },
  {
    id: 11,
    name: "Checklist de Auto-Observação",
    type: "PDF Gratuito",
    description: "Ferramenta prática para monitorar seus padrões."
  },
  {
    id: 12,
    name: "Receitas Equilibradoras",
    type: "PDF Gratuito",
    description: "10 receitas para apoiar seu equilíbrio diário."
  },
];

export default function Protocolos() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32 pb-12">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="text-caption mb-4">Programas</p>
            <h1 className="text-display mb-6">
              Protocolos &<br />
              <em className="text-primary">Receitas</em>
            </h1>
            <p className="text-body-large">
              Programas estruturados para diferentes níveis de comprometimento. 
              Do iniciante ao avançado, cada protocolo foi desenvolvido com 
              rigor científico e atenção à individualidade.
            </p>
          </div>
        </div>
      </section>

      {/* Paid Protocols */}
      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="mb-12">
            <h2 className="text-headline mb-4">Programas Completos</h2>
            <p className="text-muted-foreground">
              Protocolos estruturados com suporte e materiais exclusivos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {protocols.map((protocol, index) => (
              <div 
                key={protocol.id}
                className={`group relative bg-card rounded-sm overflow-hidden transition-all duration-300 hover:shadow-elevated flex flex-col ${
                  index === 2 ? 'ring-2 ring-accent' : ''
                }`}
              >
                {index === 2 && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 text-xs font-medium rounded-full z-10 shadow-sm">
                    Mais Completo
                  </div>
                )}
                
                {/* Image Gallery/Cover */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-muted">
                  <img 
                    src={protocol.image} 
                    alt={protocol.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm hover:bg-background/90 text-foreground">
                      {protocol.type}
                    </Badge>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{protocol.duration}</span>
                  </div>
                  
                  <h3 className="font-serif text-xl mb-3 group-hover:text-primary transition-colors">{protocol.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">
                    {protocol.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {protocol.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Star className="h-3 w-3 text-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-border mt-auto">
                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all" asChild>
                      <Link to="/planos">
                        Acessar via Assinatura
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <div className="mb-12">
            <h2 className="text-headline mb-4">Recursos Gratuitos</h2>
            <p className="text-muted-foreground">
              Materiais introdutórios para começar sua jornada.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {freeResources.map((resource) => (
              <div 
                key={resource.id}
                className="bg-background p-6 rounded-sm flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-xs text-accent font-medium uppercase tracking-wider">
                    {resource.type}
                  </span>
                </div>
                <h3 className="font-serif text-lg mb-2">{resource.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {resource.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Download Gratuito
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-12 border-t border-border">
        <div className="container-narrow">
          <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-sm">
            <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium mb-2">Jornada completa via assinatura</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Os protocolos não são vendidos separadamente. Cada etapa é uma evolução da anterior —
                por isso o ideal é fazê-los em sequência, do básico ao avançado. Com a assinatura você
                acessa toda a jornada, treinos com IA, consultoria, análise de exames e e-books.
              </p>
              <Button asChild>
                <Link to="/planos">
                  Ver Planos de Assinatura
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
