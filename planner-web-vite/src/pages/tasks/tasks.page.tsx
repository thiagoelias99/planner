import GroupSection from './partials/group-section';
import TaskSection from './partials/task-section';

export default function TasksPage() {
  return (
    <div className='p-4 flex flex-col sm:flex-row justify-start items-start sm:justify-center gap-4'>
      <TaskSection />
      <GroupSection />
    </div>
  );
}
