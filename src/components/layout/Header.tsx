import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, Calendar, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Instituto", href: "/sobre" },
  { name: "Produtos", href: "/produtos" },
  { name: "Protocolos", href: "/protocolos" },
  { name: "Conhecimento", href: "/conhecimento" },
  { name: "Agendamento", href: "/agendamento" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <nav className="container-wide">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="font-sans text-2xl font-extralight uppercase tracking-[0.3em] text-accent leading-none transition-opacity duration-300 group-hover:opacity-80">
              CISQ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-xs font-medium uppercase tracking-[0.12em] transition-colors relative py-2 ${
                  isActive(item.href)
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-accent" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/carrinho">
                <ShoppingBag className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/area-usuario">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="default" size="sm" className="ml-2" asChild>
              <Link to="/agendamento">
                <Calendar className="h-4 w-4 mr-2" />
                Agendar
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/area-usuario">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background">
                <div className="flex flex-col h-full pt-8">
                  <nav className="flex flex-col gap-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-3 text-lg font-serif transition-colors rounded-sm ${
                          isActive(item.href)
                            ? "text-primary bg-primary/5"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto pb-8 px-4 space-y-3">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/carrinho" onClick={() => setIsOpen(false)}>
                        <ShoppingBag className="h-5 w-5 mr-3" />
                        Carrinho
                      </Link>
                    </Button>
                    <Button variant="default" className="w-full" asChild>
                      <Link to="/agendamento" onClick={() => setIsOpen(false)}>
                        <Calendar className="h-5 w-5 mr-3" />
                        Agendar Consulta
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
