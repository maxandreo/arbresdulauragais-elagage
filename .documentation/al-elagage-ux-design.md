# User Interface Design Document
**Arbres du Lauragais Élagage - Site One-Page**

## Layout Structure

### Navigation
- **Menu sticky** (fixé en haut lors du scroll) avec logo à gauche
- **Liens d'ancrage** : Accueil | Prestations | Réalisations | Avis | Contact
- **Bouton "Appeler" (responsive mobile uniquement)** : plusieurs options proposées :

  **Option A - Bouton icône + texte** :
  - Icône téléphone (phone-outline) + "Appeler"
  - Style : bouton primaire vert, compact
  - Position : header à droite, remplace les liens en version mobile

  **Option B - Bouton icône seul** :
  - Icône téléphone uniquement dans un cercle
  - Plus discret, gain d'espace
  - Tooltip "Appeler" au survol (desktop si visible)

  **Option C - Bouton texte prioritaire** :
  - "Appeler" en gros + petite icône à gauche
  - Plus explicite pour utilisateurs peu tech
  - Prend plus d'espace mais ultra-clair

  **Option D - Bouton avec numéro** :
  - "Appeler 06 XX XX XX XX"
  - Très explicite, rassure l'utilisateur
  - Peut être long sur petits écrans

  **Recommandation** : Option C pour clarté maximale auprès de votre cible peu tech

- **Switch FR/EN** en haut à droite (icône drapeau)
- Sur **mobile** : menu hamburger, bouton "Appeler" reste visible dans le header

