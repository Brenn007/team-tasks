<template>
  <div class="members-page">
    <div class="page-header">
      <h1>🧑🏾‍🤝‍🧑🏽 Équipe</h1>
      <button @click="showForm = !showForm" class="btn-add">
        + Ajouter un membre
      </button>
    </div>

    <ErrorMessage :message="membersStore.error" @retry="membersStore.fetchMembers()" />

    <!-- modal formulaire -->
    <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Nouveau membre</h3>
          <button @click="showForm = false" class="btn-close">✕</button>
        </div>
        <form @submit.prevent="addMember" class="member-form">
          <div class="form-group">
            <label>Prénom</label>
            <input v-model="form.prenom" type="text" required placeholder="Ex: Jean" />
          </div>
          <div class="form-group">
            <label>Nom</label>
            <input v-model="form.nom" type="text" required placeholder="Ex: Dupont" />
          </div>
          <div class="form-group">
            <label>Rôle</label>
            <input v-model="form.role" type="text" required placeholder="Ex: Développeur" />
          </div>
          <button type="submit" class="btn-submit">Ajouter</button>
        </form>
      </div>
    </div>

    <!-- grille des membres -->
    <div class="members-grid">
      <div v-for="member in membersStore.members" :key="member.id" class="member-card">
        <div class="member-avatar">
          {{ member.prenom[0] }}{{ member.nom[0] }}
        </div>
        <div class="member-info">
          <h3>{{ member.prenom }} {{ member.nom }}</h3>
          <p class="role">{{ member.role }}</p>
          <p class="tasks-count">
            📋 {{ getTasksCount(member.id) }} tâches assignées
          </p>
        </div>
        <div class="member-actions">
          <RouterLink :to="`/members/${member.id}`" class="btn-view">Voir</RouterLink>
          <button @click="deleteMember(member.id)" class="btn-delete">🗑️</button>
        </div>
      </div>
    </div>

    <p v-if="membersStore.loading" class="loading">Chargement...</p>
    <p v-if="!membersStore.loading && membersStore.members.length === 0" class="empty">
      Aucun membre dans l'équipe
    </p>
  </div>
</template>

<script setup>
//cette page affiche la liste de tous les membres de l'equipe avec leurs informations
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useMembersStore } from '../stores/members'
import { useTasksStore } from '../stores/tasks'
import ErrorMessage from '../components/ErrorMessage.vue'

//on recupere les magasins de donnees
const membersStore = useMembersStore()
const tasksStore = useTasksStore()
const showForm = ref(false) //controle l'affichage du formulaire d'ajout
const form = ref({ prenom: '', nom: '', role: '', avatar: '' }) //donnees du formulaire

//cette fonction compte combien de taches sont assignees a un membre specifique
const getTasksCount = (memberId) => {
  return tasksStore.tasksByMember(memberId).length
}

//cette fonction ajoute un nouveau membre a l'equipe
const addMember = async () => {
  const success = await membersStore.addMember(form.value) //envoie les donnees au magasin
  if (success) {
    form.value = { prenom: '', nom: '', role: '', avatar: '' } //vide le formulaire
    showForm.value = false //ferme la fenetre du formulaire
  }
}

//cette fonction supprime definitivement un membre de l'equipe
const deleteMember = async (id) => {
  await membersStore.deleteMember(id)
}

//au chargement de la page, on recupere les donnees des membres et des taches
onMounted(() => {
  membersStore.fetchMembers()
  tasksStore.fetchTasks()
})
</script>

<style scoped>
.members-page {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-header h1 {
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.btn-add {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.btn-add:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 { margin: 0; color: #172b4d; }

.btn-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #6b778c;
}

.member-form { padding: 20px; }

.form-group { margin-bottom: 15px; }

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #172b4d;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 2px solid #dfe1e6;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #0079bf;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background: #0079bf;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-submit:hover {
  background: #026aa7;
}

/* grille membres */
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.member-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.member-card:hover {
  transform: translateY(-3px);
}

.member-avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #0079bf, #5067c5);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: bold;
  flex-shrink: 0;
}

.member-info { flex: 1; }

.member-info h3 {
  margin: 0 0 5px 0;
  color: #172b4d;
}

.role {
  color: #5e6c84;
  margin: 0 0 5px 0;
}

.tasks-count {
  color: #0079bf;
  font-size: 0.85rem;
  margin: 0;
}

.member-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-view {
  background: #0079bf;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  font-size: 0.9rem;
}

.btn-view:hover { background: #026aa7; }

.btn-delete {
  background: none;
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-delete:hover {
  background: #ffebe6;
  border-color: #eb5a46;
}

.loading, .empty {
  text-align: center;
  color: white;
  padding: 40px;
}
</style>
