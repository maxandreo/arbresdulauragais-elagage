import { NextRequest } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// Map pour stocker les tentatives par IP
const rateLimitMap = new Map<string, RateLimitRecord>();

// Configuration
const RATE_LIMIT_WINDOW = 60000; // 1 minute en millisecondes
const MAX_REQUESTS = 3; // Maximum 3 requêtes par fenêtre

/**
 * Vérifie si une requête dépasse la limite de taux
 * @param request - NextRequest contenant l'IP du client
 * @returns true si la requête est autorisée, false si elle est bloquée
 */
export function checkRateLimit(request: NextRequest): boolean {
  // Obtenir l'IP du client
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous';
  const now = Date.now();

  // Nettoyer les anciennes entrées (toutes les 5 minutes)
  if (rateLimitMap.size > 1000) {
    cleanupOldEntries(now);
  }

  // Vérifier l'enregistrement existant
  const record = rateLimitMap.get(ip);

  // Pas d'enregistrement ou fenêtre expirée
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  // Limite atteinte
  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  // Incrémenter le compteur
  record.count++;
  return true;
}

/**
 * Nettoie les anciennes entrées de la map
 */
function cleanupOldEntries(now: number) {
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

/**
 * Obtient le temps restant avant de pouvoir réessayer (en secondes)
 */
export function getRateLimitResetTime(request: NextRequest): number {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous';
  const record = rateLimitMap.get(ip);

  if (!record) return 0;

  const now = Date.now();
  const timeLeft = Math.max(0, record.resetTime - now);
  return Math.ceil(timeLeft / 1000);
}
