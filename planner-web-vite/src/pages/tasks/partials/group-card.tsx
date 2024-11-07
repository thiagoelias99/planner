import { cn } from '@/lib/utils'
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
import { useNavigate } from 'react-router-dom';
import { Progress } from "@/components/ui/progress"


interface Props {
  group: TaskGroup
}

export default function GroupCard({ group }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: group.id,
  });

  const { deleteGroup } = useTasks();
  const navigate = useNavigate()

  async function handleDelete() {
    await deleteGroup(group.id)
  }

  function handleClick() {
    navigate(`/tasks/groups/${group.id}`)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <li
          key={group.id}
          ref={setNodeRef}
          onClick={handleClick}
          className={cn('flex flex-col justify-start items-start hover:bg-muted rounded p-2 py-3 cursor-pointer gap-1', isOver && "bg-green-500")}>
          <Progress value={group.completion_rate * 100} className='h-1' />
          <div className='flex justify-between items-start w-full'>
            <h3>{group.title}</h3>
            <span className='text-muted-foreground ml-1'>{(group.completion_rate * 100).toFixed(0)}%</span>
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
