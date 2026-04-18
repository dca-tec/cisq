import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { User, ShoppingBag, Calendar, BookOpen, LogOut, Shield, Dumbbell, Sparkles, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { WorkoutGenerator } from "@/components/treinos/WorkoutGenerator";
import { WorkoutPlanView } from "@/components/treinos/WorkoutPlanView";
import { WorkoutChat } from "@/components/treinos/WorkoutChat";
import type { WorkoutPlan } from "@/pages/Treinos";

import imgMusculacao from "@/assets/training-musculacao.jpg";
import imgEmagrecimento from "@/assets/training-emagrecimento.jpg";
import imgFuncional from "@/assets/training-funcional.jpg";
import imgCalistenia from "@/assets/training-calistenia.jpg";
import imgPilates from "@/assets/training-pilates.jpg";
import imgYoga from "@/assets/training-yoga.jpg";

const trainingModalities = [
  { id: "musculacao", label: "Musculação", desc: "Hipertrofia e força", img: imgMusculacao },
  { id: "emagrecer", label: "Emagrecimento", desc: "Queima e definição", img: imgEmagrecimento },
  { id: "funcional", label: "Funcional", desc: "Mobilidade e potência", img: imgFuncional },
  { id: "calistenia", label: "Calistenia", desc: "Peso corporal", img: imgCalistenia },
  { id: "pilates", label: "Pilates", desc: "Core e postura", img: imgPilates },
  { id: "yoga", label: "Yoga", desc: "Equilíbrio mente-corpo", img: imgYoga },
];

type TrainingView = "modalities" | "generator" | "plan" | "chat";

export function UserDashboard() {
  const { user, profile, isAdmin, signOut } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [trainingView, setTrainingView] = useState<TrainingView>("modalities");
  const [selectedModality, setSelectedModality] = useState<string>("");
  const [generatedPlan, setGeneratedPlan] = useState<WorkoutPlan | null>(null);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(10),
      supabase.from("appointments").select("*, professionals(name), consultation_types(name)").order("appointment_date", { ascending: false }).limit(10),
      supabase.from("user_purchases").select("*").order("created_at", { ascending: false }),
    ]).then(([o, a, p]) => {
      setOrders(o.data ?? []);
      setAppointments(a.data ?? []);
      setPurchases(p.data ?? []);
    });
  }, [user]);

  return (
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-wide max-w-6xl">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-headline mb-1">
                Olá, {profile?.first_name || "Usuário"}
              </h1>
              <p className="text-muted-foreground">{profile?.email}</p>
            </div>
            <div className="flex gap-2">
              {isAdmin && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin"><Shield className="h-4 w-4 mr-2" />Painel Admin</Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />Sair
              </Button>
            </div>
          </div>

          <Tabs defaultValue="treinos" className="space-y-6">
            <TabsList className="flex flex-wrap h-auto w-full justify-start gap-1">
              <TabsTrigger value="treinos"><Dumbbell className="h-4 w-4 mr-2" />Treinos</TabsTrigger>
              <TabsTrigger value="appointments"><Calendar className="h-4 w-4 mr-2" />Agendamentos</TabsTrigger>
              <TabsTrigger value="ebooks"><BookOpen className="h-4 w-4 mr-2" />E-books</TabsTrigger>
              <TabsTrigger value="orders"><ShoppingBag className="h-4 w-4 mr-2" />Pedidos</TabsTrigger>
              <TabsTrigger value="purchases"><Sparkles className="h-4 w-4 mr-2" />Meus Conteúdos</TabsTrigger>
              <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" />Perfil</TabsTrigger>
            </TabsList>

            {/* TREINOS */}
            <TabsContent value="treinos" className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-lg font-medium">Treinos personalizados com IA</h2>
                  <p className="text-sm text-muted-foreground">Escolha uma modalidade ou converse com o agente.</p>
                </div>
                <div className="flex gap-2">
                  {trainingView !== "modalities" && (
                    <Button variant="ghost" size="sm" onClick={() => setTrainingView("modalities")}>
                      ← Modalidades
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => setTrainingView("chat")}>
                    <Brain className="h-4 w-4 mr-2" />Chat com IA
                  </Button>
                </div>
              </div>

              {trainingView === "modalities" && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {trainingModalities.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedModality(m.id);
                        setTrainingView("generator");
                      }}
                      className="group relative overflow-hidden rounded-sm bg-card text-left transition-all hover:shadow-elevated"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={m.img}
                          alt={m.label}
                          loading="lazy"
                          width={1024}
                          height={768}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="text-xs text-accent uppercase tracking-[0.2em] mb-1">{m.desc}</p>
                        <h3 className="font-serif text-2xl text-foreground">{m.label}</h3>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {trainingView === "generator" && (
                <WorkoutGenerator
                  initialGoal={selectedModality}
                  onPlanGenerated={(plan) => {
                    setGeneratedPlan(plan);
                    setTrainingView("plan");
                  }}
                />
              )}

              {trainingView === "plan" && generatedPlan && (
                <WorkoutPlanView plan={generatedPlan} />
              )}

              {trainingView === "chat" && <WorkoutChat />}
            </TabsContent>

            {/* AGENDAMENTOS */}
            <TabsContent value="appointments" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Seus Agendamentos</h2>
                <Button size="sm" asChild><Link to="/agendamento">Novo Agendamento</Link></Button>
              </div>
              {appointments.length === 0 ? (
                <div className="bg-card rounded-sm p-8 text-center text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>Nenhum agendamento realizado.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="bg-card rounded-sm p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{apt.consultation_types?.name}</p>
                        <p className="text-sm text-muted-foreground">Dr(a). {apt.professionals?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{new Date(apt.appointment_date).toLocaleDateString("pt-BR")}</p>
                        <p className="text-sm text-muted-foreground">{apt.appointment_time} • {apt.modality}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* EBOOKS */}
            <TabsContent value="ebooks" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Biblioteca de E-books</h2>
                <Button size="sm" variant="outline" asChild><Link to="/ebooks">Abrir biblioteca</Link></Button>
              </div>
              <div className="bg-card rounded-sm p-8 text-center text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>Acesse a biblioteca completa de e-books inclusos no seu plano.</p>
              </div>
            </TabsContent>

            {/* PEDIDOS */}
            <TabsContent value="orders" className="space-y-4">
              <h2 className="text-lg font-medium">Seus Pedidos</h2>
              {orders.length === 0 ? (
                <div className="bg-card rounded-sm p-8 text-center text-muted-foreground">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>Nenhum pedido realizado ainda.</p>
                  <Button variant="outline" className="mt-4" asChild><Link to="/produtos">Ver Produtos</Link></Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-card rounded-sm p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">Pedido #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString("pt-BR")}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R$ {Number(order.total).toFixed(2)}</p>
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="purchases" className="space-y-4">
              <h2 className="text-lg font-medium">Meus Conteúdos</h2>
              {purchases.length === 0 ? (
                <div className="bg-card rounded-sm p-8 text-center text-muted-foreground">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>Nenhum conteúdo adquirido ainda.</p>
                  <div className="flex gap-2 justify-center mt-4">
                    <Button variant="outline" size="sm" asChild><Link to="/planos">Ver Planos</Link></Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {purchases.map((p) => (
                    <div key={p.id} className="bg-card rounded-sm p-4">
                      <p className="font-medium capitalize">{p.item_type}</p>
                      <p className="text-sm text-muted-foreground">{new Date(p.created_at).toLocaleDateString("pt-BR")}</p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile" className="space-y-4">
              <h2 className="text-lg font-medium">Meu Perfil</h2>
              <div className="bg-card rounded-sm p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{profile?.first_name} {profile?.last_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{profile?.email}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
