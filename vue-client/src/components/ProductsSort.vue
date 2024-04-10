<template>
  <section class="d-flex align-center ga-4">
    Sort By:
    <v-chip-group filter v-model="sort">
      <v-chip value="price">Price</v-chip>
      <v-chip value="rating">Rating</v-chip>
      <v-chip value="name">Name</v-chip>
    </v-chip-group>
    <v-chip-group filter v-model="order" :disabled="!sort">
      <v-chip value="asc">Ascending</v-chip>
      <v-chip value="desc">Descending</v-chip>
    </v-chip-group>
  </section>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const descRegex = /^-/
const sortQuery = route.query?.sort

const sort = ref(sortQuery?.replace(descRegex, ''))
const order = ref(descRegex.test(sortQuery) ? 'desc' : 'asc')

watch([sort, order], ([sort, order]) => {
  router.push({
    query: {
      ...route.query,
      sort: [order === 'desc' ? '-' : '', sort].filter(Boolean).join('') || undefined
    }
  })
})
</script>
