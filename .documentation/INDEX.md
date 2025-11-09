# Documentation - Index

Bienvenue dans la documentation complète du projet **Arbres du Lauragais Élagage**.

## 📚 Documents Disponibles

### 1. [GETTING-STARTED.md](./GETTING-STARTED.md)
**Guide de démarrage rapide**
- Installation et configuration
- Structure du projet
- Composants UI disponibles
- Utilitaires et helpers
- Scripts et commandes
- FAQ

👉 **Commencez ici si c'est votre première fois sur le projet**

---

### 2. [ARCHITECTURE.md](./ARCHITECTURE.md)
**Architecture technique du projet**
- Vue d'ensemble de l'architecture
- Structure des dossiers détaillée
- Patterns de développement (Server/Client Components)
- Gestion de l'état
- Styling et conventions
- Performance et optimisations
- Accessibilité et sécurité

👉 **Consultez ce document pour comprendre l'architecture globale**

---

### 3. [BEST-PRACTICES.md](./BEST-PRACTICES.md)
**Bonnes pratiques de développement**
- Principes généraux (Server-First, TypeScript, Composition)
- Styling avec Tailwind CSS
- Composants et patterns
- Formulaires et validation
- Animations
- Accessibilité
- Performance
- Sécurité
- Git et commits

👉 **Référence constante pendant le développement**

---

### 4. [ROADMAP.md](./ROADMAP.md)
**Feuille de route du projet**
- Phase 1 : Configuration ✅ (TERMINÉ)
- Phase 2 : Composants Layout (EN COURS)
- Phase 3 : Sections Principales
- Phase 4 : Animations
- Phase 5 : API & Backend
- Phase 6 : Internationalisation
- Phase 7 : Assets & Contenu
- Phase 8 : Tests & Optimisation
- Phase 9 : Déploiement
- Phase 10 : Post-Lancement

👉 **Suivez la progression et les prochaines étapes**

---

### 5. [al-elagage-product-requirements.md](./al-elagage-product-requirements.md)
**Spécifications produit**
- Elevator pitch
- Public cible
- Exigences fonctionnelles
- User stories
- Interface utilisateur
- Détails des sections

👉 **Document de référence pour les fonctionnalités métier**

---

### 6. [al-elagage-software-specifications.md](./al-elagage-software-specifications.md)
**Spécifications techniques détaillées**
- System Design
- Architecture Pattern (Server/Client Components)
- State Management
- Data Flow
- Technical Stack
- Authentication Process
- Route Design
- API Design
- Database Design (aucune BDD nécessaire)
- Configuration & Déploiement

👉 **Spécifications techniques complètes avec exemples de code**

---

### 7. [al-elagage-ux-design.md](./al-elagage-ux-design.md)
**Design UX/UI**
- Layout Structure (Navigation, Hero, Sections, Footer)
- Core Components (Boutons flottants, Modal, etc.)
- Interaction Patterns
- Visual Design Elements (Couleurs, Typographie)
- Mobile/Tablette/Desktop
- Accessibilité
- Ressources techniques (Icônes, Badges, Animations)

👉 **Guide complet du design et des interactions**

---

## 🚀 Démarrage Rapide

### Pour commencer le développement

1. **Lire** [GETTING-STARTED.md](./GETTING-STARTED.md)
2. **Installer** les dépendances : `pnpm install`
3. **Lancer** le serveur : `pnpm dev`
4. **Consulter** [BEST-PRACTICES.md](./BEST-PRACTICES.md) pendant le développement
5. **Suivre** [ROADMAP.md](./ROADMAP.md) pour les prochaines étapes

### Pour comprendre l'architecture

