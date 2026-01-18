import { Resend } from 'resend';
import { ContactFormData } from './validations';

// Fonction pour obtenir l'instance Resend (lazy initialization)
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY non configurée');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Envoie un email de notification au propriétaire
 */
export async function sendContactEmail(data: ContactFormData) {
  const { firstName, lastName, email, phone, message } = data;

  try {
    const resend = getResendClient();
    const { data: result, error } = await resend.emails.send({
      from: 'Contact Site <contact@arbresdulauragais-elagage.fr>',
      to: process.env.CONTACT_EMAIL || 'andreo.luc@example.com',
      reply_to: email,
      subject: `Nouveau message de ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #1a1a1a;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #184e28 0%, #2f8d4e 100%);
                color: white;
                padding: 30px;
                border-radius: 12px 12px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                background: #f8f7f4;
                padding: 30px;
                border-radius: 0 0 12px 12px;
              }
              .field {
                margin-bottom: 20px;
                background: white;
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid #2f8d4e;
              }
              .label {
                font-weight: 600;
                color: #184e28;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .value {
                color: #1a1a1a;
                font-size: 16px;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #2f8d4e;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                color: #6b7280;
                font-size: 12px;
              }
              .cta-button {
                display: inline-block;
                background: #2f8d4e;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🌳 Nouveau message depuis le site</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Arbres du Lauragais Élagage</p>
            </div>

            <div class="content">
              <div class="field">
                <div class="label">Nom complet</div>
                <div class="value">${firstName} ${lastName}</div>
              </div>

              <div class="field">
                <div class="label">Email</div>
                <div class="value">
                  <a href="mailto:${email}" style="color: #2f8d4e; text-decoration: none;">
                    ${email}
                  </a>
                </div>
              </div>

              <div class="field">
                <div class="label">Téléphone</div>
                <div class="value">
                  <a href="tel:${phone}" style="color: #2f8d4e; text-decoration: none;">
                    ${phone}
                  </a>
                </div>
              </div>

              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message}</div>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}" class="cta-button">
                  Répondre à ${firstName}
                </a>
              </div>
            </div>

            <div class="footer">
              <p>Ce message a été envoyé depuis le formulaire de contact de votre site web.</p>
              <p>© ${new Date().getFullYear()} Arbres du Lauragais Élagage</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      throw error;
    }

    return { success: true, id: result?.id };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    throw error;
  }
}

/**
 * Envoie un email de confirmation au client
 */
export async function sendConfirmationEmail(data: ContactFormData) {
  const { firstName, email } = data;

  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: 'Arbres du Lauragais <contact@arbresdulauragais-elagage.fr>',
      to: email,
      subject: 'Confirmation de réception - Arbres du Lauragais Élagage',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #1a1a1a;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #184e28 0%, #2f8d4e 100%);
                color: white;
                padding: 40px 30px;
                border-radius: 12px 12px 0 0;
                text-align: center;
              }
              .content {
                background: #f8f7f4;
                padding: 30px;
                border-radius: 0 0 12px 12px;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
                color: #6b7280;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">✅ Message bien reçu !</h1>
            </div>

            <div class="content">
              <p style="font-size: 18px; margin-top: 0;">
                Bonjour <strong>${firstName}</strong>,
              </p>

              <div class="message-box">
                <p>
                  Merci de votre intérêt pour mes services d'élagage et d'entretien d'arbres.
                </p>
                <p>
                  J'ai bien reçu votre message et je m'engage à vous répondre dans les <strong>24 heures</strong>.
                </p>
                <p>
                  En attendant, n'hésitez pas à me contacter directement par téléphone si votre demande est urgente.
                </p>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #184e28; margin-top: 0;">📞 Mes coordonnées</h3>
                <p style="margin: 5px 0;">
                  <strong>Téléphone :</strong> 06 XX XX XX XX
                </p>
                <p style="margin: 5px 0;">
                  <strong>Email :</strong> contact@arbresdulauragais-elagage.fr
                </p>
                <p style="margin: 5px 0;">
                  <strong>Zone :</strong> Toulouse, Carcassonne, Castres, Revel et alentours
                </p>
              </div>

              <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
                Cordialement,<br>
                <strong style="color: #184e28;">Andréo Luc</strong><br>
                Arbres du Lauragais Élagage
              </p>
            </div>

            <div class="footer">
              <p>© ${new Date().getFullYear()} Arbres du Lauragais Élagage - Tous droits réservés</p>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Erreur envoi email confirmation:', error);
    // On ne throw pas l'erreur car l'email principal est plus important
    return { success: false };
  }
}
