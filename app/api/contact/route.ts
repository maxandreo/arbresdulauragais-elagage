import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { checkRateLimit, getRateLimitResetTime } from '@/lib/rate-limit';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { sendContactEmail, sendConfirmationEmail } from '@/lib/email';

/**
 * API Route pour le formulaire de contact
 * POST /api/contact
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting - Vérifier si l'utilisateur n'envoie pas trop de requêtes
    if (!checkRateLimit(request)) {
      const resetTime = getRateLimitResetTime(request);
      return NextResponse.json(
        {
          success: false,
          error: `Trop de requêtes. Veuillez réessayer dans ${resetTime} secondes.`,
        },
        { status: 429 }
      );
    }

    // 2. Parser le body de la requête
    const body = await request.json();

    // 3. Honeypot - Vérifier le champ caché (anti-spam)
    if (body.website) {
      console.log('🚫 Spam détecté via honeypot');
      // On retourne un succès pour ne pas alerter le bot
      return NextResponse.json({
        success: true,
        message: 'Message envoyé avec succès',
      });
    }

    // 4. reCAPTCHA v3 - Vérifier que c'est un humain
    if (body.recaptchaToken) {
      const isHuman = await verifyRecaptcha(body.recaptchaToken);
      if (!isHuman) {
        return NextResponse.json(
          {
            success: false,
            error: 'Vérification anti-spam échouée. Veuillez réessayer.',
          },
          { status: 403 }
        );
      }
    }

    // 5. Validation des données avec Zod
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));

      return NextResponse.json(
        {
          success: false,
          error: 'Données invalides',
          details: errors,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // 6. Envoi de l'email au propriétaire
    try {
      await sendContactEmail(validatedData);
    } catch (emailError) {
      console.error('Erreur envoi email principal:', emailError);
      return NextResponse.json(
        {
          success: false,
          error: "Erreur lors de l'envoi de l'email. Veuillez réessayer ou nous contacter directement par téléphone.",
        },
        { status: 500 }
      );
    }

    // 7. Envoi de l'email de confirmation au client (optionnel, ne bloque pas)
    try {
      await sendConfirmationEmail(validatedData);
    } catch (confirmError) {
      console.warn('Erreur envoi email confirmation (non bloquant):', confirmError);
      // On continue quand même
    }

    // 8. Succès !
    return NextResponse.json({
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les 24h.',
    });
  } catch (error) {
    console.error('Erreur API contact:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur serveur interne. Veuillez réessayer plus tard.',
      },
      { status: 500 }
    );
  }
}

/**
 * Méthode GET non autorisée
 */
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'Méthode non autorisée. Utilisez POST.',
    },
    { status: 405 }
  );
}
