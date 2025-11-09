# Software Requirements Specification Document
**Arbres du Lauragais Élagage - Site One-Page**

---

## System Design

### Architecture Overview
- **Type** : Application web statique one-page (SPA)
- **Déploiement** : GitHub Pages avec domaine personnalisé (Namecheap DNS)
- **Protocole** : HTTPS (certificat GitHub Pages automatique)
- **Responsive** : Mobile-first, breakpoints 768px (mobile), 1024px (tablette), 1280px+ (desktop)
- **Internationalisation** : FR (défaut) / EN via switch manuel
- **Performance** : Optimisation images (WebP/AVIF), minification CSS/JS, critical CSS inline

### Core Modules
1. **Module Navigation** : Menu sticky avec ancres, indicateur de section active
2. **Module Hero** : Section d'accueil avec CTA principaux
3. **Module Prestations** : Grille de 6 cards avec animations
4. **Module Réalisations** : Galerie avant/après avec lightbox
5. **Module Avis** : Intégration badge Google Reviews + carrousel d'avis
6. **Module Contact** : Formulaire avec validation + envoi via EmailJS
7. **Module Footer** : Coordonnées, liens sociaux, mentions légales

---

## Architecture Pattern

### Pattern Principal
- **Single Page Application (SPA)** avec Angular
- **Component-Based Architecture** : chaque section = composant Angular réutilisable
- **Lazy Loading** : modules chargés à la demande (si nécessaire pour optimisation)

### Structure des Composants
```
app/
├── core/
│   ├── header/
│   │   ├── header.component.ts
│   │   ├── header.component.html
│   │   └── header.component.scss
│   └── footer/
│       ├── footer.component.ts
│       ├── footer.component.html
│       └── footer.component.scss
├── sections/
│   ├── hero/
│   ├── services/ (prestations)
│   ├── portfolio/ (réalisations)
│   ├── reviews/ (avis)
│   └── contact/
├── shared/
│   ├── components/
│   │   ├── button/
│   │   ├── card/
│   │   ├── lightbox/
│   │   └── floating-cta/
│   ├── services/
│   │   ├── email.service.ts
│   │   ├── scroll.service.ts
│   │   └── i18n.service.ts
│   └── directives/
│       ├── scroll-animation.directive.ts
│       └── parallax.directive.ts
├── assets/
│   ├── images/
│   ├── icons/ (Lucide Icons)
│   └── i18n/
│       ├── fr.json
│       └── en.json
└── styles/
    ├── _variables.scss
    ├── _mixins.scss
    ├── _animations.scss
    └── main.scss
```

### Design Patterns Utilisés
- **Service Pattern** : services Angular pour logique métier (EmailJS, scroll, i18n)
- **Observer Pattern** : RxJS pour gestion d'événements (scroll, form submission)
- **Directive Pattern** : directives personnalisées pour animations au scroll
- **Module Pattern** : séparation core / shared / sections

---

## State Management

### Stratégie
- **Pas de state management complexe** (pas de NgRx/Akita nécessaire)
- **Services Angular avec BehaviorSubject** pour états partagés simples

### États à Gérer
1. **Navigation State**
   - Section active courante (pour indicateur menu)
   - Menu mobile ouvert/fermé
   - Gestion via `NavigationService`

2. **Language State**
   - Langue active (FR/EN)
   - Gestion via `I18nService` avec localStorage pour persistance

3. **Form State**
   - Validation en temps réel (Angular Reactive Forms)
   - État de soumission (idle, loading, success, error)
   - Gestion via `ContactFormComponent` + `EmailService`

4. **UI State**
   - Lightbox ouvert/fermé + image active
   - Modal formulaire flottant ouvert/fermé
   - Boutons flottants visibles/cachés (selon scroll position)
   - Gestion locale dans composants respectifs

### Exemple de Service
```typescript
// navigation.service.ts
export class NavigationService {
  private activeSectionSubject = new BehaviorSubject<string>('home');
  activeSection$ = this.activeSectionSubject.asObservable();

  setActiveSection(section: string): void {
    this.activeSectionSubject.next(section);
  }
}
```

