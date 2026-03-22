import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { WorkoutGenerator } from "@/components/treinos/WorkoutGenerator";
import { WorkoutPlanView } from "@/components/treinos/WorkoutPlanView";
import { WorkoutChat } from "@/components/treinos/WorkoutChat";
import { SubscriptionPlans } from "@/components/treinos/SubscriptionPlans";
import { useAuth } from "@/contexts/AuthContext";
import { Dumbbell, Brain, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export type WorkoutPlan = {
  name: string;
  weeks: {
    week: number;
    days: {
      day: string;
      dayNumber: number;
      isRest: boolean;
      focus: string;
      muscleGroups: string[];
      exercises: {
        name: string;
        sets: number;
        reps: string;
        rest: string;
        muscleGroup: string;
        equipment: string;
        notes?: string;
      }[];
    }[];
  }[];
};

const Treinos = () => {
  const { user } = useAuth();
  const [generatedPlan, setGeneratedPlan] = useState<WorkoutPlan | null>(null);
  const [activeTab, setActiveTab] = useState<"generator" | "plan" | "chat" | "plans">("generator");

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container-wide relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent uppercase tracking-wider">Inteligência Artificial</span>
            </div>
            <h1 className="text-display mb-4">
              <span className="text-accent">TREINOS</span> PERSONALIZADOS
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Nosso agente de IA cria rotinas de treino completas, adaptadas ao seu objetivo, 
              nível e preferências. Cada exercício com visualização detalhada e destaque muscular.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="border-b border-border/50 sticky top-20 z-30 bg-background/95 backdrop-blur-sm">
        <div className="container-wide">
          <div className="flex gap-1 overflow-x-auto py-2">
            {[
              { id: "generator" as const, label: "Criar Treino", icon: Brain },
              { id: "plan" as const, label: "Meu Plano", icon: Dumbbell, disabled: !generatedPlan },
              { id: "chat" as const, label: "Chat com IA", icon: Sparkles, requiresAuth: true },
              { id: "plans" as const, label: "Planos", icon: Lock },
            ].map(({ id, label, icon: Icon, disabled, requiresAuth }) => (
              <button
                key={id}
                onClick={() => {
                  if (requiresAuth && !user) return;
                  if (!disabled) setActiveTab(id);
                }}
                disabled={disabled}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium uppercase tracking-wider rounded-t-lg transition-all whitespace-nowrap ${
                  activeTab === id
                    ? "bg-accent/10 text-accent border-b-2 border-accent"
                    : disabled
                    ? "text-muted-foreground/40 cursor-not-allowed"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {requiresAuth && !user && <Lock className="h-3 w-3 ml-1" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide">
          {activeTab === "generator" && (
            <WorkoutGenerator
              onPlanGenerated={(plan) => {
                setGeneratedPlan(plan);
                setActiveTab("plan");
              }}
            />
          )}
          {activeTab === "plan" && generatedPlan && (
            <WorkoutPlanView plan={generatedPlan} />
          )}
          {activeTab === "chat" && (
            user ? (
              <WorkoutChat />
            ) : (
              <div className="text-center py-20">
                <Lock className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-2">Faça login para acessar o chat</h3>
                <p className="text-muted-foreground mb-6">O chat com IA está disponível para usuários cadastrados.</p>
                <Button asChild><Link to="/area-usuario">Entrar / Cadastrar</Link></Button>
              </div>
            )
          )}
          {activeTab === "plans" && <SubscriptionPlans />}
        </div>
      </section>
    </Layout>
  );
};

export default Treinos;
