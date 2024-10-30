"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useTasks } from '@/hooks/use-tasks';

export default function Home() {
  const { tasks } = useTasks();

  return (
    <div className='p-10'>
      <Card className='max-w-screen-sm mx-auto'>
        <CardHeader>
          <CardTitle>Minhas Tarefas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className=''>
            {tasks?.data.map(task => (
              <li key={task.id} className='flex items-center gap-4 hover:bg-muted rounded p-2'>
                <Checkbox id={task.id} checked={task.status === "completed"} />
                <Label htmlFor={task.id} className='cursor-pointer leading-relaxed tracking-wide line-clamp-2'>{task.title}</Label>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
