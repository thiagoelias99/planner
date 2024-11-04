import { Task } from './task';

export interface TaskGroup {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  tasks_count: number;
  tasks_completed: number;
  completion_rate: number;
  tasks: Task[];
}

export interface TaskGroupCreateRequest {
  title: string;
}