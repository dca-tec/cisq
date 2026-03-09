import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

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
            <Link to="/" className="flex flex-col gap-2 mb-4 group">
              <span className="font-sans text-5xl font-extralight uppercase tracking-[0.3em] text-accent leading-none transition-opacity duration-300 group-hover:opacity-80">
                CISQ
              </span>
              <span className="block text-[9px] tracking-[0.15em] uppercase leading-tight text-primary-foreground/60 font-light">
                Centro de Inteligência em Saúde Quântica
              </span>
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
