# Guide de Démarrage Rapide

## 🚀 Installation

### Prérequis
- Node.js 18+ ([Télécharger](https://nodejs.org/))
- pnpm (recommandé) ou npm/yarn
- Git

### 1. Installer pnpm (recommandé)
```bash
npm install -g pnpm
```

### 2. Installer les dépendances
```bash
cd arbresdulauragais-elagage.fr
pnpm install
```

### 3. Configurer les variables d'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env.local

# Éditer .env.local avec vos clés
```

### 4. Lancer le serveur de développement
```bash
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
arbresdulauragais-elagage.fr/
├── app/                    # Routes Next.js (App Router)
│   ├── layout.tsx         # Layout racine + metadata SEO
│   ├── page.tsx           # Page d'accueil (one-page)
│   ├── globals.css        # Styles globaux + Tailwind
│   └── api/               # API Routes serverless
│       └── contact/       # Endpoint formulaire de contact
├── components/            # Composants React
│   ├── layout/           # Header, Footer, FloatingButtons
│   ├── sections/         # Hero, Services, Portfolio, Reviews, Contact
│   ├── ui/               # Button, Card, Input, Textarea (réutilisables)
│   └── animations/       # FadeIn, SlideUp, Parallax
├── lib/                  # Utilitaires et helpers
│   ├── utils.ts          # Fonctions utilitaires (cn, scroll, etc.)
│   ├── constants.ts      # Constantes (services, contact, etc.)
│   ├── validations.ts    # Schémas Zod pour validation
│   ├── email.ts          # Service email Resend
│   └── rate-limit.ts     # Rate limiting API
├── public/               # Assets statiques
│   └── images/           # Images (hero, services, portfolio, badges)
├── .documentation/       # Documentation complète du projet
├── next.config.js        # Configuration Next.js
├── tailwind.config.ts    # Configuration Tailwind CSS
└── package.json          # Dépendances et scripts
```

## 🎨 Système de Design

### Couleurs
```typescript
// Définies dans tailwind.config.ts
colors: {
  brand: '#184e28',      // Vert foncé forêt
  accent: '#2f8d4e',     // Vert vif (CTA)
  background: '#f8f7f4', // Beige clair
  text: '#1a1a1a',       // Noir doux
  'text-secondary': '#6b7280', // Gris
}
```

### Utilisation
```tsx
<button className="bg-accent text-white hover:bg-accent/90">
  Devis gratuit
</button>
```

### Composants UI Disponibles

#### Button
```tsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="md">
  Cliquez ici
</Button>

// Variants: 'primary' | 'secondary' | 'outline'
// Sizes: 'sm' | 'md' | 'lg'
```

#### Card
```tsx
import Card from '@/components/ui/Card';

<Card hover>
  <h3>Titre</h3>
  <p>Contenu</p>
</Card>
```

#### Input
```tsx
import Input from '@/components/ui/Input';

<Input
  label="Email"
  type="email"
  placeholder="votre@email.fr"
  error={errors.email?.message}
  required
/>
```

#### Textarea
```tsx
import Textarea from '@/components/ui/Textarea';

<Textarea
  label="Message"
  placeholder="Votre message..."
  rows={5}
  error={errors.message?.message}
  required
/>
```

## 🔧 Utilitaires

### cn() - Fusion de classes Tailwind
```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  'base-class',
  condition && 'conditional-class',
  className
)} />
```

### scrollToSection() - Scroll doux avec offset
```tsx
import { scrollToSection } from '@/lib/utils';

<button onClick={() => scrollToSection('contact')}>
  Contactez-nous
</button>
```

### formatPhoneNumber() - Formater un numéro
```tsx
import { formatPhoneNumber } from '@/lib/utils';

const formatted = formatPhoneNumber('0612345678');
// Résultat: "06 12 34 56 78"
```

## 📝 Validation de Formulaires

### Schéma Zod (lib/validations.ts)
```typescript
import { contactSchema, type ContactFormData } from '@/lib/validations';

// Validation
const result = contactSchema.safeParse(formData);
if (result.success) {
  // Données valides
  const data: ContactFormData = result.data;
}
```

### Avec React Hook Form
```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/validations';

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    // Données automatiquement validées
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('email')} error={errors.email?.message} />
    </form>
  );
}
```

## 🎭 Animations

### Framer Motion (à installer)
```tsx
'use client';

