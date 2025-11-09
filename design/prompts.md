## Prompts UI – Arbres du Lauragais Élagage

Contexte: site vitrine statique FR/EN. Objectif principal: demandes de devis et appels. Ton: professionnel, rassurant, concret.

### Prompt – Générateur de maquette (Framer / Dora / TeleportHQ)
Crée une landing page pour « Arbres du Lauragais Élagage » (Lauragais, France).
Palette: vert forêt (#184e28), blanc, gris doux. Typo lisible (Inter ou équivalent).
Sections (dans cet ordre):
- Héros: titre clair (H1), sous-titre court, boutons « Demander un devis » et « Appeler ».
- Prestations (6 cartes): Élagage, Abattage, Démontage, Haubanage, Broyage, Taille de haies.
- Réalisations (avant / après): 3 blocs.
- Avis clients: 3 avis 5★ (nom abrégé, date, extrait).
- Contact & Devis: coordonnées, formulaire (Nom, Prénom, Email, Téléphone, Message, consentement).
- Footer: zone d’intervention, horaires, mentions légales.
Contraintes: mobile-first, contrastes OK, CTA visibles, JS minimal.
Livrable: HTML/CSS propre (ou composants), textes FR, balises alt.

### Prompt – Extraction de styles depuis sites d’inspiration (Builder.io Visual Copilot)
Analyse ces URLs et extrait une « design language » (couleurs, espacements, style de cartes, boutons):
- URL 1: [à coller]
- URL 2: [à coller]
- URL 3: [à coller]
Produis un set de tokens (couleurs, radius, ombres, typos) et 6 composants (Card, Button, Section, Grid, Review, ContactForm) compatibles Tailwind ou CSS pur.

### Prompt – Réécriture des textes (assistant IA général)
Réécris les textes de la landing en FR, ton professionnel et local, avec bénéfices concrets (sécurité, respect des arbres, finitions soignées). Garde des phrases courtes et actionnables. Ajoute des micro-preuves (assurance RC Pro, devis gratuit, intervention rapide).

### Prompts – Génération d’images (Copilot Designer / Firefly / Playground)
1) Héros (photo):
« Arboriste professionnel en harnais, en haut d’un arbre au lever du soleil, composition 16:9 pour bandeau web, style photo réaliste premium, couleurs naturelles, espace négatif pour titre/CTA, profondeur de champ légère. »

2) Avant/Après (3 paires):
« Jardin résidentiel avec arbre dense avant taille, puis après taille propre et équilibrée, prise de vue similaire, 4:3, lumière douce. »

3) Pictogrammes services (6):
« Série d’icônes linéaires cohérentes, style outline propre, couleur vert #184e28, thèmes: élagage, abattage, démontage, haubanage, broyage, taille de haies. Fond transparent, SVG. »

4) Texture de fond légère:
« Motif organique subtil rappelant des feuilles, très faible contraste, seamless, destiné à un fond de section web. »

### Prompt – Accessibilité & SEO
Audit a11y/SEO de la page: 1 H1 unique, structure H2 logique, titres de liens explicites, alt pertinents (sans le mot « photo »), meta title 55–60, meta description 150–160, JSON-LD LocalBusiness cohérent, performances (images WebP/AVIF, lazy-loading), contrastes suffisants.

### Prompt – Export code propre (si outil génère code)
Nettoie le code: supprime frameworks inutiles, réduit le JS au strict nécessaire, CSS critique inline + reste en fichier, images optimisées en WebP, classes claires, pas d’inline styles sauf exceptions.

