// "use client"
import React from 'react'
import { initialProfile } from '@/lib/initial-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation';
import InitialModal from '@/components/modals/Initial-modal';
// import { useForm } from 'react-hook-form';
const Setup = async () => {
  const profile =await initialProfile();
  const server = await db.server.findFirst({
    where:{
        members:{
            some:{
                profileId: profile.id
            }
        }
    }
  });
  if(server){
    return redirect(`/servers/${server.id}`);
  }else{

    return (
      <InitialModal/>
    
    )
  }
}
export default Setup;