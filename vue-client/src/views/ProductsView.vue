<template>
  <v-progress-linear
    v-if="isRefetching || isLoading"
    active
    indeterminate
    absolute
    color="deep-purple-accent-4"
  ></v-progress-linear>

  <v-container>
    <v-row fluid no-gutter>
      <v-col cols="4"><ProductFilters /></v-col>
      <v-col cols="8" class="d-flex flex-column ga-4">
        <ProductsSort />
        <v-container v-if="products" class="px-0 py-0">
          <v-row fluid wrap>
            <v-col cols="6" v-for="product in products.results" :key="product.id">
              <ProductCard :product="product" />
            </v-col>
          </v-row>
        </v-container>
        <ProductsPagination />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ProductCard from '@/components/ProductCard.vue'
import ProductFilters from '@/components/ProductFilters.vue'
import ProductsPagination from '@/components/ProductsPagination.vue'
import ProductsSort from '@/components/ProductsSort.vue'
import { useGetProducts } from '@/queries/getProducts'

const { data: products, isRefetching, isLoading } = useGetProducts()
</script>

<style></style>
