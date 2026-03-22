import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const planIcons: Record<string, typeof Zap> = {
  basic: Zap,
  intermediate: Sparkles,
  premium: Crown,
};

const planHighlights: Record<string, boolean> = {
  basic: false,
  intermediate: true,
  premium: false,
};

export function SubscriptionPlans() {
  const { user } = useAuth();

  const { data: plans } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscription_plans")
        .select("*")
        .eq("is_active", true)
        .order("price");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-headline mb-3">Planos de <span className="text-accent">Assinatura</span></h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Escolha o plano ideal para sua jornada de saúde e performance. Todos incluem acesso ao agente de IA para treinos personalizados.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans?.map((plan) => {
          const Icon = planIcons[plan.tier] || Zap;
          const isHighlighted = planHighlights[plan.tier];

          return (
            <Card
              key={plan.id}
              className={`card-institutional relative overflow-hidden transition-all hover:shadow-elevated ${
                isHighlighted ? "border-accent shadow-gold scale-[1.02]" : ""
              }`}
            >
              {isHighlighted && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent to-accent/60" />
              )}
              <CardHeader className="text-center pb-2">
                {isHighlighted && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground text-[10px] uppercase tracking-wider">
                    Mais Popular
                  </Badge>
                )}
                <div className={`w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                  isHighlighted ? "bg-accent/20" : "bg-muted"
                }`}>
                  <Icon className={`h-7 w-7 ${isHighlighted ? "text-accent" : "text-muted-foreground"}`} />
                </div>
                <CardTitle className="text-xl uppercase tracking-wider font-sans">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="pt-4 space-y-6">
                <div className="text-center">
                  <span className="text-4xl font-bold text-accent">
                    R$ {Number(plan.price).toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-muted-foreground text-sm">/mês</span>
                </div>

                <ul className="space-y-3">
                  {(plan.features as string[])?.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${isHighlighted ? "btn-primary" : "btn-outline"}`}
                  asChild={!user}
                >
                  {user ? (
                    <span className="cursor-pointer">Assinar Agora</span>
                  ) : (
                    <Link to="/area-usuario">Entrar para Assinar</Link>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        * Pagamento será integrado em breve. Planos sujeitos a alteração.
        Este serviço não substitui acompanhamento médico profissional.
      </p>
    </div>
  );
}
