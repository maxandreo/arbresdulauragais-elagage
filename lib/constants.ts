/**
 * Constantes de l'application
 */

// Informations de contact
export const CONTACT_INFO = {
  phone: '06 XX XX XX XX',
  email: 'contact@arbresdulauragais-elagage.fr',
  address: 'Revel, 31250',
  hours: 'Lundi - Vendredi : 8h - 18h',
} as const;

// Zone d'intervention
export const INTERVENTION_ZONE = {
  cities: ['Toulouse', 'Carcassonne', 'Castres', 'Revel'],
  description: 'Interventions dans le Lauragais et alentours',
} as const;

// Réseaux sociaux
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/arbresdulauragais',
  instagram: 'https://www.instagram.com/arbresdulauragais',
} as const;

// Navigation
export const NAV_SECTIONS = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'prestations', label: 'Prestations' },
  { id: 'realisations', label: 'Réalisations' },
  { id: 'avis', label: 'Avis' },
  { id: 'contact', label: 'Contact' },
] as const;

// Prestations
export const SERVICES = [
  {
    id: 'elagage',
    title: 'Élagage',
    description: 'Taille et entretien de vos arbres pour leur santé et sécurité',
    benefits: [
      'Améliore la santé de l\'arbre',
      'Prévient les risques de chute',
      'Favorise la croissance',
    ],
  },
  {
    id: 'abattage',
    title: 'Abattage',
    description: 'Abattage sécurisé d\'arbres dangereux ou gênants',
    benefits: [
      'Intervention sécurisée',
      'Évacuation des déchets',
      'Respect de l\'environnement',
    ],
  },
  {
    id: 'demontage',
    title: 'Démontage',
    description: 'Démontage par rétention pour espaces restreints',
    benefits: [
      'Technique adaptée aux espaces étroits',
      'Sécurité maximale',
      'Pas de dégâts aux alentours',
    ],
  },
  {
    id: 'haubanage',
    title: 'Haubanage',
    description: 'Consolidation d\'arbres fragilisés',
    benefits: [
      'Préserve les arbres remarquables',
      'Renforce la structure',
      'Solution durable',
    ],
  },
  {
    id: 'broyage',
    title: 'Broyage',
    description: 'Broyage et évacuation des déchets verts',
    benefits: [
      'Chantier propre',
      'Recyclage des déchets',
      'Paillage disponible',
    ],
  },
  {
    id: 'taille-haies',
    title: 'Taille de haies',
    description: 'Entretien et taille de vos haies',
    benefits: [
      'Haies bien formées',
      'Croissance maîtrisée',
      'Esthétique soignée',
    ],
  },
] as const;

// Pourquoi nous choisir
export const WHY_CHOOSE_US = [
  {
    id: 'certified',
    title: 'Certifié',
    description: 'Formations professionnelles à jour',
  },
  {
    id: 'insured',
    title: 'Assuré',
    description: 'Responsabilité civile et décennale',
  },
  {
    id: 'tax-credit',
    title: 'Crédit d\'impôt 50%',
    description: 'Bénéficiez de 50% de réduction d\'impôt',
  },
  {
    id: 'local',
    title: 'Zone Lauragais',
    description: 'Interventions rapides : Toulouse, Carcassonne, Castres, Revel',
  },
] as const;

// Couleurs (pour référence)
export const COLORS = {
  brand: '#184e28',
  accent: '#2f8d4e',
  background: '#f8f7f4',
  text: '#1a1a1a',
  textSecondary: '#6b7280',
} as const;
