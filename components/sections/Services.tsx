'use client';

import { useState } from 'react';
import { TreeDeciduous, Axe, Scissors, Cable, Recycle, Shrub, ChevronRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { SERVICES } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils';

// Mapping des icônes
const iconMap = {
  elagage: TreeDeciduous,
  abattage: Axe,
  demontage: Scissors,
  haubanage: Cable,
  broyage: Recycle,
  'taille-haies': Shrub,
};

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="prestations" className="py-20 md:py-28 bg-background">
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand mb-4">
            Mes prestations
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Des services professionnels d'élagage et d'entretien d'arbres adaptés à vos besoins,
            dans le respect du végétal et des normes de sécurité.
          </p>
        </div>

        {/* Grille de services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.id as keyof typeof iconMap];
            const isHovered = hoveredCard === service.id;

            return (
              <Card
                key={service.id}
                hover
                className="group relative overflow-hidden transition-all duration-300"
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Icône */}
                <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-xl mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon
                    size={32}
                    className="text-accent group-hover:scale-110 transition-transform"
                  />
                </div>

                {/* Titre */}
                <h3 className="text-2xl font-semibold text-brand mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>

                {/* Description "C'est quoi ?" */}
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Bénéfices "Pourquoi le faire ?" */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-brand mb-2">Pourquoi le faire ?</p>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                        <ChevronRight
                          size={16}
                          className="text-accent mt-0.5 flex-shrink-0"
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bouton */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => scrollToSection('contact')}
                  className="w-full group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all"
                >
                  Je veux ce service
                  <ChevronRight
                    size={18}
                    className={`ml-2 transition-transform ${isHovered ? 'translate-x-1' : ''}`}
                  />
                </Button>

                {/* Numéro décoratif */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-brand/5 group-hover:text-accent/10 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA bas de section */}
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-4">
            Vous avez un projet d'élagage ou d'entretien d'arbres ?
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToSection('contact')}
          >
            Demander un devis gratuit
          </Button>
        </div>
      </div>
    </section>
  );
}