---

## Data Flow

### Architecture de Flux de Données

```
User Interaction
      ↓
Component (Template)
      ↓
Component (TypeScript)
      ↓
Service (Business Logic)
      ↓
External API (EmailJS) / LocalStorage
      ↓
Service (Response)
      ↓
Component (Update View)
      ↓
Template (Display)
```

### Flux Principaux

#### 1. Soumission Formulaire Contact/Devis
```
User remplit formulaire
      ↓
Validation temps réel (Reactive Forms)
      ↓
User clique "Envoyer"
      ↓
ContactFormComponent.onSubmit()
      ↓
EmailService.sendEmail(formData)
      ↓
EmailJS API (HTTPS POST)
      ↓
Réponse (success/error)
      ↓
Toast notification affichée
      ↓
Formulaire réinitialisé (si success)
```

#### 2. Navigation par Ancres
```
User clique lien menu
      ↓
ScrollService.scrollToSection(sectionId)
      ↓
Smooth scroll vers section
      ↓
IntersectionObserver détecte section visible
      ↓
NavigationService.setActiveSection(sectionId)
      ↓
Menu mis à jour (underline animé)
```

#### 3. Changement de Langue
```
User clique switch FR/EN
      ↓
I18nService.setLanguage(lang)
      ↓
Chargement fichier JSON (assets/i18n/{lang}.json)
      ↓
localStorage.setItem('lang', lang)
      ↓
BehaviorSubject émet nouvelle langue
      ↓
Tous les composants abonnés se mettent à jour
      ↓
Attribut <html lang="..."> mis à jour
```

#### 4. Animations au Scroll
```
User scrolle la page
      ↓
IntersectionObserver détecte éléments visibles
      ↓
ScrollAnimationDirective applique classes CSS
      ↓
Animations CSS déclenchées (fade-in, slide-up)
```

---

## Technical Stack

### Frontend
- **Framework** : Angular 17+ (standalone components)
- **Langage** : TypeScript 5+
- **Styling** : SCSS avec architecture BEM ou SMACSS
- **Icônes** : Lucide Icons (CDN ou npm package)
- **Animations** : CSS natif + Angular Animations API
- **Forms** : Angular Reactive Forms
- **HTTP** : Angular HttpClient (pour EmailJS)

### Backend / Services
- **Formulaire** : EmailJS (gratuit, 200 emails/mois)
  - Service ID, Template ID, User ID (configuration)
  - Endpoint : `https://api.emailjs.com/api/v1.0/email/send`
- **Anti-spam** : reCAPTCHA v3 (Google)
- **Analytics** : Google Analytics 4 (opt-in via consentement cookies)

### Hébergement & Déploiement
- **Hébergement** : GitHub Pages
- **DNS** : Namecheap → GitHub Pages (CNAME configuré)
- **HTTPS** : Certificat automatique GitHub Pages
- **CI/CD** : GitHub Actions (build Angular → deploy gh-pages)
- **Domaine** : arbresdulauragais-elagage.fr (ou similaire)

### Outils de Développement
- **Package Manager** : npm ou yarn
- **Build Tool** : Angular CLI
- **Linter** : ESLint + Prettier
- **Version Control** : Git + GitHub
- **Testing** : Jasmine + Karma (tests unitaires)

### Performance & SEO
- **Images** : WebP/AVIF avec fallback, srcset responsive
- **Compression** : Gzip/Brotli (GitHub Pages automatique)
- **Minification** : Angular CLI production build
- **SEO** : Angular Universal (SSR) optionnel ou meta tags statiques
- **Lighthouse Score** : Objectif 90+ sur toutes métriques

### Librairies Tierces
```json
{
  "dependencies": {
    "@angular/core": "^17.0.0",
    "@angular/common": "^17.0.0",
    "@angular/forms": "^17.0.0",
    "@angular/router": "^17.0.0",
    "@angular/animations": "^17.0.0",
    "lucide-angular": "^0.x.x",
    "emailjs-com": "^3.x.x",
    "rxjs": "^7.x.x"
  },
  "devDependencies": {
    "@angular/cli": "^17.0.0",
    "typescript": "^5.x.x",
    "sass": "^1.x.x",
    "eslint": "^8.x.x",
    "prettier": "^3.x.x"
  }
}
```

