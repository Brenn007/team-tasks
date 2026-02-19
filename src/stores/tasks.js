//ce fichier gere le "magasin" des taches - c'est l'endroit central ou on stocke toutes les taches du projet
import { defineStore } from 'pinia'
import { api } from '../api'

//defineStore cree un espace de stockage partage pour les donnees des taches
export const useTasksStore = defineStore('tasks', {
  //state contient les donnees actuelles
  state: () => ({
    tasks: [],        //liste de toutes les taches du projet
    loading: false,   //indique si on charge des donnees
    error: null       //message d'erreur eventuel
  }),

  //getters sont des calculs automatiques
  getters: {
    //compte le nombre total de taches
    tasksCount: (state) => state.tasks.length,

    //filtre et retourne uniquement les taches terminees
    completedTasks: (state) => state.tasks.filter(t => t.statut === 'termine'),

    //filtre et retourne les taches qui ne sont pas encore terminees
    pendingTasks: (state) => state.tasks.filter(t => t.statut !== 'termine'),

    //retourne les taches filtrees par un statut specifique (a_faire, en_cours, termine)
    tasksByStatus: (state) => (statut) => {
      if (!statut) return state.tasks //si pas de filtre, retourne toutes les taches
      return state.tasks.filter(t => t.statut === statut)
    },

    //retourne toutes les taches assignees a un membre specifique
    tasksByMember: (state) => (memberId) => {
      return state.tasks.filter(t => t.memberId === parseInt(memberId))
    }
  },

  //actions sont les fonctions qui modifient les donnees
  actions: {
    //cette fonction recupere toutes les taches depuis la base de donnees
    async fetchTasks() {
      this.loading = true
      this.error = null
      try {
        this.tasks = await api.getTasks() //demande la liste des taches a l'API
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    //cette fonction cree une nouvelle tache dans le projet
    async addTask(task) {
      this.error = null
      try {
        const newTask = await api.addTask(task) //envoie la nouvelle tache a l'API
        this.tasks.push(newTask) //ajoute la tache a la liste locale
        return true
      } catch (e) {
        this.error = e.message
        return false
      }
    },

    //cette fonction modifie le statut d'une tache (ex: passer de "a faire" a "en cours")
    async updateStatus(id, statut) {
      this.error = null
      try {
        await api.updateTaskStatus(id, statut) //envoie le nouveau statut a l'API
        const task = this.tasks.find(t => t.id === parseInt(id)) //trouve la tache dans la liste locale
        if (task) task.statut = statut //met a jour le statut localement
        return true
      } catch (e) {
        this.error = e.message
        return false
      }
    },

    //cette fonction supprime definitivement une tache
    async deleteTask(id) {
      this.error = null
      try {
        await api.deleteTask(id) //demande la suppression a l'API
        this.tasks = this.tasks.filter(t => t.id !== parseInt(id)) //retire la tache de la liste locale
        return true
      } catch (e) {
        this.error = e.message
        return false
      }
    }
  }
})
