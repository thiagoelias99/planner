"use client"

import { queryClient } from '@/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import TasksProvider from './tasks-provider'

export default function AppProvider({ children }: PropsWithChildren) {



  return (
    <QueryClientProvider
      client={queryClient}
    >
      <TasksProvider>
        {children}
      </TasksProvider>
    </QueryClientProvider>
  )
}