### Hero Section (Accueil)
- **Visuel plein écran** : Grande photo d'Andréo en action (sur un arbre, équipement de sécurité visible) avec overlay léger pour lisibilité
- **Badge avis Google officiel** positionné en haut à droite du hero (utiliser le design officiel Google avec logo, note ★★★★★ + nombre d'avis - respecter la charte graphique Google)
- **Titre principal (H1)** centré : "Votre expert élagage dans le Lauragais"
- **Sous-titre** : phrase de réassurance (ex: "Professionnel certifié - Interventions sécurisées")
- **Deux CTA principaux** côte à côte (desktop) / empilés (mobile) :
  - "📋 Devis gratuit" (bouton primaire vert)
- **CTA secondaire** en dessous : "Découvrir mes services ↓" (lien avec flèche animée, scroll doux vers Prestations)
- **Animation** : Fade-in progressif du contenu (titre puis sous-titre puis boutons) avec délai de 0.2s entre chaque élément

### Prestations Section
- **Titre section (H2)** : "Mes prestations" avec court chapeau introductif
- **Animation entrée** : Cards apparaissent en fade-in + slide-up au scroll, avec stagger (décalage de 0.1s entre chaque carte)
- **Grille 6 cartes** :
  - **Desktop** : 3 colonnes × 2 lignes, espacement généreux
  - **Tablette** : 2 colonnes × 3 lignes
  - **Mobile** : 1 colonne, scroll vertical
- **Contenu de chaque carte** :
  - Icône simple (source : **Lucide Icons** - open-source, gratuit, facile d'intégration via CDN ou npm) + photo réelle en arrière-plan (ou en haut de carte)
  - Titre prestation (ex: "Élagage")
  - "C'est quoi ?" : 1 phrase vulgarisée (15-20 mots max)
  - "Pourquoi le faire ?" : 2-3 bénéfices en bullet points concrets
  - Bouton "Je veux ce service →" (scroll vers Contact)
- **Effet hover** (desktop) : légère élévation de la carte (translateY -8px), zoom subtil sur l'image (scale 1.05), transition 0.3s ease-out

### Pourquoi me choisir
- **4 piliers en ligne** (desktop) / 2×2 grille (mobile)
- **Animation** : Compteurs animés pour les chiffres (si applicable), fade-in au scroll
- Chaque pilier = icône (Lucide Icons) + titre + 1 phrase courte :
  1. **Certifié** : "Formations professionnelles à jour"
  2. **Assuré** : "Responsabilité civile et décennale"
  3. **Crédit d'impôt 50%** : Badge visuel `50-jardin-470x470.png` redimensionné à **180px × 180px** (desktop) / **140px × 140px** (mobile) pour harmonie visuelle + texte "Bénéficiez de 50% de réduction d'impôt"
  4. **Zone Lauragais** : "Interventions rapides : Toulouse, Carcassonne, Castres, Revel"
- **Animation hover** : légère rotation ou pulse sur les icônes

### Réalisations Section
- **Titre (H2)** : "Mes réalisations"
- **Galerie avant/après** : grille masonry ou slider comparatif
- **Lightbox** au clic avec légendes descriptives
- **Chargement direct** des images (pas de lazy-loading)
- **Animation** : Effet de révélation progressive (clip-path ou opacity) au scroll

### Avis Section
- **Note globale Google** affichée en grand avec **design officiel Google** (logo Google, étoiles, format respectant la charte)
- **3-6 extraits d'avis** en cards avec photo de profil, nom, extrait, date
- **Animation** : Carrousel automatique doux (3s par avis) avec fade transition
- **Lien CTA** : "Voir tous les avis sur Google" avec logo Google officiel (ouverture fiche Google)

### Contact Section
- **Une colonne centrée** (pas de carte interactive)
- **Coordonnées** : adresse, téléphone cliquable (icône phone de Lucide Icons), email, horaires
- **Zone d'intervention** : texte simple listant les villes principales
- **Formulaire de contact** : Nom, Prénom, Email, Téléphone, Message, consentement RGPD, reCAPTCHA, bouton "Envoyer ma demande"
- **Animation** : Focus sur champ = légère mise en avant (scale 1.02, shadow plus prononcée)

### Footer
- **3 colonnes** (desktop) / empilé (mobile) :
  1. Coordonnées (adresse, téléphone avec icône Lucide Icons phone, email)
  2. Zone d'intervention + horaires
  3. Liens sociaux avec **logos officiels Facebook et Instagram** (respecter les guidelines de chaque plateforme) + Mentions légales
- **Animation** : Liens avec underline animé au hover (0.3s ease)

---

## Core Components

### Bouton flottant "Demander un devis"
- **Libellé** : "📋 Devis gratuit" ou "✉️ Me contacter" (au choix selon préférence)
- **Position** : fixe en bas à droite, au-dessus du bouton scroll-to-top
- **Comportement** : au clic, ouvre un **mini-formulaire en overlay** (modal centré) avec :
  - Champs : Nom, Prénom, Téléphone, Email, Message (textarea 4 lignes), consentement
  - Bouton "Envoyer" + croix de fermeture
  - Fond semi-transparent avec backdrop blur
  - **Animation** : Modal apparaît avec scale (0.9 → 1) + fade-in 0.3s
- **Même finalité** que le formulaire de la section Contact (envoi vers même endpoint)
- **Couplage avec scroll-to-top** :
  - Scroll-to-top : position en bas à droite, 20px du bord
  - Bouton devis : position 20px au-dessus du scroll-to-top
  - Les deux boutons ont la même largeur pour cohérence visuelle
  - **Animation apparition** : les deux boutons slide-in depuis la droite au scroll (après 50vh)

### Bouton scroll-to-top
- **Icône** : flèche ↑ (Lucide Icons - arrow-up)
- **Position** : fixe en bas à droite, 20px du bord droit et bas
- **Apparition** : après 50vh de scroll, slide-in depuis la droite
- **Animation hover** : translateY -4px, transition 0.2s
- **Couplage** : même style visuel que le bouton flottant devis (cohérence)

### Menu sticky
- **Comportement** : se réduit légèrement au scroll (padding réduit), fond blanc avec ombre portée
- **Animation** : transition douce 0.3s sur la hauteur
- **Indicateur section active** : underline animé sous le lien actif

### Cards Prestations
- **Structure** : conteneur avec image, overlay texte, bouton
- **Responsive** : hauteur flexible, texte toujours lisible
- **Accessibilité** : contraste suffisant, focus visible sur bouton
- **Animation** : Hover = élévation + zoom image

---

## Interaction Patterns

### Navigation
- **Scroll doux** (smooth scroll) vers les ancres au clic sur menu avec easing personnalisé
- **Indicateur de section active** dans le menu (underline animé avec transition 0.3s)
- **Animation** : Underline se déplace fluidement d'un lien à l'autre

### Formulaires
- **Validation en temps réel** : messages d'erreur sous champs avec slide-down animation
- **États** : focus (scale 1.02 + shadow), error (border rouge + shake animation), success (border verte + checkmark animé)
- **Confirmation** : toast notification en haut à droite avec slide-in, disparaît après 4s

### Galerie
- **Lightbox** : navigation clavier (←/→), fermeture (Esc ou clic backdrop)
- **Animation** : Ouverture avec zoom depuis la miniature cliquée
- **Chargement direct** : toutes les images chargées dès le début (pas de lazy-loading)

### Animations globales - Options proposées

**Option 1 - Minimaliste moderne** :
- Fade-in + translateY (20px → 0) pour les sections au scroll
- Hover subtils (translateY -4px, scale 1.02)
- Transitions rapides (0.2-0.3s)
- Easing : ease-out
- **Inspiration** : Sites SaaS modernes (Stripe, Linear)

**Option 2 - Dynamique professionnelle** :
- Parallax léger sur hero (image défile à 0.5x vitesse)
- Stagger animations sur grilles (décalage 0.1s)
- Hover plus marqués (scale 1.05, shadow prononcée)
- Transitions moyennes (0.3-0.4s)
- Easing : cubic-bezier(0.4, 0, 0.2, 1)
- **Inspiration** : Sites d'agences créatives (Awwwards)

**Option 3 - Élégante douce** :
- Fade-in + clip-path reveal pour images
- Micro-interactions sur boutons (ripple effect)
- Hover très doux (opacity 0.9, translateY -2px)
- Transitions lentes (0.4-0.5s)
- Easing : ease-in-out
- **Inspiration** : Sites lifestyle/luxe

**Option 4 - Naturelle organique** (recommandée pour votre secteur) :
- Animations inspirées de la nature (courbes organiques)
- Parallax modéré sur hero
- Hover avec légère rotation (1-2deg) pour dynamisme
- Transitions moyennes (0.3s)
- Easing : cubic-bezier(0.34, 1.56, 0.64, 1) (bounce léger)
- Compteurs animés pour chiffres clés
- **Inspiration** : Sites écologiques/artisanaux modernes
- **Cohérence** : évoque croissance, mouvement naturel, professionnalisme

**Recommandation** : Option 4 pour cohérence avec votre métier (nature, arbres) tout en restant moderne et professionnel

---

## Visual Design Elements & Color Scheme

### Palette de couleurs
- **Primaire (brand)** : `#184e28` (vert foncé forêt)
- **Accent** : `#2f8d4e` (vert vif pour CTA)
- **Texte** : `#1a1a1a` (noir doux)
- **Fond** : `#f8f7f4` (beige clair naturel)
- **Blanc** : `#ffffff` (cards, header)
- **Gris** : `#6b7280` (textes secondaires)

### Éléments visuels
- **Cards** : bords arrondis 12px, ombres douces (`box-shadow: 0 4px 12px rgba(0,0,0,0.08)`)
- **Boutons** : bords arrondis 8px, padding généreux, hover avec assombrissement + élévation
- **Icônes** : **Lucide Icons** (https://lucide.dev/) - open-source, gratuit, CDN disponible, style line art cohérent
  - Téléphone : `phone` (icône classique combiné téléphonique)
  - Autres : `tree-deciduous`, `shield-check`, `map-pin`, `mail`, etc.
- **Photos** : format WebP/AVIF, ratio 16:9 ou 4:3 selon contexte, chargement direct
- **Overlay hero** : `rgba(0,0,0,0.3)` pour lisibilité texte blanc
- **Badge Google** : utiliser les assets officiels de Google (https://developers.google.com/my-business/content/review-badge)
- **Logos sociaux** : utiliser les logos officiels Facebook et Instagram depuis leurs kits de ressources officiels

---

## Mobile, Web App, Desktop Considerations

### Desktop (>1024px)
- **Largeur max contenu** : 1280px centré
- **Menu** : horizontal avec tous les liens visibles, pas de bouton "Appeler"
- **Hero** : pleine hauteur (100vh)
- **Prestations** : grille 3 colonnes
- **Contact** : 1 colonne centrée, max-width 800px
- **Badge 50%** : 180px × 180px

### Tablette (768px - 1024px)
- **Prestations** : grille 2 colonnes
- **Contact** : 1 colonne centrée
- **Badge 50%** : 160px × 160px

### Mobile (<768px)
- **Menu** : hamburger, overlay plein écran au clic
- **Bouton "Appeler"** : visible dans le header (Option C recommandée)
- **Hero** : hauteur ajustée (70vh)
- **Prestations** : 1 colonne, cards empilées
- **Pourquoi me choisir** : 2×2 grille ou 1 colonne
- **Contact** : 1 colonne
- **Badge 50%** : 140px × 140px
- **Boutons flottants** : taille légèrement réduite (48px × 48px), bien espacés verticalement

### Performance
- **Images** : compression, srcset pour responsive, **chargement direct** (pas de lazy-loading)
- **CSS/JS** : minifiés, critical CSS inline
- **Fonts** : subset, preload, fallback système
- **Animations** : utiliser `transform` et `opacity` (GPU-accelerated), éviter `width`/`height`

---

## Typography

### Famille de police
- **Principale** : Inter (Google Fonts) ou équivalent (system-ui fallback)
- **Poids** : Regular (400), Medium (500), SemiBold (600), Bold (700)

### Hiérarchie
- **H1** (Hero) : 48px (desktop) / 32px (mobile), Bold, line-height 1.2
- **H2** (Sections) : 36px (desktop) / 28px (mobile), SemiBold, line-height 1.3
- **H3** (Cards, sous-sections) : 24px (desktop) / 20px (mobile), SemiBold
- **Body** : 16px, Regular, line-height 1.6
- **Small** (mentions, footer) : 14px, Regular, line-height 1.5
- **Boutons** : 16px, Medium, letterspacing 0.5px

### Responsive
- Utilisation de `clamp()` pour scaling fluide entre breakpoints
- Exemple : `font-size: clamp(1.5rem, 4vw, 3rem)`

---

## Accessibility

### Conformité WCAG 2.1 AA
- **Contrastes** : minimum 4.5:1 pour texte normal, 3:1 pour texte large
- **Navigation clavier** : tous les éléments interactifs accessibles via Tab, focus visible (outline 2px avec couleur accent)
- **Labels** : tous les champs de formulaire avec `<label>` explicites
- **Alt texts** : descriptions FR/EN pour toutes les images (contextuelles, descriptives du contenu)
- **ARIA** : landmarks (`role="navigation"`, `role="main"`), live regions pour messages de confirmation
- **Langue** : attribut `lang="fr"` ou `lang="en"` selon switch
- **Skip links** : lien "Aller au contenu" caché visuellement, visible au focus clavier
- **Animations** : respect de `prefers-reduced-motion` (désactivation animations si demandé par l'utilisateur)

### Formulaires
- **Autocomplete** : attributs appropriés (name, email, tel)
- **Erreurs** : annoncées via `aria-live`, associées aux champs via `aria-describedby`
- **Required** : indication visuelle (*) + attribut `required`
- **Focus** : ordre logique, visible, pas de piège clavier

### Médias
- **Vidéos** (si ajoutées) : sous-titres, contrôles accessibles
- **Animations** : `@media (prefers-reduced-motion: reduce)` pour désactiver

### Tests
- Validation avec outils automatiques (Lighthouse, axe DevTools)
- Test navigation clavier complète
- Test lecteur d'écran (NVDA/JAWS)
- Test sur vrais devices mobiles

---

## Ressources techniques

### Icônes
- **Lucide Icons** : https://lucide.dev/
  - Installation : CDN ou npm (`npm install lucide-react`)
  - Usage : `<i data-lucide="phone"></i>` ou composants React
  - Licence : ISC (open-source, usage libre)

### Badges officiels
- **Google Reviews** : https://developers.google.com/my-business/content/review-badge
- **Facebook** : https://developers.facebook.com/docs/plugins/page-plugin
- **Instagram** : https://about.instagram.com/brand/assets (logo officiel)

### Animations
- **Librairies recommandées** :
  - AOS (Animate On Scroll) : simple, léger
  - GSAP : puissant, contrôle total (si animations complexes)
  - Framer Motion : si React (animations déclaratives)
  - CSS natif : pour animations simples (recommandé pour performance)

---

**Document finalisé et prêt pour implémentation !** 🌳
