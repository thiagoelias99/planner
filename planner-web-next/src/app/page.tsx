import TaskSection from '@/components/tasks/task-section';
import GroupSection from '@/components/tasks/group-section';

export default function Home() {
  return (
    <div className='p-4 flex flex-col sm:flex-row justify-start items-start sm:justify-center gap-4'>
      <TaskSection />
      <GroupSection />
    </div>
  );
}
