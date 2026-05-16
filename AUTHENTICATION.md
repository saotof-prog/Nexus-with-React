# 🚀 Système d'Authentification par Email Magic Link - NEXUS

## Architecture

```
Frontend (React/Vite) ← → Backend (Express.js)
     ↓                        ↓
  Port 5173               Port 3000
  (email form)      (API + JWT verification)
                            ↓
                      SQLite Database
                   (users + tokens)
```

## ⚙️ Configuration

### 1. Variables d'environnement (.env)

```env
PORT=3000
JWT_SECRET=votre-clé-secrète-très-sécurisée

# Service SMTP pour envoyer les emails
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=votre-user-mailtrap
SMTP_PASSWORD=votre-password-mailtrap

FRONTEND_URL=http://localhost:5173
```

### 2. Obtenir des credentials Mailtrap (gratuit)

1. Aller sur https://mailtrap.io
2. S'inscrire (gratuit)
3. Créer une inbox
4. Copier les credentials SMTP
5. Mettre à jour le `.env`

## 🚀 Lancer l'application

### Option 1 : Les deux serveurs ensemble
```bash
npm run dev
```
Cela lance à la fois le backend (port 3000) et le frontend (port 5173)

### Option 2 : Séparément
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

## 📧 Flux d'authentification

### Étape 1 : L'utilisateur soumet son email
```
User → [Form CTA] → POST /api/auth/send-link
                    (email: "user@example.com")
```

### Étape 2 : Backend crée un token et envoie l'email
```
Backend:
1. Vérifie si l'utilisateur existe
2. Crée un nouvel utilisateur s'il n'existe pas
3. Génère un token de vérification (valable 24h)
4. Envoie un email avec un lien:
   http://localhost:5173/?token=XXXXX
```

### Étape 3 : L'utilisateur clique sur le lien dans l'email
```
User clicks email link
          ↓
GET http://localhost:5173/?token=XXXXX
          ↓
App détecte le token et affiche la page <Verify />
          ↓
Verify.jsx appelle GET /api/auth/verify/XXXXX
```

### Étape 4 : Vérification et création de session
```
Backend:
1. Valide le token
2. Marque l'utilisateur comme vérifié
3. Génère un JWT (valable 7 jours)
4. Retourne le JWT

Frontend:
1. Sauvegarde le JWT dans localStorage
2. Sauvegarde les infos user
3. Affiche la page de succès
```

## 📱 Routes API

### `POST /api/auth/send-link`
Envoie un lien de vérification par email

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Email de vérification envoyé",
  "email": "user@example.com"
}
```

**Errors:**
- 400 : Email invalide
- 500 : Erreur serveur

---

### `GET /api/auth/verify/:token`
Vérifie le token et crée la session

**URL:**
```
http://localhost:3000/api/auth/verify/abc123xyz
```

**Response (200):**
```json
{
  "success": true,
  "message": "Email vérifié avec succès",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Errors:**
- 401 : Token invalide ou expiré
- 500 : Erreur serveur

---

### `GET /api/health`
Vérifie que le serveur fonctionne

**Response (200):**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## 💾 Base de données (SQLite)

Deux tables sont créées automatiquement :

### Table `users`
```sql
id          INTEGER PRIMARY KEY
email       TEXT UNIQUE NOT NULL
verified    BOOLEAN (0 ou 1)
created_at  DATETIME
last_login  DATETIME
```

### Table `verification_tokens`
```sql
id         INTEGER PRIMARY KEY
user_id    INTEGER (FK → users.id)
token      TEXT UNIQUE NOT NULL
expires_at DATETIME
created_at DATETIME
```

## 🔒 Sécurité

✅ **Implémenté:**
- Tokens de vérification uniques et sécurisés (32 bytes de crypto aléatoire)
- Tokens avec expiration 24h
- JWT signé avec secret
- CORS configuré
- Validation d'email

⚠️ **À implémenter en production:**
- HTTPS obligatoire
- Rate limiting sur les endpoints d'auth
- Secret JWT plus robuste
- Chiffrement des mots de passe (bcryptjs installé mais non utilisé)
- CORS restrictif

## 🧪 Tester l'application

1. Accédez à http://localhost:5173
2. Remplissez le formulaire avec un email
3. Cliquez "Rejoindre"
4. Allez dans Mailtrap → votre inbox
5. Cliquez sur le lien de l'email
6. Vous êtes authentifié ! ✅

## 📁 Structure des fichiers

```
react-test/
├── server.js              ← Backend Express (tout en un)
├── .env                   ← Configuration (NE PAS COMMITTER)
├── nexus.db              ← Base de données SQLite (créée automatiquement)
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx           ← Route vers Verify si token
    ├── Verify.jsx        ← Page de vérification
    └── components/
        └── CTA.jsx       ← Formulaire qui envoie email au backend
```

## 🐛 Debugging

### Le serveur ne démarre pas?
```bash
# Vérifier que port 3000 est libre
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows
```

### Les emails ne s'envoient pas?
1. Vérifier les credentials Mailtrap dans `.env`
2. Vérifier les logs du serveur
3. Vérifier l'inbox de spam

### Token expiré?
Les tokens ont une validité de 24h. Après, l'utilisateur doit se réinscrire.

## 🎯 Prochaines étapes

- [ ] Ajouter un endpoint `GET /api/auth/me` pour vérifier la session actuelle
- [ ] Implémenter le refresh de JWT
- [ ] Ajouter un logout
- [ ] Protéger les routes frontend avec le JWT
- [ ] Ajouter un dashboard utilisateur
- [ ] Implémenter rate limiting
- [ ] Ajouter des logs améliorés
- [ ] Faire une vraie interface utilisateur après connexion
