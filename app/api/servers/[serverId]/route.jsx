import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req,{params}
){
    try {
        const profile = await currentProfile();
        const {name,imageUrl}=await req.json();
        if (!profile){

            return new NextResponse("Unauthorized",{status:401});
        }
        const server = await db.server.update({
            where:{
                id: params.serverId,
                profileId : profile.id
            },
            data:{
                name,
                imageUrl,
            }
        });
        return NextResponse.json(server);
    } catch (error) {
        console.log("SERVERIDPATCH",error);
        return new NextResponse("Internal Error",{status:500});
    }
}