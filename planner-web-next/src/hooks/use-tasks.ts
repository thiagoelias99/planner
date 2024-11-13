// import { Task, TaskCreateRequest, TaskUpdateRequest } from "@/models/task"
// import { TaskGroup, TaskGroupCreateRequest } from "@/models/task-group"
import { createTaskAction, getTasksAction } from "@/actions/tasks"
import { createTaskListAction } from "@/actions/tasks/create-task-list"
import { deleteTaskAction } from "@/actions/tasks/delete-task"
import { getTaskListsAction } from "@/actions/tasks/get-task-lists"
import { updateTaskAction } from "@/actions/tasks/update-task"
import { CreateTaskDto, ITask, Task, UpdateTaskDto } from "@/models/task"
import { CreateTaskListDto, ITaskList, TaskList } from "@/models/task-list"
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
        queryKey: ["taskLists"]
      })
    }
  })

  const { data: tasks, isPending: isLoadingTasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found")
      }

      const data = await getTasksAction(user.id)
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
        queryKey: ["taskLists"]
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
        queryKey: ["taskLists"]
      })
    }
  })

  const { mutateAsync: createList, isPending: isCreatingList } = useMutation({
    mutationKey: ["createList"],
    mutationFn: async (data: CreateTaskListDto) => {
      if (!user) {
        throw new Error("User not found")
      }

      await createTaskListAction(data, user.id)

      queryClient.invalidateQueries({
        queryKey: ["taskLists"]
      })
    }
  })

  const { data: lists, isPending: isLoadingLists } = useQuery({
    queryKey: ["taskLists"],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found")
      }

      const data = await getTaskListsAction(user.id)
      const parsedData = JSON.parse(data) as ITaskList[]

      return parsedData.map(list => new TaskList(list))
    },
    staleTime: 60_000 * 10
  })

  // const { mutateAsync: addTaskToGroup } = useMutation({
  //   mutationKey: ["addTaskToGroup"],
  //   mutationFn: async ({ taskId, groupId }: { taskId: string, groupId: string }) => {
  //     const { status, data: updatedTask } = await api.patch<Task>(`/groups/${groupId}/addTask/${taskId}`)

  //     if (status === 200) {
  //       queryClient.setQueryData(["tasks"], (data: Paginate<Task>) => {
  //         return updateDataWithTask(data, taskId, updatedTask)
  //       })
  //       queryClient.invalidateQueries({
  //         queryKey: ["taskLists"]
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
  //         queryKey: ["taskLists"]
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

    lists,
    isLoadingLists,
    createList,
    isCreatingList,
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