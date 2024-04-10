<template>
  <v-card border>
    <v-card-item>
      <v-card-title>{{ product.name }}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">$ {{ product.price }}</span>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-rating
        :model-value="product.rating"
        color="amber"
        density="compact"
        size="small"
        half-increments
        readonly
      ></v-rating>

      <div class="my-4 text-subtitle-1">
        <span>Made by:</span> <span class="font-weight-bold">{{ product.company }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps(['product'])
</script>
