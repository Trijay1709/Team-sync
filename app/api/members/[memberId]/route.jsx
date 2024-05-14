import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req
){
    try {

        const profile = await currentProfile();
        const{searchParams}=new URL(req.url);
        const serverId = searchParams.get("serverId");
        const memberId = searchParams.get("memberId");
        if(!profile){
            return new NextResponse("Unautorized",{status:401});
        }

        if(!serverId){
            return new NextResponse("Server Id Missing",{status:400});
        }
        
        if(!memberId){      
            return new NextResponse("Member Id Missing",{status:400});
        }

        const server = await db.server.update({
            where:{
                id: serverId,
                profileId : profile.id,
            },
            data :{
                members:{
                    deleteMany:{
                            id:memberId,
                            profileId:{
                                not:profile.id
                            }
                    }
                }
            },
            include:{
                members:{
                    include:{
                        profile:true,

                    },
                    orderBy:{
                        role:"asc"
                    }
                }
            }
        });
        return NextResponse.json(server);


    } catch (error) {
        console.log ("  MEMEBER_ID_DELETE",error);
        return new NextResponse("Internal error",{status:500});
    }
}

export async function PATCH(
    req
){
    try {
        const profile = await currentProfile();
        const{searchParams}=new URL(req.url);
        const {role} = await req.json();

        const serverId = searchParams.get("serverId");
        const memberId = searchParams.get("memberId");

        if(!serverId){
            return new NextResponse("Server Id Missing",{status:400});
        }

        if(!profile){
            return new NextResponse("Unautorized",{status:401});
        }
        
        if(!memberId){
            return new NextResponse("Member Id missing",{status:400});
        }
        const existingServer = await db.server.findUnique({
            where: {
                id: serverId,
                profileId: profile.id,
            },
        });
        
        if (!existingServer) {
            return new NextResponse("Server not found", { status: 404 });
        }
        const server = await db.server.update({
            where: {
                id: serverId,
                profileId : profile.id,
            },
            data:{
                members:{
                    update :{
                        where:{
                            id: memberId,
                            profileId:{
                                not : profile.id
                            }
                        },
                        data:{
                            role,
                        }


                    }
                }
            },
            include:{
                members:{
                    include:{
                        profile:true,

                    },
                    orderBy:{
                        role:"asc"
                    }
                }
            }
        });
        return NextResponse.json(server);
        

    } catch (error) {
        console.log("MEMBER_ROLE",error);
        return new NextResponse("Internal Error",{status:500});
    }
}