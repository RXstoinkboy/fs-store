<script setup>
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

</script>

<template>
  <v-app>
    <div class="root-wrapper">
      <component :is="$route.meta.layout || 'div'">
        <RouterView />
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
</style>
