import { currentProfile } from "@/lib/currentProfile";
import { NextResponse } from "next/server";

export async function PATCH(
    req,params
){
    try {
        const profile = await currentProfile();
        const{searchParams}=new URL(req.url);
        const {role} = await req.json();

        const serverId = searchParams.get("serverId");

        if(!serverId){
            return new NextResponse("Server Id Missing",{status:400});
        }

        if(!profile){
            return new NextResponse("Unautorized",{status:401});
        }

        

    } catch (error) {
        console.log("MEMBER_ROLE",error);
        return new NextResponse("Internal Error",{status:500});
    }
}