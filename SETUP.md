# 🚀 NEXUS - Système d'authentification par email magic link

Ce projet React/Vite inclut maintenant un système d'authentification complet basé sur les **magic links** (liens de vérification par email).

## ✨ Ce qui a été ajouté

### Backend (Express.js)
- ✅ `server.js` - Serveur avec Routes d'authentification
- ✅ SQLite database - Gestion des users et tokens
- ✅ Nodemailer - Envoi d'emails automatisé
- ✅ JWT - Création de tokens de session

### Frontend (React)
- ✅ `CTA.jsx` - Formulaire qui envoie l'email au serveur
- ✅ `Verify.jsx` - Page de confirmation après clic du lien
- ✅ `App.jsx` - Gestion du routage pour la vérification

### Configuration
- ✅ `.env` - Variables d'environnement
- ✅ `AUTHENTICATION.md` - Documentation complète
- ✅ `package.json` - Dépendances + scripts

## 🎯 Quickstart

### 1. Installer les dépendances (si pas déjà fait)
```bash
npm install
```

### 2. Configurer le serveur d'email

**Inscription gratuite sur Mailtrap:**
1. Aller sur https://mailtrap.io
2. S'inscrire
3. Créer une inbox
4. Copier les credentials SMTP

**Mettre à jour `.env`:**
```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=votre-user
SMTP_PASSWORD=votre-password
```

### 3. Lancer l'app
```bash
npm run dev
```

Cela lancera:
- Backend sur http://localhost:3000
- Frontend sur http://localhost:5173

### 4. Tester
1. Allez sur http://localhost:5173
2. Entrez votre email dans la section CTA
3. Cliquez "Rejoindre"
4. Vérifiez Mailtrap pour le lien
5. Cliquez le lien → Vous êtes authentifié! ✅

## 📋 Architecture

```
Frontend (React)                 Backend (Express)
     ↓                                 ↓
[CTA Form] → POST /api/auth/send-link → [Email Service]
                                          ↓
                                  [SQLite Database]
                                          ↓
[Verify Page] ← GET /api/auth/verify/:token ← [JWT Creation]
```

## 📚 Documentation complète

Voir `AUTHENTICATION.md` pour:
- Flux complet d'authentification
- Routes API détaillées
- Configuration de sécurité
- Structure de la base de données
- Debugging
- Prochaines étapes

## 🔧 Scripts disponibles

```bash
npm run dev        # Lance backend + frontend
npm run client     # Lance juste le frontend (port 5173)
npm run server     # Lance juste le backend (port 3000)
npm run build      # Build pour production
npm run lint       # Lint le code
npm run preview    # Prévisualise le build
```

## 📁 Fichiers clés

```
react-test/
├── server.js                 ← Backend complet
├── .env                      ← Configuration (à remplir)
├── .env.example              ← Modèle d'env
├── AUTHENTICATION.md         ← Doc complète
├── nexus.db                  ← Database (créée auto)
├── src/
│   ├── App.jsx               ← Gère les routes
│   ├── Verify.jsx            ← Page de vérification
│   └── components/
│       └── CTA.jsx           ← Formulaire email
└── package.json              ← Scripts + dépendances
```

## 🔒 Sécurité

✅ Implémenté:
- Tokens de vérification uniques et sécurisés
- Expiration de tokens (24h)
- JWT signé
- Validation d'email
- CORS configuré

⚠️ À implémenter en production:
- HTTPS
- Rate limiting
- Secret JWT robuste
- Logs d'audit

## ❓ FAQ

**Q: Où vont les emails?**
A: Mailtrap est une boîte mailbox de test. Tous les emails y vont. En production, utiliser un vrai service (SendGrid, AWS SES, etc.)

**Q: Peut-on utiliser un autre service d'email?**
A: Oui, modifier `server.js` ligne ~48 (configuration transporter Nodemailer)

**Q: Où est stockée la session?**
A: JWT dans localStorage après vérification du token

**Q: Peut-on récupérer les données de l'utilisateur connecté?**
A: Oui, elles sont dans localStorage après connexion

## 🎓 Prochain étape

Ajouter un endpoint pour récupérer l'utilisateur actuel:
```javascript
app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  // Vérifier et retourner l'utilisateur
});
```

---

**Besoin d'aide?** Voir `AUTHENTICATION.md` ou consulter les commentaires dans `server.js` et `src/components/CTA.jsx`
