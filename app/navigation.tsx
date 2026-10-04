'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';

const content = {
  Flota: { title: 'La flota detrás de cada entrega.', text: 'Unidades destinadas al transporte de carga general, refrigerada y operaciones especiales, con geolocalización para el seguimiento de los recorridos.' },
  Nosotros: { title: 'Tu socio en transporte.', text: 'BLG Transporte Internacional es un operador logístico de Paraguay que integra personas, procesos y tecnología para acompañar cada operación con atención personalizada.' },
} as const;
type Section = keyof typeof content;

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [section, setSection] = useState<Section>('Flota');
  const dialog = useRef<HTMLDialogElement>(null);
  function openSection(value: Section) { setSection(value); setMenuOpen(false); dialog.current?.showModal(); }
  return <>
    <header className="header">
      <a className="brand" href="#inicio" aria-label="BLG, inicio" onClick={() => setMenuOpen(false)}><Image src="/images/blg-logo.png" alt="BLG Transporte Internacional" width={500} height={258} priority /></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}><span>{menuOpen ? 'Cerrar' : 'Menú'}</span><span className={`menu-lines ${menuOpen ? 'is-open' : ''}`} aria-hidden="true" /></button>
      <nav id="main-nav" className={`navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
        <a className="nav-section" href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
        <a className="nav-section" href="#cobertura" onClick={() => setMenuOpen(false)}>Cobertura</a>
        {(Object.keys(content) as Section[]).map((name) => <button key={name} onClick={() => openSection(name)}>{name}</button>)}
        <a className="nav-contact" href="mailto:comercial@blg.com.py">Contacto</a>
      </nav>
    </header>
    <dialog className="info-panel" ref={dialog} aria-labelledby="panel-title" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="panel-content">
        <div className="panel-top"><span>{section}</span><button onClick={() => dialog.current?.close()} aria-label="Cerrar información">Cerrar ×</button></div>
        <h2 id="panel-title">{content[section].title}</h2><p>{content[section].text}</p><a href="mailto:comercial@blg.com.py">comercial@blg.com.py</a>
      </div>
    </dialog>
  </>;
}
