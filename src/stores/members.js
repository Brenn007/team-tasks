//ce fichier gere le "magasin" des membres - c'est l'endroit central ou on stocke les informations de l'equipe
import { defineStore } from 'pinia'
import { api } from '../api'

//defineStore cree un espace de stockage partage pour les donnees des membres
export const useMembersStore = defineStore('members', {
  //state contient les donnees actuelles (comme des variables globales)
  state: () => ({
    members: [],      //liste des membres de l'equipe (vide au depart)
    loading: false,   //indique si on est en train de charger des donnees (true = chargement en cours)
    error: null       //contient le message d'erreur si quelque chose ne va pas
  }),

  //getters sont des calculs automatiques bases sur les donnees (comme des formules Excel)
  getters: {
    //cette fonction compte et retourne le nombre total de membres dans l'equipe
    membersCount: (state) => state.members.length,

    //cette fonction permet de chercher un membre specifique par son numero d'identification
    getMemberById: (state) => (id) => {
      return state.members.find(m => m.id === parseInt(id)) //parcourt la liste et retourne le membre trouve
    }
  },

  //actions sont les fonctions qui modifient les donnees (les boutons d'action)
  actions: {
    //cette fonction va chercher tous les membres depuis la base de donnees et les stocke
    async fetchMembers() {
      this.loading = true //active l'indicateur de chargement
      this.error = null //efface les anciennes erreurs
      try {
        this.members = await api.getMembers() //demande la liste des membres a l'API
      } catch (e) {
        this.error = e.message //si erreur, on sauvegarde le message d'erreur
      } finally {
        this.loading = false //desactive l'indicateur de chargement dans tous les cas
      }
    },

    //cette fonction ajoute un nouveau membre a l'equipe
    async addMember(member) {
      this.error = null
      try {
        const newMember = await api.addMember(member) //envoie le nouveau membre a l'API
        this.members.push(newMember) //ajoute le membre a la liste locale
        return true //retourne vrai si tout s'est bien passe
      } catch (e) {
        this.error = e.message
        return false //retourne faux si une erreur s'est produite
      }
    },

    //cette fonction supprime un membre de l'equipe
    async deleteMember(id) {
      this.error = null
      try {
        await api.deleteMember(id) //demande la suppression a l'API
        this.members = this.members.filter(m => m.id !== parseInt(id)) //retire le membre de la liste locale
        return true
      } catch (e) {
        this.error = e.message
        return false
      }
    }
  }
})
