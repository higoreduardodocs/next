import { useContext } from 'react'

import { FilterContext } from '@/contexts/filter-context'

export default function useFilter() {
  return useContext(FilterContext)
}
