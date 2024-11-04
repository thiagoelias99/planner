'use client'

import React from 'react'
import { cn, formatPercentage } from '@/lib/utils'
import { TaskGroup } from '@/models/task-group'
import { useDroppable } from '@dnd-kit/core';

interface Props {
  group: TaskGroup
}

export default function GroupCard({ group }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: group.id,
  });

  return (
    <li
      key={group.id}
      ref={setNodeRef}
      className={cn('flex flex-col justify-start items-start hover:bg-muted rounded p-2 cursor-pointer', isOver && "bg-green-500")}>
      <h3>{group.title}</h3>
      <div>
        <p>{group.tasks_completed} / {group.tasks_count} ({formatPercentage(group.completion_rate)})</p>
      </div>
    </li>
  )
}
