# 🎯 Prochaines Étapes - Guide Pratique

## 📍 Où en sommes-nous ?

✅ **Phase 1 : Configuration & Fondations** - TERMINÉE

Tout est prêt pour commencer le développement des composants !

---

## 🚀 Démarrage Immédiat

### 1. Installer les dépendances

```bash
pnpm install
```

Si vous n'avez pas pnpm :
```bash
npm install -g pnpm
```

### 2. Créer le fichier .env.local

Créez un fichier `.env.local` à la racine avec ce contenu :

```bash
# Resend (Email Service) - Laisser vide pour l'instant
RESEND_API_KEY=

# reCAPTCHA - Laisser vide pour l'instant
RECAPTCHA_SECRET_KEY=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=

# Google Analytics - Optionnel
NEXT_PUBLIC_GA_ID=

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Lancer le serveur

```bash
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

---

## 🎨 Phase 2 : Créer le Header

### Étape 1 : Créer le composant Header

Créez `components/layout/Header.tsx` :

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_SECTIONS } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  // Détection du scroll pour header sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md py-4'
          : 'bg-white/95 backdrop-blur-sm py-6'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-brand">
          Arbres du Lauragais
        </div>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={cn(
                'text-text hover:text-accent transition-colors relative',
                activeSection === section.id && 'text-accent font-medium'
              )}
            >
              {section.label}
              {activeSection === section.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </nav>

        {/* Menu Mobile */}
        <button
          className="md:hidden text-brand"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-white z-40">
          <nav className="flex flex-col items-center gap-6 py-8">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className="text-xl text-text hover:text-accent transition-colors"
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
```

### Étape 2 : Intégrer le Header dans le Layout

Modifiez `app/layout.tsx` :

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  // ... metadata existante
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
```

### Étape 3 : Tester

1. Lancez `pnpm dev`
2. Ouvrez [http://localhost:3000](http://localhost:3000)
3. Vérifiez que le header s'affiche
4. Testez le menu mobile (responsive)

---

## 🎨 Phase 2 (suite) : Créer le Footer

### Créer `components/layout/Footer.tsx`

```tsx
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { CONTACT_INFO, INTERVENTION_ZONE, SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-brand text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coordonnées */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Phone size={18} />
                {CONTACT_INFO.phone}
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Mail size={18} />
                {CONTACT_INFO.email}
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                {CONTACT_INFO.address}
              </div>
            </div>
          </div>

          {/* Zone d'intervention */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Zone d'intervention</h3>
            <p className="mb-2">{INTERVENTION_ZONE.description}</p>
            <p className="text-sm">
              {INTERVENTION_ZONE.cities.join(' • ')}
            </p>
            <p className="mt-4 text-sm">{CONTACT_INFO.hours}</p>
          </div>

          {/* Liens */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
            <div className="flex gap-4 mb-6">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
            <a
              href="/mentions-legales"
              className="text-sm hover:text-accent transition-colors underline"
            >
              Mentions légales
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm">
          <p>© {new Date().getFullYear()} Arbres du Lauragais Élagage - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
```

### Intégrer le Footer

Modifiez `app/layout.tsx` :

```tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

## 🎨 Phase 3 : Créer la Section Hero

### Créer `components/sections/Hero.tsx`

```tsx
'use client';

import { Phone } from 'lucide-react';
import Button from '@/components/ui/Button';
import { scrollToSection } from '@/lib/utils';

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand to-accent"
    >
      {/* Overlay pour lisibilité */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Contenu */}
      <div className="relative z-10 container-custom text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Votre expert élagage dans le Lauragais
        </h1>

        <p className="text-xl md:text-2xl mb-8 animate-fade-in">
          Professionnel certifié - Interventions sécurisées
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.open('tel:06XXXXXXXX')}
          >
            <Phone className="mr-2" size={20} />
            Appeler
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => scrollToSection('contact')}
          >
            📋 Devis gratuit
          </Button>
        </div>

        <button
          onClick={() => scrollToSection('prestations')}
          className="mt-12 text-white hover:text-accent transition-colors animate-bounce"
        >
          Découvrir mes services ↓
        </button>
      </div>
    </section>
  );
}
```

### Intégrer dans la page

Modifiez `app/page.tsx` :

```tsx
import Hero from '@/components/sections/Hero';

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Les autres sections viendront ici */}
    </>
  );
}
```

---

## 📚 Ressources Utiles

### Documentation à consulter

1. **`.documentation/INDEX.md`** - Vue d'ensemble de toute la doc
2. **`.documentation/GETTING-STARTED.md`** - Guide complet de démarrage
3. **`.documentation/BEST-PRACTICES.md`** - Bonnes pratiques à suivre
4. **`.documentation/ROADMAP.md`** - Feuille de route détaillée

### Composants disponibles

- `Button` - Boutons avec variants
- `Card` - Cartes avec hover
- `Input` - Champs de formulaire
- `Textarea` - Zone de texte

### Utilitaires disponibles

- `cn()` - Fusion de classes Tailwind
- `scrollToSection()` - Scroll doux vers section
- `formatPhoneNumber()` - Formater numéro de téléphone

---

## ✅ Checklist Phase 2

- [ ] Header créé et intégré
- [ ] Footer créé et intégré
- [ ] Hero section créée
- [ ] Navigation fonctionne
- [ ] Menu mobile fonctionne
- [ ] Responsive testé

---

## 🎯 Après la Phase 2

### Phase 3 : Sections Principales

1. **Services** - Grille des 6 prestations
2. **Pourquoi me choisir** - 4 piliers
3. **Réalisations** - Galerie avant/après
4. **Avis** - Témoignages clients
5. **Contact** - Formulaire de contact

Voir `.documentation/ROADMAP.md` pour les détails complets.

---

## 💡 Conseils

1. **Commits réguliers** : Commitez après chaque composant terminé
2. **Tests fréquents** : Testez sur mobile et desktop régulièrement
3. **Documentation** : Consultez `.documentation/` en cas de doute
4. **Bonnes pratiques** : Suivez `.documentation/BEST-PRACTICES.md`

---

## 🆘 Besoin d'aide ?

- Consultez `.documentation/INDEX.md`
- Lisez `.documentation/GETTING-STARTED.md`
- Référez-vous à `.documentation/BEST-PRACTICES.md`

---

**Vous êtes prêt à développer !** 🚀

Commencez par créer le Header, puis le Footer, puis la section Hero.

**Bon développement !** 🌳
