export default function About() {
  return (
    <section className="about" id="nosotros" aria-labelledby="about-title">
      <div className="about-inner">
        <div className="about-heading">
          <p className="section-label">Quiénes somos</p>
          <h2 id="about-title">Somos tu<br />socio estratégico.</h2>
        </div>

        <div className="about-intro">
          <p>BLG Transporte Internacional es un operador logístico especializado en el transporte terrestre nacional e internacional de cargas.</p>
          <p>Conectamos mercados con eficiencia, seguridad y tecnología, integrando personas, procesos y herramientas digitales para generar valor en cada etapa del transporte.</p>
        </div>

        <div className="about-experience" aria-label="Más de 20 años de experiencia">
          <p className="about-number">20<span>+</span></p>
          <div>
            <p className="about-overline">Años de experiencia</p>
            <h3>Una empresa joven.<br />Experiencia que respalda cada operación.</h3>
          </div>
        </div>

        <div className="about-commitment">
          <p>Comprometidos con superar las expectativas, nuestro trabajo va más allá de trasladar mercancías: garantizamos el cumplimiento de cada operación mediante una gestión profesional, información en tiempo real y atención personalizada.</p>
          <blockquote>Más que un proveedor de servicios,<br /><strong>somos un socio comercial.</strong></blockquote>
        </div>

        <div className="about-footer">
          <span>Personas · Procesos · Tecnología</span>
          <a href="mailto:comercial@blgtransporte.com?subject=Contacto%20con%20BLG">Conversemos <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
