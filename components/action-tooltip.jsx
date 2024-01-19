"use client";

import { Tooltip,TooltipContent,TooltipProvider,TooltipTrigger } from "@/components/ui/tooltip";

export const ActionTooltip = ({
    label,children,side,align
})=>{
    return(
        <TooltipProvider>
            <Tooltip delayDuration={40}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side}align={align}>
                    <p className=" text-sm capitalize">
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

