# 🌳 Arbres du Lauragais Élagage

Site vitrine one-page pour Andréo Luc, élagueur-grimpeur professionnel dans le Lauragais.

---

## 🚀 Démarrage Rapide

**👉 Commencez ici : [START-HERE.md](./START-HERE.md)**

Ou suivez ces étapes :

```bash
# 1. Installer les dépendances
pnpm install

# 2. Lancer le serveur de développement
pnpm dev

# 3. Ouvrir http://localhost:3000
```

---

## 🚀 Stack Technique

- **Framework** : Next.js 14+ (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Formulaires** : React Hook Form + Zod
- **Email** : Resend
- **Icônes** : Lucide React
- **Déploiement** : Vercel

## 📦 Installation

```bash
# Installer les dépendances (recommandé : pnpm)
pnpm install

# ou avec npm
npm install

# ou avec yarn
yarn install
```

## 🛠️ Développement

```bash
# Lancer le serveur de développement
pnpm dev

# Ouvrir http://localhost:3000
```

## 📝 Scripts Disponibles

```bash
pnpm dev          # Serveur de développement
pnpm build        # Build de production
pnpm start        # Serveur de production
pnpm lint         # Linter ESLint
pnpm lint:fix     # Corriger les erreurs ESLint
pnpm format       # Formatter avec Prettier
pnpm type-check   # Vérifier les types TypeScript
```

## 🌳 Structure du Projet

```
.
├── app/                    # Routes Next.js (App Router)
│   ├── layout.tsx         # Layout racine
│   ├── page.tsx           # Page d'accueil
│   ├── globals.css        # Styles globaux
│   └── api/               # API Routes
│       └── contact/       # Endpoint formulaire
├── components/            # Composants React
│   ├── layout/           # Header, Footer, etc.
│   ├── sections/         # Sections de la page
│   ├── ui/               # Composants UI réutilisables
│   └── animations/       # Composants d'animation
├── lib/                  # Utilitaires et helpers
│   ├── utils.ts          # Fonctions utilitaires
│   ├── constants.ts      # Constantes
│   └── validations.ts    # Schémas Zod
├── public/               # Assets statiques
│   └── images/           # Images
└── .documentation/       # Documentation du projet
```

## 🎨 Design System

### Couleurs

- **Brand** : `#184e28` (vert foncé forêt)
- **Accent** : `#2f8d4e` (vert vif)
- **Background** : `#f8f7f4` (beige clair)
- **Text** : `#1a1a1a` (noir doux)

### Composants UI

- `Button` : Boutons avec variants (primary, secondary, outline)
- `Card` : Cartes avec effet hover optionnel
- `Input` : Champs de formulaire avec validation
- `Textarea` : Zone de texte avec validation

## 🔐 Variables d'Environnement

Créer un fichier `.env.local` :

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

## 📱 Responsive

- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

## ♿ Accessibilité

- Conformité WCAG 2.1 AA
- Navigation clavier complète
- Support lecteurs d'écran
- Respect de `prefers-reduced-motion`

## 🚀 Déploiement

Le site est déployé automatiquement sur Vercel :

1. Push sur `main` → déploiement production
2. Push sur autre branche → preview deployment

## 📄 Licence

Propriétaire - Andréo Luc / Arbres du Lauragais Élagage

## 📞 Contact

- **Email** : contact@arbresdulauragais-elagage.fr
- **Téléphone** : 06 XX XX XX XX
- **Site** : https://arbresdulauragais-elagage.fr
