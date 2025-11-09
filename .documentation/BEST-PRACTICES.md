# Bonnes Pratiques - Arbres du Lauragais Élagage

## 🎯 Principes Généraux

### 1. Server-First Architecture
- **Par défaut** : tous les composants sont des Server Components
- **Client Components** : uniquement pour l'interactivité (hooks, événements, animations)
- Ajouter `'use client'` en première ligne si nécessaire

```typescript
// ✅ BON - Server Component (par défaut)
export default function Services() {
  return <div>...</div>;
}

// ✅ BON - Client Component (interactivité)
'use client';
import { useState } from 'react';

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  // ...
}
```

### 2. TypeScript Strict
- Typer toutes les props et fonctions
- Éviter `any` (utiliser `unknown` si nécessaire)
- Utiliser les types génériques pour la réutilisabilité

```typescript
// ✅ BON
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

// ❌ MAUVAIS
function Button(props: any) { }
```

### 3. Composition over Configuration
- Composants petits et focalisés
- Props simples et explicites
- Utiliser `children` pour la flexibilité

```typescript
// ✅ BON - Composable
<Card>
  <CardHeader>Titre</CardHeader>
  <CardContent>Contenu</CardContent>
</Card>

// ❌ MAUVAIS - Trop de props
<Card title="Titre" content="Contenu" showHeader showFooter />
```

## 🎨 Styling avec Tailwind

### 1. Utiliser la fonction `cn()`
```typescript
import { cn } from '@/lib/utils';

// ✅ BON - Fusion intelligente des classes
<div className={cn('base-class', condition && 'conditional-class', className)} />

// ❌ MAUVAIS - Concaténation manuelle
<div className={`base-class ${condition ? 'conditional-class' : ''} ${className}`} />
```

### 2. Classes Sémantiques
```typescript
// ✅ BON - Utiliser les couleurs du thème
<button className="bg-accent text-white hover:bg-accent/90" />

// ❌ MAUVAIS - Couleurs hardcodées
<button className="bg-[#2f8d4e] text-white hover:bg-[#268a42]" />
```

### 3. Responsive Mobile-First
```typescript
// ✅ BON - Mobile d'abord, puis desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />

// ❌ MAUVAIS - Desktop d'abord
<div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1" />
```

## 🔧 Composants

### 1. ForwardRef pour Composants UI
```typescript
// ✅ BON - Permet l'accès au DOM
const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <input ref={ref} {...props} />
);
Input.displayName = 'Input';
```

### 2. Props Destructuring
```typescript
// ✅ BON - Destructuration claire
export default function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  return <button className={cn(baseClass, className)} {...props}>{children}</button>;
}
```

### 3. Nommage Cohérent
- **Composants** : PascalCase (`Button`, `ContactForm`)
- **Fichiers** : PascalCase pour composants (`Button.tsx`)
- **Utilitaires** : camelCase (`utils.ts`, `scrollToSection`)
- **Constantes** : UPPER_SNAKE_CASE (`CONTACT_INFO`)

## 📝 Formulaires

### 1. React Hook Form + Zod
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/validations';

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    // Validation automatique avec Zod
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('email')} error={errors.email?.message} />
    </form>
  );
}
```

### 2. Validation Double (Client + Serveur)
```typescript
// Client - components/sections/Contact.tsx
const validatedData = contactSchema.parse(formData);

// Serveur - app/api/contact/route.ts
const validatedData = contactSchema.parse(await request.json());
```

## 🎭 Animations

### 1. Framer Motion pour Animations Complexes
```typescript
'use client';

import { motion } from 'framer-motion';

