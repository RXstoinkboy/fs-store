<script setup>
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

</script>

<template>
  <v-app>
    <div class="root-wrapper">
      <component :is="$route.meta.layout || 'div'">
        <RouterView v-slot="{Component}">
          <transition name='fade'>
              <component :is="Component" />
          </transition>
        </RouterView>
      </component>
    </div>
    <VueQueryDevtools />
  </v-app>
</template>

<style scoped>
.root-wrapper {
  display: flex;
  height: 100svh;
  height: 100vh;
}

/* root level transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
