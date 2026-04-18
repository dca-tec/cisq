import { Layout } from "@/components/layout/Layout";
import { SubscriptionPlans } from "@/components/treinos/SubscriptionPlans";
import { Sparkles, Dumbbell, FlaskConical, BookOpen, Calendar, Activity } from "lucide-react";

const benefits = [
  { icon: Dumbbell, title: "Treinos com IA", desc: "Rotinas personalizadas geradas por inteligência artificial." },
  { icon: FlaskConical, title: "Protocolos completos", desc: "Acesso à jornada completa, do básico ao avançado." },
  { icon: Activity, title: "Análise de exames", desc: "Interpretação dos seus exames com profissionais." },
  { icon: Calendar, title: "Consultoria", desc: "Acompanhamento direto com nossa equipe." },
  { icon: BookOpen, title: "E-books premium", desc: "Biblioteca completa de conteúdos liberada." },
  { icon: Sparkles, title: "Eventos exclusivos", desc: "Inscrições prioritárias em eventos científicos." },
];

export default function Planos() {
  return (
    <Layout>
      <section className="section-padding pt-32 pb-12">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-caption mb-4">Assinatura</p>
            <h1 className="text-display mb-6">
              Acesso completo à<br />
              <em className="text-primary">jornada CISQ</em>
            </h1>
            <p className="text-body-large">
              Um único plano de assinatura libera tudo: treinos com IA, protocolos completos em etapas progressivas,
              consultoria, análise de exames, e-books e eventos. Os protocolos são feitos em sequência — do mais
              básico ao avançado — porque cada etapa é uma evolução da anterior.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding pt-4">
        <div className="container-wide">
          <SubscriptionPlans />
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-wide">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-headline mb-4">O que está incluso</h2>
            <p className="text-muted-foreground">
              Sua assinatura desbloqueia o ecossistema completo da plataforma.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-background p-6 rounded-sm">
                <b.icon className="h-6 w-6 text-accent mb-4" />
                <h3 className="font-serif text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
