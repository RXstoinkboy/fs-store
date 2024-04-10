<template>
  <section class="wrapper">
    <v-toolbar border>
      <template v-slot:append>
        <nav>
          <router-link :to="{name: 'home'}"><v-btn class="text-blue">Home</v-btn></router-link>
          <router-link :to="{name: 'products'}"><v-btn class="text-blue">Products</v-btn></router-link>
        </nav>
      </template>
    </v-toolbar>
    <main class="content">
      <slot></slot>
    </main>
  </section>
</template>

<script setup></script>

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
