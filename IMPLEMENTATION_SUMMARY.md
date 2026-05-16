# 📧 NEXUS - Système d'Authentification par Email Magic Link

## ✅ Implémentation complète

Vous avez maintenant un système d'authentification par **email magic link** entièrement fonctionnel!

### Qu'est-ce qui a été créé?

```
🎨 Frontend (React/Vite)
├── src/components/CTA.jsx      → Formulaire qui envoie l'email
├── src/Verify.jsx              → Page de vérification du token
├── src/App.jsx                 → Gère le routage
└── public/                      → Assets

⚙️ Backend (Express.js)
├── server.js                   → Toute la logique serveur
│   ├── Routes d'authentification
│   ├── Service d'email (Nodemailer)
│   └── Database SQLite
├── .env                        → Configuration secrète
└── nexus.db                    → Base de données (créée auto)

📚 Documentation
├── SETUP.md                    → Quickstart guide
├── AUTHENTICATION.md           → Doc technique complète
└── README.md                   → Original project README
```

## 🎯 Flux utilisateur

```
1. Utilisateur visite http://localhost:5173
   ↓
2. Voit la page d'accueil NEXUS avec un formulaire
   ↓
3. Entre son email et clique "Rejoindre"
   ↓
4. Email de vérification envoyé (via Mailtrap)
   ↓
5. Clique sur le lien dans l'email
   ↓
6. Page de confirmation s'affiche
   ↓
7. Token JWT sauvegardé dans localStorage ✅
```

## 🔄 Flux technique

```
Frontend                          Backend
  │                                │
  ├─ POST /api/auth/send-link ─→  │
  │  (email: "user@example.com")  │
  │                            ┌───┴─────────────────┐
  │                            │ 1. Cherche l'user   │
  │                            │ 2. Crée s'il existe │
  │                            │ 3. Génère token     │
  │                            │ 4. Envoie email     │
  │                            │ 5. Répond OK        │
  │  ← Réponse (success)       │
  │                                │
  │  [Utilisateur clique le lien]  │
  │                                │
  ├─ GET /api/auth/verify/:token ─→  │
  │                            ┌───┴──────────────────┐
  │                            │ 1. Valide le token   │
  │                            │ 2. Marque vérifié    │
  │                            │ 3. Génère JWT        │
  │                            │ 4. Supprime le token │
  │  ← JWT token (7 jours)      │
  │                                │
  ├─ localStorage.setItem('authToken', jwt)
  ├─ localStorage.setItem('user', data)
  │
  └─ ✅ Utilisateur authentifié!
```

## 🚀 Démarrer

### Prérequis
- Node.js 16+ installé
- Compte Mailtrap (gratuit) → https://mailtrap.io

### Installation complète

```bash
# 1. Cloner/télécharger le projet
cd react-test

# 2. Installer les dépendances
npm install

# 3. Configurer Mailtrap
#    - S'inscrire sur https://mailtrap.io
#    - Créer une inbox
#    - Copier les credentials
#    - Mettre à jour .env

# 4. Lancer
npm run dev
```

### Accès
- **Frontend** : http://localhost:5173
- **Backend** : http://localhost:3000
- **API Health** : http://localhost:3000/api/health

## 📧 Configuration Email

### Fichier `.env`
```env
# Backend
PORT=3000
JWT_SECRET=your-super-secret-key-change-in-production

# Service SMTP (Mailtrap)
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-user
SMTP_PASSWORD=your-mailtrap-password

# Frontend
FRONTEND_URL=http://localhost:5173
```

### Créer un compte Mailtrap (gratuit)

1. Allez sur https://mailtrap.io
2. Inscrivez-vous (gratuit)
3. Créez une inbox
4. Allez dans "Integrations" → "Nodemailer"
5. Copiez le host, port, username, password
6. Mettez à jour le `.env`

## 🔐 Sécurité

