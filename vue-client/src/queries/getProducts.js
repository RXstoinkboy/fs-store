import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const fetchAllProducts = (query) => {
  const queryParams = new URLSearchParams(query).toString()
  return fetch(`/api/products${queryParams ? `?${queryParams}` : ''}`).then((res) => res.json())
}

export const useGetProducts = () => {
  const route = useRoute()
  const queryKey = computed(() => ['products', JSON.stringify(route.query)])

  return useQuery({
    queryKey,
    queryFn: () => fetchAllProducts(route.query),
    initial: []
  })
}
