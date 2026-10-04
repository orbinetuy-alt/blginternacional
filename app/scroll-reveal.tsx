'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Content stays visible in the server HTML and when motion is reduced. */
export default function ScrollReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = root.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!scope || preference.matches || !('IntersectionObserver' in window)) return;

    const targets = Array.from(scope.querySelectorAll<HTMLElement>('.services-header, .service, .services-complementary, .services-contact'));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.reveal = 'visible';
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0, rootMargin: '0px 0px -28px 0px' });

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

  return <div ref={root}>{children}</div>;
}
