"use client";

import { useState } from "react";

// Crop only the presentation viewport: the supplied artwork stays untouched.
const clients = [
  { file: "unilever", name: "Unilever", viewBox: "679 604 665 726", width: 76 },
  { file: "nestle", name: "Nestlé", viewBox: "620 635 799 758", width: 90 },
  { file: "cereales", name: "Cereales S.A.", viewBox: "551 582 859 887", width: 85 },
  { file: "grafitec", name: "Grafitec S.A.", viewBox: "547 821 902 314", width: 163 },
  { file: "azpa", name: "AZPA", viewBox: "546 823 952 304", width: 163 },
  { file: "electroban", name: "Electroban", viewBox: "597 733 881 518", width: 140 },
  { file: "modiga", name: "Módiga", viewBox: "564 691 908 606", width: 120 },
];

export default function Clients() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="clients" id="clientes" aria-labelledby="clients-title">
      <div className="clients-inner">
        <h2 id="clients-title">Clientes que confían en nosotros</h2>
        <div className="clients-window">
          <div className="clients-track" id="clients-track" data-paused={paused}>
            {[0, 1].map((copy) => (
              <ul className="clients-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                {clients.map((client) => (
                  <li className="client-logo" key={client.file}>
                    <svg
                      viewBox={client.viewBox}
                      style={{ width: client.width }}
                      role={copy === 0 ? "img" : undefined}
                      aria-label={copy === 0 ? client.name : undefined}
                      focusable="false"
                    >
                      <image href={`/images/clients/${client.file}.png`} width="2000" height="2000" />
                    </svg>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <button
          className="clients-pause"
          type="button"
          aria-controls="clients-track"
          aria-label={paused ? "Reanudar carrusel de clientes" : "Pausar carrusel de clientes"}
          onClick={() => setPaused((value) => !value)}
        >
          <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
          {paused ? "Reanudar" : "Pausar"}
        </button>
      </div>
    </section>
  );
}
