"use client";
import * as z from "zod"
import React, { useEffect } from "react";
import {zodResolver} from "@hookform/resolvers/zod"

import { Dialog, DialogContent,DialogDescription, DialogTitle, DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { FileUpload } from "../fileupload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/usemodalstore";
// import { Client } from '@clerk/nextjs/dist/types/server';

const formSchema =z.object({
    name:z.string().min(1,{
        message:"Server name is required"
    }),
    imageUrl:z.string().min(1,{
        message:"Server image is required"
    })
});

 export const EditServerModal = () => {
    const {isOpen,onClose,type,data} = useModal();
    const router = useRouter();
    const isModalopen = isOpen && type === "editServer";
    const {server} = data;
    const form = useForm({
        resolver : zodResolver(formSchema),
        defaultValues:{
            name:"",
            imageUrl:"",
        }
    });
    useEffect(()=>{
      if(server){
        form.setValue("name",server.name);
        form.setValue("imageUrl",server.imageUrl);
      }
    },[server,form]);

    const isLoading = form.formState.isSubmitting;
    
    const onSubmit = async (values)=>{
      try {
        await axios.patch(`/api/servers/${server?.id}`,values);

        form.reset();
        router.refresh();
        onClose();
        // window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
    const handleClose = ()=>{
      form.reset();
      onClose();
    }
    
  return (
    <Dialog open={isModalopen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-10 px-8">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-xl text-center text-zinc-500">
            Give your server a personality with a name and image
          </DialogDescription>
        </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
                <div className="flex items-center justify-center text-center">
                  <FormField control={form.control} name="imageUrl" render={({field})=>(
                    <FormItem>
                      <FormControl>
                        <FileUpload
                        endpoint="serverImage"
                        value = {field.value}
                        onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}>

                  </FormField>
                </div>

            <FormField
            control={form.control}
            name = "name"
            render={({field})=>(
                <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server Name
                    </FormLabel>
                    <FormControl>
                        <Input disabled={isLoading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black ring-offset-0" placeholder="Enter the server name" {...field}/>

                        
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
                <Button disabled={isLoading} variant="primary">Edit</Button>
            </DialogFooter>
        </form>
      </Form>
            </DialogContent>
    </Dialog>
  );
}


