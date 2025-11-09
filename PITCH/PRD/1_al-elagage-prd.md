## 1. Elevator Pitch
Arbres du Lauragais Élagage est un site vitrine one‑page conçu pour convertir des visiteurs en clients d’Andréo Luc, élagueur‑grimpeur professionnel. Il présente clairement six prestations clés (élagage, abattage, démontage, haubanage, broyage, taille de haies), met en avant la sécurité, le respect du végétal et des finitions soignées, et facilite la prise de contact via des CTA « Appeler » et « Demander un devis ». Le site s’appuie sur des preuves concrètes (avant/après, avis Google) et un SEO/a11y solides. Il est responsive, FR/EN, et optimisé pour la performance et la conformité (cookies/Analytics).

## 2. Who is this app for
- Particuliers ayant des arbres/haies à entretenir ou à abattre
- Zone d’intervention: Toulouse, Carcassonne, Castres, Revel et alentours
- Plateformes: web desktop et mobile (responsive), FR par défaut + EN disponible

## 3. Functional Requirements
- Prestations
  - Pages/sections: Présentation des 6 prestations avec descriptions claires, bénéfices, mini‑FAQ
  - Galerie: avant/après (1–3 visuels par prestation), lightbox, lazy‑loading
- Conversion
  - CTA persistants: « Appeler » (sticky sur mobile), « Demander un devis » (scroll vers formulaire)
  - Formulaire de devis/contact: Nom, Prénom, Email, Téléphone, Message, consentement
  - Anti‑spam: reCAPTCHA v3 ou honeypot
- Preuve sociale
  - Intégration badge/lien avis Google; affichage d’extraits récents
- Internationalisation
  - FR/EN (switch visible, textes clés externalisés)
- SEO & accessibilité
  - Balises sémantiques HTML5, H1/H2 structurés, métadonnées optimisées
  - Performances (images WebP/AVIF, compression, cache), contraste et navigation clavier
- Conformité & tracking
  - Bandeau cookies conforme; Google Analytics (opt‑in)
- Réseaux sociaux
  - Liens Facebook et Instagram (header/footer)
- Navigation & structure
  - One‑page à ancres: Accueil, Prestations, Réalisations, Avis, Contact
  - Header sticky, footer avec coordonnées, zone d’intervention, mentions légales

## 4. User Stories
- En tant que visiteur, je veux comprendre en 10 secondes l’offre et la promesse pour savoir si le service est pertinent pour moi.
- En tant que propriétaire, je veux voir des photos avant/après pour évaluer la qualité du travail.
- En tant que prospect, je veux lire des avis Google récents pour me rassurer sur la fiabilité.
- En tant qu’utilisateur mobile, je veux un bouton « Appeler » toujours accessible pour joindre rapidement l’artisan.
- En tant que prospect, je veux remplir un formulaire simple pour obtenir un devis gratuit.
- En tant qu’utilisateur, je veux basculer FR/EN pour lire le site dans ma langue.
- En tant que prospect, je veux connaître la zone d’intervention pour vérifier l’éligibilité de mon adresse.
- En tant qu’utilisateur, je veux une navigation à ancres fluide pour accéder vite aux sections clés.
- En tant que prospect, je veux des explications simples du jargon (élagage, haubanage) pour comprendre les options.
- En tant que prospect, je veux des liens vers Facebook/Instagram pour voir davantage de réalisations.

## 5. User Interface
- Layout
  - Hero: H1 promesse claire + CTA « Appeler » et « Demander un devis »; visuel réel en arrière‑plan avec overlay
  - Prestations: 6 cards avec icône/visuel, titre, court descriptif, bénéfices, lien vers détails dans la page
  - Réalisations: grille avant/après (lightbox), légendes descriptives, lazy‑loading
  - Avis: note globale + 3–6 extraits, lien « Voir tous les avis » (fiche Google)
  - Contact: coordonnées visibles, zone d’intervention, formulaire complet + consentement
  - Footer: coordonnées, horaires, zone, mentions légales, liens sociaux
- Style
  - Palette verts (brand #184e28, accent #2f8d4e), texte #1a1a1a, fond #f8f7f4
  - Inter (ou équivalent), cards à bords 12px, ombres douces, animations légères (parallax modéré)
  - Accessibilité: contrastes suffisants, focus visible, labels explicites, alt FR/EN
- Comportements
  - Menu sticky, ancres avec scroll doux; bouton « Appeler » sticky sur mobile
  - Images optimisées (WebP/AVIF), lazy‑loading; CSS/JS minimal
  - Bandeau cookies avec choix; Analytics activé après consentement
