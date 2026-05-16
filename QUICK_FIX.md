# ⚡ NEXUS - Démarrage rapide

## 🎯 Vous avez 3 choses à faire:

### 1️⃣ Installer les dépendances
```bash
npm install
```

### 2️⃣ Configurer Mailtrap
Vous avez déjà les credentials dans `.env` (déjà fournis) ✅

### 3️⃣ Lancer
```bash
npm run dev
```

Cela lancera:
- ✅ Backend sur http://localhost:3000
- ✅ Frontend sur http://localhost:5173

---

## 🧪 Tester

1. Allez sur **http://localhost:5173**
2. Entrez votre email dans la section CTA
3. Cliquez "Rejoindre"
4. Vérifiez Mailtrap pour l'email
5. Cliquez le lien → ✅ Authentifié!

---

## ❌ Si ça ne marche pas

### Le serveur ne démarre pas?
```bash
# Vérifiez que npm install a fonctionné
npm install

# Vérifiez que les dépendances sont installées
ls node_modules | grep express
```

### Les emails ne s'envoient pas?
```bash
# Testez la configuration Mailtrap
node test-mailtrap.js
```

### Port 3000 déjà utilisé?
Changez dans `.env`:
```
PORT=3001
```

### Autre erreur?
Vérifiez les logs du serveur pour voir le message d'erreur exact.

---

## 📁 Fichiers importants

- `server.js` - Backend
- `src/components/CTA.jsx` - Formulaire email
- `src/Verify.jsx` - Page de vérification
- `.env` - Configuration (déjà rempli)

---

**C'est tout!** Tapez `npm run dev` et ça devrait marcher 🚀
