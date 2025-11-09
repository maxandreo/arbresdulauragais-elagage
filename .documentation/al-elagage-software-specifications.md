# Software Requirements Specification Document
**Arbres du Lauragais Élagage - Site One-Page avec Next.js**

---

## System Design

### Architecture Overview
- **Type** : Application web statique générée (SSG - Static Site Generation)
- **Framework** : Next.js 14+ avec App Router
- **Déploiement** : Vercel avec domaine personnalisé (Namecheap DNS)
- **Protocole** : HTTPS (certificat Vercel automatique)
- **Responsive** : Mobile-first, breakpoints 768px (mobile), 1024px (tablette), 1280px+ (desktop)
- **Internationalisation** : FR (défaut) / EN via next-intl
- **Performance** : Next.js Image optimization, code splitting automatique, edge caching

### Core Modules
1. **Module Navigation** : Header sticky avec ancres, indicateur de section active
2. **Module Hero** : Section d'accueil avec CTA principaux, parallax
3. **Module Services** : Grille de 6 cards avec animations Framer Motion
4. **Module Portfolio** : Galerie avant/après avec lightbox
5. **Module Reviews** : Intégration badge Google Reviews + carrousel d'avis
6. **Module Contact** : Formulaire avec validation + envoi via Next.js API Route
7. **Module Footer** : Coordonnées, liens sociaux, mentions légales

### Architecture Next.js App Router
```
app/
├── layout.tsx                 # Layout racine (Header + Footer)
├── page.tsx                   # Page d'accueil (one-page)
├── api/
│   └── contact/
│       └── route.ts           # API Route pour formulaire
├── [locale]/                  # Routes i18n (fr/en)
│   ├── layout.tsx
│   └── page.tsx
└── globals.css                # Styles globaux

components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── FloatingButtons.tsx
├── sections/
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Portfolio.tsx
│   ├── Reviews.tsx
│   └── Contact.tsx
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Textarea.tsx
│   └── Lightbox.tsx
└── animations/
    ├── FadeIn.tsx
    ├── SlideUp.tsx
    └── Parallax.tsx

lib/
├── email.ts                   # Service email (Resend)
├── validations.ts             # Zod schemas
├── utils.ts                   # Utilitaires
└── constants.ts               # Constantes (couleurs, textes)

public/
├── images/
│   ├── hero/
│   ├── services/
│   ├── portfolio/
│   └── badges/
└── icons/                     # Lucide Icons (si besoin local)

styles/
├── globals.css                # Tailwind base + custom
└── animations.css             # Animations CSS custom
```

---

## Architecture Pattern

### Pattern Principal
- **Server Components par défaut** (Next.js 14 App Router)
- **Client Components** uniquement pour interactivité (formulaire, animations, lightbox)
- **Static Site Generation (SSG)** : page générée au build, HTML complet
- **API Routes** : backend serverless pour formulaire

### Composants Server vs Client

#### Server Components (par défaut)
```typescript
// app/page.tsx - Server Component
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      {/* Pas de useState, useEffect, event handlers */}
    </main>
  );
}
```

#### Client Components (interactivité)
```typescript
// components/sections/Contact.tsx - Client Component
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Hooks, event handlers, animations
}
```

### Design Patterns Utilisés
- **Composition Pattern** : composants réutilisables (Button, Card, Input)
- **Container/Presentational** : logique séparée de la présentation
- **Custom Hooks** : logique réutilisable (useScrollSpy, useIntersectionObserver)
- **Server Actions** : alternative moderne aux API Routes (Next.js 14+)

### Structure de Composant Type
```typescript
// components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils'; // classnames utility

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-lg font-medium transition-all',
          {
            'bg-accent text-white hover:bg-accent/90': variant === 'primary',
            'bg-white text-brand border-2 border-brand': variant === 'outline',
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? 'Envoi...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
```

---

## State Management

### Stratégie
- **Pas de Redux/Zustand nécessaire** (site one-page simple)
- **React Hooks** (useState, useReducer) pour état local
- **Context API** pour état partagé léger (langue, theme)
- **URL State** pour navigation (hash anchors)

