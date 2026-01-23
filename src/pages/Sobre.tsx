import { Layout } from "@/components/layout/Layout";
import { CheckCircle, Globe, Shield, Award } from "lucide-react";

const values = [
  {
    title: "Ética Científica",
    description: "Cada afirmação é fundamentada em pesquisa. Não fazemos promessas que a ciência não sustenta."
  },
  {
    title: "Transparência Total",
    description: "Ingredientes, processos e limitações são comunicados com clareza absoluta."
  },
  {
    title: "Respeito ao Organismo",
    description: "O corpo sabe se curar. Nossa função é remover obstáculos e fornecer recursos adequados."
  },
  {
    title: "Educação Contínua",
    description: "Conhecimento é a base de toda transformação duradoura. Educamos para empoderar."
  }
];

const compliance = [
  "Conformidade com LGPD e regulamentações de proteção de dados",
  "Registro e rastreabilidade de todos os produtos",
  "Avisos legais claros em todas as comunicações",
  "Separação rigorosa entre informação, produto e prescrição",
  "Profissionais com certificação e registro ativo"
];

export default function Sobre() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-narrow text-center">
          <p className="text-caption mb-4">Sobre o Instituto</p>
          <h1 className="text-display mb-8">
            Ciência, ética e<br />
            <em className="text-primary">consciência biológica</em>
          </h1>
          <div className="divider-gold mb-8" />
          <p className="text-body-large max-w-2xl mx-auto">
            Somos um laboratório dedicado ao estudo e aplicação de princípios 
            etnobotânicos e biocientíficos, com atuação internacional e 
            compromisso inabalável com a verdade científica.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-caption mb-4">Nossa Missão</p>
              <h2 className="text-headline mb-6">
                Despertar a inteligência inata do organismo
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Acreditamos que cada ser humano possui sistemas de autorregulação 
                extraordinariamente sofisticados. Nossa missão não é substituir essa 
                inteligência, mas apoiá-la, estimulá-la e, quando necessário, 
                lembrá-la de seu potencial pleno.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Através de pesquisa rigorosa em etnobotânica, bioquímica e fisiologia 
                celular, desenvolvemos formulações e protocolos que trabalham em 
                harmonia com os processos naturais do corpo.
              </p>
            </div>
            <div className="bg-primary/5 rounded-sm p-12">
              <blockquote className="font-serif text-2xl text-foreground italic leading-relaxed">
                "O organismo não precisa ser corrigido. Precisa ser compreendido, 
                respeitado e, ocasionalmente, relembrado de sua própria capacidade 
                de equilíbrio."
              </blockquote>
              <footer className="mt-6 text-sm text-muted-foreground">
                — Manifesto Institucional
              </footer>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-caption mb-4">Nossos Valores</p>
            <h2 className="text-headline">Princípios que nos guiam</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="card-institutional">
                <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <p className="text-caption">Atuação Internacional</p>
              </div>
              <h2 className="text-headline mb-6">
                Conhecimento sem fronteiras
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nossa pesquisa incorpora tradições etnobotânicas de diversos 
                continentes, dialogando com conhecimentos ancestrais e ciência 
                contemporânea. Atendemos pacientes e clientes em múltiplos países, 
                sempre respeitando as regulamentações locais.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="px-4 py-2 bg-background rounded-sm">Brasil</span>
                <span className="px-4 py-2 bg-background rounded-sm">Portugal</span>
                <span className="px-4 py-2 bg-background rounded-sm">Estados Unidos</span>
                <span className="px-4 py-2 bg-background rounded-sm">Europa</span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-6">
              <div className="card-institutional text-center">
                <Award className="h-8 w-8 text-accent mx-auto mb-4" />
                <span className="block font-serif text-3xl text-foreground mb-1">15+</span>
                <span className="text-sm text-muted-foreground">Anos de Pesquisa</span>
              </div>
              <div className="card-institutional text-center">
                <Shield className="h-8 w-8 text-accent mx-auto mb-4" />
                <span className="block font-serif text-3xl text-foreground mb-1">100%</span>
                <span className="text-sm text-muted-foreground">Conformidade</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section id="conformidade" className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="text-caption mb-4">Conformidade & Regulamentação</p>
            <h2 className="text-headline">Compromisso com a legalidade</h2>
          </div>

          <div className="bg-card rounded-sm p-8 md:p-12">
            <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
              Operamos em total conformidade com as regulamentações aplicáveis. 
              Nosso compromisso com a legalidade é tão fundamental quanto nosso 
              compromisso com a ciência.
            </p>
            <ul className="space-y-4">
              {compliance.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
