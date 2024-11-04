import { api } from '@/lib/http-client'
import { Paginate } from '@/models/paginate'
import { Task, TaskCreateRequest } from '@/models/task'
import { TaskGroup, TaskGroupCreateRequest } from '@/models/task-group'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useTasks = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: createTask, isPending: isCreatingTask } = useMutation({
    mutationKey: ['createTask'],
    mutationFn: async (task: TaskCreateRequest) => {
      const { status } = await api.post<Task>('/tasks', task)
      if (status === 201 || status === 200) {
        queryClient.invalidateQueries({
          queryKey: ['tasks']
        })
      }
    }
  })

  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get<Paginate<Task>>('/tasks')
      const data = response.data
      return data
    }
  })

  const { mutateAsync: createGroup, isPending: isCreatingGroup } = useMutation({
    mutationKey: ['createGroup'],
    mutationFn: async (task: TaskGroupCreateRequest) => {
      const { status } = await api.post<TaskGroup>('/groups', task)
      if (status === 201 || status === 200) {
        queryClient.invalidateQueries({
          queryKey: ['taskGroups']
        })
      }
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

  return { tasks, createTask, isCreatingTask, groups, createGroup, isCreatingGroup, addTaskToGroup }
}