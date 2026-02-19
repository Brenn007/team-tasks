<template>
  <div class="member-detail">
    <div v-if="member" class="profile">
      <div class="avatar">{{ member.prenom[0] }}{{ member.nom[0] }}</div>
      <h1>{{ member.prenom }} {{ member.nom }}</h1>
      <p class="role">{{ member.role }}</p>

      <h2>Tâches assignées ({{ memberTasks.length }})</h2>
      
      <div class="tasks-list">
        <TaskCard
          v-for="task in memberTasks"
          :key="task.id"
          :task="task"
          @update-status="updateStatus"
          @delete="deleteTask"
        />
        <p v-if="memberTasks.length === 0" class="empty">Aucune tâche assignée</p>
      </div>

      <RouterLink to="/members" class="btn-back">← Retour</RouterLink>
    </div>

    <div v-else class="not-found">
      <h1> Membre non trouvé</h1>
      <RouterLink to="/members" class="btn-back">← Retour à l'équipe</RouterLink>
    </div>
  </div>
</template>

<script setup>
//cette page affiche le profil detaille d'un membre et ses taches assignees
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useMembersStore } from '../stores/members'
import { useTasksStore } from '../stores/tasks'
import TaskCard from '../components/TaskCard.vue'

const route = useRoute() //permet d'acceder aux parametres de l'adresse (comme le numero du membre)
const membersStore = useMembersStore()
const tasksStore = useTasksStore()

//cette fonction trouve et retourne le membre dont le numero est dans l'adresse de la page
const member = computed(() => {
  return membersStore.getMemberById(route.params.id) //route.params.id contient le numero du membre
})

//cette fonction filtre et retourne uniquement les taches assignees a ce membre
const memberTasks = computed(() => {
  return tasksStore.tasksByMember(route.params.id)
})

//cette fonction permet de changer le statut d'une tache (ex: passer de "a faire" a "termine")
const updateStatus = async (id, statut) => {
  await tasksStore.updateStatus(id, statut)
}

//cette fonction supprime une tache quand on clique sur le bouton poubelle
const deleteTask = async (id) => {
  await tasksStore.deleteTask(id)
}

//au chargement de la page, on recupere les donnees necessaires
onMounted(() => {
  membersStore.fetchMembers()
  tasksStore.fetchTasks()
})
</script>

<style scoped>
.member-detail { padding: 30px; max-width: 800px; margin: 0 auto; }

.profile { text-align: center; }

.avatar {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 auto 20px;
}

h1 { margin: 0; color: #333; }

.role { color: #666; margin-bottom: 30px; }

h2 { text-align: left; color: #333; margin-bottom: 15px; }

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.empty { text-align: center; color: #999; }

.btn-back {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 12px 25px;
  border-radius: 5px;
  text-decoration: none;
}

.not-found { text-align: center; padding: 50px; }
</style>
