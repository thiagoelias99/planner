'use client'

import { useTasks } from '@/hooks/use-tasks'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { PropsWithChildren } from 'react'

export default function TasksProvider({ children }: PropsWithChildren) {
  const { addTaskToGroup } = useTasks()


  async function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      const taskId = event.active.id as string
      const groupId = event.over.id as string

      await addTaskToGroup({ taskId, groupId })
    }
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}

    >
      {children}
    </DndContext>
  )
}
