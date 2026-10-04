import Image from 'next/image';
import Navigation from './navigation';

export default function Home() {
  return (
    <main id="inicio">
      <Navigation />
      <section className="hero" aria-labelledby="hero-title">
        <Image className="hero-photo" src="/images/blg-carretera.jpg" alt="Flota de BLG Transporte Internacional en carretera" fill priority sizes="100vw" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-heading">
          <p className="eyebrow">Transporte nacional e internacional</p>
          <h1 id="hero-title">La confianza<br />mueve todo.</h1>
          <span className="signature" aria-hidden="true" />
        </div>
        <p className="photo-caption">BLG · TRANSPORTE TERRESTRE</p>
      </section>
    </main>
  );
}
