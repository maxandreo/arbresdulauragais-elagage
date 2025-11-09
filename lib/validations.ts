import { z } from 'zod';

/**
 * Schéma de validation pour le formulaire de contact
 */
export const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom est trop long')
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/, 'Le prénom ne doit contenir que des lettres'),
  lastName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom est trop long')
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/, 'Le nom ne doit contenir que des lettres'),
  email: z
    .string()
    .email('Email invalide')
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .regex(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      'Numéro de téléphone français invalide'
    ),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(1000, 'Le message est trop long'),
  consent: z
    .boolean()
    .refine((val) => val === true, 'Vous devez accepter la politique de confidentialité'),
  website: z.string().optional(), // Honeypot field
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Messages d'erreur personnalisés
 */
export const ERROR_MESSAGES = {
  required: 'Ce champ est requis',
  invalidEmail: 'Email invalide',
  invalidPhone: 'Numéro de téléphone invalide',
  tooShort: 'Le texte est trop court',
  tooLong: 'Le texte est trop long',
  consentRequired: 'Vous devez accepter la politique de confidentialité',
} as const;
