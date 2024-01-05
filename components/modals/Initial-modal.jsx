"use client";
import * as z from "zod"
import React from "react";
import {zodResolver} from "@hookform/resolvers/zod"
import { useEffect,useState } from "react";
import { Dialog, DialogContent,DialogDescription, DialogTitle, DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "../ui/form";
import { Button } from "../ui/button";
// import { Client } from '@clerk/nextjs/dist/types/server';

const formSchema =z.object({
    name:z.string().min(1,{
        message:"Server name is required"
    }),
    imageUrl:z.string().min(1,{
        message:"Server image is required"
    })
});

 const InitialModal = () => {
    const [isMounted, setIsMounted]=useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    const form = useForm({
        resolver : zodResolver(formSchema),
        defaultValues:{
            name:"",
            imageUrl:"",
        }
    });

    const isLoading = form.formState.isSubmitting;
    
    const onSubmit = async (values)=>{
        console.log(values);
    }
    if(!isMounted){
        return null;
    }
  return (
    <Dialog open>
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
                <div className="flex items-center justify-center text-center">Image</div>

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
                <Button disabled={isLoading} variant="primary">Create</Button>
            </DialogFooter>
        </form>
      </Form>
            </DialogContent>
    </Dialog>
  );
}

export default InitialModal
