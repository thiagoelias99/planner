import { H1 } from '@/components/ui/typography';
import { useTasks } from '@/hooks/use-tasks';
import { TaskGroup } from '@/models/task-group';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskSection from './partials/task-section';


export default function TaskGroupDetailsPage() {
  const [group, setGroup] = useState<TaskGroup | null | undefined>(null);
  const { groupId } = useParams();
  const { groups } = useTasks();

  useEffect(() => {
    if (!groupId || !groups) return;

    const group = groups.find(group => group.id === groupId);
    setGroup(group);
  }, [groupId, groups]);

  return (
    <div className='flex flex-col justify-start items-start py-4 max-w-screen-xl mx-auto'>
      <H1>{group?.title}</H1>
      <TaskSection
        tasks={group?.tasks}
        header='Tarefas'
        className='mt-4'
        groupId={groupId}
      />
    </div>
  );
}
