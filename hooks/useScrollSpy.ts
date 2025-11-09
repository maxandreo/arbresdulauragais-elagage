'use client';

import { useEffect, useState } from 'react';

/**
 * Hook pour détecter la section active lors du scroll
 * Utilise IntersectionObserver pour une performance optimale
 *
 * @param sectionIds - Tableau des IDs de sections à observer
 * @param options - Options de l'IntersectionObserver
 * @returns L'ID de la section actuellement active
 */
export function useScrollSpy(
  sectionIds: string[],
  options?: IntersectionObserverInit
) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-80px 0px -50% 0px', // Offset pour le header sticky
        ...options,
      }
    );

    // Observer toutes les sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [sectionIds, options]);

  return activeSection;
}
