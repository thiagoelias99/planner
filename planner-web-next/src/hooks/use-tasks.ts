import { api } from '@/lib/http-client'
import { Paginate } from '@/models/paginate'
import { Task } from '@/models/task'
import { TaskGroup } from '@/models/task-group'
import { useQuery } from '@tanstack/react-query'

export const useTasks = () => {
  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get<Paginate<Task>>('/tasks')
      const data = response.data
      return data
    }
  })

  const { data: groups } = useQuery({
    queryKey: ['taskGroups'],
    queryFn: async () => {
      const response = await api.get<TaskGroup[]>('/groups')
      const data = response.data
      return data
    }
  })

  return { tasks, groups }
}