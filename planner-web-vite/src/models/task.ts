export interface Task {
  id: string;
  user_id: string;
  title: string;
  completed_at: null;
  created_at: Date;
  updated_at: Date;
  status: string;
  group?: string;
}

export interface TaskCreateRequest {
  title: string;
  group_id?: string;
}

export interface TaskUpdateRequest {
  id: string
  title: string;
  status: string;
  group_id?: string;
}