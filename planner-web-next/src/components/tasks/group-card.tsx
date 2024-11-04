'use client'

import React from 'react'
import { cn, formatPercentage } from '@/lib/utils'
import { TaskGroup } from '@/models/task-group'
import { useDroppable } from '@dnd-kit/core';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Trash2Icon } from 'lucide-react';
import { useTasks } from '@/hooks/use-tasks';

interface Props {
  group: TaskGroup
}

export default function GroupCard({ group }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: group.id,
  });

  const { deleteGroup } = useTasks();

  async function handleDelete() {
    await deleteGroup(group.id)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <li
          key={group.id}
          ref={setNodeRef}
          className={cn('flex flex-col justify-start items-start hover:bg-muted rounded p-2 cursor-pointer', isOver && "bg-green-500")}>
          <h3>{group.title}</h3>
          <div>
            <p>{group.tasks_completed} / {group.tasks_count} ({formatPercentage(group.completion_rate)})</p>
          </div>
        </li>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Editar</ContextMenuItem>
        <ContextMenuItem
          onClick={handleDelete}
          className='text-destructive gap-2'
        >
          <Trash2Icon size={16} />
          <span>Excluir</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
