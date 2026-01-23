import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { User, ShoppingBag, Calendar, FileText, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - would come from backend
const userOrders = [
  {
    id: "ORD-2024-001",
    date: "15 Jan 2024",
    status: "Entregue",
    total: 348,
    items: ["Equilíbrio Celular", "Tropismo Hepático"]
  },
  {
    id: "ORD-2024-002",
    date: "28 Jan 2024",
    status: "Em trânsito",
    total: 210,
    items: ["Imunomodulador Alpha"]
  },
];

const userProtocols = [
  {
    id: 1,
    name: "Protocolo Reset 7 Dias",
    purchaseDate: "10 Jan 2024",
    progress: 100,
    status: "Concluído"
  },
  {
    id: 2,
    name: "Detox Celular 14 Dias",
    purchaseDate: "25 Jan 2024",
    progress: 50,
    status: "Em andamento"
  },
];

const userAppointments = [
  {
    id: 1,
    professional: "Dra. Helena Vasquez",
    type: "Retorno",
    date: "05 Fev 2024",
    time: "14:00",
    modality: "Online"
  },
];

export default function AreaUsuario() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Login/Register Form
  if (!isLoggedIn) {
    return (
      <Layout>
        <section className="section-padding pt-32">
          <div className="container-narrow max-w-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-headline mb-2">
                {isRegistering ? "Criar Conta" : "Área do Usuário"}
              </h1>
              <p className="text-muted-foreground">
                {isRegistering 
                  ? "Preencha seus dados para criar sua conta" 
                  : "Acesse para ver seus pedidos, protocolos e agendamentos"}
              </p>
            </div>

            <div className="bg-card rounded-sm p-8">
              {isRegistering ? (
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input id="firstName" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input id="lastName" placeholder="Seu sobrenome" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
                    Criar Conta
                  </Button>
                </form>
              ) : (
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
                    Entrar
                  </Button>
                </form>
              )}

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-sm text-primary hover:underline"
                >
                  {isRegistering 
                    ? "Já tem conta? Faça login" 
                    : "Não tem conta? Cadastre-se"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Logged In Dashboard
  return (
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-sm p-6 sticky top-28">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Maria Santos</p>
                    <p className="text-sm text-muted-foreground">maria@email.com</p>
                  </div>
                </div>
                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    <ShoppingBag className="h-4 w-4 mr-3" />
                    Pedidos
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-3" />
                    Protocolos
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-3" />
                    Agendamentos
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-3" />
                    Configurações
                  </Button>
                </nav>
                <div className="pt-6 mt-6 border-t border-border">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-muted-foreground"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sair
                  </Button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <h1 className="text-headline mb-8">Minha Conta</h1>

              <Tabs defaultValue="orders" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="orders">Pedidos</TabsTrigger>
                  <TabsTrigger value="protocols">Protocolos</TabsTrigger>
                  <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
                </TabsList>

                <TabsContent value="orders" className="space-y-4">
                  {userOrders.map((order) => (
                    <div key={order.id} className="bg-card rounded-sm p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Pedido</span>
                          <p className="font-medium">{order.id}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Data</span>
                          <p>{order.date}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Status</span>
                          <p className="text-primary">{order.status}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Total</span>
                          <p className="font-medium">R$ {order.total}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <span className="text-sm text-muted-foreground">Itens: </span>
                        <span className="text-sm">{order.items.join(", ")}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="protocols" className="space-y-4">
                  {userProtocols.map((protocol) => (
                    <div key={protocol.id} className="bg-card rounded-sm p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <p className="font-serif text-lg">{protocol.name}</p>
                          <span className="text-sm text-muted-foreground">
                            Adquirido em {protocol.purchaseDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-32">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary"
                                style={{ width: `${protocol.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {protocol.progress}% completo
                            </span>
                          </div>
                          <Button variant="outline" size="sm">
                            Acessar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="appointments" className="space-y-4">
                  {userAppointments.map((apt) => (
                    <div key={apt.id} className="bg-card rounded-sm p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <p className="font-serif text-lg">{apt.professional}</p>
                          <span className="text-sm text-muted-foreground">
                            {apt.type} • {apt.modality}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{apt.date}</p>
                          <p className="text-sm text-muted-foreground">{apt.time}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
      </section>
    </Layout>
  );
}
