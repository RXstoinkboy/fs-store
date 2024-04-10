import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { watchEffect, computed } from 'vue'

const fetchAllProducts = (query) => {
  const queryParams = new URLSearchParams(query).toString()
  return fetch(`/api/products${queryParams ? `?${queryParams}` : ''}`).then((res) => res.json())
}

export const useGetProducts = () => {
  const route = useRoute()
  const queryKey = computed(() => ['products', JSON.stringify(route.query)])

  const { refetch, ...query } = useQuery({
    queryKey,
    queryFn: () => fetchAllProducts(route.query)
  })

  watchEffect(
    () => {
        console.log(route.query)
      refetch()
    },
    { flush: 'post' }
  )

  return query
}
