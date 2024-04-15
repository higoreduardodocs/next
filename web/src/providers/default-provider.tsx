'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'

import FilterContextProvider from '@/contexts/filter-context'

interface ProviderProps {
  children: ReactNode
}

const theme = {
  desktopBreakpoint: '992px',
  tabletBreakpoint: '768px',
  mobileBreakpoint: '640px',
}

export default function DefaultProviders({ children }: ProviderProps) {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <FilterContextProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </FilterContextProvider>
    </QueryClientProvider>
  )
}
