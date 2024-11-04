import { Task } from '@/models/task'
import React from 'react'
import { useDraggable } from '@dnd-kit/core';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { useTasks } from '@/hooks/use-tasks';

interface Props {
  task: Task
}

export default function TaskCard({ task }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const { updateTask } = useTasks();

  async function handleCheckedChange() {
    await updateTask({ ...task, status: task.status === 'completed' ? 'pending' : 'completed' })
  }

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <li
      key={task.id}
      className='flex items-center gap-4 hover:bg-muted rounded p-2'
    >
      <Checkbox
        id={task.id}
        checked={task.status === "completed"}
        onCheckedChange={handleCheckedChange}
      />
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className='cursor-grab'
        style={style}
      >
        <Label htmlFor={task.id} className='cursor-pointer leading-relaxed tracking-wide line-clamp-2'>{task.title}</Label>
        <span className='text-xs text-muted-foreground'>{task.group}</span>
      </div>
    </li>
  )
}
