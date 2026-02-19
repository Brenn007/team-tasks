//ce fichier est le point d'entree de l'application - c'est ici que tout demarre

import { createApp } from 'vue' //importe la fonction pour creer une application Vue
import { createPinia } from 'pinia' //importe Pinia qui gere les donnees partagees (les magasins)
import App from './App.vue' //importe le composant principal de l'application
import router from './router' //importe le systeme de navigation entre les pages

//createApp cree l'application Vue avec le composant principal App
const app = createApp(App)

//app.use ajoute des fonctionnalites a l'application
app.use(createPinia()) //active Pinia pour gerer les donnees partagees (membres, taches)
app.use(router)        //active le routeur pour naviguer entre les pages

//app.mount attache l'application a l'element HTML avec l'id "app" dans index.html
//c'est a ce moment que l'application devient visible sur la page web
app.mount('#app')