### États à Gérer

#### 1. Navigation State
```typescript
// hooks/useScrollSpy.ts
'use client';

import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
```

#### 2. Language State (Context API)
```typescript
// contexts/LanguageContext.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // fonction de traduction
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    // Charger depuis localStorage
    const saved = localStorage.getItem('language') as Language;
    if (saved) setLanguage(saved);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
```

#### 3. Form State (React Hook Form)
```typescript
// components/sections/Contact.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/validations';

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success('Message envoyé !');
      reset();
    } else {
      toast.error('Erreur lors de l\'envoi');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Formulaire */}
    </form>
  );
}
```

#### 4. UI State (Lightbox, Modal)
```typescript
// hooks/useLightbox.ts
'use client';

import { useState } from 'react';

export function useLightbox(images: string[]) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const next = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  return { isOpen, currentIndex, open, close, next, prev };
}
```

---

## Data Flow

### Architecture de Flux de Données

```
User Interaction (Client)
      ↓
Client Component (useState/useForm)
      ↓
Validation (Zod schema)
      ↓
API Route (Next.js serverless)
      ↓
Email Service (Resend API)
      ↓
Response (success/error)
      ↓
Toast Notification (Client)
      ↓
Form Reset
```

### Flux Principaux

#### 1. Soumission Formulaire Contact/Devis
```typescript
// Client Side (components/sections/Contact.tsx)
const onSubmit = async (data: ContactFormData) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (response.ok) {
    toast.success('Message envoyé !');
  } else {
    toast.error(result.error);
  }
};

// Server Side (app/api/contact/route.ts)
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/validations';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation avec Zod
    const validatedData = contactSchema.parse(body);

    // Envoi email via Resend
    const { data, error } = await resend.emails.send({
      from: 'contact@arbresdulauragais-elagage.fr',
      to: 'andreo.luc@example.com',
      replyTo: validatedData.email,
      subject: `Nouveau message de ${validatedData.firstName} ${validatedData.lastName}`,
      html: `
        <h2>Nouveau message depuis le site</h2>
        <p><strong>Nom :</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
        <p><strong>Email :</strong> ${validatedData.email}</p>
        <p><strong>Téléphone :</strong> ${validatedData.phone}</p>
        <p><strong>Message :</strong></p>
        <p>${validatedData.message}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
```

#### 2. Navigation par Ancres avec Smooth Scroll
```typescript
// components/layout/Header.tsx
'use client';

import { useScrollSpy } from '@/hooks/useScrollSpy';

const sections = ['accueil', 'prestations', 'realisations', 'avis', 'contact'];

export default function Header() {
  const activeSection = useScrollSpy(sections);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Hauteur du header sticky
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav>
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className={activeSection === section ? 'active' : ''}
        >
          {section}
        </button>
      ))}
    </nav>
  );
}
```

#### 3. Changement de Langue
```typescript
// components/layout/LanguageSwitch.tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
      className="flex items-center gap-2"
    >
      {language === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
    </button>
  );
}
```

#### 4. Animations au Scroll (Framer Motion)
```typescript
// components/animations/FadeIn.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
}

