import Image from 'next/image';

export default function FleetPhoto() {
  return <>
    <div className="fleet-photo">
      <Image src="/images/blg-flota.jpg" alt="Camiones blancos de la flota BLG alineados al aire libre, con un semirremolque azul en primer plano" width={4000} height={3000} sizes="100vw" />
      <div className="fleet-photo-tint" aria-hidden="true" />
      <div className="fleet-photo-fade" aria-hidden="true" />
    </div>
    <section className="fleet-intro" id="flota" aria-labelledby="fleet-title">
      <span className="fleet-rule" aria-hidden="true" />
      <h2 id="fleet-title">Nuestra flota.</h2>
    </section>
  </>;
}
