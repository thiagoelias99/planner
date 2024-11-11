"use client"

import { Button } from '@/components/ui/button';
import Image from "next/image";

export default function GoogleButton() {
  return (
    <Button
      variant="secondary"
    // onClick={async () => await signIn('github', { callbackUrl: "/home" })}
    >
      <Image
        aria-hidden={true}
        src="/icons/google.svg"
        width={24}
        height={24}
        alt="github logo"
      />
      <span>Google</span>
    </Button>
  )
}