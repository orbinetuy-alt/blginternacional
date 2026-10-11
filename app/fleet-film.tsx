'use client';

import { useEffect, useRef, useState } from 'react';

export default function FleetFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const visible = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (visible.current && !document.hidden && !userPaused.current && !reducedMotion.matches) {
        void element.play().catch(() => setPlaying(false));
      } else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      sync();
    }, { threshold: 0.15 });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reducedMotion.removeEventListener('change', sync);
      element.pause();
    };
  }, []);

  function togglePlayback() {
    const element = video.current;
    if (!element) return;
    if (element.paused) {
      userPaused.current = false;
      void element.play().catch(() => setPlaying(false));
    } else {
      userPaused.current = true;
      element.pause();
    }
  }

  return <>
    <div className="fleet-film" role="region" aria-label="Los camiones de BLG">
      <video ref={video} id="fleet-video" width="1280" height="720" muted playsInline loop preload="none"
        poster="/images/blg-flota-poster.jpg" aria-label="Vista de los camiones de BLG estacionados al aire libre. Video sin sonido."
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)}>
        <source src="/videos/blg-flota.mp4" type="video/mp4" />
        Tu navegador no permite reproducir este video.
      </video>
      <div className="fleet-film-fade" aria-hidden="true" />
      {!failed && <button className="fleet-film-control" type="button" aria-controls="fleet-video" onClick={togglePlayback} aria-label={playing ? 'Pausar video de la flota' : 'Reproducir video de la flota'}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">{playing ? <><path d="M3 2h3v10H3z" /><path d="M8 2h3v10H8z" /></> : <path d="M3 1.5 12 7 3 12.5z" />}</svg>
        <span>{playing ? 'Pausar' : 'Reproducir'}</span>
      </button>}
    </div>
    <section className="fleet-intro" id="flota" aria-labelledby="fleet-title">
      <span className="fleet-rule" aria-hidden="true" />
      <h2 id="fleet-title">Nuestra flota.</h2>
    </section>
  </>;
}