export default function FadeIn({ children, delay = 0 }: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Technical Stack

### Frontend
- **Framework** : Next.js 14.2+ (App Router, React Server Components)
- **Langage** : TypeScript 5+
- **Styling** : Tailwind CSS 3+ (utility-first, responsive)
- **Animations** : Framer Motion 11+ (animations fluides, scroll-triggered)
- **Icônes** : Lucide React (composants React, tree-shakeable)
- **Forms** : React Hook Form + Zod (validation)
- **Toasts** : Sonner (notifications légères)
- **Images** : Next.js Image component (optimization auto)

### Backend / Services
- **API Routes** : Next.js serverless functions (Vercel Edge Functions)
- **Email Service** : Resend (gratuit 3000 emails/mois, meilleur que EmailJS)
  - API moderne, TypeScript natif
  - Templates React Email (emails en JSX)
  - Analytics intégré
- **Anti-spam** : reCAPTCHA v3 (Google) + rate limiting
- **Analytics** : Google Analytics 4 ou Vercel Analytics (opt-in)

### Hébergement & Déploiement
- **Hébergement** : Vercel (gratuit pour projets personnels)
- **DNS** : Namecheap → Vercel (configuration CNAME)
- **HTTPS** : Certificat automatique Vercel (Let's Encrypt)
- **CDN** : Vercel Edge Network (150+ locations mondiales)
- **CI/CD** : Vercel Git integration (auto-deploy sur push)
- **Domaine** : arbresdulauragais-elagage.fr

### Outils de Développement
- **Package Manager** : pnpm (plus rapide que npm/yarn)
- **Linter** : ESLint + Prettier + TypeScript ESLint
- **Git Hooks** : Husky + lint-staged (lint avant commit)
- **Testing** : Vitest + React Testing Library (optionnel)

### Performance & SEO
- **SSG** : Static Site Generation (HTML complet au build)
- **Images** : WebP/AVIF automatique, responsive srcset, lazy-loading
- **Fonts** : next/font (Google Fonts optimisé, auto-hébergé)
- **Code Splitting** : automatique par Next.js
- **Edge Caching** : Vercel CDN avec cache immutable
- **SEO** : Metadata API Next.js, sitemap.xml, robots.txt
- **Lighthouse Score** : Objectif 95+ sur toutes métriques

### Package.json
```json
{
  "name": "al-elagage",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.378.0",
    "react-hook-form": "^7.51.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.3.0",
    "resend": "^3.2.0",
    "sonner": "^1.4.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.2.0",
    "prettier-plugin-tailwindcss": "^0.5.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## Authentication Process

### Aucune Authentification Utilisateur Nécessaire

**Raison** : Site vitrine public sans espace membre

### Sécurité Formulaire

#### 1. Validation Multi-Niveaux

**Client-Side (React Hook Form + Zod)**
```typescript
// lib/validations.ts
import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom est trop long'),
  lastName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom est trop long'),
  email: z
    .string()
    .email('Email invalide')
    .toLowerCase(),
  phone: z
    .string()
    .regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Numéro de téléphone français invalide'),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(1000, 'Le message est trop long'),
  consent: z
    .boolean()
    .refine((val) => val === true, 'Vous devez accepter la politique de confidentialité'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

**Server-Side (API Route)**
```typescript
// app/api/contact/route.ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation avec même schéma Zod
    const validatedData = contactSchema.parse(body);

    // Suite du traitement...
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }
  }
}
```

#### 2. Protection Anti-Spam

**Rate Limiting (Vercel Edge)**
```typescript
// lib/rate-limit.ts
import { NextRequest } from 'next/server';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(request: NextRequest): boolean {
  const ip = request.ip || 'anonymous';
  const now = Date.now();
  const limit = 3; // 3 requêtes
  const window = 60000; // par minute

  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + window });
    return true;
  }

  if (record.count >= limit) {
    return false; // Bloqué
  }

  record.count++;
  return true;
}

// Usage dans API Route
export async function POST(request: NextRequest) {
  if (!checkRateLimit(request)) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Réessayez dans 1 minute.' },
      { status: 429 }
    );
  }
  // Suite...
}
```

**reCAPTCHA v3**
```typescript
// lib/recaptcha.ts
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });

  const data = await response.json();
  return data.success && data.score >= 0.5;
}

// Dans API Route
export async function POST(request: NextRequest) {
  const { recaptchaToken, ...formData } = await request.json();

  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return NextResponse.json({ error: 'Vérification anti-spam échouée' }, { status: 403 });
  }

  // Suite...
}
```

**Honeypot Field**
```typescript
// components/sections/Contact.tsx
<input
  type="text"
  name="website"
  className="hidden"
  tabIndex={-1}
  autoComplete="off"
  {...register('website')}
/>

// Validation côté serveur
if (formData.website) {
  // C'est un bot !
  return NextResponse.json({ error: 'Spam détecté' }, { status: 403 });
}
```

#### 3. Sécurité API

**Variables d'Environnement**
```bash
# .env.local (jamais commité)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RECAPTCHA_SECRET_KEY=6Lc_xxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc_yyyyyyyyyyyyyyyyyyy
```

**CORS & Headers**
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://arbresdulauragais-elagage.fr' },
          { key: 'Access-Control-Allow-Methods', value: 'POST' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};
```

---

## Route Design

### Architecture de Routing Next.js

**Type** : Single Page Application (one-page) avec SSG

### Structure des Routes

```
app/
├── layout.tsx              # Layout racine (Header + Footer)
├── page.tsx                # Page d'accueil (one-page, SSG)
├── mentions-legales/
│   └── page.tsx            # Page mentions légales
├── politique-confidentialite/
│   └── page.tsx            # Page politique confidentialité
└── api/
    └── contact/
        └── route.ts        # API endpoint formulaire
```

### Page Principale (One-Page)

```typescript
// app/page.tsx
import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Reviews from '@/components/sections/Reviews';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Élagage Lauragais | Andréo Luc - Expert Certifié Toulouse, Carcassonne',
  description: 'Professionnel élagage, abattage, taille haies. Zone: Toulouse, Carcassonne, Castres, Revel. Devis gratuit. Crédit impôt 50%. Certifié et assuré.',
  keywords: ['élagage', 'abattage', 'taille haies', 'Toulouse', 'Lauragais', 'Carcassonne'],
  openGraph: {
    title: 'Arbres du Lauragais Élagage - Expert Certifié',
    description: 'Professionnel élagage dans le Lauragais. Devis gratuit.',
    url: 'https://arbresdulauragais-elagage.fr',
    siteName: 'Arbres du Lauragais Élagage',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Andréo Luc - Élagueur professionnel',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Élagage Lauragais | Andréo Luc',
    description: 'Expert élagage certifié. Devis gratuit.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Reviews />
      <Contact />
    </>
  );
}
```

### Navigation par Ancres

**Structure HTML avec IDs**
```typescript
// app/page.tsx
<main>
  <section id="accueil">
    <Hero />
  </section>

  <section id="prestations">
    <Services />
  </section>

  <section id="realisations">
    <Portfolio />
  </section>

  <section id="avis">
    <Reviews />
  </section>

  <section id="contact">
    <Contact />
  </section>
</main>
```

**Smooth Scroll avec Offset**
```typescript
// lib/scroll.ts
export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const headerOffset = 80; // Hauteur du header sticky
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}
```

### URLs et Deep Linking

**Support des Hash URLs**
```typescript
// components/layout/Header.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Header() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Support hash dans URL (ex: /#prestations)
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => scrollToSection(hash), 100);
    }
  }, []);

  return <nav>{/* Menu */}</nav>;
}
```

### SEO pour One-Page

**Structured Data (JSON-LD)**
```typescript
// app/page.tsx
export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Arbres du Lauragais Élagage',
    image: 'https://arbresdulauragais-elagage.fr/images/logo.png',
    '@id': 'https://arbresdulauragais-elagage.fr',
    url: 'https://arbresdulauragais-elagage.fr',
    telephone: '+33612345678',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '...',
      addressLocality: 'Revel',
      postalCode: '31250',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.4567,
      longitude: 1.9876,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    sameAs: [
      'https://www.facebook.com/arbresdulauragais',
      'https://www.instagram.com/arbresdulauragais',
    ],
    priceRange: '€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Contenu */}
    </>
  );
}
```

### Sitemap & Robots

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://arbresdulauragais-elagage.fr',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://arbresdulauragais-elagage.fr/mentions-legales',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}

// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://arbresdulauragais-elagage.fr/sitemap.xml',
  };
}
```

