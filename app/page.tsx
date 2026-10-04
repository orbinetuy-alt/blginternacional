import Image from 'next/image';

export default function Home() {
  return (
    <main id="inicio">
      <header className="header">
        <a className="brand" href="#inicio" aria-label="BLG, inicio">
          <Image src="/images/blg-logo.png" alt="BLG Transporte Internacional" width={500} height={258} priority />
        </a>
        <span className="header-caption">Transporte terrestre<br />nacional e internacional</span>
        <a className="contact" href="mailto:comercial@blg.com.py">Hablemos de tu carga</a>
      </header>
      <section className="hero" aria-labelledby="hero-title">
        <div className="intro">
          <p className="kicker">BLG / Transporte Internacional</p>
          <div className="headline-row">
            <h1 id="hero-title">Compromiso<br /><span>en cada entrega.</span></h1>
            <p className="territory">Desde Paraguay.<br />Conectados con la región.</p>
          </div>
        </div>
        <figure className="road">
          <Image src="/images/blg-carretera.jpg" alt="Camiones de BLG Transporte Internacional recorriendo una carretera" width={2500} height={825} priority sizes="100vw" />
          <figcaption>BLG TRANSPORTE INTERNACIONAL</figcaption>
        </figure>
      </section>
    </main>
  );
}
