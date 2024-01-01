import React from 'react'
import { Button } from '@/components/ui/button'
import { SignOutButton,UserButton } from "@clerk/nextjs";
import { ModeToggle } from '@/components/ModeToggle';

const page = () => {
  return (
    <div>
      {/* <Button> Button </Button> */}
      {/* <SignOutButton/> */}
      <UserButton afterSignOutUrl='/'/>
      <ModeToggle/>
    </div>
  )
}

export default page