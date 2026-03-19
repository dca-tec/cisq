import { Layout } from "@/components/layout/Layout";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Globe, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function Eventos() {
  const { data: events, isLoading } = useSupabaseQuery("events", { filter: { is_active: true }, order: { column: "event_date", ascending: true } });
  const { user } = useAuth();
  const { toast } = useToast();

  const handleRegister = async (eventId: string) => {
    if (!user) {
      toast({ title: "Faça login para se inscrever", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("event_registrations").insert({ event_id: eventId, user_id: user.id });
    if (error) {
      if (error.code === "23505") toast({ title: "Você já está inscrito neste evento" });
      else toast({ title: "Erro ao se inscrever", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Inscrição realizada com sucesso!" });
    }
  };

  return (
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="text-caption mb-4">Eventos & Conferências</p>
            <h1 className="text-display mb-4">Eventos Científicos</h1>
            <p className="text-body-large max-w-2xl mx-auto">
              Participe de eventos sobre inteligência biológica, medicina antropológica e etnobotânica.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : !events || events.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhum evento disponível no momento.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {events.map((event: any) => (
                <div key={event.id} className="card-institutional">
                  {event.image_url && (
                    <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover rounded-sm mb-4" />
                  )}
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.event_date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      {event.is_online ? <Globe className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                      {event.is_online ? "Online" : event.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-primary">
                      {Number(event.price) > 0 ? `R$ ${Number(event.price).toFixed(2)}` : "Gratuito"}
                    </span>
                    <Button size="sm" onClick={() => handleRegister(event.id)}>Inscrever-se</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
