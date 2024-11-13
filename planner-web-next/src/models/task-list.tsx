import { Prisma } from "@prisma/client"
import { Task } from "./task"

export interface ITaskList {
  id: string
  title: string
  tasks: Task[]
  createdAt: Date
}

export class TaskList implements ITaskList {
  public readonly id: string
  public title: string
  public tasks: Task[]
  public readonly createdAt: Date

  constructor(data: ITaskList) {
    Object.assign(this, data)
  }

  static fromPrisma(data: Prisma.TaskListGetPayload<{
    include: {
      Tasks: {
        include: {
          TaskList: {
            select: {
              title: true,
              id: true
            }
          }
        }
      }
    }
  }>): TaskList {
    return new TaskList({
      id: data.id,
      title: data.title,
      tasks: data.Tasks.map(task => Task.fromPrisma(task)),
      createdAt: data.createdAt
    })
  }
}

export interface CreateTaskListDto {
  title: string
}