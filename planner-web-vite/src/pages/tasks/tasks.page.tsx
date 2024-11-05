import { useTasks } from '@/hooks/use-tasks';
import GroupSection from './partials/group-section';
import TaskSection from './partials/task-section';

export default function TasksPage() {
  const { tasks } = useTasks();

  return (
    <div className='py-4 flex flex-col sm:flex-row justify-start items-start sm:justify-center gap-4 max-w-screen-xl mx-auto'>
      <TaskSection tasks={tasks?.data} />
      <GroupSection />
    </div>
  );
}
