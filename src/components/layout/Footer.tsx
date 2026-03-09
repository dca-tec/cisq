import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import cisqLogo from "@/assets/cisq-logo.png";

const footerLinks = {
  institucional: [
    { name: "Sobre o Instituto", href: "/sobre" },
    { name: "Fundamentos", href: "/sobre#fundamentos" },
    { name: "Conformidade", href: "/sobre#conformidade" },
    { name: "Contato", href: "/contato" },
  ],
  produtos: [
    { name: "Fórmulas", href: "/produtos?categoria=formulas" },
    { name: "Protocolos", href: "/protocolos" },
    { name: "Programas", href: "/protocolos?tipo=programas" },
  ],
  recursos: [
    { name: "Artigos", href: "/conhecimento" },
    { name: "Glossário", href: "/conhecimento/glossario" },
    { name: "Perguntas Frequentes", href: "/faq" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative">
                <img src={cisqLogo} alt="CISQ Logo" className="h-20 w-20 object-contain transition-transform duration-500 group-hover:scale-105 relative z-10" />
                <div className="absolute inset-0 rounded-full bg-[hsl(270,100%,60%)] opacity-40 blur-lg group-hover:opacity-60 transition-opacity duration-500 z-0" />
                <div className="absolute inset-[-4px] rounded-full bg-[hsl(270,100%,70%)] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 z-0" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-serif text-2xl font-bold uppercase tracking-[0.15em] text-accent drop-shadow-sm leading-none mb-1">
                  CISQ
                </span>
                <span className="block text-[9px] tracking-[0.12em] uppercase leading-tight max-w-[160px] text-justify text-primary-foreground/70 font-medium">
                  Centro de Inteligência em Saúde Quântica
                </span>
              </div>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              Laboratório dedicado ao estudo e aplicação de sistemas autogênicos, 
              promovendo equilíbrio através de conhecimento científico e práticas éticas.
            </p>
            <div className="space-y-3 text-sm opacity-80">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>contato@etnobotanica.bio</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>+55 (11) 4000-0000</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>São Paulo, Brasil<br />Atuação Internacional</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-serif text-lg mb-4 uppercase tracking-wider text-accent">Institucional</h4>
            <ul className="space-y-3">
              {footerLinks.institucional.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 uppercase tracking-wider text-accent">Produtos</h4>
            <ul className="space-y-3">
              {footerLinks.produtos.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 uppercase tracking-wider text-accent">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-70">
            <p>© 2024 CISQ — Centro de Inteligência em Saúde Quântica. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <Link to="/privacidade" className="hover:opacity-100 transition-opacity">
                Política de Privacidade
              </Link>
              <Link to="/termos" className="hover:opacity-100 transition-opacity">
                Termos de Uso
              </Link>
            </div>
          </div>
          <p className="text-xs opacity-50 mt-4 text-center md:text-left">
            Este site não substitui orientação médica profissional. Consulte sempre um profissional de saúde qualificado.
          </p>
        </div>
      </div>
    </footer>
  );
}
