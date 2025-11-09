# Roadmap - Arbres du Lauragais Élagage

## 📋 Vue d'ensemble

Ce document détaille les étapes de développement du site, de la configuration initiale au déploiement en production.

---

## ✅ Phase 1 : Configuration & Fondations (TERMINÉ)

### 1.1 Setup Initial
- [x] Initialiser le projet Next.js 14
- [x] Configurer TypeScript
- [x] Configurer Tailwind CSS
- [x] Configurer ESLint + Prettier
- [x] Créer la structure de dossiers

### 1.2 Configuration
- [x] `next.config.js` avec headers de sécurité
- [x] `tailwind.config.ts` avec couleurs personnalisées
- [x] `tsconfig.json` avec paths aliases
- [x] `.env.example` pour variables d'environnement
- [x] `.gitignore` approprié

### 1.3 Utilitaires de Base
- [x] `lib/utils.ts` (cn, scrollToSection, formatPhoneNumber)
- [x] `lib/constants.ts` (services, contact, navigation)
- [x] `lib/validations.ts` (schémas Zod)

### 1.4 Composants UI
- [x] `Button` (variants: primary, secondary, outline)
- [x] `Card` (avec effet hover)
- [x] `Input` (avec validation et erreurs)
- [x] `Textarea` (avec validation et erreurs)

### 1.5 Documentation
- [x] `README.md`
- [x] `ARCHITECTURE.md`
- [x] `BEST-PRACTICES.md`
- [x] `GETTING-STARTED.md`
- [x] `ROADMAP.md` (ce fichier)

---

## 🔄 Phase 2 : Composants Layout (EN COURS)

### 2.1 Header
- [ ] Créer `components/layout/Header.tsx`
  - [ ] Logo à gauche
  - [ ] Navigation sticky avec ancres
  - [ ] Switch FR/EN
  - [ ] Menu hamburger mobile
  - [ ] Indicateur de section active (scroll spy)
  - [ ] Animation au scroll (réduction hauteur)

### 2.2 Footer
- [ ] Créer `components/layout/Footer.tsx`
  - [ ] 3 colonnes (desktop) / empilé (mobile)
  - [ ] Coordonnées (adresse, téléphone, email)
  - [ ] Zone d'intervention + horaires
  - [ ] Liens sociaux (Facebook, Instagram)
  - [ ] Mentions légales
  - [ ] Animation underline sur liens

### 2.3 Boutons Flottants
- [ ] Créer `components/layout/FloatingButtons.tsx`
  - [ ] Bouton "Devis gratuit" (ouvre modal)
  - [ ] Bouton scroll-to-top
  - [ ] Apparition après 50vh de scroll
  - [ ] Animation slide-in depuis la droite
  - [ ] Cohérence visuelle entre les deux boutons

### 2.4 Modal Devis
- [ ] Créer `components/ui/Modal.tsx`
  - [ ] Overlay avec backdrop blur
  - [ ] Mini-formulaire (Nom, Prénom, Tel, Email, Message)
  - [ ] Animation scale + fade-in
  - [ ] Fermeture (croix, Esc, clic backdrop)
  - [ ] Même endpoint que formulaire principal

---

## 🎨 Phase 3 : Sections Principales

### 3.1 Hero Section
- [ ] Créer `components/sections/Hero.tsx`
  - [ ] Image plein écran avec overlay
  - [ ] Badge avis Google (design officiel)
  - [ ] H1 + sous-titre
  - [ ] 2 CTA (Appeler, Devis gratuit)
  - [ ] CTA secondaire (scroll vers Prestations)
  - [ ] Animation fade-in progressive (stagger)
  - [ ] Parallax modéré sur image (optionnel)

### 3.2 Prestations Section
- [ ] Créer `components/sections/Services.tsx`
  - [ ] Titre H2 + chapeau
  - [ ] Grille 6 cards responsive (3×2, 2×3, 1×6)
  - [ ] Contenu par carte :
    - [ ] Icône (Lucide) + photo
    - [ ] Titre prestation
    - [ ] "C'est quoi ?" (1 phrase)
    - [ ] "Pourquoi ?" (2-3 bénéfices)
    - [ ] Bouton "Je veux ce service"
  - [ ] Animation fade-in + slide-up au scroll (stagger)
  - [ ] Effet hover (élévation + zoom image)

### 3.3 Pourquoi Me Choisir
- [ ] Créer `components/sections/WhyChooseUs.tsx`
  - [ ] 4 piliers en ligne (desktop) / 2×2 (mobile)
  - [ ] Icônes Lucide + titre + description
  - [ ] Badge crédit impôt 50% (180px × 180px)
  - [ ] Animation fade-in au scroll
  - [ ] Hover avec rotation/pulse sur icônes