import { motion } from 'framer-motion';

export default function FadeIn({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
```

### CSS Animations (globals.css)
```tsx
// Animations disponibles dans Tailwind
<div className="animate-fade-in">Contenu</div>
<div className="animate-slide-up">Contenu</div>
<div className="animate-pulse-slow">Contenu</div>
```

## 🌐 Internationalisation (Futur)

### Structure prévue
```
app/
├── [locale]/
│   ├── layout.tsx
│   └── page.tsx
└── i18n/
    ├── fr.json
    └── en.json
```

### Utilisation
```tsx
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return <h1>{t('title')}</h1>;
}
```

## 🔌 API Routes

### Endpoint Contact (app/api/contact/route.ts)
```typescript
// POST /api/contact
export async function POST(request: NextRequest) {
  // 1. Rate limiting
  // 2. Validation Zod
  // 3. Envoi email via Resend
  // 4. Réponse JSON
}
```

### Appel depuis le client
```tsx
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

const result = await response.json();
```

## 🖼️ Images

### Next.js Image Component
```tsx
import Image from 'next/image';

<Image
  src="/images/hero/main.jpg"
  alt="Élagueur professionnel en action"
  width={1920}
  height={1080}
  priority // Pour images hero
  className="rounded-lg"
/>
```

### Organisation
```
public/images/
├── hero/           # Images section hero
├── services/       # Images des 6 prestations
├── portfolio/      # Photos avant/après
└── badges/         # Badge Google, crédit impôt 50%
```

## 📱 Responsive Design

### Breakpoints Tailwind
```tsx
// Mobile-first approach
<div className="
  grid
  grid-cols-1        // Mobile (< 768px)
  md:grid-cols-2     // Tablette (768px - 1024px)
  lg:grid-cols-3     // Desktop (> 1024px)
">
```

### Tailles personnalisées
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

## 🧪 Scripts Disponibles

```bash
# Développement
pnpm dev              # Serveur de développement (port 3000)

# Production
pnpm build            # Build de production
pnpm start            # Serveur de production

# Qualité du code
pnpm lint             # Linter ESLint
pnpm lint:fix         # Corriger automatiquement
pnpm format           # Formatter avec Prettier
pnpm format:check     # Vérifier le formatage
pnpm type-check       # Vérifier les types TypeScript
```

## 🐛 Debugging

### Next.js DevTools
- Ouvrir [http://localhost:3000](http://localhost:3000)
- Ouvrir les DevTools navigateur (F12)
- Onglet "Console" pour les logs
- Onglet "Network" pour les requêtes

### Logs Serveur
```typescript
// Dans Server Components ou API Routes
console.log('Debug:', data); // Visible dans le terminal
```

### Logs Client
```typescript
'use client';

// Dans Client Components
console.log('Debug:', data); // Visible dans la console navigateur
```

## 🚀 Déploiement

### Vercel (Recommandé)
1. Push sur GitHub
2. Connecter le repo sur [vercel.com](https://vercel.com)
3. Configurer les variables d'environnement
4. Déploiement automatique !

### Variables d'environnement Vercel
```bash
# Dans le dashboard Vercel → Settings → Environment Variables
RESEND_API_KEY=...
RECAPTCHA_SECRET_KEY=...
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
NEXT_PUBLIC_GA_ID=...
```

## 📚 Ressources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

### Outils
- [Lucide Icons](https://lucide.dev/) - Icônes
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Resend](https://resend.com/) - Service email

## ❓ FAQ

### Comment ajouter une nouvelle section ?
1. Créer `components/sections/MaSection.tsx`
2. Importer dans `app/page.tsx`
3. Ajouter l'ID dans `lib/constants.ts` (NAV_SECTIONS)

### Comment modifier les couleurs ?
Éditer `tailwind.config.ts` → `theme.extend.colors`

### Comment ajouter une icône ?
```tsx
import { Phone, Mail, MapPin } from 'lucide-react';

<Phone className="h-5 w-5 text-accent" />
```

### Erreur "Module not found" ?
```bash
# Réinstaller les dépendances
rm -rf node_modules .next
pnpm install
```

## 🆘 Support

- **Documentation** : `.documentation/` (ce dossier)
- **Issues** : Créer une issue GitHub
- **Email** : contact@arbresdulauragais-elagage.fr

---

**Prêt à développer !** 🌳
