import { Phone, Mail, MapPin, Facebook, Instagram, Clock } from 'lucide-react';
import { CONTACT_INFO, INTERVENTION_ZONE, SOCIAL_LINKS } from '@/lib/constants';
import { formatPhoneNumber } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand text-white">
      {/* Contenu principal */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Colonne 1 : Coordonnées */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Phone size={20} className="text-accent" />
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-white/90 hover:text-accent transition-colors group"
              >
                <Phone size={18} className="text-accent group-hover:scale-110 transition-transform" />
                <span>{formatPhoneNumber(CONTACT_INFO.phone)}</span>
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 text-white/90 hover:text-accent transition-colors group"
              >
                <Mail size={18} className="text-accent group-hover:scale-110 transition-transform" />
                <span className="break-all">{CONTACT_INFO.email}</span>
              </a>

              <div className="flex items-start gap-3 text-white/90">
                <MapPin size={18} className="text-accent mt-1 flex-shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </div>

              <div className="flex items-start gap-3 text-white/90">
                <Clock size={18} className="text-accent mt-1 flex-shrink-0" />
                <span>{CONTACT_INFO.hours}</span>
              </div>
            </div>
          </div>

          {/* Colonne 2 : Zone d'intervention */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-accent" />
              Zone d'intervention
            </h3>
            <p className="text-white/90 mb-3">
              {INTERVENTION_ZONE.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {INTERVENTION_ZONE.cities.map((city) => (
                <span
                  key={city}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Colonne 3 : Liens et réseaux sociaux */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>

            {/* Réseaux sociaux */}
            <div className="flex gap-4 mb-6">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-accent hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-accent hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>

            {/* Liens légaux */}
            <div className="space-y-2">
              <a
                href="/mentions-legales"
                className="block text-sm text-white/80 hover:text-accent transition-colors underline-offset-4 hover:underline"
              >
                Mentions légales
              </a>
              <a
                href="/politique-confidentialite"
                className="block text-sm text-white/80 hover:text-accent transition-colors underline-offset-4 hover:underline"
              >
                Politique de confidentialité
              </a>
            </div>

            {/* Badge crédit d'impôt */}
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <p className="text-sm font-medium text-accent mb-1">
                💰 Crédit d'impôt 50%
              </p>
              <p className="text-xs text-white/80">
                Profitez de 50% de réduction d'impôt sur vos travaux d'élagage
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-white/20">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
            <p>
              © {currentYear} Arbres du Lauragais Élagage - Tous droits réservés
            </p>
            <p>
              Réalisé avec 🌳 par{' '}
              <span className="text-accent font-medium">Andréo Luc</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
