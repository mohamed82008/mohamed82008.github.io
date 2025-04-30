<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" v-model="email" placeholder="Email" required />
    <input type="password" v-model="password" placeholder="Password" required />
    <button type="submit">Login</button>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  redirect: {
    type: String,
    default: '/ludo',
  },
})

const email = ref('')
const password = ref('')
const error = ref('')

const handleSubmit = async () => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      redirect: props.redirect,
    }),
  })

  if (response.ok) {
    const { redirect } = await response.json()
    window.location.href = redirect
  } else {
    const { error: errMsg } = await response.json()
    error.value = errMsg || 'Login failed'
  }
}
</script>

