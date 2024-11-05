'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, Sheet } from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import TaskCard from './task-card'
import CreateTaskForm from './create-task-form'
import { useState } from 'react'
import { H2 } from '@/components/ui/typography'
import { Task } from '@/models/task'
import EditTaskForm from './edit-task-form'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

interface Props {
  tasks: Task[] | undefined | null
  header?: string
  className?: ClassNameValue
  groupId?: string
}

export default function TaskSection({ tasks, header = 'Minhas Tarefas', className, groupId }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  function onSuccessfulSubmit() {
    setIsSheetOpen(false)
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className='flex flex-row justify-between items-baseline pt-2'>
        <H2>{header}</H2>
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
            <CreateTaskForm onSuccessfulSubmit={onSuccessfulSubmit} groupId={groupId} />
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

          <ul className=''>
            {tasks?.map(task => (
              <TaskCard task={task} setTask={setSelectedTask} key={task.id} />
            ))}
          </ul>
          {tasks?.length === 0 && (
            <p className='text-muted-foreground text-center'>Nenhuma tarefa cadastrada</p>
          )}

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Tarefa</DialogTitle>
            </DialogHeader>
            <EditTaskForm
              task={selectedTask}
              onSuccessful={() => {
                setSelectedTask(null)
                setIsDialogOpen(false)
              }} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
