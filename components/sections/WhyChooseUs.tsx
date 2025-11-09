import { Shield, Award, Percent, MapPin } from 'lucide-react';
import Image from 'next/image';
import { WHY_CHOOSE_US } from '@/lib/constants';

// Mapping des icônes
const iconMap = {
  certified: Award,
  insured: Shield,
  'tax-credit': Percent,
  local: MapPin,
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand mb-4">
            Pourquoi me choisir ?
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Un service professionnel et de qualité, avec des garanties solides
            pour votre tranquillité d'esprit.
          </p>
        </div>

        {/* Grille des 4 piliers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = iconMap[item.id as keyof typeof iconMap];

            // Badge spécial pour crédit d'impôt
            if (item.id === 'tax-credit') {
              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Badge 50% */}
                  <div className="relative mb-4">
                    <div className="w-32 h-32 md:w-36 md:h-36 bg-gradient-to-br from-accent to-brand rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <div className="text-white">
                        <div className="text-5xl md:text-6xl font-bold">50%</div>
                        <div className="text-sm font-medium">CRÉDIT</div>
                        <div className="text-xs">D'IMPÔT</div>
                      </div>
                    </div>
                    {/* Icône décorative */}
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <Icon size={24} className="text-accent" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-brand mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {item.description}
                  </p>
                </div>
              );
            }

            // Piliers standards
            return (
              <div
                key={item.id}
                className="flex flex-col items-center text-center group"
              >
                {/* Icône */}
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                  <Icon
                    size={36}
                    className="text-accent group-hover:rotate-12 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-semibold text-brand mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bandeau informatif */}
        <div className="bg-gradient-to-r from-brand to-accent rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Des prestations de qualité, près de chez vous
          </h3>
          <p className="text-lg text-white/90 mb-6 max-w-3xl mx-auto">
            Intervention rapide dans tout le Lauragais : Toulouse, Carcassonne, Castres, Revel
            et alentours. Devis gratuit sous 24h.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <Shield size={18} />
              <span>Assuré RC & Décennale</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <Award size={18} />
              <span>Certifié professionnel</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <MapPin size={18} />
              <span>Intervention rapide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
