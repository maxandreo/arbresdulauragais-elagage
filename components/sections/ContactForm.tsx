'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/validations';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

interface ContactFormProps {
  onSuccess?: () => void;
  isCompact?: boolean;
}

export default function ContactForm({ onSuccess, isCompact = false }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // TODO: Implémenter l'appel API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      // Simulation pour le moment
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('Message envoyé avec succès !', {
        description: 'Nous vous répondrons dans les plus brefs délais.',
      });

      reset();
      onSuccess?.();
    } catch (error) {
      toast.error('Erreur lors de l\'envoi', {
        description: 'Veuillez réessayer plus tard.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Honeypot field (caché) */}
      <input
        type="text"
        {...register('website')}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Nom et Prénom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Prénom"
          type="text"
          placeholder="Jean"
          error={errors.firstName?.message}
          required
          {...register('firstName')}
        />
        <Input
          label="Nom"
          type="text"
          placeholder="Dupont"
          error={errors.lastName?.message}
          required
          {...register('lastName')}
        />
      </div>

      {/* Email et Téléphone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="jean.dupont@exemple.fr"
          error={errors.email?.message}
          required
          {...register('email')}
        />
        <Input
          label="Téléphone"
          type="tel"
          placeholder="06 12 34 56 78"
          error={errors.phone?.message}
          required
          {...register('phone')}
        />
      </div>

      {/* Message */}
      <Textarea
        label="Message"
        placeholder="Décrivez votre projet d'élagage..."
        rows={isCompact ? 4 : 6}
        error={errors.message?.message}
        required
        {...register('message')}
      />

      {/* Consentement RGPD */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          className="mt-1 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
          {...register('consent')}
        />
        <label htmlFor="consent" className="text-sm text-text-secondary">
          J'accepte que mes données soient utilisées pour me recontacter concernant ma demande.
          {errors.consent && (
            <span className="block text-red-500 mt-1">{errors.consent.message}</span>
          )}
        </label>
      </div>

      {/* Bouton Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
      </Button>

      {/* Info */}
      {!isCompact && (
        <p className="text-xs text-center text-text-secondary">
          Nous nous engageons à vous répondre sous 24h
        </p>
      )}
    </form>
  );
}
