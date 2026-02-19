//ce fichier gere la navigation entre les differentes pages de l'application
//c'est comme un GPS qui dit quelle page afficher selon l'adresse dans la barre du navigateur

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Tasks from '../pages/Tasks.vue'
import Members from '../pages/Members.vue'
import MemberDetail from '../pages/MemberDetail.vue'

//cette liste definit toutes les pages disponibles et leurs adresses
const routes = [
  { path: '/', name: 'Home', component: Home },                      //page d'accueil a l'adresse racine /
  { path: '/tasks', name: 'Tasks', component: Tasks },               //page des taches a l'adresse /tasks
  { path: '/members', name: 'Members', component: Members },         //page de l'equipe a l'adresse /members
  { path: '/members/:id', name: 'MemberDetail', component: MemberDetail } //page detail d'un membre avec son numero
]

//createRouter cree le systeme de navigation avec l'historique du navigateur
const router = createRouter({
  history: createWebHistory(), //permet d'utiliser les boutons precedent/suivant du navigateur
  routes //la liste des pages definies ci-dessus
})

export default router //exporte le routeur pour l'utiliser dans l'application
