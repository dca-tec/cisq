import { Droplets, Zap, Target, RotateCcw } from "lucide-react";

const principles = [
  {
    icon: Zap,
    title: "Sistemas Autogênicos",
    description: "O corpo possui mecanismos intrínsecos de autorregulação. Nossa abordagem visa despertar e potencializar esses sistemas naturais."
  },
  {
    icon: Droplets,
    title: "Auto-Osmorregulação",
    description: "Equilíbrio hídrico e iônico precisos são fundamentais para a homeostase. Trabalhamos com compostos que apoiam essa regulação fina."
  },
  {
    icon: RotateCcw,
    title: "Auto-Homeostase",
    description: "O estado de equilíbrio dinâmico é alcançado quando todos os sistemas operam em harmonia. Facilitamos, não forçamos."
  },
  {
    icon: Target,
    title: "Tropismo Celular Preciso",
    description: "Cada célula responde a estímulos específicos. Nossas formulações são desenhadas com precisão molecular."
  }
];

export function PrinciplesSection() {
  return (
    <section className="section-padding bg-card">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-caption mb-4">Fundamentos</p>
          <h2 className="text-headline mb-6">
            Princípios que guiam nossa ciência
          </h2>
          <div className="divider-gold" />
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {principles.map((principle, index) => (
            <div 
              key={principle.title}
              className="group p-8 rounded-sm bg-background transition-all duration-300 hover:shadow-elevated"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <principle.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-3 text-foreground">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-sm text-muted-foreground mt-16 max-w-2xl mx-auto">
          Nossa abordagem é baseada em décadas de pesquisa em etnobotânica, bioquímica 
          e fisiologia. Não fazemos promessas médicas — oferecemos conhecimento e ferramentas.
        </p>
      </div>
    </section>
  );
}
