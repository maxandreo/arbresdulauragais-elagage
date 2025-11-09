/**
 * Vérifie un token reCAPTCHA v3 avec l'API Google
 * @param token - Token reCAPTCHA généré côté client
 * @returns true si la vérification réussit avec un score >= 0.5
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY non configurée, vérification ignorée');
    return true; // En développement, on peut ignorer
  }

  if (!token) {
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    // Vérifier le succès et le score
    // Score reCAPTCHA v3 : 0.0 (bot) à 1.0 (humain)
    // On accepte >= 0.5
    if (data.success && data.score >= 0.5) {
      return true;
    }

    console.warn('reCAPTCHA échec:', {
      success: data.success,
      score: data.score,
      errors: data['error-codes'],
    });

    return false;
  } catch (error) {
    console.error('Erreur vérification reCAPTCHA:', error);
    // En cas d'erreur API, on peut choisir de laisser passer ou bloquer
    return false;
  }
}
