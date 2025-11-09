'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import Modal from '@/components/ui/Modal';
import ContactForm from '@/components/sections/ContactForm';

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Afficher les boutons après 50vh de scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsVisible(scrolled > viewportHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Boutons flottants */}
      <div
        className={cn(
          'fixed bottom-6 right-6 flex flex-col gap-3 z-40 transition-all duration-300',
          isVisible
            ? 'translate-x-0 opacity-100'
            : 'translate-x-20 opacity-0 pointer-events-none'
        )}
      >
        {/* Bouton Devis gratuit */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={cn(
            'group flex items-center gap-2 px-5 py-3 bg-accent text-white rounded-full shadow-lg',
            'hover:bg-accent/90 hover:shadow-xl hover:scale-105',
            'transition-all duration-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'
          )}
          aria-label="Demander un devis gratuit"
        >
          <FileText size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="font-medium hidden sm:inline">Devis gratuit</span>
        </button>

        {/* Bouton Scroll to top */}
        <button
          onClick={scrollToTop}
          className={cn(
            'group flex items-center justify-center w-12 h-12 bg-brand text-white rounded-full shadow-lg',
            'hover:bg-brand/90 hover:shadow-xl hover:-translate-y-1',
            'transition-all duration-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'
          )}
          aria-label="Retour en haut"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Modal Devis */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Demander un devis gratuit"
        size="md"
      >
        <ContactForm onSuccess={() => setIsModalOpen(false)} isCompact />
      </Modal>
    </>
  );
}
