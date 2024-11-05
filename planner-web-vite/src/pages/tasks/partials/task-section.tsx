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
import { useTasks } from '@/hooks/use-tasks'
import CreateTaskForm from './create-task-form'
import { useState } from 'react'
import { H2 } from '@/components/ui/typography'
import { Task } from '@/models/task'
import EditTaskForm from './edit-task-form'

export default function TaskSection() {
  const { tasks } = useTasks();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  function onSuccessfulSubmit() {
    setIsSheetOpen(false)
  }

  return (
    <Card className='w-full max-w-screen-sm'>
      <CardHeader className='flex flex-row justify-between items-baseline pt-2'>
        <H2>Minhas Tarefas</H2>
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

          <ul className=''>
            {tasks?.data.map(task => (
              <TaskCard task={task} setTask={setSelectedTask} key={task.id} />
            ))}
          </ul>
          {tasks?.data.length === 0 && (
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
