'use client'

import { ReactNode, createContext, useState } from 'react'

import { FilterType, FilterPriorityType } from '@/types/filter-type'

export const FilterContext = createContext({
  type: FilterType.ALL,
  setType: (value: FilterType) => {},
  priority: FilterPriorityType.NEWS,
  setPriority: (value: FilterPriorityType) => {},
  search: '',
  setSearch: (value: string) => {},
  page: 1,
  setPage: (value: number) => {},
  perPage: 12,
  setPerPage: (value: number) => {},
  totalCount: 0,
  setTotalCount: (value: number) => {},
})

interface ProviderProps {
  children: ReactNode
}

export default function FilterContextProvider({ children }: ProviderProps) {
  const [type, setType] = useState<FilterType>(FilterType.ALL)
  const [priority, setPriority] = useState<FilterPriorityType>(
    FilterPriorityType.NEWS
  )
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(12)
  const [totalCount, setTotalCount] = useState<number>(0)

  return (
    <FilterContext.Provider
      value={{
        type,
        setType,
        priority,
        setPriority,
        search,
        setSearch,
        page,
        setPage,
        perPage,
        setPerPage,
        totalCount,
        setTotalCount,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
