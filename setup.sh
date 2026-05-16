#!/bin/bash
# Script de setup rapide pour NEXUS auth

echo "🚀 Configuration du système d'authentification NEXUS"
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

echo "✅ Node.js trouvé: $(node --version)"
echo ""

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

echo ""
echo "⚙️  Configuration requise:"
echo ""
echo "1️⃣  S'inscrire sur Mailtrap (gratuit): https://mailtrap.io"
echo "2️⃣  Créer une inbox et obtenir les credentials SMTP"
echo "3️⃣  Remplir le fichier .env:"
echo ""
echo "   SMTP_HOST=sandbox.smtp.mailtrap.io"
echo "   SMTP_PORT=2525"
echo "   SMTP_USER=votre-user-mailtrap"
echo "   SMTP_PASSWORD=votre-password-mailtrap"
echo ""
echo "4️⃣  Lancer l'application:"
echo ""
echo "   npm run dev"
echo ""
echo "✅ C'est prêt! Allez sur http://localhost:5173"
echo ""
