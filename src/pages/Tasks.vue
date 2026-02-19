<template>
  <div class="board-container">
    <!-- header du board -->
    <div class="board-header">
      <h1>📆 Tableau des tâches</h1>
      <div class="board-actions">
        <button @click="showForm = !showForm" class="btn-add-task">
          + Ajouter une tâche
        </button>
      </div>
    </div>

    <!-- message d'erreur -->
    <ErrorMessage :message="tasksStore.error" @retry="tasksStore.fetchTasks()" />

    <!-- formulaire modal -->
    <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Nouvelle tâche</h3>
          <button @click="showForm = false" class="btn-close">✕</button>
        </div>
        <TaskForm :members="membersStore.members" @submit="addTask" />
      </div>
    </div>

    <!-- colonnes Kanban -->
    <div class="board">
      <!-- colonne a faire -->
      <div 
        class="column"
        @dragover.prevent
        @drop="onDrop($event, 'a_faire')"
      >
        <div class="column-header a_faire">
          <span class="column-title">📝 À faire</span>
          <span class="column-count">{{ todoTasks.length }}</span>
        </div>
        <div class="column-content">
          <TaskCard
            v-for="task in todoTasks"
            :key="task.id"
            :task="task"
            @delete="deleteTask"
          />
          <button class="btn-add-card" @click="showForm = true">
            + Ajouter une carte
          </button>
        </div>
      </div>

      <!-- colonne en cours -->
      <div 
        class="column"
        @dragover.prevent
        @drop="onDrop($event, 'en_cours')"
      >
        <div class="column-header en_cours">
          <span class="column-title">⏱ En cours</span>
          <span class="column-count">{{ inProgressTasks.length }}</span>
        </div>
        <div class="column-content">
          <TaskCard
            v-for="task in inProgressTasks"
            :key="task.id"
            :task="task"
            @delete="deleteTask"
          />
          <button class="btn-add-card" @click="showForm = true">
            + Ajouter une carte
          </button>
        </div>
      </div>

      <!-- colonne termine -->
      <div 
        class="column"
        @dragover.prevent
        @drop="onDrop($event, 'termine')"
      >
        <div class="column-header termine">
          <span class="column-title">✔ Terminé</span>
          <span class="column-count">{{ doneTasks.length }}</span>
        </div>
        <div class="column-content">
          <TaskCard
            v-for="task in doneTasks"
            :key="task.id"
            :task="task"
            @delete="deleteTask"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//cette page affiche le tableau Kanban avec les colonnes de taches
import { ref, computed, onMounted } from 'vue'
import { useTasksStore } from '../stores/tasks'
import { useMembersStore } from '../stores/members'
import TaskCard from '../components/TaskCard.vue'
import TaskForm from '../components/TaskForm.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

//on recupere les magasins de donnees
const tasksStore = useTasksStore()
const membersStore = useMembersStore()
const showForm = ref(false) //controle l'affichage du formulaire (true = visible, false = cache)

//ces trois fonctions filtrent les taches par colonne pour les afficher au bon endroit
const todoTasks = computed(() => tasksStore.tasksByStatus('a_faire'))       //taches a faire
const inProgressTasks = computed(() => tasksStore.tasksByStatus('en_cours')) //taches en cours
const doneTasks = computed(() => tasksStore.tasksByStatus('termine'))        //taches terminees

//cette fonction ajoute une nouvelle tache et ferme le formulaire
const addTask = async (task) => {
  await tasksStore.addTask(task) //envoie la tache au magasin
  showForm.value = false         //ferme le formulaire
}

//cette fonction supprime une tache quand on clique sur le bouton poubelle
const deleteTask = async (id) => {
  await tasksStore.deleteTask(id)
}

//cette fonction gere le "glisser-deposer" des cartes entre les colonnes
//quand on lache une carte dans une colonne, elle change de statut
const onDrop = async (event, newStatus) => {
  const taskId = event.dataTransfer.getData('taskId') //recupere le numero de la tache deplacee
  if (taskId) {
    //mise a jour locale immediate pour que l'utilisateur voit le changement tout de suite
    const task = tasksStore.tasks.find(t => t.id === parseInt(taskId))
    if (task) {
      task.statut = newStatus //change le statut localement
    }
    //puis on synchronise avec la base de donnees
    await tasksStore.updateStatus(parseInt(taskId), newStatus)
  }
}

//au chargement de la page, on recupere toutes les donnees
onMounted(() => {
  tasksStore.fetchTasks()
  membersStore.fetchMembers()
})
</script>

<style scoped>
.board-container {
  padding: 20px;
  height: calc(100vh - 50px);
  overflow-x: auto;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.board-header h1 {
  color: white;
  font-size: 1.4rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.btn-add-task {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.btn-add-task:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Modal */
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

/* board Kanban */
.board {
  display: flex;
  gap: 15px;
  height: calc(100% - 80px);
  overflow-x: auto;
  padding-bottom: 10px;
}

.column {
  background: #ebecf0;
  border-radius: 10px;
  min-width: 300px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

.column-header {
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px 10px 0 0;
}

.column-header.a_faire { background: linear-gradient(135deg, #eb5a46, #c9372c); }
.column-header.en_cours { background: linear-gradient(135deg, #f2d600, #e2b203); }
.column-header.termine { background: linear-gradient(135deg, #61bd4f, #4bce97); }

.column-title {
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.column-count {
  background: rgba(255, 255, 255, 0.3);
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: bold;
}

.column-content {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  flex: 1;
}

.btn-add-card {
  background: none;
  border: none;
  color: #5e6c84;
  padding: 10px;
  text-align: left;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.btn-add-card:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #172b4d;
}
</style>