---

## API Design

### Architecture API

**Type** : Next.js API Routes (serverless functions sur Vercel Edge)

### Endpoint Principal : Contact

#### POST /api/contact

**Request**
```typescript
// Type
interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  recaptchaToken: string;
  website?: string; // Honeypot
}

// Exemple
POST /api/contact
Content-Type: application/json

{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean.dupont@example.com",
  "phone": "0612345678",
  "message": "Je souhaite un devis pour élagage d'un chêne",
  "consent": true,
  "recaptchaToken": "03AGdBq26..."
}
```

**Response Success (200)**
```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès",
  "emailId": "re_abc123xyz"
}
```

**Response Error (400/403/429/500)**
```json
{
  "success": false,
  "error": "Message d'erreur",
  "details": [] // Optionnel (erreurs de validation)
}
```

#### Implémentation Complète

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { contactSchema } from '@/lib/validations';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { checkRateLimit } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting
    if (!checkRateLimit(request)) {
      return NextResponse.json(
        { success: false, error: 'Trop de requêtes. Réessayez dans 1 minute.' },
        { status: 429 }
      );
    }

    // 2. Parse body
    const body = await request.json();

    // 3. Honeypot check
    if (body.website) {
      console.log('Spam detected via honeypot');
      return NextResponse.json(
        { success: false, error: 'Erreur lors de l\'envoi' },
        { status: 403 }
      );
    }

    // 4. reCAPTCHA verification
    const isHuman = await verifyRecaptcha(body.recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { success: false, error: 'Vérification anti-spam échouée' },
        { status: 403 }
      );
    }

    // 5. Validation avec Zod
    const validatedData = contactSchema.parse(body);

    // 6. Envoi email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Site <contact@arbresdulauragais-elagage.fr>',
      to: 'andreo.luc@example.com',
      replyTo: validatedData.email,
      subject: `Nouveau message de ${validatedData.firstName} ${validatedData.lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #184e28; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f8f7f4; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #184e28; }
              .value { margin-top: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Nouveau message depuis le site</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Nom complet :</div>
                  <div class="value">${validatedData.firstName} ${validatedData.lastName}</div>
                </div>
                <div class="field">
                  <div class="label">Email :</div>
                  <div class="value"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Téléphone :</div>
                  <div class="value"><a href="tel:${validatedData.phone}">${validatedData.phone}</a></div>
                </div>
                <div class="field">
                  <div class="label">Message :</div>
                  <div class="value">${validatedData.message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    // 7. Email de confirmation au client (optionnel)
    await resend.emails.send({
      from: 'Arbres du Lauragais <contact@arbresdulauragais-elagage.fr>',
      to: validatedData.email,
      subject: 'Confirmation de réception - Arbres du Lauragais',
      html: `
        <h2>Bonjour ${validatedData.firstName},</h2>
        <p>Nous avons bien reçu votre message et nous vous recontacterons dans les plus brefs délais.</p>
        <p>Cordialement,<br>Andréo Luc<br>Arbres du Lauragais Élagage</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Votre message a été envoyé avec succès',
      emailId: data?.id,
    });

  } catch (error) {
    console.error('API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Données invalides',
          details: error.errors.map((e) => ({ field: e.path[0], message: e.message })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}

// Méthode non autorisée
export async function GET() {
  return NextResponse.json(
    { error: 'Méthode non autorisée' },
    { status: 405 }
  );
}
```

### Service Resend

**Configuration**
```typescript
// lib/email.ts
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Template email (optionnel - avec React Email)
import { Html, Head, Body, Container, Heading, Text } from '@react-email/components';

interface ContactEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export function ContactEmail({ firstName, lastName, email, phone, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif' }}>
        <Container>
          <Heading>Nouveau message de {firstName} {lastName}</Heading>
          <Text><strong>Email :</strong> {email}</Text>
          <Text><strong>Téléphone :</strong> {phone}</Text>
          <Text><strong>Message :</strong></Text>
          <Text>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}
```

### Gestion des Erreurs

**Stratégie de Retry (Client-Side)**
```typescript
// lib/api.ts
export async function sendContactForm(data: ContactFormData) {
  const maxRetries = 2;
  let lastError;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }

      return result;
    } catch (error) {
      lastError = error;
      if (i < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  throw lastError;
}
```

### Monitoring & Logs

**Vercel Analytics**
```typescript
// app/api/contact/route.ts
import { track } from '@vercel/analytics/server';

export async function POST(request: NextRequest) {
  try {
    // ... traitement ...

    // Track success
    await track('contact_form_submitted', {
      source: 'main_form',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Track error
    await track('contact_form_error', {
      error: error.message,
    });

    throw error;
  }
}
```

---

## Database Design ERD

### Architecture de Données

**Type** : Aucune base de données (stateless application)

### Raison
- Site vitrine one-page sans espace membre
- Formulaires → envoi email direct via Resend
- Pas de stockage de données utilisateur côté serveur
- Conformité RGPD simplifiée (pas de données persistées)
- Performance maximale (pas de requêtes DB)

### Données Stockées Localement (Browser)

#### LocalStorage
```typescript
// lib/storage.ts
interface LocalStorageData {
  language: 'fr' | 'en';
  cookieConsent: boolean;
  analyticsConsent: boolean;
  theme?: 'light' | 'dark'; // Si mode sombre ajouté
}

export const storage = {
  getLanguage: (): 'fr' | 'en' => {
    return (localStorage.getItem('language') as 'fr' | 'en') || 'fr';
  },
  setLanguage: (lang: 'fr' | 'en') => {
    localStorage.setItem('language', lang);
  },
  getCookieConsent: (): boolean => {
    return localStorage.getItem('cookieConsent') === 'true';
  },
  setCookieConsent: (consent: boolean) => {
    localStorage.setItem('cookieConsent', String(consent));
  },
};
```

**Durée de rétention** : Persistant (jusqu'à suppression navigateur)

#### SessionStorage (Optionnel)
```typescript
// Brouillon formulaire (si utilisateur quitte et revient)
interface FormDraft {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  timestamp: number;
}

export const formDraft = {
  save: (data: Partial<ContactFormData>) => {
    const draft: FormDraft = {
      ...data,
      timestamp: Date.now(),
    };
    sessionStorage.setItem('formDraft', JSON.stringify(draft));
  },
  load: (): FormDraft | null => {
    const stored = sessionStorage.getItem('formDraft');
    if (!stored) return null;

    const draft = JSON.parse(stored);
    const hourAgo = Date.now() - 3600000;

    // Expire après 1h
    if (draft.timestamp < hourAgo) {
      sessionStorage.removeItem('formDraft');
      return null;
    }

    return draft;
  },
  clear: () => {
    sessionStorage.removeItem('formDraft');
  },
};
```

### Données Transitoires (Mémoire - React State)

```typescript
// État application (hooks/contexts)
interface AppState {
  // Navigation
  activeSection: string;
  menuOpen: boolean;

  // UI
  lightboxOpen: boolean;
  lightboxImageIndex: number;
  floatingModalOpen: boolean;

  // Form
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;

  // Language
  currentLanguage: 'fr' | 'en';
  translations: Record<string, string>;
}
```

### Flux de Données Formulaire

```
User Input (Form)
      ↓
React Hook Form (mémoire client)
      ↓
Validation Zod (client)
      ↓
POST /api/contact (Next.js API Route)
      ↓
Validation Zod (serveur)
      ↓
Resend API (email envoyé)
      ↓
Response au client
      ↓
Données supprimées (pas de persistance)
```

### Alternative Future : Base de Données (Si Évolution)

**Si besoin futur de stocker les demandes de devis pour dashboard admin** :

#### Option 1 : Vercel Postgres (Recommandé)

```sql
-- Schema PostgreSQL
CREATE TABLE contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  source VARCHAR(20) DEFAULT 'main_form', -- 'main_form' | 'floating_form'
  status VARCHAR(20) DEFAULT 'new', -- 'new' | 'read' | 'replied' | 'archived'
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  replied_at TIMESTAMP,

  INDEX idx_created_at (created_at DESC),
  INDEX idx_status (status),
  INDEX idx_email (email)
);
```

**Implémentation avec Vercel Postgres**
```typescript
// lib/db.ts
import { sql } from '@vercel/postgres';

export async function saveContactRequest(data: ContactFormData) {
  const { rows } = await sql`
    INSERT INTO contact_requests (
      first_name, last_name, email, phone, message, source
    ) VALUES (
      ${data.firstName},
      ${data.lastName},
      ${data.email},
      ${data.phone},
      ${data.message},
      'main_form'
    )
    RETURNING id
  `;

  return rows[0];
}

export async function getContactRequests(status?: string) {
  const { rows } = await sql`
    SELECT * FROM contact_requests
    ${status ? sql`WHERE status = ${status}` : sql``}
    ORDER BY created_at DESC
    LIMIT 50
  `;

  return rows;
}
```

#### Option 2 : Supabase (Alternative)

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function saveContactRequest(data: ContactFormData) {
  const { data: result, error } = await supabase
    .from('contact_requests')
    .insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      message: data.message,
      source: 'main_form',
    })
    .select()
    .single();

  if (error) throw error;
  return result;
}
```

#### Option 3 : Vercel KV (Redis - Simple)

```typescript
// lib/kv.ts
import { kv } from '@vercel/kv';

export async function saveContactRequest(data: ContactFormData) {
  const id = crypto.randomUUID();
  const key = `contact:${id}`;

  await kv.set(key, {
    ...data,
    createdAt: new Date().toISOString(),
    status: 'new',
  });

  // Ajouter à une liste triée par date
  await kv.zadd('contacts:timeline', {
    score: Date.now(),
    member: id,
  });

  return id;
}

export async function getRecentContacts(limit = 50) {
  const ids = await kv.zrange('contacts:timeline', 0, limit - 1, { rev: true });
  const contacts = await Promise.all(
    ids.map((id) => kv.get(`contact:${id}`))
  );
  return contacts;
}
```

### Comparatif Solutions DB

| Solution | Coût | Complexité | Use Case |
|----------|------|------------|----------|
| **Aucune DB** | 0€ | ⭐ Très simple | Site actuel (recommandé) |
| **Vercel KV** | 0€ (hobby) | ⭐⭐ Simple | Stockage temporaire (30 jours) |
| **Vercel Postgres** | 0€ (hobby) | ⭐⭐⭐ Moyen | Dashboard admin complet |
| **Supabase** | 0€ (free tier) | ⭐⭐⭐ Moyen | Dashboard + auth future |

### Recommandation Actuelle

**Rester sans BDD** pour :
- ✅ Simplicité maximale
- ✅ Zéro coût infrastructure
- ✅ Zéro maintenance
- ✅ RGPD simplifié (pas de données stockées)
- ✅ Performance optimale (statique pur)
- ✅ Resend suffit amplement (3000 emails/mois gratuit)

**Si évolution future** : Vercel Postgres (intégration native Next.js)

---

## Configuration & Déploiement

### Variables d'Environnement

#### .env.local (Development)
```bash
# Resend (Email Service)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# reCAPTCHA
RECAPTCHA_SECRET_KEY=6Lc_xxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc_yyyyyyyyyyyyyyyyyyy

# Google Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

#### .env.production (Vercel)
```bash
# Même structure, valeurs production
RESEND_API_KEY=re_prod_xxxxxxxxxxxxx
RECAPTCHA_SECRET_KEY=6Lc_prod_xxxxxxxx
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc_prod_yyyyyyyy
NEXT_PUBLIC_GA_ID=G-PROD_XXXX
NEXT_PUBLIC_BASE_URL=https://arbresdulauragais-elagage.fr
```

**Configuration Vercel** : Variables ajoutées via dashboard Vercel (Settings → Environment Variables)

### Configuration Next.js

#### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [], // Ajouter domaines externes si images externes
  },

  // Compression
  compress: true,

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://arbresdulauragais-elagage.fr' },
          { key: 'Access-Control-Allow-Methods', value: 'POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },

  // Redirections
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

#### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#184e28',
        accent: '#2f8d4e',
        background: '#f8f7f4',
        text: '#1a1a1a',
        'text-secondary': '#6b7280',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### Déploiement Vercel

#### Méthode 1 : Via Dashboard Vercel (Recommandé)

1. **Connecter GitHub**
   - Aller sur vercel.com
   - "Add New Project"
   - Importer repository GitHub

2. **Configuration automatique**
   - Vercel détecte Next.js automatiquement
   - Build Command : `next build`
   - Output Directory : `.next`
   - Install Command : `pnpm install`

3. **Variables d'environnement**
   - Settings → Environment Variables
   - Ajouter toutes les variables `.env.production`

4. **Domaine personnalisé**
   - Settings → Domains
   - Ajouter `arbresdulauragais-elagage.fr`
   - Vercel donne les DNS à configurer

5. **Configuration DNS Namecheap**
   ```
   Type: CNAME
   Host: @
   Value: cname.vercel-dns.com

   Type: CNAME
   Host: www
   Value: cname.vercel-dns.com
   ```

#### Méthode 2 : Via CLI Vercel

```bash
# Installation CLI
npm i -g vercel

# Login
vercel login

# Premier déploiement
vercel

# Production
vercel --prod

# Avec variables d'environnement
vercel env add RESEND_API_KEY
```

### CI/CD Automatique

**Vercel Git Integration** (automatique) :
- Push sur `main` → déploiement production
- Push sur autre branche → preview deployment
- Pull Request → preview deployment avec URL unique

### Scripts NPM

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "analyze": "ANALYZE=true next build",
    "prepare": "husky install"
  }
}
```

### Husky (Git Hooks)

```bash
# Installation
pnpm add -D husky lint-staged

# Configuration
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

**package.json**
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css,scss}": [
      "prettier --write"
    ]
  }
}
```

### Monitoring & Analytics

#### Vercel Analytics
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

#### Google Analytics (Optionnel)
```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
```

---

## Migration depuis Angular

### Plan de Migration (5-7 jours)

#### Jour 1 : Setup Projet
```bash
# Créer projet Next.js
npx create-next-app@latest al-elagage-nextjs \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd al-elagage-nextjs
pnpm install

# Installer dépendances
pnpm add framer-motion lucide-react react-hook-form zod @hookform/resolvers resend sonner clsx tailwind-merge

# Dev dependencies
pnpm add -D @types/node prettier prettier-plugin-tailwindcss eslint-config-prettier
```

#### Jour 2-3 : Composants UI
- Convertir composants Angular → React
- Header, Footer, Button, Card, Input
- Adapter SCSS → Tailwind CSS

#### Jour 4-5 : Sections Principales
- Hero, Services, Portfolio, Reviews, Contact
- Intégrer animations Framer Motion
- Tester responsive

#### Jour 6 : API & Formulaire
- Créer API Route `/api/contact`
- Configurer Resend
- Tester envoi emails

#### Jour 7 : Déploiement & Tests
- Déployer sur Vercel
- Configurer DNS
- Tests finaux (Lighthouse, accessibilité)

### Exemple de Conversion

**Avant (Angular)**
```typescript
// hero.component.ts
@Component({
  selector: 'app-hero',
  template: `
    <section class="hero">
      <h1>{{ title }}</h1>
      <button (click)="scrollToContact()">{{ ctaText }}</button>
    </section>
  `,
  styles: [`
    .hero {
      background: var(--brand-color);
      padding: 4rem 2rem;
    }
  `]
})
export class HeroComponent {
  title = 'Votre expert élagage';
  ctaText = 'Devis gratuit';

  scrollToContact() {
    // ...
  }
}
```

**Après (Next.js + React)**
```typescript
// components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { scrollToSection } from '@/lib/scroll';

export default function Hero() {
  return (
    <section className="bg-brand px-8 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-white"
      >
        Votre expert élagage
      </motion.h1>

      <button
        onClick={() => scrollToSection('contact')}
        className="mt-6 rounded-lg bg-accent px-6 py-3 text-white hover:bg-accent/90"
      >
        Devis gratuit
      </button>
    </section>
  );
}
```

---

**Document SRS Next.js finalisé et prêt pour implémentation !** 🚀

**Avantages de cette stack :**
- ✅ **SEO parfait** : HTML complet dès le chargement (SSG)
- ✅ **Performance maximale** : Lighthouse 95-100
- ✅ **Gratuit** : Vercel + Resend (3000 emails/mois)
- ✅ **Simple** : Déploiement 1 clic, DNS automatique
- ✅ **Moderne** : Next.js 14 + React Server Components
- ✅ **Évolutif** : Facile d'ajouter features (blog, dashboard admin)