---

## Authentication Process

### Aucune Authentification Utilisateur Nécessaire

**Raison** : Site vitrine public sans espace membre

### Sécurité Formulaire

#### Protection Anti-Spam
1. **reCAPTCHA v3** (Google)
   - Intégration invisible (pas de challenge utilisateur)
   - Score de confiance (0.0 à 1.0)
   - Seuil minimum : 0.5 pour validation
   - Clés : Site Key (public) + Secret Key (EmailJS backend)

2. **Honeypot Field** (optionnel, backup)
   - Champ caché CSS (`display: none`)
   - Si rempli → spam détecté → soumission bloquée

#### Validation Côté Client
- **Angular Reactive Forms Validators** :
  - Nom/Prénom : required, minLength(2), maxLength(50)
  - Email : required, email pattern
  - Téléphone : required, pattern français (10 chiffres)
  - Message : required, minLength(10), maxLength(1000)
  - Consentement RGPD : requiredTrue

#### Sécurité EmailJS
- **Clés API** : stockées dans `environment.ts` (pas commitées)
- **CORS** : EmailJS gère automatiquement
- **Rate Limiting** : 200 emails/mois (limite EmailJS gratuit)
- **Template EmailJS** : validation côté serveur EmailJS

### Configuration EmailJS
```typescript
// environment.ts (à ne pas committer)
export const environment = {
  production: false,
  emailjs: {
    serviceId: 'service_xxxxxxx',
    templateId: 'template_xxxxxxx',
    userId: 'user_xxxxxxxxxxxxxxxxxxxx'
  },
  recaptcha: {
    siteKey: '6Lc...'
  }
};
```

---

## Route Design

### Architecture de Routing

**Type** : Single Page Application (SPA) - Pas de routing Angular traditionnel

### Navigation par Ancres HTML

#### Structure des Sections
```html
<div id="accueil">...</div>      <!-- Hero -->
<div id="prestations">...</div>  <!-- Services -->
<div id="realisations">...</div> <!-- Portfolio -->
<div id="avis">...</div>         <!-- Reviews -->
<div id="contact">...</div>      <!-- Contact -->
```

#### Menu Navigation
```html
<nav>
  <a href="#accueil">Accueil</a>
  <a href="#prestations">Prestations</a>
  <a href="#realisations">Réalisations</a>
  <a href="#avis">Avis</a>
  <a href="#contact">Contact</a>
</nav>
```

### Gestion du Scroll

#### ScrollService (Angular)
```typescript
export class ScrollService {
  // Smooth scroll vers section
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  // Détection section active via IntersectionObserver
  observeSections(): Observable<string> {
    // Retourne l'ID de la section visible
  }
}
```

#### Comportements
- **Smooth scroll** : transition CSS `scroll-behavior: smooth`
- **Offset header sticky** : scroll ajusté pour hauteur du header (80px)
- **Deep linking** : support des URLs avec hash (`/#prestations`)
- **Scroll-to-top** : bouton flottant apparaît après 50vh

### URLs et SEO

#### Structure URL
- **Base** : `https://arbresdulauragais-elagage.fr/`
- **Avec ancre** : `https://arbresdulauragais-elagage.fr/#prestations`
- **Langue** : `https://arbresdulauragais-elagage.fr/?lang=en#contact`

