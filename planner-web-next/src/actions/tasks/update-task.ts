"use server"

import { prismaClient } from "@/lib/prisma-client"
import { UpdateTaskDto } from "@/models/task"

export async function updateTaskAction(data: UpdateTaskDto): Promise<string> {
  const { id } = data

  const task = await prismaClient.task.update({
    where: {
      id
    },
    data: {
      title: data.title,
      status: data.status,
      completedAt: data.completedAt
    }
  })

  return JSON.stringify(task)
}