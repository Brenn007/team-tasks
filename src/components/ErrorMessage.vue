<template>
  <div v-if="message" class="error">
    ⚠️ {{ message }}
    <button @click="$emit('retry')">Réessayer</button>
  </div>
</template>

<script setup>
//ce composant affiche un message d'erreur avec un bouton pour reessayer
//il est reutilisable partout dans l'application quand quelque chose ne va pas

//defineProps recoit le message d'erreur a afficher
defineProps({
  message: { type: String, default: '' } //le texte de l'erreur (vide par defaut = pas d'erreur)
})

//defineEmits permet d'envoyer un signal au parent quand on clique sur "reessayer"
defineEmits(['retry'])
</script>

<style scoped>
.error {
  background: #ffe0e0;
  color: #c00;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

button {
  background: #c00;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
