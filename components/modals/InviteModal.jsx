"use client";

import React, { useState } from "react";
import { useOrigin } from "@/hooks/useOrigin";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "../ui/dialog";

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/usemodalstore";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { db } from "@/lib/db";
import axios from "axios";
// import { Client } from '@clerk/nextjs/dist/types/server';

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const isModalopen = isOpen && type === "invite";
  const origin = useOrigin();
  const {server} = data;
  const [copied,setCopied]=useState(false);
  const [isLoading,setLoading]=useState(false);

  const onCopy=()=>{
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(()=>{
      setCopied(false);

    },3000);
  }


  const inviteUrl =`${origin}/invite/${server?.invitecode}`;


  const onNew = async()=>{
    try {
      setLoading(true);

      const response = await axios.patch(`/api/servers/${server?.id}/invitecode`);
      onOpen("invite",{server:response.data});
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }


  return (
    <Dialog open={isModalopen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-10 px-8">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-8">
          <Label className="uppercase text-xs font-bold  text-zinc-500 dark:text-secondary/70">
            Server Invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2 ">
            <Input
            disabled={isLoading}
              className=" bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button disabled={isLoading} onClick={onCopy} size="icon">
              {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4" />}
              
            </Button>
          </div>
          <Button
          disabled={isLoading}
          onClick={onNew}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4 "

          >
            Generate new link
             <RefreshCw className="ml-6 w-4 h-4"/>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