### 3.4 Réalisations Section
- [ ] Créer `components/sections/Portfolio.tsx`
  - [ ] Titre H2
  - [ ] Galerie avant/après (grille masonry ou slider)
  - [ ] Lightbox au clic
  - [ ] Légendes descriptives
  - [ ] Animation révélation progressive (clip-path)
  - [ ] Chargement direct (pas de lazy-loading)

### 3.5 Lightbox
- [ ] Créer `components/ui/Lightbox.tsx`
  - [ ] Navigation clavier (←/→, Esc)
  - [ ] Zoom depuis miniature
  - [ ] Légendes
  - [ ] Compteur (1/12)
  - [ ] Fermeture (Esc, clic backdrop, bouton)

### 3.6 Avis Section
- [ ] Créer `components/sections/Reviews.tsx`
  - [ ] Note globale Google (design officiel)
  - [ ] 3-6 extraits d'avis en cards
  - [ ] Photo profil, nom, extrait, date
  - [ ] Carrousel automatique (3s, fade)
  - [ ] Lien "Voir tous les avis" (fiche Google)

### 3.7 Contact Section
- [ ] Créer `components/sections/Contact.tsx`
  - [ ] Titre H2
  - [ ] Coordonnées (adresse, tel, email, horaires)
  - [ ] Zone d'intervention (liste villes)
  - [ ] Formulaire complet :
    - [ ] Nom, Prénom, Email, Téléphone
    - [ ] Message (textarea)
    - [ ] Consentement RGPD (checkbox)
    - [ ] reCAPTCHA v3
    - [ ] Honeypot field (caché)
    - [ ] Bouton "Envoyer ma demande"
  - [ ] Validation React Hook Form + Zod
  - [ ] Animation focus sur champs (scale + shadow)
  - [ ] Toast de confirmation/erreur

---

## 🎭 Phase 4 : Animations

### 4.1 Composants d'Animation
- [ ] Créer `components/animations/FadeIn.tsx`
  - [ ] Fade-in + translateY au scroll
  - [ ] Hook useInView (Framer Motion)
  - [ ] Props : delay, duration

- [ ] Créer `components/animations/SlideUp.tsx`
  - [ ] Slide-up au scroll
  - [ ] Stagger pour listes

- [ ] Créer `components/animations/Parallax.tsx`
  - [ ] Effet parallax modéré
  - [ ] Utilisation sur hero

### 4.2 Hooks Personnalisés
- [ ] Créer `hooks/useScrollSpy.ts`
  - [ ] Détection section active
  - [ ] IntersectionObserver
  - [ ] Retourne activeSection

- [ ] Créer `hooks/useIntersectionObserver.ts`
  - [ ] Observer générique
  - [ ] Options configurables

- [ ] Créer `hooks/useLightbox.ts`
  - [ ] État lightbox (isOpen, currentIndex)
  - [ ] Fonctions open, close, next, prev

### 4.3 Animations Globales
- [ ] Ajouter animations CSS dans `globals.css`
- [ ] Support prefers-reduced-motion
- [ ] Optimisation GPU (transform, opacity)

---

## 🔌 Phase 5 : API & Backend

### 5.1 API Route Contact
- [ ] Créer `app/api/contact/route.ts`
  - [ ] POST handler
  - [ ] Rate limiting (3 req/min)
  - [ ] Honeypot check
  - [ ] reCAPTCHA verification
  - [ ] Validation Zod (serveur)
  - [ ] Envoi email via Resend
  - [ ] Email de confirmation au client
  - [ ] Gestion erreurs complète
  - [ ] Logs pour monitoring

### 5.2 Services Email
- [ ] Créer `lib/email.ts`
  - [ ] Configuration Resend
  - [ ] Template email (HTML)
  - [ ] Template React Email (optionnel)

### 5.3 Rate Limiting
- [ ] Créer `lib/rate-limit.ts`
  - [ ] Map IP → count + resetTime
  - [ ] Fonction checkRateLimit
  - [ ] Cleanup automatique

### 5.4 reCAPTCHA
- [ ] Créer `lib/recaptcha.ts`
  - [ ] Fonction verifyRecaptcha
  - [ ] Score threshold (0.5)
  - [ ] Gestion erreurs

---

## 🌐 Phase 6 : Internationalisation (Optionnel)

### 6.1 Configuration next-intl
- [ ] Installer next-intl
- [ ] Créer structure `app/[locale]/`
- [ ] Middleware pour détection langue

### 6.2 Traductions
- [ ] Créer `i18n/fr.json`
- [ ] Créer `i18n/en.json`
- [ ] Traduire tous les textes clés

### 6.3 Switch Langue
- [ ] Créer `components/layout/LanguageSwitch.tsx`
- [ ] Persistance dans localStorage
- [ ] Attribut lang sur <html>

---

## 🎨 Phase 7 : Assets & Contenu

### 7.1 Images
- [ ] Optimiser images existantes (WebP/AVIF)
- [ ] Créer dossiers dans `public/images/`
  - [ ] hero/
  - [ ] services/
  - [ ] portfolio/
  - [ ] badges/
