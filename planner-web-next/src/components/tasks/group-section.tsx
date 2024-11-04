'use client'

import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, Sheet } from '../ui/sheet'
import GroupCard from './group-card'
import { useTasks } from '@/hooks/use-tasks'
import CreateTaskGroupForm from './create-task-group-form'

export default function GroupSection() {
  const { groups } = useTasks();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function onSuccessfulSubmit() {
    setIsSheetOpen(false)
  }

  return (
    <Card className='w-full sm:max-w-[296px]'>
      <CardHeader className='flex flex-row justify-between items-baseline'>
        <CardTitle>Grupos</CardTitle>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="secondary">
              <PlusIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Adicionar novo grupo</SheetTitle>
            </SheetHeader>
            <CreateTaskGroupForm onSuccessfulSubmit={onSuccessfulSubmit} />
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent>
        <ul className=''>
          {groups?.map(group => (
            <GroupCard group={group} key={group.id} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
