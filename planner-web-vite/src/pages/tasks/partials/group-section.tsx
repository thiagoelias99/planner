import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, Sheet } from '@/components/ui/sheet'
import GroupCard from './group-card'
import { useTasks } from '@/hooks/use-tasks'
import CreateTaskGroupForm from './create-task-group-form'

export default function GroupSection() {
  const { groups } = useTasks();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function onSuccessfulSubmit() {
    setIsSheetOpen(false)
  }

  return (
    <Card className='w-full sm:max-w-[296px]'>
      <CardHeader className='flex flex-row justify-between items-baseline'>
        <CardTitle>Grupos</CardTitle>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="secondary">
              <PlusIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Adicionar novo grupo</SheetTitle>
            </SheetHeader>
            <CreateTaskGroupForm onSuccessfulSubmit={onSuccessfulSubmit} />
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent>
        <ul className=''>
          {groups?.map(group => (
            <GroupCard group={group} key={group.id} />
          ))}
        </ul>
        {groups?.length === 0 && (
          <p className='text-muted-foreground text-center'>Nenhum grupo cadastrado</p>
        )}
      </CardContent>
    </Card>
  )
}
