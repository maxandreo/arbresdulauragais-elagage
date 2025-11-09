'use client';

import { Phone, FileText, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import { scrollToSection } from '@/lib/utils';
import { CONTACT_INFO } from '@/lib/constants';

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand via-brand to-accent overflow-hidden"
    >
      {/* Image de fond (à ajouter plus tard) */}
      <div className="absolute inset-0 bg-[url('/images/hero/main.jpg')] bg-cover bg-center opacity-20" />

      {/* Overlay pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Badge avis Google (en haut à droite) */}
      <div className="absolute top-24 right-6 md:top-28 md:right-12 z-10 animate-fade-in">
        <div className="bg-white rounded-xl shadow-2xl p-4 flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-sm font-semibold text-gray-800">4.9/5</p>
            <p className="text-xs text-gray-600">47 avis Google</p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 container-custom text-center text-white px-4">
        {/* Titre principal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in leading-tight">
          Votre expert élagage
          <br />
          <span className="text-accent">dans le Lauragais</span>
        </h1>

        {/* Sous-titre */}
        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto animate-fade-in animation-delay-200">
          Professionnel certifié • Interventions sécurisées • Crédit d'impôt 50%
        </p>

        {/* CTA principaux */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in animation-delay-400">
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.open(`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`)}
            className="text-lg shadow-2xl hover:shadow-accent/50"
          >
            <Phone className="mr-2" size={22} />
            Appeler maintenant
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="text-lg shadow-2xl bg-white/95 hover:bg-white"
          >
            <FileText className="mr-2" size={22} />
            Devis gratuit
          </Button>
        </div>

        {/* Informations complémentaires */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm md:text-base animate-fade-in animation-delay-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span>Intervention rapide</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span>Devis gratuit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span>Assuré & certifié</span>
          </div>
        </div>

        {/* CTA scroll vers prestations */}
        <button
          onClick={() => scrollToSection('prestations')}
          className="inline-flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors animate-bounce animation-delay-800"
          aria-label="Découvrir les prestations"
        >
          <span className="text-sm font-medium">Découvrir mes services</span>
          <ChevronDown size={28} />
        </button>
      </div>

      {/* Forme décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#f8f7f4"
          />
        </svg>
      </div>
    </section>
  );
}
