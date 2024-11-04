import { RouterProvider } from 'react-router-dom'
import router from './router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'
import { SidebarProvider } from './components/ui/sidebar'

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider defaultOpen={false}>
        <RouterProvider router={router} />
      </SidebarProvider>
    </QueryClientProvider>
  )
}

export default App