#### Meta Tags Dynamiques
```typescript
// Mise à jour meta tags selon section active
updateMetaTags(section: string): void {
  this.meta.updateTag({
    property: 'og:url',
    content: `${baseUrl}#${section}`
  });
}
```

### Redirections
- **404** : Pas nécessaire (SPA one-page)
- **www → non-www** : Géré via DNS Namecheap
- **http → https** : Automatique GitHub Pages

---

## API Design

### Architecture API

**Type** : Consommation API tierce (EmailJS) - Pas d'API backend custom

### EmailJS API

#### Endpoint Principal
```
POST https://api.emailjs.com/api/v1.0/email/send
```

#### Request Format
```typescript
interface EmailRequest {
  service_id: string;    // Service EmailJS
  template_id: string;   // Template EmailJS
  user_id: string;       // Public Key EmailJS
  template_params: {     // Données du formulaire
    from_name: string;   // Nom + Prénom
    from_email: string;  // Email client
    phone: string;       // Téléphone
    message: string;     // Message
    to_name: string;     // "Andréo Luc" (fixe)
  };
  accessToken?: string;  // Private Key (optionnel)
}
```

#### Response Format
```typescript
// Success (200)
{
  status: 200,
  text: "OK"
}

// Error (4xx/5xx)
{
  status: 400,
  text: "The public key is required"
}
```

#### Service Angular (EmailService)
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  private emailjsUrl = 'https://api.emailjs.com/api/v1.0/email/send';

  constructor(private http: HttpClient) {}

  sendContactEmail(formData: ContactForm): Observable<any> {
    const emailData = {
      service_id: environment.emailjs.serviceId,
      template_id: environment.emailjs.templateId,
      user_id: environment.emailjs.userId,
      template_params: {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_name: 'Andréo Luc'
      }
    };

    return this.http.post(this.emailjsUrl, emailData);
  }
}
```

### Google APIs (Optionnels)

#### 1. reCAPTCHA v3
```
POST https://www.google.com/recaptcha/api/siteverify
```
**Paramètres** :
- `secret` : Secret Key
- `response` : Token client
- `remoteip` : IP utilisateur (optionnel)

**Intégration** : Via EmailJS ou validation côté client uniquement

#### 2. Google Reviews (Lecture seule)
```
GET https://maps.googleapis.com/maps/api/place/details/json?place_id={PLACE_ID}&fields=reviews,rating&key={API_KEY}
```
**Alternative** : Intégration widget Google Reviews officiel (iframe)

### Gestion des Erreurs

#### Stratégie
```typescript
sendContactEmail(formData: ContactForm): Observable<any> {
  return this.http.post(this.emailjsUrl, emailData).pipe(
    retry(2),  // 2 tentatives en cas d'échec réseau
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur est survenue';

      if (error.status === 0) {
        errorMessage = 'Problème de connexion internet';
      } else if (error.status === 400) {
        errorMessage = 'Données invalides';
      } else if (error.status >= 500) {
        errorMessage = 'Service temporairement indisponible';
      }

      return throwError(() => new Error(errorMessage));
    })
  );
}
```

#### Messages Utilisateur
- **Success** : "Votre message a été envoyé ! Je vous recontacte rapidement."
- **Error réseau** : "Problème de connexion. Vérifiez votre internet."
- **Error serveur** : "Service temporairement indisponible. Appelez-moi au 06 XX XX XX XX."
- **Error validation** : Messages spécifiques par champ (Angular Forms)

### Rate Limiting & Quotas

#### EmailJS (Plan Gratuit)
- **Limite** : 200 emails/mois
- **Throttling client** : 1 soumission max toutes les 30 secondes (même utilisateur)
- **Gestion dépassement** : Message "Quota atteint, appelez-moi directement"

#### Implementation Throttling
```typescript
private lastSubmitTime = 0;
private minInterval = 30000; // 30 secondes

canSubmit(): boolean {
  const now = Date.now();
  if (now - this.lastSubmitTime < this.minInterval) {
    return false;
  }
  this.lastSubmitTime = now;
  return true;
}
```

---

## Database Design ERD

### Architecture de Données

**Type** : Aucune base de données (stateless application)

### Raison
- Site vitrine one-page sans espace membre
- Formulaires → envoi email direct via EmailJS
- Pas de stockage de données utilisateur
- Pas de système de réservation/paiement
- Conformité RGPD simplifiée (pas de données persistées)

### Données Stockées Localement (Browser)

