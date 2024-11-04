'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, Sheet } from '@/components/ui/sheet'
import TaskCard from './task-card'
import { useTasks } from '@/hooks/use-tasks'
import CreateTaskForm from './create-task-form'
import { useState } from 'react'

export default function TaskSection() {
  const { tasks } = useTasks();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function onSuccessfulSubmit() {
    setIsSheetOpen(false)
  }

  return (
    <Card className='w-full max-w-screen-sm'>
      <CardHeader className='flex flex-row justify-between items-baseline'>
        <CardTitle>Minhas Tarefas</CardTitle>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="secondary">
              <PlusIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Adicionar nova tarefa</SheetTitle>
            </SheetHeader>
            <CreateTaskForm onSuccessfulSubmit={onSuccessfulSubmit} />
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent>
        <ul className=''>
          {tasks?.data.map(task => (
            <TaskCard task={task} key={task.id} />
          ))}
        </ul>
        {tasks?.data.length === 0 && (
          <p className='text-muted-foreground text-center'>Nenhuma tarefa cadastrada</p>
        )}
      </CardContent>
    </Card>
  )
}
