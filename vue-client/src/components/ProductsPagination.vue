<template>
    <v-pagination v-model="page" :length="products?.pages"></v-pagination>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGetProducts } from '@/queries/getProducts'

const route = useRoute()
const router = useRouter()

const page = ref(Number(route.query?.page))

watch(page, (newPage) => {
  router.push({ query: { ...route.query, page: newPage } })
})

const { data: products } = useGetProducts()
</script>