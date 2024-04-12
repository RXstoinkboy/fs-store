<template>
  <section class="wrapper">
    <v-toolbar border>
      <template v-slot:append>
        <nav class="d-flex ga-2">
          <router-link :to="{ name: 'home' }"
            ><v-btn :active="activeRoute === 'home'" class="text-blue">Home</v-btn></router-link
          >
          <router-link :to="{ name: 'products' }"
            ><v-btn :active="activeRoute === 'products'" class="text-blue"
              >Products</v-btn
            ></router-link
          >
          <router-link v-if="authStore.isAuthenticated" :to="{ name: 'profile' }"
            ><v-btn :active="activeRoute === 'profile'" class="text-blue"
              >Profile</v-btn
            ></router-link
          >
          <router-link v-if="!authStore.isAuthenticated" :to="{ name: 'sign-up' }"
            ><v-btn :active="activeRoute === 'sign-up'" variant="elevated" class="bg-blue"
              >Register</v-btn
            ></router-link
          >
          <router-link v-if="!authStore.isAuthenticated" :to="{ name: 'sign-in' }"
            ><v-btn :active="activeRoute === 'sign-in'" variant="outlined" class="text-blue"
              >Sign in</v-btn
            ></router-link
          >
          <v-btn
            v-if="authStore.isAuthenticated"
            variant="outlined"
            class="text-blue"
            @click="mutate"
            :loading="isPending"
            >Sign out</v-btn
          >
        </nav>
      </template>
    </v-toolbar>
    <main class="content">
      <slot></slot>
    </main>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useSignOutMutation } from '@/mutations/signOutMutation'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const activeRoute = computed(() => router.currentRoute.value.name)
const authStore = useAuthStore()
const { mutate, isPending } = useSignOutMutation()
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.content {
  flex: 1;
  padding: 2rem;
}
</style>
