const services = [
  { name: 'Carga general', description: 'Cargas completas para operaciones de transporte nacional e internacional.', label: 'FTL · Cargas completas' },
  { name: 'Carga refrigerada', description: 'Transporte con temperatura controlada para preservar la cadena de frío.', label: 'FTL · Cadena de frío' },
  { name: 'Cargas especiales', description: 'Planificación y transporte de cargas de proyecto y sobredimensionadas.', label: 'Operaciones de proyecto' },
  { name: 'Cargas peligrosas', description: 'Transporte bajo los requisitos específicos de seguridad de cada operación.', label: 'Transporte especializado' },
  { name: 'Express y críticos', description: 'Coordinación de envíos urgentes y operaciones con tiempos de entrega reducidos.', label: 'Operaciones prioritarias' },
  { name: 'Puerta a puerta', description: 'Coordinación integral del transporte, desde la recolección hasta la entrega final.', label: 'Origen a destino' },
] as const;

export default function Services() {
  return (
    <section className="services" id="servicios" aria-labelledby="services-title">
      <div className="services-inner">
        <header className="services-header">
          <p className="section-label">Nuestros servicios</p>
          <div className="services-intro">
            <h2 id="services-title">Soluciones de transporte.</h2>
            <p>Para cada tipo de carga.<br />En cada etapa del recorrido.</p>
          </div>
        </header>

        <ol className="services-list">
          {services.map((service, index) => (
            <li className="service" key={service.name}>
              <span className="service-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div className="service-content">
                <h3><a href={`mailto:comercial@blgtransporte.com?subject=${encodeURIComponent(`Consulta sobre ${service.name.toLowerCase()}`)}`} aria-label={`Consultar sobre ${service.name.toLowerCase()} por correo`}>{service.name}</a></h3>
                <p>{service.description}</p>
                <span className="service-label">{service.label}</span>
              </div>
            </li>
          ))}
        </ol>

        <div className="services-complementary">
          <p className="complementary-label">También acompañamos<br />tu operación con</p>
          <div><h3>Distribución local</h3><p>Distribución de carga general y refrigerada hasta su destino final.</p></div>
          <div><h3>Almacenaje</h3><p>Resguardo de mercadería hasta el momento de su envío.</p></div>
        </div>
        <div className="services-contact"><span>Contanos qué necesitás transportar.</span><a href="mailto:comercial@blgtransporte.com?subject=Consulta%20de%20transporte">Hablemos de tu operación</a></div>
      </div>
    </section>
  );
}
