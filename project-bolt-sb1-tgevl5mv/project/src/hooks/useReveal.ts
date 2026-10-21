import { useEffect, useRef } from 'react';

/**
 * Adds the `is-visible` class to any element with the `reveal` class
 * as it scrolls into view. Returns a ref to attach to a container.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current ?? document;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    const els = (root instanceof HTMLElement ? root : document).querySelectorAll('.reveal:not(.is-visible)');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}