- [ ] Ajouter images pour chaque prestation
- [ ] Photos avant/après (12-20 photos)
- [ ] Badge Google Reviews officiel
- [ ] Badge crédit impôt 50%

### 7.2 Icônes
- [ ] Sélectionner icônes Lucide pour :
  - [ ] Prestations (tree, shield, etc.)
  - [ ] Contact (phone, mail, map-pin)
  - [ ] Navigation (menu, x, arrow-up)
  - [ ] Pourquoi nous choisir

### 7.3 Contenu Texte
- [ ] Rédiger descriptions prestations
- [ ] Rédiger bénéfices par prestation
- [ ] Texte hero (H1, sous-titre)
- [ ] Texte "Pourquoi me choisir"
- [ ] Mentions légales
- [ ] Politique de confidentialité

---

## 🧪 Phase 8 : Tests & Optimisation

### 8.1 Tests Manuels
- [ ] Navigation complète (toutes sections)
- [ ] Formulaire (validation, envoi, erreurs)
- [ ] Responsive (mobile, tablette, desktop)
- [ ] Navigation clavier
- [ ] Lightbox (navigation, fermeture)
- [ ] Animations (smooth, pas de lag)

### 8.2 Tests Automatiques (Optionnel)
- [ ] Tests unitaires (Vitest)
- [ ] Tests composants (React Testing Library)
- [ ] Tests accessibilité (axe)

### 8.3 Performance
- [ ] Lighthouse audit (objectif 95+)
- [ ] Core Web Vitals
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
- [ ] Optimisation images
- [ ] Minification CSS/JS
- [ ] Compression Gzip/Brotli

### 8.4 Accessibilité
- [ ] Audit WCAG 2.1 AA
- [ ] Test navigation clavier
- [ ] Test lecteur d'écran (NVDA)
- [ ] Contrastes suffisants
- [ ] Alt texts descriptifs

### 8.5 SEO
- [ ] Metadata optimisés (title, description)
- [ ] Open Graph tags
- [ ] Twitter Card
- [ ] Structured Data (JSON-LD)
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Canonical URLs

---

## 🚀 Phase 9 : Déploiement

### 9.1 Préparation
- [ ] Créer compte Vercel
- [ ] Créer compte Resend
- [ ] Créer compte reCAPTCHA
- [ ] Configurer variables d'environnement

### 9.2 Domaine
- [ ] Configurer DNS Namecheap
- [ ] Ajouter domaine sur Vercel
- [ ] Vérifier certificat SSL

### 9.3 Déploiement
- [ ] Push sur GitHub
- [ ] Connecter repo sur Vercel
- [ ] Premier déploiement
- [ ] Tester en production
- [ ] Configurer domaine personnalisé

### 9.4 Monitoring
- [ ] Configurer Vercel Analytics
- [ ] Configurer Google Analytics (optionnel)
- [ ] Configurer alertes erreurs
- [ ] Tester formulaire en production

---

## 🔄 Phase 10 : Post-Lancement

### 10.1 Suivi
- [ ] Monitoring quotidien (1 semaine)
- [ ] Corrections bugs éventuels
- [ ] Ajustements UX basés sur retours

### 10.2 Optimisations
- [ ] Analyse Google Analytics
- [ ] Optimisations SEO continues
- [ ] Ajout contenu (blog futur ?)

### 10.3 Maintenance
- [ ] Mises à jour dépendances
- [ ] Sauvegardes régulières
- [ ] Renouvellement certificat SSL (auto)

---

## 📊 Estimation Temps

| Phase | Durée Estimée | Priorité |
|-------|---------------|----------|
| Phase 1 : Configuration | ✅ 1 jour | Critique |
| Phase 2 : Layout | 1-2 jours | Critique |
| Phase 3 : Sections | 2-3 jours | Critique |
| Phase 4 : Animations | 1 jour | Haute |
| Phase 5 : API | 1 jour | Critique |
| Phase 6 : i18n | 0.5 jour | Moyenne |
| Phase 7 : Assets | 1 jour | Haute |
| Phase 8 : Tests | 1-2 jours | Haute |
| Phase 9 : Déploiement | 0.5 jour | Critique |
| Phase 10 : Post-launch | Continu | Moyenne |

**Total : 7-10 jours de développement**

---

## 🎯 Prochaines Étapes Immédiates

1. **Header** : Navigation sticky avec scroll spy
2. **Hero** : Section d'accueil avec CTA
3. **Services** : Grille des 6 prestations
4. **Footer** : Coordonnées et liens

---

## 📝 Notes

- Prioriser les fonctionnalités critiques (formulaire, navigation)
- Tester régulièrement sur vrais devices
- Commits fréquents avec messages clairs
- Documentation à jour au fur et à mesure

---

**Dernière mise à jour** : Phase 1 terminée ✅
