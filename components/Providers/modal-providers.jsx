"use client";

import { InviteModal } from "../modals/InviteModal";
import { CreateServerModal } from "../modals/createServermodal";
import { EditServerModal } from "../modals/editServer";
import { useState,useEffect } from "react";
import { MembersModal } from "../modals/membersModal";

export const ModalProvider = ()=>{
    const [isMounted, setIsMounted]=useState(false);
    useEffect(()=>{
        setIsMounted(true);
    },[])
    if(!isMounted){
        return null;
    }
    return(
        <>
            <CreateServerModal/>
            <InviteModal/>
            <EditServerModal/>
            <MembersModal/>
        </>
    )
}