📋 TeamTasks
Application de gestion de tâches d'équipe inspirée de Trello, développée avec Vue.js 3.

🎯 Fonctionnalités
Tableau Kanban : Organisez vos tâches en 3 colonnes (À faire, En cours, Terminé)
Drag & Drop : Déplacez les tâches d'une colonne à l'autre
Gestion d'équipe : Ajoutez des membres et assignez-leur des tâches
Dashboard : Visualisez les statistiques et la progression globale
Persistance : Les données sont sauvegardées automatiquement (LocalStorage)

📁 Structure du Projet
src/
├── api/                 # API mockée
│   └── index.js
├── components/          # Composants réutilisables
│   ├── ErrorMessage.vue
│   ├── MemberCard.vue
│   ├── TaskCard.vue
│   └── TaskForm.vue
├── pages/               # Pages de l'application
│   ├── Home.vue
│   ├── Members.vue
│   ├── MemberDetail.vue
│   └── Tasks.vue
├── stores/              # Stores Pinia
│   ├── members.js
│   └── tasks.js
├── router/              # Configuration des routes
│   └── index.js
├── App.vue
└── main.js

🚀 Installation
bash# Cloner le repository
git clone https://github.com/brenn007/team-tasks.git

# Accéder au dossier
cd team-tasks

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

L'application sera accessible sur http://localhost:5173
