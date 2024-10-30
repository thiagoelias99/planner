import { api } from '@/lib/http-client'
import { Paginate } from '@/models/paginate'
import { Task } from '@/models/task'
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

  return { tasks }
}