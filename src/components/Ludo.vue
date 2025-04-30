<template>
  <div v-if="user">
    <h2>Welcome, {{ user.email }}!</h2>
    <button @click="logout">Logout</button>

    <!-- Your game interface goes here -->
    <div>Game Data: {{ gameData }}</div>
  </div>
  <div v-else>
    <p>You need to log in to play the game.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'

// Access the user prop passed from Astro
const props = defineProps({
  user: Object,
})

const store = useUserStore()
const { user, gameData } = storeToRefs(store)

// On component mount, populate Pinia store with user info
onMounted(() => {
  if (props.user) {
    store.setUser(props.user)
  }
})

// Logout function to remove the token and reload the page
const logout = () => {
  fetch('/api/logout')
    .then(() => window.location.reload())
    .catch((err) => console.error(err))
}
</script>
