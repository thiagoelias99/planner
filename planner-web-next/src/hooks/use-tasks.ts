import { api } from '@/lib/http-client'
import { Paginate } from '@/models/paginate'
import { Task } from '@/models/task'
import { TaskGroup } from '@/models/task-group'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useTasks = () => {
  const queryClient = useQueryClient()

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

  const { mutateAsync: addTaskToGroup } = useMutation({
    mutationKey: ['addTaskToGroup'],
    mutationFn: async ({ taskId, groupId }: { taskId: string, groupId: string }) => {
      const { status, data: updatedTask } = await api.patch<Task>(`/groups/${groupId}/addTask/${taskId}`)

      console.log(taskId)
      console.log(updatedTask)

      if (status === 200) {
        queryClient.setQueryData(['tasks'], (data: Paginate<Task>) => {

          const newData = {
            ...data,
            data: data.data.map(task => {
              if (task.id === taskId) {
                return updatedTask
              }
              return task
            })
          }

          console.log(newData)

          return newData
        })
      }

      return
    }
  })

  return { tasks, groups, addTaskToGroup }
}