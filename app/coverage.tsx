'use client';

import { useState, type KeyboardEvent } from 'react';
import maps from './data/coverage-maps.json';

type Mode = 'national' | 'international';
export default function Coverage() {
  const [mode, setMode] = useState<Mode>('national');
  const [selections, setSelections] = useState({national:'PY-ASU',international:'600'});
  const [hovered, setHovered] = useState<string | null>(null);
  const regions = maps[mode];
  const selected = regions.find(region => region.id === selections[mode])!;
  const active = regions.find(region => region.id === hovered) ?? selected;
  const national = mode === 'national';
  const selectable = regions.filter(region => region.covered).sort((a,b)=>a.name.localeCompare(b.name,'es'));
  function choose(id: string) { setSelections(previous => ({...previous,[mode]:id})); }
  function changeMode(next: Mode) { setMode(next); setHovered(null); }
  function tabKeys(event: KeyboardEvent<HTMLButtonElement>) {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 'national' : event.key === 'End' ? 'international' : national ? 'international' : 'national';
    changeMode(next);
    document.getElementById(`coverage-tab-${next}`)?.focus();
  }
  const mail = `mailto:comercial@blg.com.py?subject=${encodeURIComponent(`Consulta de transporte ${national ? 'nacional' : 'internacional'}: ${selected.name}`)}&body=${encodeURIComponent(`Hola BLG, quisiera consultar por un envío hacia ${selected.name}${national ? ', Paraguay' : ''}.\n\nOrigen:\nTipo de carga:\nFecha estimada:\n`)}`;
  const asuncion = maps.national.find(region => region.id === 'PY-ASU')!;

  return <section className="coverage" id="cobertura" aria-labelledby="coverage-title">
    <div className="coverage-inner">
      <div className="coverage-copy">
        <p className="section-label">Nuestra cobertura</p>
        <h2 id="coverage-title">Cerca de tu carga.<br />Más allá de las fronteras.</h2>
        <div className="coverage-tabs" role="tablist" aria-label="Tipo de cobertura">
          {(['national','international'] as const).map(value => <button key={value} id={`coverage-tab-${value}`} type="button" role="tab" aria-selected={mode === value} aria-controls="coverage-panel" tabIndex={mode === value ? 0 : -1} onKeyDown={tabKeys} onClick={()=>changeMode(value)}>{value === 'national' ? 'Nacional' : 'Internacional'}</button>)}
        </div>
        <div className="coverage-description">
          <p>{national ? 'Llegamos a los 17 departamentos de Paraguay y a Asunción.' : 'Conectamos Paraguay con Argentina, Bolivia, Brasil, Chile y Uruguay.'}</p>
          <span>{national ? 'Seleccioná un departamento o la capital para consultar tu envío.' : 'Seleccioná un país de nuestra cobertura para consultar tu operación.'}</span>
        </div>
        <label className="destination-label" htmlFor="coverage-destination">{national ? 'Departamento o capital' : 'País de destino'}</label>
        <select id="coverage-destination" value={selected.id} onChange={event => {choose(event.target.value);setHovered(null);}}>
          {selectable.map(region => <option key={region.id} value={region.id}>{region.name}</option>)}
        </select>
        <div className="coverage-selection" aria-live="polite" aria-atomic="true">
          <span>{national ? selected.id === 'PY-ASU' ? 'Capital · Paraguay' : 'Departamento · Paraguay' : 'Cobertura internacional'}</span>
          <h3>{selected.name}</h3>
        </div>
        <a className="coverage-inquiry" href={mail}>Consultar envío a {selected.name}</a>
      </div>
      <div className="coverage-map-panel" id="coverage-panel" role="tabpanel" aria-labelledby={`coverage-tab-${mode}`}>
        <div className="map-topline"><span>{national ? 'Paraguay' : 'América del Sur'}</span><span className="map-current">{active.name}</span></div>
        <svg key={mode} className="coverage-map" viewBox="0 0 700 620" role="group" aria-label={national ? 'Mapa interactivo de los departamentos de Paraguay y Asunción' : 'Mapa interactivo de países con cobertura de BLG'}>
          {regions.map(region => <path key={region.id} d={region.path ?? ''} className={`map-region ${region.covered ? 'is-covered' : 'is-context'} ${selected.id === region.id ? 'is-selected' : ''} ${hovered === region.id ? 'is-hovered' : ''}`} role={region.covered ? 'button' : undefined} tabIndex={region.covered ? 0 : undefined} aria-label={region.covered ? region.name : undefined} aria-pressed={region.covered ? selected.id === region.id : undefined} aria-hidden={!region.covered ? true : undefined} onPointerEnter={()=>region.covered && setHovered(region.id)} onPointerLeave={()=>setHovered(null)} onFocus={()=>region.covered && setHovered(region.id)} onBlur={()=>setHovered(null)} onClick={()=>region.covered && choose(region.id)} onKeyDown={event=>{if(region.covered && (event.key==='Enter' || event.key===' ')){event.preventDefault();choose(region.id);}}}><title>{region.name}</title></path>)}
          {national && <g className="capital-marker" onClick={()=>choose('PY-ASU')} aria-hidden="true">
            <circle cx={asuncion.center[0]} cy={asuncion.center[1]} r="13" fill="transparent" />
            <circle cx={asuncion.center[0]} cy={asuncion.center[1]} r="5" className={selected.id === 'PY-ASU' ? 'capital-selected' : ''} />
            <path d={`M${asuncion.center[0]-8},${asuncion.center[1]}h-42`} />
            <text x={asuncion.center[0]-58} y={asuncion.center[1]+5} textAnchor="end">Asunción</text>
          </g>}
        </svg>
        <div className="map-legend"><span><i className="legend-covered" />Con cobertura</span><span><i className="legend-selected" />Selección</span>{!national && <span><i className="legend-context" />Sin cobertura indicada</span>}</div>
        <p className="map-attribution">Cartografía: {national ? <a href="https://www.geoboundaries.org/" target="_blank" rel="noreferrer">geoBoundaries / DGEEC · CC BY 4.0</a> : <a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">Natural Earth</a>}</p>
      </div>
    </div>
  </section>;
}
