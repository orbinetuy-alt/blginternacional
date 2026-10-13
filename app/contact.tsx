'use client';

import { useState, type FormEvent, type KeyboardEvent } from 'react';

type Channel = 'empresas' | 'trabajo';

const channels = [
  { id: 'empresas' as const, number: '01', title: 'Consultas para empresas', text: 'Cotizaciones, disponibilidad y coordinación de operaciones.' },
  { id: 'trabajo' as const, number: '02', title: 'Trabajá con nosotros', text: 'Postulaciones laborales y envío de currículum.' },
];

export default function Contact() {
  const [channel, setChannel] = useState<Channel>('empresas');

  function tabKeys(event: KeyboardEvent<HTMLButtonElement>) {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'ArrowDown' || event.key === 'End' ? 'trabajo' : 'empresas';
    setChannel(next);
    document.getElementById(`contact-tab-${next}`)?.focus();
  }

  function prepareInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      `Nombre: ${String(data.get('name') ?? '')}`,
      `Empresa: ${String(data.get('company') ?? '')}`,
      `Email: ${String(data.get('email') ?? '')}`,
      `Teléfono: ${String(data.get('phone') ?? '') || 'No indicado'}`,
      `Servicio: ${String(data.get('service') ?? '')}`,
      '',
      String(data.get('message') ?? ''),
    ];
    window.location.href = `mailto:comercial@blgtransporte.com?subject=${encodeURIComponent('Consulta empresarial desde la web')}&body=${encodeURIComponent(lines.join('\n'))}`;
  }

  return (
    <section className="contact-section" id="contacto" aria-labelledby="contact-title">
      <div className="contact-inner">
        <div className="contact-heading">
          <p className="section-label">Contacto</p>
          <h2 id="contact-title">El canal correcto<br />para cada conversación.</h2>
          <p>Atendemos por separado las necesidades de empresas y las postulaciones laborales para responder cada consulta de forma más ágil.</p>

          <div className="contact-channels" role="tablist" aria-label="Canal de contacto">
            {channels.map((item) => (
              <button key={item.id} id={`contact-tab-${item.id}`} type="button" role="tab" aria-selected={channel === item.id} aria-controls="contact-panel" tabIndex={channel === item.id ? 0 : -1} onKeyDown={tabKeys} onClick={() => setChannel(item.id)}>
                <span>{item.number}</span>
                <span><strong>{item.title}</strong><small>{item.text}</small></span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </div>

        <div className="contact-panel" id="contact-panel" role="tabpanel" aria-labelledby={`contact-tab-${channel}`}>
          {channel === 'empresas' ? (
            <form onSubmit={prepareInquiry}>
              <p className="contact-kicker">Para empresas</p>
              <h3>Contanos qué necesitás transportar.</h3>
              <p className="contact-panel-intro">Completá los datos esenciales. Al finalizar, prepararemos el correo con tu consulta.</p>
              <div className="contact-form-grid">
                <label>Nombre y apellido<input name="name" autoComplete="name" placeholder="Tu nombre" required /></label>
                <label>Empresa<input name="company" autoComplete="organization" placeholder="Nombre de la empresa" required /></label>
                <label>Email corporativo<input name="email" type="email" autoComplete="email" placeholder="nombre@empresa.com" required /></label>
                <label>Teléfono <span>(opcional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="Tu número de contacto" /></label>
                <label className="contact-wide">Servicio
                  <select name="service" defaultValue="" required>
                    <option value="" disabled>Seleccioná una opción</option>
                    <option>Transporte nacional</option>
                    <option>Transporte internacional</option>
                    <option>Carga refrigerada</option>
                    <option>Carga especial o de proyecto</option>
                    <option>Distribución o almacenaje</option>
                    <option>Otra consulta</option>
                  </select>
                </label>
                <label className="contact-wide">Detalles de la operación<textarea name="message" rows={5} placeholder="Origen, destino, tipo de carga, peso y fecha estimada." required /></label>
              </div>
              <button className="contact-submit" type="submit">Preparar consulta <span aria-hidden="true">↗</span></button>
              <p className="contact-note">Se abrirá tu aplicación de correo para enviar la consulta a BLG.</p>
            </form>
          ) : (
            <div className="jobs-panel">
              <p className="contact-kicker">Trabajá con nosotros</p>
              <h3>Queremos conocerte.</h3>
              <p className="contact-panel-intro">Si querés formar parte de BLG, envianos tu currículum y una breve presentación para futuras oportunidades.</p>
              <div className="jobs-details">
                <p>Incluí en el correo</p>
                <ul>
                  <li><span>01</span> Área o puesto de interés</li>
                  <li><span>02</span> Ciudad de residencia</li>
                  <li><span>03</span> Currículum adjunto</li>
                </ul>
              </div>
              <a className="contact-submit" href="mailto:comercial@blg.com.py?subject=Postulaci%C3%B3n%20laboral%20-%20BLG">Enviar mi CV <span aria-hidden="true">↗</span></a>
              <p className="contact-note">La postulación se enviará por correo electrónico.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
