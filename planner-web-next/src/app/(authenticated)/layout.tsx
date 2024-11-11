import React, { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';


export default async function AuthenticatedLayout({ children }: PropsWithChildren) {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) { redirect('/login') }

  return (
    <div>
      <h1>Authenticated Layout</h1>
      {children}
    </div>
  )
}


