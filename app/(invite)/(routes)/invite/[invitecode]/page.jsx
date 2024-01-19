import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const InviteCodePage = async({
    params
}) => {
    const profile = await currentProfile();
    if(!profile){
        return redirectToSignIn();
    }
    if(!params.invitecode){
      return redirect("/");
    }

    const existing=await db.server.findFirst({
      where:{
        invitecode:params.invitecode,
        members:{
          some:{
            profileId : profile.id,
          }
        }
      }
    });
    if(existing){
      return redirect(`/servers/${existing.id}`);
    }

    const server = await db.server.update({
      where:{
        invitecode:params.invitecode,
      },
      data:{
        members:{
          create:{
            
              profileId: profile.id,
              roleName : "guest"
            
          }
        }
      }
    });
    if(server){
      return redirect(`/servers/${server.id}`)
    }
  return null;
}

export default InviteCodePage 