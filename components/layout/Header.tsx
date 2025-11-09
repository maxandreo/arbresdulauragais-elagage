'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_SECTIONS } from '@/lib/constants';
import { scrollToSection, cn } from '@/lib/utils';
import { useScrollSpy } from '@/hooks/useScrollSpy';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Détection de la section active
  const activeSection = useScrollSpy(NAV_SECTIONS.map((s) => s.id));

  // Détection du scroll pour header sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-white/95 backdrop-blur-sm py-5'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('accueil')}
          className="flex flex-col text-left transition-opacity hover:opacity-80"
          aria-label="Retour à l'accueil"
        >
          <span className="text-xl md:text-2xl font-bold text-brand leading-tight">
            Arbres du Lauragais
          </span>
          <span className="text-xs md:text-sm text-accent font-medium">
            Élagage professionnel
          </span>
        </button>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Navigation principale">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={cn(
                'relative text-sm lg:text-base font-medium transition-colors py-2',
                'hover:text-accent',
                activeSection === section.id
                  ? 'text-accent'
                  : 'text-text'
              )}
              aria-current={activeSection === section.id ? 'page' : undefined}
            >
              {section.label}

              {/* Underline animé pour la section active */}
              {activeSection === section.id && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Bouton Menu Mobile */}
        <button
          className="md:hidden p-2 text-brand hover:text-accent transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-2xl md:hidden animate-slide-in-right"
          >
            <nav
              className="flex flex-col gap-2 p-6 pt-20"
              aria-label="Navigation mobile"
            >
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={cn(
                    'text-left px-4 py-3 rounded-lg text-lg font-medium transition-all',
                    'hover:bg-accent/10 hover:text-accent',
                    activeSection === section.id
                      ? 'bg-accent/10 text-accent'
                      : 'text-text'
                  )}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
