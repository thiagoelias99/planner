import { useTasks } from '@/hooks/use-tasks';
import GroupSection from './partials/group-section';
import TaskSection from './partials/task-section';
import { H1 } from '@/components/ui/typography';
import TaskProgressCard from './partials/task-progress-card';

export default function TasksPage() {
  const { tasks } = useTasks();

  return (
    <div className='py-4 max-w-screen-xl mx-auto'>
      <H1>Gerenciador de Tarefas</H1>
      <div className='grid grid-cols-8 gap-4 pt-6'>
        <div className='col-span-2 flex flex-col gap-4'>
          <TaskProgressCard tasks={tasks?.data} header='Progresso Geral' />
          <div className='flex-1 bg-primary rounded-xl'></div>
        </div>
        <TaskSection tasks={tasks?.data} className="col-span-2" header='Para Hoje' hideAddButton maxItems={4} />
        <GroupSection className="col-span-2" />
        <TaskSection tasks={tasks?.data} className="col-span-8" />
      </div>
    </div>
  );
}
