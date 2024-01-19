import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
export async function PATCH(
    req,
    {params}
){
    try {
        const profile = await currentProfile();
        if (!profile){

            return new NextResponse("Unauthorized",{status:401});
        }
        if(!params.serverId){
            
            return new NextResponse("Server Id missing",{status:400});
        }
        const server = await db.server.update({
            where:{
                id: params.serverId,
                profileId:profile.id,

            },
            data:{
                invitecode: uuidv4(),
            }
        })
        return NextResponse.json(server);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error",{status:500});
    }
}