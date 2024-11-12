// import { Task, TaskCreateRequest, TaskUpdateRequest } from "@/models/task"
// import { TaskGroup, TaskGroupCreateRequest } from "@/models/task-group"
import { createTaskAction, getTasksAction } from "@/actions/tasks"
import { deleteTaskAction } from "@/actions/tasks/delete-task"
import { updateTaskAction } from "@/actions/tasks/update-task"
import { CreateTaskDto, ITask, Task, UpdateTaskDto } from "@/models/task"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useTasks = () => {
  const queryClient = useQueryClient()
  const { user } = useKindeBrowserClient()

  const { mutateAsync: createTask, isPending: isCreatingTask } = useMutation({
    mutationKey: ["createTask"],
    mutationFn: async (data: CreateTaskDto) => {
      if (!user) {
        throw new Error("User not found")
      }

      await createTaskAction(data, user.id)

      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      })
      queryClient.invalidateQueries({
        queryKey: ["taskGroups"]
      })
    }
  })

  const { data: tasks, isPending: isLoadingTasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const data = await getTasksAction()
      const parsedData = JSON.parse(data) as ITask[]

      return parsedData.map(task => new Task(task))
    },
    staleTime: 60_000 * 10
  })

  const { mutateAsync: updateTask, isPending: isUpdatingTask } = useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (data: UpdateTaskDto) => {
      const task = await updateTaskAction(data)
      const parsedTask = JSON.parse(task) as ITask

      queryClient.setQueryData(["tasks"], (data: Task[]) => {
        return replaceTask(data, new Task(parsedTask))
      })

      queryClient.invalidateQueries({
        queryKey: ["taskGroups"]
      })
    }
  })

  const { mutateAsync: deleteTask } = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: async (taskId: string) => {

      await deleteTaskAction(taskId)

      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      })
      queryClient.invalidateQueries({
        queryKey: ["taskGroups"]
      })
    }
  })

  // const { mutateAsync: createGroup, isPending: isCreatingGroup } = useMutation({
  //   mutationKey: ["createGroup"],
  //   mutationFn: async (task: TaskGroupCreateRequest) => {
  //     const { status } = await api.post<TaskGroup>("/groups", task)
  //     if (status === 201 || status === 200) {
  //       queryClient.invalidateQueries({
  //         queryKey: ["taskGroups"]
  //       })
  //     }
  //   }
  // })

  // const { data: groups, isPending: isLoadingGroups } = useQuery({
  //   queryKey: ["taskGroups"],
  //   queryFn: async () => {
  //     const response = await api.get<TaskGroup[]>("/groups")
  //     const data = response.data
  //     return data
  //   },
  //   staleTime: 60_000 * 10
  // })

  // const { mutateAsync: addTaskToGroup } = useMutation({
  //   mutationKey: ["addTaskToGroup"],
  //   mutationFn: async ({ taskId, groupId }: { taskId: string, groupId: string }) => {
  //     const { status, data: updatedTask } = await api.patch<Task>(`/groups/${groupId}/addTask/${taskId}`)

  //     if (status === 200) {
  //       queryClient.setQueryData(["tasks"], (data: Paginate<Task>) => {
  //         return updateDataWithTask(data, taskId, updatedTask)
  //       })
  //       queryClient.invalidateQueries({
  //         queryKey: ["taskGroups"]
  //       })
  //     }

  //     return
  //   }
  // })

  // const { mutateAsync: deleteGroup } = useMutation({
  //   mutationKey: ["deleteGroup"],
  //   mutationFn: async (groupId: string) => {
  //     const { status } = await api.delete(`/groups/${groupId}`)
  //     if (status === 204) {
  //       queryClient.invalidateQueries({
  //         queryKey: ["tasks"]
  //       })
  //       queryClient.invalidateQueries({
  //         queryKey: ["taskGroups"]
  //       })
  //     }
  //   }
  // })

  return {
    tasks,
    isLoadingTasks,
    createTask,
    isCreatingTask,
    updateTask,
    isUpdatingTask,
    deleteTask,

    // groups,
    // isLoadingGroups,
    // createGroup,
    // isCreatingGroup,
    // addTaskToGroup,
    // deleteGroup
  }
}

// function updateDataWithTask(data: Paginate<Task>, taskId: string, updatedTask: Task) {
//   return {
//     ...data,
//     data: data.data.map(task => {
//       if (task.id === taskId) {
//         return updatedTask
//       }
//       return task
//     })
//   }
// }

function replaceTask(data: Task[], task: Task): Task[] {
  return data.map(taskItem => {
    if (taskItem.id === task.id) {
      return task
    }
    return taskItem
  })
}