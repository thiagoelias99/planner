import { SidebarTrigger } from '@/components/ui/sidebar';
import { H1 } from '@/components/ui/typography';

export default function AppHeader() {
  return (
    <header className='w-full bg-card h-14 flex flex-row justify-start items-center fixed'>
      <SidebarTrigger />
      <H1 className="pl-4">Planner</H1>
    </header>
  )
}
