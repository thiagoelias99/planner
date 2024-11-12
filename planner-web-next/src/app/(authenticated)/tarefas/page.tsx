"use client"

import { H1 } from "@/components/ui/typography"
import TaskProgressCard from "./partials/task-progress-card"
import { Task } from "@prisma/client"
import TaskSection from "./partials/task-section"
import TaskListSection from "./partials/task-list-section"
import TasksProvider from "@/contexts/task-context"
import { useTasks } from "@/hooks/use-tasks"

export default function TarefasPage() {
  const { tasks } = useTasks()

  return (
    <TasksProvider>
      <div className='py-4 max-w-screen-xl mx-auto'>
        <H1>Gerenciador de Tarefas</H1>
        <div className='grid grid-cols-8 gap-4 pt-6'>
          <div className='col-span-2 flex flex-col gap-4'>
            <TaskProgressCard tasks={tasks} header='Progresso Geral' />
            <div className='flex-1 bg-primary rounded-xl'></div>
          </div>
          <TaskSection tasks={tasks} className="col-span-2" header='Para Hoje' hideAddButton maxItems={4} />
          <TaskListSection className="col-span-2" />
          <TaskSection tasks={tasks} className="col-span-8" />
        </div>
      </div>
    </TasksProvider>
  )
}
