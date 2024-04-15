<template>
  <v-app>
    <div class="root-wrapper">
      <component :is="$route.meta.layout || 'div'">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </component>
    </div>
    <VueQueryDevtools />
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

onMounted(() => {
  authStore.retrieveAuthData();
})
</script>

<style scoped>
.root-wrapper {
  display: flex;
  height: 100svh;
  height: 100vh;
}

/* root level transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
