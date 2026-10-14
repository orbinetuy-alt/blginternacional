'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const revealTargets = [
  '.services-header', '.service', '.services-complementary', '.services-contact',
  '.clients h2', '.clients-window', '.clients-pause',
  '.coverage-copy', '.coverage-map-panel',
  '.fleet-photo',
  '.fleet-heading', '.fleet-owned', '.fleet-specs', '.fleet-footer',
  '.about-heading', '.about-intro', '.about-experience', '.about-commitment', '.about-footer',
  '.contact-mode-bar', '.contact-heading', '.contact-channels', '.contact-panel',
  '.footer-callout', '.footer-main', '.footer-bottom',
].join(', ');

/** Content stays visible in the server HTML and when motion is reduced or JS is unavailable. */
export default function ScrollReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = root.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!scope || preference.matches || !('IntersectionObserver' in window)) return;

    const targets = Array.from(scope.querySelectorAll<HTMLElement>(revealTargets));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.reveal = 'visible';
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.06, rootMargin: '0px 0px -5% 0px' });

    for (const target of targets) {
      // Never hide content the visitor is already reading (including deep links).
      if (target.getBoundingClientRect().top >= window.innerHeight) {
        target.dataset.reveal = 'pending';
        observer.observe(target);
      }
    }

    function revealFocused(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>('[data-reveal="pending"]');
      if (target) {
        target.dataset.reveal = 'visible';
        observer.unobserve(target);
      }
    }
    function revealAll() {
      if (!preference.matches) return;
      observer.disconnect();
      targets.forEach((target) => { delete target.dataset.reveal; });
    }
    scope.addEventListener('focusin', revealFocused);
    preference.addEventListener('change', revealAll);
    return () => {
      observer.disconnect();
      scope.removeEventListener('focusin', revealFocused);
      preference.removeEventListener('change', revealAll);
      targets.forEach((target) => { delete target.dataset.reveal; });
    };
  }, []);

  return <div className="reveal-scope" ref={root}>{children}</div>;
}
