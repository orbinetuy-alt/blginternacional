'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const update = () => setCompact(previous => window.scrollY > (previous ? 24 : 64));
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <>
    <div className="header-space" aria-hidden="true" />
    <header className={`header${compact ? ' is-compact' : ''}`}>
      <a className="brand" href="#inicio" aria-label="BLG, inicio" onClick={() => setMenuOpen(false)}><Image src="/images/blg-logo.png" alt="BLG Transporte Internacional" width={500} height={258} priority /></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}><span>{menuOpen ? 'Cerrar' : 'Menú'}</span><span className={`menu-lines ${menuOpen ? 'is-open' : ''}`} aria-hidden="true" /></button>
      <nav id="main-nav" className={`navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
        <a className="nav-section" href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
        <a className="nav-section" href="#cobertura" onClick={() => setMenuOpen(false)}>Cobertura</a>
        <a className="nav-section" href="#flota" onClick={() => setMenuOpen(false)}>Flota</a>
        <a className="nav-section" href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
        <a className="nav-contact" href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
      </nav>
    </header>
  </>;
}
