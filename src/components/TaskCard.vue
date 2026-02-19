<template>
  <div class="task-card" draggable="true" @dragstart="onDragStart" @dragend="onDragEnd">
    <!-- bande de couleur selon priorite -->
    <div class="card-labels">
      <span class="label" :class="priorityClass">{{ priorityLabel }}</span>
    </div>

    <!-- titre -->
    <h4>{{ task.titre }}</h4>

    <!-- description -->
    <p class="description">{{ task.description }}</p>

    <!-- footer avec infos -->
    <div class="card-footer">
      <div class="card-badges">
        <span class="badge" title="Commentaires">💬 0</span>
        <span class="badge" title="Pièces jointes">📎 0</span>
      </div>
      <div class="card-actions">
        <button @click="$emit('delete', task.id)" class="btn-delete" title="Supprimer">🗑️</button>
      </div>
    </div>

    <!-- avatar membre assigne -->
    <div class="card-member" v-if="memberName">
      <span class="member-avatar">{{ memberInitials }}</span>
    </div>
  </div>
</template>

<script setup>
//ce composant affiche une carte de tache comme sur Trello
//on peut la glisser-deposer entre les colonnes du tableau Kanban
import { computed } from 'vue'
import { useMembersStore } from '../stores/members'

//defineProps recoit les donnees de la tache a afficher depuis le composant parent
const props = defineProps({
  task: { type: Object, required: true }
})

//defineEmits permet d'envoyer des signaux au composant parent (suppression, changement de statut, etc)
const emit = defineEmits(['delete', 'update-status', 'drag-start', 'drag-end'])

const membersStore = useMembersStore()

//cette fonction trouve le membre qui est assigne a cette tache
const member = computed(() => {
  return membersStore.getMemberById(props.task.memberId)
})

//cette fonction retourne le nom complet du membre assigne (ex: "Jean Dupont")
const memberName = computed(() => {
  return member.value ? `${member.value.prenom} ${member.value.nom}` : ''
})

//cette fonction calcule les initiales du membre pour l'afficher dans le petit cercle avatar
const memberInitials = computed(() => {
  return member.value ? member.value.prenom[0] + member.value.nom[0] : ''
})

//cette fonction determine la couleur de l'etiquette selon le statut de la tache
//rouge pour "a faire", jaune pour "en cours", vert pour "termine"
const priorityClass = computed(() => {
  const priorities = {
    a_faire: 'priority-high',
    en_cours: 'priority-medium',
    termine: 'priority-low'
  }
  return priorities[props.task.statut]
})

//cette fonction traduit le code du statut en texte lisible pour l'utilisateur
const priorityLabel = computed(() => {
  const labels = {
    a_faire: 'À faire',
    en_cours: 'En cours',
    termine: 'Terminé'
  }
  return labels[props.task.statut]
})

//cette fonction s'active quand on commence a glisser la carte
//elle memorise le numero de la tache pour savoir laquelle on deplace
const onDragStart = (e) => {
  e.dataTransfer.setData('taskId', props.task.id) //stocke le numero de la tache
  e.target.classList.add('dragging') //ajoute un style visuel pour montrer qu'on deplace la carte
}

//cette fonction s'active quand on arrete de glisser la carte
//elle retire le style visuel de deplacement
const onDragEnd = (e) => {
  e.target.classList.remove('dragging')
}
</script>

<style scoped>
.task-card {
  background: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.1s;
  position: relative;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.task-card.dragging {
  opacity: 0.5;
  transform: rotate(3deg);
}

.card-labels {
  display: flex;
  gap: 5px;
  margin-bottom: 8px;
}

.label {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  color: white;
}

.priority-high { background: #eb5a46; }
.priority-medium { background: #f2d600; color: #333; }
.priority-low { background: #61bd4f; }

h4 {
  margin: 0 0 6px 0;
  font-size: 0.95rem;
  color: #172b4d;
  line-height: 1.3;
}

.description {
  color: #5e6c84;
  font-size: 0.85rem;
  margin: 0 0 10px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-badges {
  display: flex;
  gap: 10px;
}

.badge {
  font-size: 0.75rem;
  color: #5e6c84;
}

.card-actions {
  opacity: 0;
  transition: opacity 0.2s;
}

.task-card:hover .card-actions {
  opacity: 1;
}

.btn-delete {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 3px;
  border-radius: 3px;
}

.btn-delete:hover {
  background: #ffebe6;
}

.card-member {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.member-avatar {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #0079bf, #5067c5);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
}
</style>
