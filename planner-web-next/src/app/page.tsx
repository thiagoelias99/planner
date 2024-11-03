"use client"

import GroupCard from '@/components/group-card';
import TaskCard from '@/components/task-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTasks } from '@/hooks/use-tasks';

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
              <TaskCard task={task} key={task.id} />
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
              <GroupCard group={group} key={group.id} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
