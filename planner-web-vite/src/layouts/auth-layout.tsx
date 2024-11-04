import { Outlet } from 'react-router-dom'
import { AppSidebar } from './partials/app-sidebar'
import AppHeader from './partials/app-header'

export default function AuthLayout() {
  return (
    <div className='flex w-full'>
      <AppSidebar />
      <div className='w-full'>
        <AppHeader />
        <main className='p-4 pt-14 mx-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
