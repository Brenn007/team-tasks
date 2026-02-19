<template>
  <div class="member-card">
    <div class="avatar">{{ initiales }}</div>
    <div class="info">
      <h3>{{ member.prenom }} {{ member.nom }}</h3>
      <p>{{ member.role }}</p>
    </div>
    <div class="actions">
      <RouterLink :to="`/members/${member.id}`" class="btn-view">Voir</RouterLink>
      <button @click="$emit('delete', member.id)" class="btn-delete">🗑️</button>
    </div>
  </div>
</template>

<script setup>
//ce composant affiche une carte avec les informations d'un membre de l'equipe
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

//defineProps definit les donnees que ce composant recoit de son parent
//ici on recoit un objet "member" contenant les infos du membre a afficher
const props = defineProps({
  member: { type: Object, required: true }
})

//defineEmits definit les evenements que ce composant peut envoyer a son parent
//quand on clique sur supprimer, on envoie l'evenement "delete"
defineEmits(['delete'])

//cette fonction calcule automatiquement les initiales du membre (ex: "JD" pour Jean Dupont)
const initiales = computed(() => {
  return props.member.prenom[0] + props.member.nom[0] //prend la premiere lettre du prenom + premiere lettre du nom
})
</script>

<style scoped>
.member-card {
  background: white;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.info { flex: 1; }
.info h3 { margin: 0; color: #333; }
.info p { margin: 5px 0 0; color: #666; }

.actions { display: flex; gap: 10px; }

.btn-view {
  background: #667eea;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  text-decoration: none;
}

.btn-delete {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
