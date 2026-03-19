import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { User, ShoppingBag, Calendar, FileText, BookOpen, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

export function UserDashboard() {
  const { user, profile, isAdmin, signOut } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);

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
        <div className="container-wide max-w-4xl">
          <div className="flex items-center justify-between mb-8">
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

          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="orders"><ShoppingBag className="h-4 w-4 mr-2" />Pedidos</TabsTrigger>
              <TabsTrigger value="appointments"><Calendar className="h-4 w-4 mr-2" />Agendamentos</TabsTrigger>
              <TabsTrigger value="purchases"><BookOpen className="h-4 w-4 mr-2" />Meus Conteúdos</TabsTrigger>
              <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" />Perfil</TabsTrigger>
            </TabsList>

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

            <TabsContent value="purchases" className="space-y-4">
              <h2 className="text-lg font-medium">Meus Conteúdos</h2>
              {purchases.length === 0 ? (
                <div className="bg-card rounded-sm p-8 text-center text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>Nenhum conteúdo adquirido ainda.</p>
                  <div className="flex gap-2 justify-center mt-4">
                    <Button variant="outline" size="sm" asChild><Link to="/protocolos">Protocolos</Link></Button>
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
