import { Layout } from "@/components/layout/Layout";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Loader2 } from "lucide-react";

export default function Ebooks() {
  const { data: ebooks, isLoading } = useSupabaseQuery("ebooks", { filter: { is_active: true }, order: { column: "created_at", ascending: false } });

  return (
    <Layout>
      <section className="section-padding pt-32">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="text-caption mb-4">Biblioteca Digital</p>
            <h1 className="text-display mb-4">E-books</h1>
            <p className="text-body-large max-w-2xl mx-auto">
              Aprofunde seus conhecimentos com nossos e-books sobre inteligência biológica e etnobotânica.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : !ebooks || ebooks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>Nenhum e-book disponível no momento.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {ebooks.map((ebook: any) => (
                <div key={ebook.id} className="card-institutional text-center">
                  {ebook.cover_url && (
                    <img src={ebook.cover_url} alt={ebook.title} className="w-full h-64 object-cover rounded-sm mb-4" />
                  )}
                  <h3 className="text-lg font-medium mb-1">{ebook.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">por {ebook.author}</p>
                  <p className="text-muted-foreground text-sm mb-4">{ebook.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-primary">
                      {ebook.is_free ? "Gratuito" : `R$ ${Number(ebook.price).toFixed(2)}`}
                    </span>
                    <Button size="sm" variant={ebook.is_free ? "default" : "outline"}>
                      {ebook.is_free ? <><Download className="h-4 w-4 mr-1" />Baixar</> : "Adquirir"}
                    </Button>
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