export default function FadeIn({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
```

### 2. CSS pour Animations Simples
```css
/* ✅ BON - GPU-accelerated */
.fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ❌ MAUVAIS - Non optimisé */
@keyframes fadeIn {
  from { opacity: 0; top: 20px; }
  to { opacity: 1; top: 0; }
}
```

### 3. Respect de prefers-reduced-motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## ♿ Accessibilité

### 1. Labels Explicites
```typescript
// ✅ BON
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ❌ MAUVAIS
<input type="email" placeholder="Email" />
```

### 2. ARIA Attributes
```typescript
// ✅ BON
<button aria-label="Fermer le menu" onClick={closeMenu}>
  <X />
</button>

// ❌ MAUVAIS
<button onClick={closeMenu}>
  <X />
</button>
```

### 3. Focus Visible
```typescript
// ✅ BON - Focus visible
<button className="focus-visible:ring-2 focus-visible:ring-accent" />

// ❌ MAUVAIS - Focus supprimé
<button className="outline-none" />
```

## 🚀 Performance

### 1. Images Optimisées
```typescript
import Image from 'next/image';

// ✅ BON - Optimisation automatique
<Image
  src="/images/hero.jpg"
  alt="Élagueur en action"
  width={1920}
  height={1080}
  priority // Pour hero image
/>

// ❌ MAUVAIS - Image non optimisée
<img src="/images/hero.jpg" alt="Élagueur" />
```

### 2. Dynamic Imports pour Code Splitting
```typescript
// ✅ BON - Chargement différé
import dynamic from 'next/dynamic';

const Lightbox = dynamic(() => import('@/components/ui/Lightbox'), {
  loading: () => <p>Chargement...</p>,
});
```

### 3. Éviter les Re-renders Inutiles
```typescript
// ✅ BON - Mémoisation
import { memo } from 'react';

const ServiceCard = memo(({ service }) => {
  return <Card>{service.title}</Card>;
});

// ✅ BON - useCallback pour fonctions
const handleClick = useCallback(() => {
  scrollToSection('contact');
}, []);
```

## 🔒 Sécurité

### 1. Variables d'Environnement
```typescript
// ✅ BON - Côté serveur uniquement
const apiKey = process.env.RESEND_API_KEY;

// ✅ BON - Côté client (préfixe NEXT_PUBLIC_)
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// ❌ MAUVAIS - Clé secrète côté client
const apiKey = process.env.RESEND_API_KEY; // dans un Client Component
```

### 2. Sanitization des Inputs
```typescript
// ✅ BON - Validation stricte
const schema = z.object({
  message: z.string().max(1000).trim(),
});

// ❌ MAUVAIS - Pas de validation
const message = formData.get('message');
await sendEmail(message); // Risque d'injection
```

### 3. Rate Limiting
```typescript
// app/api/contact/route.ts
export async function POST(request: NextRequest) {
  if (!checkRateLimit(request)) {
    return NextResponse.json(
      { error: 'Trop de requêtes' },
      { status: 429 }
    );
  }
  // ...
}
```

## 📦 Imports

### 1. Ordre des Imports
```typescript
// 1. Imports externes
import { useState } from 'react';
import { motion } from 'framer-motion';

// 2. Imports internes (@/)
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

// 3. Imports relatifs
import './styles.css';
```

### 2. Alias de Chemin
```typescript
// ✅ BON - Alias @/
import { Button } from '@/components/ui/Button';

// ❌ MAUVAIS - Chemins relatifs longs
import { Button } from '../../../components/ui/Button';
```

## 🧪 Testing (Futur)

### 1. Tests Unitaires (Vitest)
```typescript
import { render, screen } from '@testing-library/react';
import Button from '@/components/ui/Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### 2. Tests d'Accessibilité
```typescript
import { axe } from 'jest-axe';

test('button is accessible', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 📝 Commentaires

### 1. JSDoc pour Fonctions Publiques
```typescript
/**
 * Scroll doux vers une section avec offset
 * @param sectionId - ID de la section cible
 * @param offset - Offset en pixels (défaut: 80)
 */
export function scrollToSection(sectionId: string, offset = 80) {
  // ...
}
```

### 2. Commentaires Explicatifs
```typescript
// ✅ BON - Explique le "pourquoi"
// Offset de 80px pour compenser le header sticky
const offsetPosition = elementPosition + window.pageYOffset - 80;

// ❌ MAUVAIS - Répète le code
// Ajoute 80 à elementPosition
const offsetPosition = elementPosition + 80;
```

## 🔄 Git

### 1. Commits Sémantiques
```bash
# ✅ BON
feat: add contact form validation
fix: correct header sticky behavior
docs: update README with setup instructions

# ❌ MAUVAIS
update
fix bug
changes
```

### 2. Branches
```bash
# ✅ BON
feature/contact-form
fix/header-sticky
refactor/button-component

# ❌ MAUVAIS
my-branch
test
new-feature
```

## 📚 Ressources

- [Next.js Best Practices](https://nextjs.org/docs/app/building-your-application)
- [React Best Practices](https://react.dev/learn)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
