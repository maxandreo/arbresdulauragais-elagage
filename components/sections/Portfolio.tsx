'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import Lightbox from '@/components/ui/Lightbox';

// Images de démonstration (à remplacer par les vraies images)
const portfolioImages = [
  {
    src: '/images/portfolio/before-after-1.jpg',
    alt: 'Élagage d\'un chêne centenaire',
    caption: 'Élagage d\'un chêne centenaire - Toulouse',
    category: 'elagage',
  },
  {
    src: '/images/portfolio/before-after-2.jpg',
    alt: 'Abattage sécurisé en zone urbaine',
    caption: 'Abattage sécurisé en zone urbaine - Carcassonne',
    category: 'abattage',
  },
  {
    src: '/images/portfolio/before-after-3.jpg',
    alt: 'Taille de haies de thuyas',
    caption: 'Taille de haies de thuyas - Castres',
    category: 'taille-haies',
  },
  {
    src: '/images/portfolio/before-after-4.jpg',
    alt: 'Démontage d\'un pin en espace restreint',
    caption: 'Démontage d\'un pin en espace restreint - Revel',
    category: 'demontage',
  },
  {
    src: '/images/portfolio/before-after-5.jpg',
    alt: 'Haubanage d\'un arbre remarquable',
    caption: 'Haubanage d\'un arbre remarquable',
    category: 'haubanage',
  },
  {
    src: '/images/portfolio/before-after-6.jpg',
    alt: 'Broyage et évacuation des déchets',
    caption: 'Broyage et évacuation des déchets verts',
    category: 'broyage',
  },
];

export default function Portfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % portfolioImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length);
  };

  return (
    <section id="realisations" className="py-20 md:py-28 bg-background">
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand mb-4">
            Mes réalisations
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Découvrez quelques exemples de mes interventions dans le Lauragais.
            Chaque projet est réalisé avec soin et professionnalisme.
          </p>
        </div>

        {/* Galerie */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioImages.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image placeholder (remplacer par vraies images) */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center">
                <span className="text-white/50 text-sm">
                  Image {index + 1}
                  <br />
                  (À ajouter)
                </span>
              </div>

              {/* Image réelle (décommenter quand images disponibles) */}
              {/* <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              /> */}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium mb-2">
                    {image.caption}
                  </p>
                  <div className="flex items-center gap-2 text-white/80 text-xs">
                    <Eye size={14} />
                    <span>Cliquer pour agrandir</span>
                  </div>
                </div>
              </div>

              {/* Icône zoom */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye size={20} className="text-brand" />
              </div>
            </button>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <p className="text-text-secondary text-sm">
            📸 Plus de photos disponibles sur nos réseaux sociaux
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={portfolioImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
}
