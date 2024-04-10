import { useRoute } from 'vue-router'

export const useProductsQueryParams = () => {
  const route = useRoute()

  const priceQueryParam = route.query.price?.split(',')
  const ratingQueryParam = route.query.rating?.split(',')
  const extractQueryParamsValue = (queryParam) =>
    queryParam ? parseFloat(queryParam.substring(2)) : ''

  const initialProductName = route.query.name || undefined
  const initialSelectedCompany = route.query.company || undefined
  const initialMinPrice = route.query.price
    ? extractQueryParamsValue(priceQueryParam[0])
    : undefined
  const initialMaxPrice = route.query.price
    ? extractQueryParamsValue(priceQueryParam[1])
    : undefined
  const initialMinRating = route.query.rating
    ? extractQueryParamsValue(ratingQueryParam[0])
    : undefined
  const initialMaxRating = route.query.rating
    ? extractQueryParamsValue(ratingQueryParam[1])
    : undefined

  return {
    initialProductName,
    initialSelectedCompany,
    initialMinPrice,
    initialMaxPrice,
    initialMinRating,
    initialMaxRating
  }
}
