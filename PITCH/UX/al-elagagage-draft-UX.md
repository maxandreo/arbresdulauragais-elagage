Excellent choix ! Voici le **Document de Description d'Interface Utilisateur** final basé sur votre mix personnalisé :

---

# User Interface Design Document
**Arbres du Lauragais Élagage - Site One-Page**

## Layout Structure

### Navigation
- **Menu sticky** (fixé en haut lors du scroll) avec logo à gauche
- **Liens d'ancrage** : Accueil | Prestations | Réalisations | Avis | Contact
- **Numéro de téléphone cliquable** intégré dans le header à droite (desktop) : format `06 XX XX XX XX` avec icône ☎️, style bouton secondaire discret mais visible
- **Switch FR/EN** en haut à droite (icône drapeau)
- Sur **mobile** : menu hamburger, téléphone reste visible dans le header collapsé

### Hero Section (Accueil)
- **Visuel plein écran** : Grande photo d'Andréo en action (sur un arbre, équipement de sécurité visible) avec overlay léger pour lisibilité
- **Badge avis Google** positionné en haut à droite du hero (note ★★★★★ + nombre d'avis)
- **Titre principal (H1)** centré : "Votre expert élagage dans le Lauragais"
- **Sous-titre** : phrase de réassurance (ex: "Professionnel certifié - Interventions sécurisées")
- **Deux CTA principaux** côte à côte (desktop) / empilés (mobile) :
  - "☎️ Appeler maintenant" (bouton primaire vert) - **visible uniquement en responsive mobile**
  - "📋 Devis gratuit" (bouton primaire vert)
- **CTA secondaire** en dessous : "Découvrir mes services ↓" (lien avec flèche animée, scroll doux vers Prestations)

### Prestations Section
- **Titre section (H2)** : "Mes prestations" avec court chapeau introductif
- **Grille 6 cartes** :
  - **Desktop** : 3 colonnes × 2 lignes, espacement généreux
  - **Tablette** : 2 colonnes × 3 lignes
  - **Mobile** : 1 colonne, scroll vertical
- **Contenu de chaque carte** :
  - Icône simple + photo réelle en arrière-plan (ou en haut de carte)
  - Titre prestation (ex: "Élagage")
  - "C'est quoi ?" : 1 phrase vulgarisée (15-20 mots max)
  - "Pourquoi le faire ?" : 2-3 bénéfices en bullet points concrets
  - Bouton "Je veux ce service →" (scroll vers Contact)
- **Effet hover** (desktop) : légère élévation de la carte, zoom subtil sur l'image

### Pourquoi me choisir
- **4 piliers en ligne** (desktop) / 2×2 grille (mobile)
- Chaque pilier = icône + titre + 1 phrase courte :
  1. **Certifié** : "Formations professionnelles à jour"
  2. **Assuré** : "Responsabilité civile et décennale"
  3. **Crédit d'impôt 50%** : Badge visuel `50-jardin-470x470.png` + texte "Bénéficiez de 50% de réduction d'impôt"
  4. **Zone Lauragais** : "Interventions rapides : Toulouse, Carcassonne, Castres, Revel"

### Réalisations Section
- **Titre (H2)** : "Mes réalisations"
- **Galerie avant/après** : grille masonry ou slider comparatif
- **Lightbox** au clic avec légendes descriptives
- **Lazy-loading** des images

### Avis Section
- **Note globale Google** affichée en grand (★★★★★ X/5)
- **3-6 extraits d'avis** en cards avec photo de profil, nom, extrait, date
- **Lien CTA** : "Voir tous les avis sur Google" (ouverture fiche Google)

### Contact Section
- **Deux colonnes** (desktop) / empilé (mobile) :
  - **Gauche** : Coordonnées complètes (adresse, téléphone cliquable, email, horaires) + carte interactive de la zone d'intervention
  - **Droite** : Formulaire de contact (Nom, Prénom, Email, Téléphone, Message, consentement RGPD, reCAPTCHA, bouton "Envoyer ma demande")

### Footer
- **3 colonnes** (desktop) / empilé (mobile) :
  1. Coordonnées (adresse, téléphone, email)
  2. Zone d'intervention + horaires
  3. Liens sociaux (Facebook, Instagram) + Mentions légales

---

## Core Components

### Bouton flottant "Besoin d'aide ?"
- **Position** : fixe en bas à droite (desktop et mobile)
- **Icône** : 💬 avec badge notification subtil
- **Comportement** : au clic, ouvre un **mini-formulaire en overlay** (modal centré) avec :
  - Champs : Nom, Téléphone, Message court (textarea 3 lignes)
  - Bouton "Envoyer" + croix de fermeture
  - Fond semi-transparent (backdrop blur)
- **Même finalité** que le formulaire de la section Contact (envoi vers même endpoint)

### CTA "Appeler maintenant" (responsive uniquement)
- **Position** : sticky en bas de l'écran sur mobile, toujours visible
- **Style** : bouton pleine largeur, couleur primaire verte, icône ☎️
- **Action** : lance l'appel direct (`tel:06XXXXXXXX`)

### Menu sticky
- **Comportement** : se réduit légèrement au scroll, fond blanc avec ombre portée
- **Téléphone dans header** : reste visible même en version réduite

### Cards Prestations
- **Structure** : conteneur avec image, overlay texte, bouton
- **Responsive** : hauteur flexible, texte toujours lisible
- **Accessibilité** : contraste suffisant, focus visible sur bouton

---

## Interaction Patterns

### Navigation
- **Scroll doux** (smooth scroll) vers les ancres au clic sur menu
- **Indicateur de section active** dans le menu (soulignement ou couleur)
- **Scroll-to-top** : bouton flèche ↑ apparaît après 50vh de scroll

### Formulaires
- **Validation en temps réel** : messages d'erreur sous champs
- **États** : focus, error, success avec couleurs distinctes
- **Confirmation** : message de succès après envoi (toast ou modal)

### Galerie
- **Lightbox** : navigation clavier (←/→), fermeture (Esc ou clic backdrop)
- **Lazy-loading** : images chargées au scroll

### Animations
- **Parallax modéré** sur hero (défilement image plus lent que contenu)
- **Fade-in** des sections à l'apparition dans le viewport
- **Hover effects** : transitions douces (0.3s ease)

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
- **Boutons** : bords arrondis 8px, padding généreux, hover avec assombrissement
- **Icônes** : style line art ou filled, cohérence visuelle (même bibliothèque)
- **Photos** : format WebP/AVIF, ratio 16:9 ou 4:3 selon contexte
- **Overlay hero** : `rgba(0,0,0,0.3)` pour lisibilité texte blanc

---

## Mobile, Web App, Desktop Considerations

### Desktop (>1024px)
- **Largeur max contenu** : 1280px centré
- **Menu** : horizontal avec tous les liens visibles + téléphone à droite
- **Hero** : pleine hauteur (100vh), CTA "Appeler" masqué
- **Prestations** : grille 3 colonnes
- **Contact** : 2 colonnes (coordonnées + formulaire)

### Tablette (768px - 1024px)
- **Prestations** : grille 2 colonnes
- **Contact** : 2 colonnes compactées ou empilé selon espace

### Mobile (<768px)
- **Menu** : hamburger, overlay plein écran au clic
- **Hero** : hauteur ajustée (70vh), CTA "Appeler maintenant" visible
- **Prestations** : 1 colonne, cards empilées
- **Pourquoi me choisir** : 2×2 grille ou 1 colonne
- **Contact** : empilé (carte puis formulaire)
- **CTA sticky** : bouton "Appeler" fixe en bas
- **Bouton flottant** : taille réduite, position ajustée pour ne pas chevaucher CTA sticky

### Performance
- **Images** : compression, srcset pour responsive, lazy-loading
- **CSS/JS** : minifiés, critical CSS inline
- **Fonts** : subset, preload, fallback système

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
- **Navigation clavier** : tous les éléments interactifs accessibles via Tab, focus visible (outline 2px)
- **Labels** : tous les champs de formulaire avec `<label>` explicites
- **Alt texts** : descriptions FR/EN pour toutes les images (contextuelles, pas "image1.jpg")
- **ARIA** : landmarks (`role="navigation"`, `role="main"`), live regions pour messages de confirmation
- **Langue** : attribut `lang="fr"` ou `lang="en"` selon switch
- **Skip links** : lien "Aller au contenu" caché visuellement, visible au focus clavier

### Formulaires
- **Autocomplete** : attributs appropriés (name, email, tel)
- **Erreurs** : annoncées via `aria-live`, associées aux champs via `aria-describedby`
- **Required** : indication visuelle (*) + attribut `required`

### Médias
- **Vidéos** (si ajoutées) : sous-titres, contrôles accessibles
- **Animations** : respect de `prefers-reduced-motion` (désactivation si demandé)

### Tests
- Validation avec outils automatiques (Lighthouse, axe DevTools)
- Test navigation clavier complète
- Test lecteur d'écran (NVDA/JAWS)

---

**Document prêt pour implémentation !** 🌳
