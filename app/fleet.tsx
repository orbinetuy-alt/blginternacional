'use client';

import { useState, type KeyboardEvent } from 'react';

type FleetMode = 'nacional' | 'internacional';
const capacities = ['1.000', '2.500', '3.500', '5.000', '10.000', '15.000'];

export default function Fleet() {
  const [mode, setMode] = useState<FleetMode>('nacional');
  const national = mode === 'nacional';
  function onTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 'nacional' : event.key === 'End' ? 'internacional' : national ? 'internacional' : 'nacional';
    setMode(next);
    document.getElementById(`fleet-tab-${next}`)?.focus();
  }
  return <section className="fleet-section" id="flota" aria-labelledby="fleet-title">
    <div className="fleet-inner">
      <header className="fleet-heading">
        <div><p className="section-label">Capacidad propia</p><h2 id="fleet-title">Nuestra flota.</h2></div>
        <div className="fleet-tabs" role="tablist" aria-label="Elegir flota">
          {(['nacional', 'internacional'] as const).map(value => <button key={value} type="button" role="tab" id={`fleet-tab-${value}`} aria-selected={mode === value} aria-controls="fleet-panel" tabIndex={mode === value ? 0 : -1} onClick={() => setMode(value)} onKeyDown={onTabKey}>{value === 'nacional' ? 'Nacional' : 'Internacional'}</button>)}
        </div>
      </header>
      <div className="fleet-panel" role="tabpanel" id="fleet-panel" aria-labelledby={`fleet-tab-${mode}`} tabIndex={0}>
        <div className="fleet-owned">
          <p className="fleet-kicker">Flota {mode}</p>
          <p className="fleet-count" aria-label={national ? 'Más de 80 unidades propias' : '25 unidades propias'}>{national ? '80' : '25'}{national && <span>+</span>}</p>
          <p className="fleet-count-caption">unidades propias</p>
          <div className="fleet-support"><p>{national ? '50–60' : '50+'}<span>unidades tercerizadas de apoyo</span></p></div>
        </div>
        <div className="fleet-specs">
          {national ? <>
            <div className="fleet-spec-heading"><span>01 / Configuración</span><h3>Una flota de furgones.<br /><span>Dos tipos de carga.</span></h3></div>
            <div className="fleet-types">
              <div><span className="fleet-type-mark" aria-hidden="true">D</span><h4>Secos <span>/ Dry</span></h4></div>
              <div><span className="fleet-type-mark" aria-hidden="true">F</span><h4>Refrigerados</h4></div>
            </div>
            <div className="fleet-capacities"><p>02 / Capacidades de la flota nacional</p><ul>{capacities.map(value => <li key={value}>{value}<span>kg</span></li>)}</ul></div>
          </> : <>
            <div className="fleet-spec-heading"><span>01 / Configuración</span><h3>Carretas para<br /><span>transporte internacional.</span></h3></div>
            <div className="fleet-length"><p>14,50<span>m</span></p><div className="fleet-measure" aria-hidden="true" /><span>Largo de las carretas</span></div>
            <p className="fleet-international-note">25 unidades propias, con el apoyo de más de 50 unidades tercerizadas.</p>
          </>}
        </div>
      </div>
      <div className="fleet-footer"><p>Hablemos de tu próxima carga.</p><a href={`mailto:comercial@blg.com.py?subject=${encodeURIComponent(`Consulta sobre flota ${mode}`)}`}>Consultar disponibilidad <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>;
}
