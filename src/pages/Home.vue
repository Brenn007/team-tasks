<template>
  <div class="dashboard">
    <!-- header -->
    <div class="dashboard-header">
      <h1>Bienvenue sur TeamTasks</h1>
      <p>Gérez vos projets comme un pro</p>
    </div>

    <!-- stats cards -->
    <div class="stats-grid">
      <div class="stat-card members">
        <div class="stat-icon">🧑🏾‍🤝‍🧑🏽</div>
        <div class="stat-info">
          <span class="stat-number">{{ membersStore.membersCount }}</span>
          <span class="stat-label">Membres</span>
        </div>
      </div>

      <div class="stat-card tasks">
        <div class="stat-icon">📆</div>
        <div class="stat-info">
          <span class="stat-number">{{ tasksStore.tasksCount }}</span>
          <span class="stat-label">Tâches totales</span>
        </div>
      </div>

      <div class="stat-card completed">
        <div class="stat-icon">✔</div>
        <div class="stat-info">
          <span class="stat-number">{{ tasksStore.completedTasks.length }}</span>
          <span class="stat-label">Terminées</span>
        </div>
      </div>

      <div class="stat-card pending">
        <div class="stat-icon">⏱</div>
        <div class="stat-info">
          <span class="stat-number">{{ tasksStore.pendingTasks.length }}</span>
          <span class="stat-label">En cours</span>
        </div>
      </div>
    </div>

    <!-- progress bar -->
    <div class="progress-section">
      <h3>Progression globale</h3>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <span class="progress-text">{{ progressPercent }}% complété</span>
    </div>

    <!-- quick actions -->
    <div class="quick-actions">
      <h3>Accès rapide</h3>
      <div class="actions-grid">
        <RouterLink to="/tasks" class="action-card blue">
          <span class="action-icon">📌</span>
          <span class="action-title">Tableau Kanban</span>
          <span class="action-desc">Gérer les tâches</span>
        </RouterLink>

        <RouterLink to="/members" class="action-card purple">
          <span class="action-icon">🧑🏾‍🤝‍🧑🏽</span>
          <span class="action-title">Équipe</span>
          <span class="action-desc">Voir les membres</span>
        </RouterLink>
      </div>
    </div>

    <!-- recent tasks -->
    <div class="recent-section">
      <h3>Tâches récentes</h3>
      <div class="recent-tasks">
        <div v-for="task in recentTasks" :key="task.id" class="recent-task">
          <span class="task-status" :class="task.statut"></span>
          <span class="task-title">{{ task.titre }}</span>
          <span class="task-badge">{{ getStatusLabel(task.statut) }}</span>
        </div>
        <p v-if="recentTasks.length === 0" class="no-tasks">Aucune tâche récente</p>
      </div>
    </div>
  </div>
</template>

<script setup>
//cette page est le tableau de bord principal qui affiche un resume du projet
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useMembersStore } from '../stores/members'
import { useTasksStore } from '../stores/tasks'

//on recupere les magasins de donnees pour acceder aux membres et aux taches
const membersStore = useMembersStore()
const tasksStore = useTasksStore()

//cette fonction calcule automatiquement le pourcentage de taches terminees
//exemple: si 3 taches sur 10 sont terminees, ca retourne 30
const progressPercent = computed(() => {
  if (tasksStore.tasksCount === 0) return 0 //evite la division par zero
  return Math.round((tasksStore.completedTasks.length / tasksStore.tasksCount) * 100)
})

//cette fonction retourne les 5 taches les plus recentes pour les afficher
const recentTasks = computed(() => {
  return tasksStore.tasks.slice(0, 5) //prend les 5 premieres taches de la liste
})

//cette fonction traduit le code du statut en texte lisible pour l'utilisateur
const getStatusLabel = (statut) => {
  const labels = { a_faire: 'À faire', en_cours: 'En cours', termine: 'Terminé' }
  return labels[statut]
}

//onMounted s'execute quand la page se charge - on va chercher les donnees
onMounted(() => {
  membersStore.fetchMembers() //charge la liste des membres
  tasksStore.fetchTasks()     //charge la liste des taches
})
</script>

<style scoped>
.dashboard {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 40px;
}

.dashboard-header h1 {
  color: white;
  font-size: 2rem;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.dashboard-header p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
}

/* stats grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #172b4d;
}

.stat-label {
  color: #5e6c84;
  font-size: 0.9rem;
}

/* progress section */
.progress-section {
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.progress-section h3 {
  margin: 0 0 15px 0;
  color: #172b4d;
}

.progress-bar {
  height: 20px;
  background: #ebecf0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #61bd4f, #4bce97);
  border-radius: 10px;
  transition: width 0.5s ease;
}

.progress-text {
  color: #5e6c84;
  font-size: 0.9rem;
}

/* quick actions */
.quick-actions {
  margin-bottom: 30px;
}

.quick-actions h3 {
  color: white;
  margin-bottom: 15px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.action-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  border-left: 5px solid;
}

.action-card:hover {
  transform: translateY(-5px);
}

.action-card.blue { border-left-color: #0079bf; }
.action-card.purple { border-left-color: #5067c5; }

.action-icon { font-size: 2rem; }

.action-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #172b4d;
}

.action-desc {
  color: #5e6c84;
  font-size: 0.9rem;
}

/* recent tasks */
.recent-section {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.recent-section h3 {
  margin: 0 0 20px 0;
  color: #172b4d;
}

.recent-tasks {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recent-task {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f4f5f7;
  border-radius: 8px;
}

.task-status {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.task-status.a_faire { background: #eb5a46; }
.task-status.en_cours { background: #f2d600; }
.task-status.termine { background: #61bd4f; }

.task-title {
  flex: 1;
  color: #172b4d;
  font-weight: 500;
}

.task-badge {
  background: #ebecf0;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #5e6c84;
}

.no-tasks {
  text-align: center;
  color: #5e6c84;
  padding: 20px;
}
</style>
