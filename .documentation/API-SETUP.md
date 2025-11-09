# Configuration API - Guide Complet

## 🎯 Vue d'ensemble

Ce guide vous explique comment configurer les services externes nécessaires pour le formulaire de contact.

---

## 📧 Resend (Service Email)

### 1. Créer un compte Resend

1. Aller sur [resend.com](https://resend.com)
2. Créer un compte gratuit (3000 emails/mois)
3. Vérifier votre email

### 2. Ajouter votre domaine

1. Dans le dashboard Resend, aller dans **Domains**
2. Cliquer sur **Add Domain**
3. Entrer votre domaine : `arbresdulauragais-elagage.fr`
4. Suivre les instructions pour configurer les DNS

#### Configuration DNS (Namecheap)

Ajouter ces enregistrements DNS dans Namecheap :

```
Type: TXT
Host: @
Value: [Valeur fournie par Resend pour vérification]

Type: TXT
Host: resend._domainkey
Value: [Clé DKIM fournie par Resend]

Type: MX
Host: @
Priority: 10
Value: feedback-smtp.eu-west-1.amazonses.com
```

**Note** : Attendre 24-48h pour la propagation DNS

### 3. Créer une API Key

1. Dans Resend, aller dans **API Keys**
2. Cliquer sur **Create API Key**
3. Nom : "Production Site Web"
4. Permission : **Sending access**
5. Copier la clé (elle ne sera affichée qu'une fois !)

### 4. Configurer les variables d'environnement

Dans votre fichier `.env.local` :

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=votre.email@exemple.com
```

**Important** : Remplacer `CONTACT_EMAIL` par l'email où vous voulez recevoir les messages.

---

## 🛡️ reCAPTCHA v3 (Anti-spam)

### 1. Créer un site reCAPTCHA

1. Aller sur [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Se connecter avec un compte Google
3. Cliquer sur **+** pour créer un nouveau site

### 2. Configuration du site

**Libellé** : Arbres du Lauragais Élagage

**Type de reCAPTCHA** : reCAPTCHA v3

**Domaines** :
- `localhost` (pour développement)
- `arbresdulauragais-elagage.fr` (production)

**Propriétaires** : Votre email Google

Accepter les conditions et cliquer sur **Envoyer**

### 3. Récupérer les clés

Vous obtiendrez deux clés :

- **Clé du site** (publique) : `6Lc_xxxxxxxxxxxxxxxxxxxxxx`
- **Clé secrète** (privée) : `6Lc_yyyyyyyyyyyyyyyyyyyyyy`

### 4. Configurer les variables d'environnement

Dans votre fichier `.env.local` :

```bash
RECAPTCHA_SECRET_KEY=6Lc_yyyyyyyyyyyyyyyyyyyyyy
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc_xxxxxxxxxxxxxxxxxxxxxx
```

**Note** : `NEXT_PUBLIC_` rend la variable accessible côté client.

---

## 🔧 Configuration Complète

### Fichier `.env.local` complet

```bash
# Resend (Email Service)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=andreo.luc@exemple.com

# reCAPTCHA v3
RECAPTCHA_SECRET_KEY=6Lc_yyyyyyyyyyyyyyyyyyyyyy
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc_xxxxxxxxxxxxxxxxxxxxxx

# Google Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Fichier `.env.production` (Vercel)

Même contenu que `.env.local` mais avec :
- `NEXT_PUBLIC_BASE_URL=https://arbresdulauragais-elagage.fr`
- Les vraies clés de production

---

## 🧪 Tester en Développement

### 1. Sans Resend (mode développement)

Si vous n'avez pas encore configuré Resend, le formulaire fonctionnera quand même mais les emails ne seront pas envoyés. Les logs dans la console vous indiqueront ce qui se passe.

### 2. Avec Resend (mode test)

1. Configurer les variables d'environnement
2. Redémarrer le serveur : `pnpm dev`
3. Remplir le formulaire de contact
4. Vérifier les logs dans le terminal
5. Vérifier la réception de l'email

### 3. Tester reCAPTCHA

reCAPTCHA v3 est invisible pour l'utilisateur. Pour tester :

1. Remplir le formulaire normalement
2. Si le score est < 0.5, la soumission sera bloquée
3. Vérifier les logs dans la console du navigateur

---

## 🚀 Déploiement sur Vercel

### 1. Configurer les variables d'environnement

Dans le dashboard Vercel :

1. Aller dans **Settings** → **Environment Variables**
2. Ajouter toutes les variables :

```
RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL = andreo.luc@exemple.com
RECAPTCHA_SECRET_KEY = 6Lc_yyyyyyyyyyyyyyyyyyyyyy
NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 6Lc_xxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_BASE_URL = https://arbresdulauragais-elagage.fr
```

3. Sélectionner **Production**, **Preview**, et **Development**
4. Cliquer sur **Save**

### 2. Redéployer

1. Push sur GitHub
2. Vercel redéploiera automatiquement
3. Les nouvelles variables seront prises en compte

---

## 🔍 Vérification

### Checklist de vérification

- [ ] Compte Resend créé
- [ ] Domaine ajouté et vérifié dans Resend
- [ ] DNS configurés (MX, TXT, DKIM)
- [ ] API Key Resend créée
- [ ] Site reCAPTCHA créé
- [ ] Clés reCAPTCHA récupérées
- [ ] Variables d'environnement configurées
- [ ] Serveur redémarré
- [ ] Formulaire testé en local
- [ ] Email reçu avec succès
- [ ] Variables configurées sur Vercel
- [ ] Site déployé en production
- [ ] Formulaire testé en production

---

## 🐛 Dépannage

### Problème : "RESEND_API_KEY is not defined"

**Solution** :
1. Vérifier que `.env.local` existe
2. Vérifier que la clé est bien définie
3. Redémarrer le serveur : `pnpm dev`

### Problème : "Domain not verified"

**Solution** :
1. Vérifier les enregistrements DNS dans Namecheap
2. Attendre 24-48h pour la propagation
3. Utiliser un outil comme [dnschecker.org](https://dnschecker.org) pour vérifier

### Problème : "reCAPTCHA verification failed"

**Solutions** :
1. Vérifier que le domaine est bien ajouté dans reCAPTCHA
2. Vérifier que `localhost` est autorisé pour le développement
3. Vérifier que les clés sont correctes
4. Vider le cache du navigateur

### Problème : "Rate limit exceeded"

**Solution** :
- Attendre 1 minute entre chaque soumission
- En développement, vous pouvez modifier `MAX_REQUESTS` dans `lib/rate-limit.ts`

### Problème : Email non reçu

**Solutions** :
1. Vérifier les logs du serveur
2. Vérifier le dossier spam
3. Vérifier que `CONTACT_EMAIL` est correct
4. Vérifier le dashboard Resend pour les erreurs

---

## 📊 Monitoring

### Resend Dashboard

- **Emails** : Voir tous les emails envoyés
- **Logs** : Voir les erreurs d'envoi
- **Analytics** : Statistiques d'envoi

### Logs Serveur

Les logs importants sont affichés dans le terminal :

```bash
# Succès
✅ Email envoyé avec succès

# Erreur
❌ Erreur envoi email: [détails]

# Spam détecté
🚫 Spam détecté via honeypot

# Rate limit
⏱️ Rate limit atteint pour IP: xxx.xxx.xxx.xxx
```

---

## 💡 Conseils

### Sécurité

- ✅ Ne jamais commiter les fichiers `.env*`
- ✅ Utiliser des clés différentes pour dev et prod
- ✅ Régénérer les clés si elles sont exposées
- ✅ Monitorer les logs pour détecter les abus

### Performance

- ✅ Rate limiting activé (3 req/min)
- ✅ Honeypot pour bloquer les bots simples
- ✅ reCAPTCHA v3 pour les bots avancés
- ✅ Validation stricte des données

### UX

- ✅ Messages d'erreur clairs
- ✅ Email de confirmation au client
- ✅ Toast notifications
- ✅ Loading state sur le bouton

---

## 📞 Support

### Resend
- Documentation : [resend.com/docs](https://resend.com/docs)
- Support : support@resend.com

### reCAPTCHA
- Documentation : [developers.google.com/recaptcha](https://developers.google.com/recaptcha)
- Forum : [Google reCAPTCHA Forum](https://groups.google.com/forum/#!forum/recaptcha)

---

**Configuration terminée !** 🎉

Une fois tout configuré, votre formulaire de contact sera pleinement fonctionnel avec :
- ✅ Envoi d'emails via Resend
- ✅ Protection anti-spam (honeypot + reCAPTCHA)
- ✅ Rate limiting
- ✅ Validation des données
- ✅ Emails de confirmation

**Bon déploiement !** 🚀
