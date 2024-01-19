import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { MemberRole } from "@prisma/client";
const prisma=new PrismaClient();
export async function POST(Request){
    try{
        const{name,imageUrl}=await Request.json();
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unautorized",{status:401});
        }

        const server = await prisma.server.create({
            data:{
                profileId:profile.id,
                name,
                imageUrl,
                invitecode : uuidv4(),
                channels:{
                    create:[
                        {
                            name: "general",profileId : profile.id
                        }
                    ]
                },
                members:{
                    create:[
                        {
                            
                                profileId:profile.id, roleName:"Owner",role:MemberRole.ADMIN
                            
                        }
                    ]
                }

            }
        });
        return NextResponse.json(server);
    }catch(error){
        console.log("SERVERS_POST",error);
        return new NextResponse("Internal Error",{status:500});
    }
}