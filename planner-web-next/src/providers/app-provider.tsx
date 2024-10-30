"use client"

import { queryClient } from '@/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