✅ **Implémenté:**
- Tokens uniques et sécurisés (32 bytes aléatoires)
- Expiration des tokens (24h)
- JWT signé et validé
- Validation d'email
- CORS configuré
- Base de données SQLite locale

⚠️ **À améliorer en production:**
- Changer JWT_SECRET
- Activer HTTPS
- Ajouter rate limiting
- Logs d'audit
- Monitoring
- Backup de la DB

## 📱 Endpoints API

### `POST /api/auth/send-link`
Envoie un lien de vérification

```bash
curl -X POST http://localhost:3000/api/auth/send-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### `GET /api/auth/verify/:token`
Vérifie le token

```bash
curl http://localhost:3000/api/auth/verify/abc123xyz
```

### `GET /api/health`
Vérifie que le serveur fonctionne

```bash
curl http://localhost:3000/api/health
```

## 💾 Base de données

### Tables créées automatiquement

**Table `users`:**
- `id` - ID unique
- `email` - Email de l'utilisateur (unique)
- `verified` - Booléen (0 ou 1)
- `created_at` - Date de création
- `last_login` - Dernière connexion

**Table `verification_tokens`:**
- `id` - ID unique
- `user_id` - ID de l'utilisateur
- `token` - Token de vérification
- `expires_at` - Expiration
- `created_at` - Date de création

## 🧪 Test en local

1. Ouvrez http://localhost:5173 dans le navigateur
2. Scrollez jusqu'à la section "Prêt à franchir le seuil ?"
3. Entrez votre email dans le champ
4. Cliquez "Rejoindre"
5. Vous verrez un message de succès
6. Allez dans Mailtrap → votre inbox
7. Cliquez sur le lien dans l'email
8. Vous êtes authentifié! ✅

## 📚 Documentation

- **SETUP.md** → Quickstart rapide
- **AUTHENTICATION.md** → Documentation technique détaillée
- **README.md** → Documentation originale du projet

## 🔧 Scripts npm

```bash
npm run dev        # Lance backend + frontend (recommended)
npm run client     # Lance juste le frontend (port 5173)
npm run server     # Lance juste le backend (port 3000)
npm run build      # Build pour production
npm run lint       # Lint le code
npm run preview    # Prévisualise le build
```

## 🎓 Prochaines étapes

### Niveau 1 - Basique
- [ ] Ajouter endpoint `GET /api/auth/me` (récupérer user)
- [ ] Ajouter endpoint `POST /api/auth/logout`
- [ ] Persister le user dans localStorage après login

### Niveau 2 - Intermediate
- [ ] Ajouter rate limiting sur les endpoints
- [ ] Implémenter refresh tokens
- [ ] Ajouter une page utilisateur protégée
- [ ] Logging amélioré

### Niveau 3 - Production
- [ ] Migrer vers une vrai DB (PostgreSQL)
- [ ] Ajouter encryption pour les données sensibles
- [ ] Monitoring et alertes
- [ ] Load balancing
- [ ] Backup automatique

## ❓ Problèmes courants

**Q: Les emails ne s'envoient pas?**
A: Vérifiez les credentials Mailtrap dans `.env`

**Q: Port 3000 déjà en utilisation?**
A: Changez `PORT=3000` en `PORT=3001` dans `.env`

**Q: Impossible de connecter le frontend au backend?**
A: Vérifiez que les deux serveurs tournent (vérifiez les logs)

**Q: Token expiré?**
A: Les tokens sont valides 24h. Réinscrire l'utilisateur.

## 🎉 Bravo!

Vous avez un système d'authentification moderne et sécurisé! 

**Prochaines étapes:**
1. Personnaliser le email template
2. Ajouter plus d'endpoints API
3. Créer une interface utilisateur après login
4. Déployer en production

---

**Questions?** Consultez les fichiers de documentation ou les commentaires dans le code.

**Besoin d'aide?** Tous les fichiers sont commentés et documentés.
