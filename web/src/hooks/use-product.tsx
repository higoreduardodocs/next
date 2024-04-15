import { useDeferredValue } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosPromise } from 'axios'

import {
  ProductFetchResponseType,
  ProductsFetchResponseType,
} from '@/types/product-type'
import mountQuery from '@/utils/graphql-filters'
import useFilter from './use-filter'

const API_URL = process.env.NEXT_PUBLIC_API_URL as string
const fetcher = (query: string): AxiosPromise<ProductsFetchResponseType> => {
  return axios.post(API_URL, { query })
}
export function useProducts() {
  const { type, priority, search, page, perPage, setTotalCount } = useFilter()
  const searchDeferred = useDeferredValue(search)
  const query = mountQuery(type, priority, page, perPage)
  const { data } = useQuery({
    queryKey: ['products', type, priority, page],
    queryFn: () => fetcher(query),
    staleTime: 1000 * 60 * 1,
  })

  setTotalCount(data?.data?.data?.count?.length || 0)
  const products = data?.data?.data?.allProducts
  const filteredProducts = products?.filter((item) =>
    item.name.toLowerCase().includes(searchDeferred.toLowerCase())
  )

  return { data: filteredProducts }
}

const fetcherProduct = (id: string): AxiosPromise<ProductFetchResponseType> => {
  return axios.post(API_URL, {
    query: `
      query {
        Product(id: "${id}") {
          id, name, category, image_url, price_in_cents, description
        }
      }
  `,
  })
}
export function useProduct(id: string) {
  const { data } = useQuery({
    queryFn: () => fetcherProduct(id),
    queryKey: ['product', id],
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  })

  return {
    data: data?.data?.data?.Product,
  }
}
