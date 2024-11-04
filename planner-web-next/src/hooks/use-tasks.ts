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

  const { data: tasks, isPending: isLoadingTasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get<Paginate<Task>>('/tasks')
      const data = response.data
      return data
    }
  })

  const { mutateAsync: updateTask, isPending: isUpdatingTask } = useMutation({
    mutationKey: ['updateTask'],
    mutationFn: async (task: Task) => {
      const { status } = await api.patch<Task>(`/tasks/${task.id}`, task)
      if (status === 200) {
        queryClient.invalidateQueries({
          queryKey: ['tasks']
        })
        queryClient.invalidateQueries({
          queryKey: ['taskGroups']
        })
      }
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

  const { data: groups, isPending: isLoadingGroups } = useQuery({
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

      if (status === 200) {
        queryClient.setQueryData(['tasks'], (data: Paginate<Task>) => {
          return updateDataWithTask(data, taskId, updatedTask)
        })
        queryClient.invalidateQueries({
          queryKey: ['taskGroups']
        })
      }

      return
    }
  })

  return {
    tasks,
    isLoadingTasks,
    createTask,
    isCreatingTask,
    updateTask,
    isUpdatingTask,

    groups,
    isLoadingGroups,
    createGroup,
    isCreatingGroup,
    addTaskToGroup
  }
}

function updateDataWithTask(data: Paginate<Task>, taskId: string, updatedTask: Task) {
  return {
    ...data,
    data: data.data.map(task => {
      if (task.id === taskId) {
        return updatedTask
      }
      return task
    })
  }
}