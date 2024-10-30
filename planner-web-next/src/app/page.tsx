import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function Home() {
  return (
    <div className='p-10'>
      <Card className='max-w-screen-sm mx-auto'>
        <CardHeader>
          <CardTitle>Minhas Tarefas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex justify-start items-center gap-2'>
            <Checkbox id='1' />
            <Label htmlFor='1' className='text-base'>Comprar pão</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