1. **Lire** [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Consulter** [al-elagage-software-specifications.md](./al-elagage-software-specifications.md)
3. **Explorer** la structure de dossiers

### Pour le design et l'UX

1. **Lire** [al-elagage-ux-design.md](./al-elagage-ux-design.md)
2. **Consulter** [al-elagage-product-requirements.md](./al-elagage-product-requirements.md)
3. **Référencer** les couleurs et composants dans `tailwind.config.ts`

---

## 📁 Structure de la Documentation

```
.documentation/
├── INDEX.md (ce fichier)
├── GETTING-STARTED.md
├── ARCHITECTURE.md
├── BEST-PRACTICES.md
├── ROADMAP.md
├── al-elagage-product-requirements.md
├── al-elagage-software-specifications.md
└── al-elagage-ux-design.md
```

---

## 🎯 État Actuel du Projet

### ✅ Phase 1 : Configuration & Fondations (TERMINÉ)

**Ce qui a été fait :**
- ✅ Projet Next.js 14 initialisé avec App Router
- ✅ TypeScript configuré avec types stricts
- ✅ Tailwind CSS avec couleurs personnalisées
- ✅ ESLint + Prettier pour qualité du code
- ✅ Structure de dossiers complète
- ✅ Composants UI de base (Button, Card, Input, Textarea)
- ✅ Utilitaires (cn, scrollToSection, formatPhoneNumber)
- ✅ Constantes (services, contact, navigation)
- ✅ Validation Zod (schémas formulaire)
- ✅ Documentation complète

**Fichiers créés :**
```
✅ package.json
✅ next.config.js
✅ tailwind.config.ts
✅ tsconfig.json
✅ .eslintrc.json
✅ .prettierrc
✅ postcss.config.js
✅ .gitignore
✅ app/layout.tsx
✅ app/page.tsx
✅ app/globals.css
✅ components/ui/Button.tsx
✅ components/ui/Card.tsx
✅ components/ui/Input.tsx
✅ components/ui/Textarea.tsx
✅ lib/utils.ts
✅ lib/constants.ts
✅ lib/validations.ts
✅ README.md
✅ .documentation/* (tous les docs)
```

### 🔄 Prochaine Étape : Phase 2 - Composants Layout

**À faire :**
1. Header avec navigation sticky
2. Footer avec coordonnées
3. Boutons flottants (Devis + Scroll-to-top)
4. Modal pour formulaire devis

---

## 🛠️ Commandes Utiles

```bash
# Développement
pnpm dev              # Serveur de développement
pnpm build            # Build de production
pnpm start            # Serveur de production

# Qualité du code
pnpm lint             # Vérifier le code
pnpm lint:fix         # Corriger automatiquement
pnpm format           # Formatter avec Prettier
pnpm type-check       # Vérifier les types TypeScript
```

---

## 📞 Informations Projet

- **Nom** : Arbres du Lauragais Élagage
- **Client** : Andréo Luc
- **Type** : Site vitrine one-page
- **Stack** : Next.js 14 + TypeScript + Tailwind CSS
- **Déploiement** : Vercel
- **Domaine** : arbresdulauragais-elagage.fr

---

## 🎨 Design System

### Couleurs
- **Brand** : `#184e28` (vert foncé forêt)
- **Accent** : `#2f8d4e` (vert vif pour CTA)
- **Background** : `#f8f7f4` (beige clair naturel)
- **Text** : `#1a1a1a` (noir doux)
- **Text Secondary** : `#6b7280` (gris)

### Typographie
- **Police** : Inter (Google Fonts)
- **H1** : 48px (desktop) / 32px (mobile)
- **H2** : 36px (desktop) / 28px (mobile)
- **Body** : 16px

### Breakpoints
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

---

## 🔗 Liens Utiles

### Documentation Externe
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

### Services
- [Vercel](https://vercel.com/) - Hébergement
- [Resend](https://resend.com/) - Service email
- [Google reCAPTCHA](https://www.google.com/recaptcha/) - Anti-spam

---

## ❓ Questions Fréquentes

### Où trouver les couleurs du projet ?
→ `tailwind.config.ts` ou [GETTING-STARTED.md](./GETTING-STARTED.md#système-de-design)

### Comment créer un nouveau composant ?
→ Consulter [BEST-PRACTICES.md](./BEST-PRACTICES.md#composants)

### Quelle est la prochaine étape ?
→ Voir [ROADMAP.md](./ROADMAP.md#-prochaines-étapes-immédiates)

### Comment déployer le site ?
→ Voir [ROADMAP.md](./ROADMAP.md#-phase-9--déploiement)

---

## 📝 Notes Importantes

1. **Server Components par défaut** : N'ajoutez `'use client'` que si nécessaire
2. **TypeScript strict** : Typer toutes les props et fonctions
3. **Mobile-first** : Toujours penser responsive dès le début
4. **Accessibilité** : Respecter WCAG 2.1 AA
5. **Performance** : Objectif Lighthouse 95+

---

**Bon développement !** 🌳

Pour toute question, consultez d'abord cette documentation ou créez une issue GitHub.
