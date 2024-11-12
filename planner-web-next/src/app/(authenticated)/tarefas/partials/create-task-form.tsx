import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "@/lib/pt-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

interface Props {
  onSuccessfulSubmit?: () => void
  groupId?: string
}

export default function CreateTaskForm({ onSuccessfulSubmit, groupId }: Props) {
  const formSchema = z.object({
    title: z.string().min(3).max(255),
  })

  // const { createTask, isCreatingTask } = useTasks();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // await createTask({ group_id: groupId, ...values })
    form.reset()
    if (onSuccessfulSubmit) { onSuccessfulSubmit() }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className=''>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input autoFocus type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full mt-4'
        // isLoading={isCreatingTask}
        >Adicionar</Button>
      </form>
    </Form>
  )
}