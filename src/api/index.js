//API mockee
//cette partie simule une fausse base de donnees et une fausse connexion internet
//c'est comme si on faisait semblant de parler a un serveur distant

//donnees initiales des membres (la liste des personnes de l'equipe)
const membersData = [
  { id: 1, nom: 'NEDJARI', prenom: 'Ryan', role: 'Développeur', avatar: '' },
  { id: 2, nom: 'ADAMI', prenom: 'Josué', role: 'Designer', avatar: '' },
  { id: 3, nom: 'FONTANA', prenom: 'Alexan', role: 'Chef de projet', avatar: '' }
]

//donnees initiales des taches (la liste des choses a faire)
const tasksData = [
  { id: 1, titre: 'Créer la maquette', description: 'Design Figma', statut: 'termine', memberId: 2 },
  { id: 2, titre: 'Développer le frontend', description: 'Vue.js + Pinia', statut: 'en_cours', memberId: 1 },
  { id: 3, titre: 'Réunion client', description: 'Présentation du projet', statut: 'a_faire', memberId: 3 }
]

//cette fonction fait attendre le programme pendant un certain temps (simule le temps de reponse d'internet)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

//cette fonction simule parfois une erreur de connexion (comme quand internet bug)
const maybeError = (shouldFail = false) => {
  if (shouldFail || Math.random() < 0.1) {
    throw new Error('Erreur réseau - Veuillez réessayer')
  }
}

//cet objet contient toutes les fonctions pour communiquer avec la fausse base de donnees
export const api = {
  //cette fonction recupere la liste complete de tous les membres de l'equipe
  async getMembers() {
    await delay(500) //attend 500 millisecondes pour simuler le temps de chargement
    maybeError() //verifie si une erreur doit se produire
    return [...membersData] //retourne une copie de la liste des membres
  },

  //cette fonction cherche et retourne un seul membre grace a son numero d'identification
  async getMemberById(id) {
    await delay(300)
    maybeError()
    return membersData.find(m => m.id === parseInt(id)) || null //cherche le membre ou retourne rien
  },

  //cette fonction ajoute une nouvelle personne dans l'equipe
  async addMember(member) {
    await delay(400)
    maybeError()
    const newMember = { ...member, id: Date.now() } //cree le membre avec un numero unique base sur l'heure actuelle
    membersData.push(newMember) //ajoute le membre a la liste
    return newMember
  },

  //cette fonction retire un membre de l'equipe definitivement
  async deleteMember(id) {
    await delay(300)
    maybeError()
    const index = membersData.findIndex(m => m.id === parseInt(id)) //trouve la position du membre dans la liste
    if (index > -1) {
      membersData.splice(index, 1) //retire le membre de la liste
      return true //confirme que la suppression a reussi
    }
    return false //indique que le membre n'a pas ete trouve
  },

  //cette fonction recupere la liste complete de toutes les taches
  async getTasks() {
    await delay(500)
    maybeError()
    return [...tasksData]
  },

  //cette fonction recupere uniquement les taches assignees a un membre specifique
  async getTasksByMember(memberId) {
    await delay(400)
    maybeError()
    return tasksData.filter(t => t.memberId === parseInt(memberId)) //filtre les taches par membre
  },

  //cette fonction cree une nouvelle tache dans le projet
  async addTask(task) {
    await delay(400)
    maybeError()
    const newTask = { ...task, id: Date.now() } //cree la tache avec un numero unique
    tasksData.push(newTask) //ajoute la tache a la liste
    return newTask
  },

  //cette fonction change l'etat d'avancement d'une tache (a faire, en cours, termine)
  async updateTaskStatus(id, statut) {
    await delay(300)
    maybeError()
    const task = tasksData.find(t => t.id === parseInt(id)) //trouve la tache
    if (task) {
      task.statut = statut //modifie son statut
      return task
    }
    return null
  },

  //cette fonction supprime definitivement une tache du projet
  async deleteTask(id) {
    await delay(300)
    maybeError()
    const index = tasksData.findIndex(t => t.id === parseInt(id))
    if (index > -1) {
      tasksData.splice(index, 1)
      return true
    }
    return false
  }
}
