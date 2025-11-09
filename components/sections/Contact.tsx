import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CONTACT_INFO, INTERVENTION_ZONE } from '@/lib/constants';
import { formatPhoneNumber } from '@/lib/utils';
import ContactForm from '@/components/sections/ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand mb-4">
            Contactez-moi
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Une question ? Un projet d'élagage ? N'hésitez pas à me contacter
            pour un devis gratuit et sans engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Colonne gauche : Informations de contact */}
          <div className="lg:col-span-2 space-y-8">
            {/* Coordonnées */}
            <div>
              <h3 className="text-2xl font-semibold text-brand mb-6">
                Mes coordonnées
              </h3>
              <div className="space-y-4">
                {/* Téléphone */}
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Téléphone</p>
                    <p className="text-lg font-semibold text-brand group-hover:text-accent transition-colors">
                      {formatPhoneNumber(CONTACT_INFO.phone)}
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Email</p>
                    <p className="text-base font-semibold text-brand group-hover:text-accent transition-colors break-all">
                      {CONTACT_INFO.email}
                    </p>
                  </div>
                </a>

                {/* Adresse */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Adresse</p>
                    <p className="text-base font-semibold text-brand">
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Horaires */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Horaires</p>
                    <p className="text-base font-semibold text-brand">
                      {CONTACT_INFO.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Zone d'intervention */}
            <div>
              <h3 className="text-2xl font-semibold text-brand mb-4">
                Zone d'intervention
              </h3>
              <p className="text-text-secondary mb-4">
                {INTERVENTION_ZONE.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {INTERVENTION_ZONE.cities.map((city) => (
                  <span
                    key={city}
                    className="px-4 py-2 bg-white rounded-full text-sm font-medium text-brand border-2 border-brand/10"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Engagement */}
            <div className="bg-gradient-to-br from-brand to-accent rounded-xl p-6 text-white">
              <h4 className="font-semibold mb-2">🌳 Mon engagement</h4>
              <p className="text-sm text-white/90">
                Réponse sous 24h • Devis gratuit • Intervention rapide •
                Travail soigné • Chantier propre
              </p>
            </div>
          </div>

          {/* Colonne droite : Formulaire */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-brand mb-6">
                Demander un devis gratuit
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
