## Stack technique

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19, TypeScript, Tailwind CSS 4
- Int�gration Odoo (catalogue produits)
- Tests : Vitest + Playwright

## Pr�requis

- Node.js 20+
- npm

## Installation

```bash
git clone https://github.com/Moh-hamdaoui/Projet-PAP-BIO.git
cd Projet-PAP-BIO
npm install
```

## Configuration

Créer un fichier `.env` :

```env
ODOO_URL=https://votre-instance.odoo.com/
ODOO_DB=nom-de-la-base
ODOO_LOGIN=votre-email@exemple.com
ODOO_API_KEY=votre-cle-api
```

## Lancement

```bash
# Développement (http://localhost:3000)
npm run dev

# Build de production
npm run build
npm start
```

## Tests

```bash
# Tests unitaires et d'intégration
npm run test

# Tests end-to-end
npm run test:e2e
```

## Structure du projet

```
app/           # Pages et routes Next.js
components/    # Composants React réutilisables
lib/           # Logique métier (auth, panier, produits, Odoo)
data/          # Données statiques (JSON)
public/        # Images et assets
tests/         # Tests e2e Playwright
```

## Scripts disponibles

| Commande          | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Serveur de développement       |
| `npm run build`   | Build de production            |
| `npm run start`   | Serveur de production          |
| `npm run lint`    | Vérification ESLint            |
| `npm run test`    | Tests Vitest                   |
| `npm run test:e2e`| Tests Playwright               |

## Déploiement

Le projet est connecté à Vercel via l'intégration Git : chaque push déclenche un déploiement automatique (Preview pour les branches, Production pour `main`).
