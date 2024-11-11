import React, { PropsWithChildren } from 'react'
import Image from 'next/image'

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <main className='flex flex-row max-w-screen-2xl w-full h-screen p-10'>
      <div className='w-3/5 relative rounded-2xl'>
        <Image
          src="/background/entrar-bg-image.webp"
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          alt='imagem de fundo'
          className='rounded-2xl' />

      </div>
      {children}
    </main>
  )
}