"use server"

import { prismaClient } from "@/lib/prisma-client"
import { CreateTaskDto } from "@/models/task"

export async function createTaskAction(data: CreateTaskDto, userId: string) {
  return prismaClient.task.create({
    data: {
      title: data.title,
      listId: data.listId,
      userId
    }
  })
}