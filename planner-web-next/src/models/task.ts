import { Prisma, TaskStatus } from "@prisma/client"

export class Task {
  public readonly id: string
  public readonly title: string
  public readonly status: TaskStatus
  public readonly listId: string
  public readonly listTitle: string

  public readonly completedAt?: Date | null
  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor(data: Task) {
    Object.assign(this, data)
  }

  static fromPrisma(data: Prisma.TaskGetPayload<{
    include: {
      TaskList: {
        select: {
          title: true,
          id: true
        }
      }
    }
  }>): Task {
    return new Task({
      id: data.id,
      title: data.title,
      status: data.status,
      listId: "",
      listTitle: "",
      completedAt: data.completedAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }
}

export interface CreateTaskDto {
  title: string
  listId?: string
}