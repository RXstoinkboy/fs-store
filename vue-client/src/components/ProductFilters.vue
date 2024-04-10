<template>
  <v-sheet border rounded class="pa-4">
    <v-form @submit.prevent class="ga-4 d-flex flex-column">
      <v-text-field label="Product Name" v-model="productName" variant="outlined"></v-text-field>
      <v-select
        v-model="selectedCompany"
        :items="companies"
        label="Company"
        variant="outlined"
        clearable
      ></v-select>
      <v-container class="pa-0 mb-4">
        <label id="rating-label"
          >Rating:
          <fieldset aria-labelledby="rating-label" class="border-none pt-1">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  aria-label="min-rating"
                  v-model="minRating"
                  density="compact"
                  type="number"
                  variant="outlined"
                  hide-details
                  single-line
                  min="0"
                  :max="maxRating"
                  step="0.5"
                  :rules="
                    [() =>
                      minRating?.value > maxRating?.value
                        ? 'Min rating should be less than max rating'
                        : true]
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  aria-label="max-rating"
                  v-model="maxRating"
                  density="compact"
                  type="number"
                  variant="outlined"
                  hide-details
                  single-line
                  :min="minRating"
                  max="5"
                  step="0.5"
                  :rules="
                    [() =>
                      maxRating?.value < minRating?.value
                        ? 'Max rating should be greater than min rating'
                        : true]
                  "
                ></v-text-field>
              </v-col>
            </v-row>
          </fieldset>
        </label>
      </v-container>
      <v-container class="pa-0">
        <label id="price-label"
          >Price:
          <fieldset aria-labelledby="price-label" class="border-none pt-1">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  aria-label="min-price"
                  v-model="minPrice"
                  density="compact"
                  type="number"
                  variant="outlined"
                  hide-details
                  single-line
                  min="0"
                  :max="maxPrice"
                  :rules="
                    [() =>
                      minPrice?.value > maxPrice?.value
                        ? 'Min price should be less than max price'
                        : true]
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  aria-label="max-price"
                  v-model="maxPrice"
                  density="compact"
                  type="number"
                  variant="outlined"
                  hide-details
                  single-line
                  :min="minPrice"
                  :rules="
                    [() =>
                      maxPrice?.value < minPrice?.value
                        ? 'Max price should be greater than min price'
                        : true]
                  "
                ></v-text-field>
              </v-col>
            </v-row>
          </fieldset>
        </label>
      </v-container>
      <v-btn
        @click="updateRouteQueryParams(productName, selectedCompany, priceQuery, ratingQuery)"
        block
        variant="flat"
        rounded="xl"
        class="bg-blue"
        >Apply Filters</v-btn
      >
      <v-btn @click="clearFilters" variant="text" rounded="xl">Clear Filters</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsQueryParams } from '@/composables/useProductsQueryParams'

const productName = ref()
const selectedCompany = ref()
const minPrice = ref()
const maxPrice = ref()
const minRating = ref()
const maxRating = ref()
const companies = ['mebelki', 'woodika', 'marcos', 'ikea'] // TODO: should be fetched from BE

const route = useRoute()
const router = useRouter()

const minPriceQuery = computed(() => (minPrice.value ? `>=${minPrice.value}` : undefined))
const maxPriceQuery = computed(() => (maxPrice.value ? `<=${maxPrice.value}` : undefined))
const priceQuery = computed(() =>
  [minPriceQuery.value, maxPriceQuery.value].filter(Boolean).join(',')
)

const minRatingQuery = computed(() => (minRating.value ? `>=${minRating.value}` : undefined))
const maxRatingQuery = computed(() => (maxRating.value ? `<=${maxRating.value}` : undefined))
const ratingQuery = computed(() =>
  [minRatingQuery.value, maxRatingQuery.value].filter(Boolean).join(',')
)

const updateRouteQueryParams = (name, company, price, rating) => {
  router.push({
    path: route.path,
    query: {
      name: name ? encodeURIComponent(name) : undefined,
      company: company ? encodeURIComponent(company) : undefined,
      price: price ? encodeURIComponent(price) : undefined,
      rating: rating ? encodeURIComponent(rating) : undefined
    }
  })
}

const clearFilters = () => {
  updateRouteQueryParams()

  productName.value = undefined
  selectedCompany.value = undefined
  minPrice.value = undefined
  maxPrice.value = undefined
  minRating.value = undefined
  maxRating.value = undefined
}

const {
  initialProductName,
  initialSelectedCompany,
  initialMinPrice,
  initialMaxPrice,
  initialMinRating,
  initialMaxRating
} = useProductsQueryParams()

productName.value = initialProductName
selectedCompany.value = initialSelectedCompany
minPrice.value = initialMinPrice
maxPrice.value = initialMaxPrice
minRating.value = initialMinRating
maxRating.value = initialMaxRating
</script>
