import { currentProfile } from "@/lib/currentProfile"
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { ServerHeader } from "./serverHeader";
export const ServerSidebar=async ({
    serverId
}) =>{
    const profile =await currentProfile();

    if(!profile){
        return redirect("/");
    }

    const server = await db.server.findUnique({
        where:
        {
            id:serverId,
        },
        include:{
            // invitecode:true,
            channels:{
                orderBy:{
                    createdAt:"asc",
                }
            },
            members:{
                include:{
                    profile:true,        
                },
                orderBy:{
                    role :"asc"
                }
            }
        }
    });

    const textChannels = server?.channels.filter((channel)=>channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel)=>channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel)=>channel.type === ChannelType.VIDEO);
    const members = server?.members.filter((member)=> member.profileId!==profile.id);

    if(!server){
        return redirect("/");
    }

    const role = server.members.find((member)=>member.profileId === profile.id)?.role;



    return (
        <div
        className="flex flex-col h-full text-primary w-full bg-[#F2F3F5] dark:bg-[#2B2D31] ">
            <ServerHeader
                server={server}
                role={role}
            />
        </div>
    )
}