import React from "react";
import { Settings, CircleUserRound, House, ShoppingCart } from "lucide-react";


function Navigation({title, kind, event}){
    const text = title || ""


    if (kind === "settings"){
        return(
        <div onClick={event}
        className="flex flex-col items-center justify-center">
            <Settings className="w-8 h-8 text-gray-500 stroke-1  hover:stroke-2 cursor-pointer"/>
            <p className="text-gray-400 text-sm">{text}</p>
        </div>
        )
    }else if (kind === "profile"){
       return(
         <div onClick={event} 
         className="flex flex-col items-center justify-center">
            <CircleUserRound className="w-8 h-8 text-gray-500 stroke-1 hover:stroke-2 cursor-pointer"/>
            <p className="text-gray-400 text-sm">{text}</p>
        </div>
       )
    }else if (kind === "home"){
       return(
         <div className="flex flex-col items-center justify-center">
            <House className="w-8 h-8 text-gray-500 stroke-1  hover:stroke-2 cursor-pointer"/>
            <p className="text-gray-400 text-sm">{text}</p>
        </div>
       )
    }else if (kind === "cart"){
       return(
         <div className="flex flex-col items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-gray-500 stroke-1  hover:stroke-2 cursor-pointer"/>
            <p className="text-gray-400 text-sm">{text}</p>
        </div>
       )
    }
    
    
}
export default Navigation;