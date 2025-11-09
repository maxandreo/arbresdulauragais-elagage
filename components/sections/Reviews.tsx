'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';

// Avis de démonstration (à remplacer par vrais avis Google)
const reviews = [
  {
    id: 1,
    author: 'Marie D.',
    rating: 5,
    date: '2024-01-15',
    text: 'Professionnel très compétent et à l\'écoute. Élagage de 3 arbres réalisé avec soin. Je recommande vivement !',
    location: 'Toulouse',
  },
  {
    id: 2,
    author: 'Jean-Pierre M.',
    rating: 5,
    date: '2024-01-08',
    text: 'Excellent travail d\'abattage d\'un grand chêne. Intervention rapide, propre et sécurisée. Très satisfait du résultat.',
    location: 'Carcassonne',
  },
  {
    id: 3,
    author: 'Sophie L.',
    rating: 5,
    date: '2023-12-20',
    text: 'Andréo est un vrai professionnel. Taille de haies impeccable et conseil avisé. Prix très correct. Merci !',
    location: 'Castres',
  },
  {
    id: 4,
    author: 'Patrick R.',
    rating: 5,
    date: '2023-12-10',
    text: 'Travail soigné et respect des délais. L\'élagage de mes arbres fruitiers a été fait dans les règles de l\'art.',
    location: 'Revel',
  },
  {
    id: 5,
    author: 'Isabelle B.',
    rating: 5,
    date: '2023-11-28',
    text: 'Très professionnel, ponctuel et à l\'écoute. Le chantier a été laissé propre. Je recommande sans hésitation.',
    location: 'Toulouse',
  },
  {
    id: 6,
    author: 'Michel T.',
    rating: 5,
    date: '2023-11-15',
    text: 'Excellent rapport qualité/prix. Andréo a su me conseiller sur l\'entretien de mes arbres. Travail impeccable !',
    location: 'Carcassonne',
  },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Carrousel automatique
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="avis" className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand mb-4">
            Avis clients
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            La satisfaction de mes clients est ma priorité.
            Découvrez leurs témoignages.
          </p>

          {/* Note globale Google */}
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-brand/5 to-accent/5 rounded-2xl px-8 py-4 border-2 border-brand/10">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <div className="text-3xl font-bold text-brand">4.9/5</div>
              <div className="text-sm text-text-secondary">47 avis Google</div>
            </div>
          </div>
        </div>

        {/* Carrousel d'avis */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative bg-gradient-to-br from-brand/5 to-accent/5 rounded-2xl p-8 md:p-12 min-h-[280px] flex flex-col justify-center">
            {/* Icône quote */}
            <Quote
              size={48}
              className="absolute top-6 left-6 text-accent/20"
            />

            {/* Contenu de l'avis */}
            <div className="relative z-10">
              {/* Étoiles */}
              <div className="flex items-center gap-1 mb-4 justify-center">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Texte */}
              <p className="text-lg md:text-xl text-text text-center mb-6 leading-relaxed">
                "{reviews[currentIndex].text}"
              </p>

              {/* Auteur */}
              <div className="text-center">
                <p className="font-semibold text-brand">
                  {reviews[currentIndex].author}
                </p>
                <p className="text-sm text-text-secondary">
                  {reviews[currentIndex].location} •{' '}
                  {new Date(reviews[currentIndex].date).toLocaleDateString('fr-FR', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-accent'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller à l'avis ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA vers Google */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              window.open(
                'https://www.google.com/search?q=arbres+du+lauragais+elagage',
                '_blank'
              )
            }
          >
            Voir tous les avis sur Google
            <ExternalLink size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
