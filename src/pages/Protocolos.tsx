import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Clock, FileText, Lock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const protocols = [
  {
    id: 1,
    name: "Protocolo Reset 7 Dias",
    duration: "7 dias",
    type: "Iniciante",
    description: "Programa introdutório para reequilíbrio básico. Ideal para quem está começando sua jornada de autoconhecimento biológico.",
    price: 97,
    isPaid: true,
    features: ["Guia diário completo", "Lista de alimentos", "Práticas de consciência", "Suporte por email"]
  },
  {
    id: 2,
    name: "Detox Celular 14 Dias",
    duration: "14 dias",
    type: "Intermediário",
    description: "Programa aprofundado para suporte aos processos naturais de desintoxicação e regeneração celular.",
    price: 197,
    isPaid: true,
    features: ["Protocolo detalhado", "Receitas exclusivas", "Monitoramento de sintomas", "Consulta de orientação"]
  },
  {
    id: 3,
    name: "Transformação 30 Dias",
    duration: "30 dias",
    type: "Avançado",
    description: "O programa mais completo para mudança profunda de padrões biológicos e comportamentais.",
    price: 397,
    isPaid: true,
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
                className={`relative bg-card rounded-sm overflow-hidden transition-all duration-300 hover:shadow-elevated ${
                  index === 2 ? 'ring-2 ring-accent' : ''
                }`}
              >
                {index === 2 && (
                  <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-xs font-medium">
                    Mais Completo
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{protocol.duration}</span>
                    <Badge variant="outline" className="ml-auto">{protocol.type}</Badge>
                  </div>
                  
                  <h3 className="font-serif text-xl mb-3">{protocol.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">
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

                  <div className="pt-6 border-t border-border">
                    <div className="flex items-end justify-between mb-4">
                      <span className="font-serif text-3xl text-foreground">
                        R$ {protocol.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        acesso vitalício
                      </span>
                    </div>
                    <Button className="w-full" asChild>
                      <Link to={`/protocolos/${protocol.id}`}>
                        Adquirir Protocolo
                        <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Access Note */}
      <section className="py-12 border-t border-border">
        <div className="container-narrow">
          <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-sm">
            <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium mb-2">Acesso Protegido</h4>
              <p className="text-sm text-muted-foreground">
                Os protocolos pagos ficam disponíveis na sua área de usuário após a compra. 
                Você terá acesso vitalício ao conteúdo e a todas as atualizações futuras.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
