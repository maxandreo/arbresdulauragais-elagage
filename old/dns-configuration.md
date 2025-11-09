# Configuration DNS pour arbresdulauragais-elagage.fr

Ce document contient les enregistrements DNS à configurer chez Namecheap pour que votre domaine fonctionne avec GitHub Pages.

## Étapes de configuration

1. Connectez-vous à votre compte Namecheap
2. Allez dans "Domain List"
3. Trouvez `arbresdulauragais-elagage.fr`
4. Cliquez sur "Manage"
5. Allez dans l'onglet "Advanced DNS"
6. Supprimez tous les enregistrements A et CNAME existants
7. Ajoutez les enregistrements suivants :

## Enregistrements A

Ajoutez ces 4 enregistrements A :

```
Type: A Record
Host: @
Value: 185.199.108.153
TTL: Automatic
```

```
Type: A Record
Host: @
Value: 185.199.109.153
TTL: Automatic
```

```
Type: A Record
Host: @
Value: 185.199.110.153
TTL: Automatic
```

```
Type: A Record
Host: @
Value: 185.199.111.153
TTL: Automatic
```

## Enregistrement CNAME

Ajoutez cet enregistrement CNAME :

```
Type: CNAME Record
Host: www
Value: arbresdulauragais-elagage.github.io.
TTL: Automatic
```

## Vérification

1. Vérifiez que le mode DNS est sur "Namecheap BasicDNS" :
   - Dans l'onglet "Domain"
   - Sous "NAMESERVERS"
   - Sélectionnez "Namecheap BasicDNS"

2. Attendez la propagation DNS (peut prendre jusqu'à 48h, généralement quelques minutes)

3. Retournez sur GitHub :
   - Allez dans Settings > Pages
   - Entrez votre domaine : `arbresdulauragais-elagage.fr`
   - Cliquez sur Save
   - Cochez "Enforce HTTPS" une fois que les DNS seront propagés
