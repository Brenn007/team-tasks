<template>
  <form @submit.prevent="submit" class="task-form">
    <div class="form-group">
      <label>Titre</label>
      <input v-model="form.titre" type="text" required placeholder="Ex: Créer la maquette" />
    </div>

    <div class="form-group">
      <label>Description</label>
      <textarea v-model="form.description" required placeholder="Décrivez la tâche..."></textarea>
    </div>

    <div class="form-group">
      <label>Assigné à</label>
      <select v-model="form.memberId" required>
        <option value="">Sélectionner un membre</option>
        <option v-for="m in members" :key="m.id" :value="m.id">
          {{ m.prenom }} {{ m.nom }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label>Statut</label>
      <select v-model="form.statut">
        <option value="a_faire">À faire</option>
        <option value="en_cours">En cours</option>
        <option value="termine">Terminé</option>
      </select>
    </div>

    <button type="submit" class="btn-submit">Créer la tâche</button>
  </form>
</template>

<script setup>
//ce composant affiche le formulaire pour creer une nouvelle tache
import { ref } from 'vue'

//defineProps recoit la liste des membres de l'equipe pour le menu deroulant "assigne a"
defineProps({
  members: { type: Array, required: true }
})

//defineEmits permet d'envoyer les donnees du formulaire au composant parent
const emit = defineEmits(['submit'])

//cette variable stocke les valeurs saisies dans le formulaire
const form = ref({
  titre: '',        //titre de la tache
  description: '',  //description detaillee
  memberId: '',     //numero du membre a qui on assigne la tache
  statut: 'a_faire' //statut initial (par defaut: a faire)
})

//cette fonction s'execute quand on clique sur le bouton "creer la tache"
//elle envoie les donnees au parent et remet le formulaire a zero
const submit = () => {
  emit('submit', { ...form.value, memberId: parseInt(form.value.memberId) }) //envoie les donnees
  form.value = { titre: '', description: '', memberId: '', statut: 'a_faire' } //vide le formulaire
}
</script>

<style scoped>
.task-form { padding: 20px; }

.form-group { margin-bottom: 15px; }

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #172b4d;
  font-weight: 500;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 2px solid #dfe1e6;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
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
  font-weight: bold;
}

.btn-submit:hover {
  background: #026aa7;
}
</style>