#### LocalStorage
```typescript
interface LocalStorageData {
  language: 'fr' | 'en';           // Préférence langue
  cookieConsent: boolean;          // Consentement cookies
  analyticsConsent: boolean;       // Consentement Google Analytics
}
```

**Durée de rétention** : Persistant (jusqu'à suppression navigateur)

#### SessionStorage
```typescript
interface SessionStorageData {
  formDraft?: {                    // Brouillon formulaire (optionnel)
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  };
}
```

**Durée de rétention** : Session navigateur uniquement

### Données Transitoires (Mémoire)

#### État Application (Services Angular)
```typescript
// NavigationService
{
  activeSection: string;           // Section courante
  menuOpen: boolean;               // Menu mobile ouvert/fermé
}

// I18nService
{
  currentLanguage: 'fr' | 'en';
  translations: Record<string, string>;
}

// UIService
{
  lightboxOpen: boolean;
  lightboxImageIndex: number;
  floatingModalOpen: boolean;
  scrollPosition: number;
}
```

### Flux de Données Formulaire

```
User Input (Form)
      ↓
Angular Reactive Form (mémoire)
      ↓
Validation
      ↓
EmailService.sendEmail()
      ↓
EmailJS API (HTTPS)
      ↓
Email envoyé à: contact@arbresdulauragais-elagage.fr
      ↓
Données supprimées (pas de persistance)
```

### Alternative Future : Base de Données (Si Évolution)

**Si besoin futur de stocker les demandes de devis** :

#### Option 1 : Firebase Firestore
```typescript
// Collection: contact_requests
interface ContactRequest {
  id: string;                      // Auto-généré
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Timestamp;
  status: 'new' | 'read' | 'replied';
  source: 'main_form' | 'floating_form';
}
```

#### Option 2 : Supabase (PostgreSQL)
```sql
CREATE TABLE contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'new',
  source VARCHAR(20) DEFAULT 'main_form'
);
```

**Avantages** :
- Historique des demandes
- Dashboard admin pour suivi
- Statistiques (nombre de demandes/mois)

**Inconvénients** :
- Complexité accrue
- Coûts supplémentaires
- Conformité RGPD plus stricte (DPO, registre, etc.)

### Recommandation Actuelle

**Rester sans BDD** pour :
- ✅ Simplicité maximale
- ✅ Zéro coût infrastructure
- ✅ Zéro maintenance
- ✅ RGPD simplifié (pas de données stockées)
- ✅ Performance optimale (statique)

**EmailJS suffit amplement** pour un site vitrine avec 10-50 demandes/mois

---

## Configuration & Déploiement

### Variables d'Environnement

#### environment.ts (Development)
```typescript
export const environment = {
  production: false,
  emailjs: {
    serviceId: 'service_xxxxxxx',
    templateId: 'template_xxxxxxx',
    userId: 'user_xxxxxxxxxxxxxxxxxxxx'
  },
  recaptcha: {
    siteKey: '6Lc...'
  },
  analytics: {
    trackingId: 'G-XXXXXXXXXX'
  },
  baseUrl: 'http://localhost:4200'
};
```

#### environment.prod.ts (Production)
```typescript
export const environment = {
  production: true,
  emailjs: {
    serviceId: 'service_prod_xxx',
    templateId: 'template_prod_xxx',
    userId: 'user_prod_xxx'
  },
  recaptcha: {
    siteKey: '6Lc_prod...'
  },
  analytics: {
    trackingId: 'G-PROD_XXX'
  },
  baseUrl: 'https://arbresdulauragais-elagage.fr'
};
```

### GitHub Actions CI/CD

#### .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Build Angular app
      run: npm run build -- --configuration production --base-href /

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist/al-elagage
        cname: arbresdulauragais-elagage.fr
```

### Commandes NPM

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "build:prod": "ng build --configuration production",
    "test": "ng test",
    "lint": "ng lint",
    "deploy": "ng build --configuration production && npx angular-cli-ghpages --dir=dist/al-elagage"
  }
}
```

---

**Document SRS finalisé et prêt pour implémentation !** 🚀
