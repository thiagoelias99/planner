"use server"

import { prismaClient } from "@/lib/prisma-client"
import { Task } from "@/models/task"

export async function getTasksAction(): Promise<string> {
  const tasks = await prismaClient.task.findMany({
    include: {
      TaskList: {
        select: {
          title: true,
          id: true
        }
      }
    }
  })

  return JSON.stringify(tasks.map((task) => Task.fromPrisma(task)))
}