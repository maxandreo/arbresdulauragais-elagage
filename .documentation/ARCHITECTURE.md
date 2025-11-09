# Architecture du Projet

## Vue d'ensemble

Ce projet suit l'architecture Next.js 14 avec App Router et adopte les meilleures pratiques modernes de développement React.

## Principes Architecturaux

### 1. Server Components par Défaut
- Tous les composants sont des Server Components sauf indication contraire
- Utiliser `'use client'` uniquement pour l'interactivité (hooks, événements)
- Avantages : SEO optimal, bundle JS réduit, performance maximale

### 2. Composition de Composants
- Composants petits et réutilisables
- Séparation claire entre logique et présentation
- Props typées avec TypeScript

### 3. Colocation
- Fichiers liés regroupés ensemble
- Structure claire et intuitive
- Facilite la maintenance

## Structure des Dossiers

```
app/                        # Routes et pages (App Router)
├── layout.tsx             # Layout racine avec metadata
├── page.tsx               # Page d'accueil (one-page)
├── globals.css            # Styles globaux + Tailwind
└── api/                   # API Routes serverless
    └── contact/
        └── route.ts       # Endpoint formulaire

components/                # Composants React
├── layout/               # Composants de structure
│   ├── Header.tsx        # Header sticky avec navigation
│   ├── Footer.tsx        # Footer avec infos contact
│   └── FloatingButtons.tsx # Boutons flottants (devis, scroll-top)
├── sections/             # Sections de la page
│   ├── Hero.tsx          # Section hero avec CTA
│   ├── Services.tsx      # Grille des 6 prestations
│   ├── Portfolio.tsx     # Galerie avant/après
│   ├── Reviews.tsx       # Avis Google
│   └── Contact.tsx       # Formulaire de contact
├── ui/                   # Composants UI réutilisables
│   ├── Button.tsx        # Boutons avec variants
│   ├── Card.tsx          # Cartes avec hover
│   ├── Input.tsx         # Champs de formulaire
│   ├── Textarea.tsx      # Zone de texte
│   └── Lightbox.tsx      # Lightbox pour galerie (à créer)
└── animations/           # Composants d'animation
    ├── FadeIn.tsx        # Animation fade-in au scroll
    ├── SlideUp.tsx       # Animation slide-up
    └── Parallax.tsx      # Effet parallax

lib/                      # Utilitaires et helpers
├── utils.ts              # Fonctions utilitaires (cn, scroll, etc.)
├── constants.ts          # Constantes (services, contact, etc.)
├── validations.ts        # Schémas Zod pour validation
├── email.ts              # Service email Resend (à créer)
└── rate-limit.ts         # Rate limiting API (à créer)

public/                   # Assets statiques
├── images/               # Images du site
│   ├── hero/            # Images hero
│   ├── services/        # Images prestations
│   ├── portfolio/       # Photos avant/après
│   └── badges/          # Badges (Google, crédit impôt)
└── icons/               # Icônes (si besoin local)

.documentation/           # Documentation du projet
├── al-elagage-product-requirements.md
├── al-elagage-software-specifications.md
├── al-elagage-ux-design.md
└── ARCHITECTURE.md (ce fichier)
```

## Patterns de Développement

### Server Components (par défaut)
```typescript
// app/page.tsx - Server Component
import Hero from '@/components/sections/Hero';

export default function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

### Client Components (interactivité)
```typescript
// components/sections/Contact.tsx - Client Component
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Hooks, événements, animations
}
```

### Composants UI Réutilisables
```typescript
// components/ui/Button.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  // ...
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('base-classes', variantClasses[variant], className)}
        {...props}
      />
    );
  }
);
```

## Gestion de l'État

### État Local (useState, useReducer)
Pour l'état spécifique à un composant :
- Formulaires
- UI temporaire (modals, tooltips)
- Animations

### Context API
Pour l'état partagé léger :
- Langue (FR/EN)
- Préférences utilisateur

### URL State
Pour la navigation :
- Hash anchors (#prestations)
- Scroll spy (section active)

## Styling

### Tailwind CSS
- Utility-first approach
- Classes personnalisées dans `globals.css`
- Fonction `cn()` pour fusionner les classes

### Conventions
- Mobile-first (breakpoints sm, md, lg, xl)
- Classes sémantiques (brand, accent, text, background)
- Animations GPU-accelerated (transform, opacity)

## Performance

### Optimisations Next.js
- Static Site Generation (SSG)
- Automatic code splitting
- Image optimization (next/image)
- Font optimization (next/font)

### Best Practices
- Lazy loading pour animations (Framer Motion)
- Images WebP/AVIF
- CSS minimal (Tailwind purge)
- Pas de bibliothèques lourdes

## Accessibilité

### Standards
- WCAG 2.1 AA
- Navigation clavier complète
- Focus visible
- Labels explicites

### Implémentation
- Attributs ARIA appropriés
- Contrastes suffisants
- Support prefers-reduced-motion
- Alt texts descriptifs

## Sécurité

### Formulaire
- Validation client + serveur (Zod)
- Rate limiting
- reCAPTCHA v3
- Honeypot field
- Sanitization des inputs

### API
- CORS configuré
- Headers de sécurité
- Variables d'environnement
- Pas de données sensibles côté client

## Déploiement

### Vercel (Production)
- Auto-deploy sur push main
- Preview deployments sur PR
- Edge Functions pour API
- CDN global

### CI/CD
- ESLint + Prettier (pre-commit)
- Type checking TypeScript
- Build validation

## Prochaines Étapes

1. ✅ Configuration de base
2. ✅ Composants UI
3. 🔄 Composants layout (Header, Footer)
4. 🔄 Sections principales (Hero, Services, etc.)
5. 🔄 Animations (Framer Motion)
6. 🔄 API Route contact
7. 🔄 Tests et optimisations
8. 🔄 Déploiement Vercel

## Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
