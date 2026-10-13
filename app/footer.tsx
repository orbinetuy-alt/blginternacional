import Image from 'next/image';

const footerLinks = [
  ['Servicios', '#servicios'],
  ['Cobertura', '#cobertura'],
  ['Flota', '#flota'],
  ['Nosotros', '#nosotros'],
] as const;

export default function Footer() {
  return (
    <footer className="site-footer" aria-labelledby="footer-title">
      <div className="footer-inner">
        <div className="footer-callout">
          <p className="footer-overline">Tu próxima operación</p>
          <a href="#contacto">
            <span id="footer-title">Hablemos de tu carga.</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="footer-main">
          <div className="footer-brand">
            <a href="#inicio" aria-label="BLG, volver al inicio">
              <Image src="/images/blg-logo.png" alt="BLG Transporte Internacional" width={500} height={258} />
            </a>
            <p>Transporte terrestre nacional e internacional desde Paraguay.</p>
          </div>

          <nav className="footer-column" aria-label="Navegación del pie de página">
            <p>Explorar</p>
            {footerLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>

          <div className="footer-column footer-contact">
            <p>Contacto comercial</p>
            <a href="mailto:comercial@blgtransporte.com">comercial@blgtransporte.com</a>
            <a href="#contacto">Solicitar una cotización <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} BLG Transporte Internacional</span>
          <span>Paraguay · Conectados con la región</span>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
  );
}
