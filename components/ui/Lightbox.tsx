'use client';

import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface LightboxProps {
  images: { src: string; alt: string; caption?: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  // Gestion clavier
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Empêcher scroll du body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Galerie d'images"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent z-10">
        <div className="text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Fermer"
        >
          <X size={28} />
        </button>
      </div>

      {/* Image */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-12">
        <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            priority
          />
        </div>
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm"
            aria-label="Image précédente"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm"
            aria-label="Image suivante"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Caption */}
      {currentImage.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-white text-center text-sm md:text-base max-w-3xl mx-auto">
            {currentImage.caption}
          </p>
        </div>
      )}
    </div>
  );
}
