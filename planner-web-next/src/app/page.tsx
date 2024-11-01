"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useTasks } from '@/hooks/use-tasks';
import { formatPercentage } from '@/lib/utils';

export default function Home() {
  const { tasks, groups } = useTasks();

  return (
    <div className='p-4 flex flex-col sm:flex-row justify-start items-start sm:justify-center gap-4'>
      <Card className='w-full max-w-screen-sm'>
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

      <Card className='w-full sm:max-w-[296px]'>
        <CardHeader>
          <CardTitle>Grupos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className=''>
            {groups?.map(group => (
              <li key={group.id} className='flex flex-col justify-start items-start hover:bg-muted rounded p-2 cursor-pointer'>
                <h3>{group.title}</h3>
                <div>
                  <p>{group.tasks_completed} / {group.tasks_count} ({formatPercentage(group.completion_rate)})</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
