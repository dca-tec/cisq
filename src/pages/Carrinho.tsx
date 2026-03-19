import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function Carrinho() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCart = async () => {
    if (!user) { setIsLoading(false); return; }
    const { data } = await supabase.from("cart_items").select("*").eq("user_id", user.id);
    setItems(data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchCart(); }, [user]);

  const removeItem = async (id: string) => {
    await supabase.from("cart_items").delete().eq("id", id);
    setItems(items.filter((i) => i.id !== id));
    toast({ title: "Item removido" });
  };

  if (!user) {
    return (
      <Layout>
        <section className="section-padding pt-32">
          <div className="container-narrow text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <h1 className="text-headline mb-4">Carrinho</h1>
            <p className="text-muted-foreground mb-4">Faça login para ver seu carrinho.</p>
            <Button asChild><Link to="/area-usuario">Fazer Login</Link></Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-narrow max-w-2xl">
          <h1 className="text-headline mb-8">Carrinho</h1>
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-muted-foreground mb-4">Seu carrinho está vazio.</p>
              <Button variant="outline" asChild><Link to="/produtos">Ver Produtos</Link></Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-card rounded-sm p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium capitalize">{item.item_type}</p>
                    <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <div className="pt-4 border-t">
                <Button className="w-full" disabled>Finalizar Pedido (em breve)</Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
