import React from "react";
import { Settings, CircleUserRound, House, ShoppingCart, LogOut, Plus, Minus, ArrowBigUpDash } from "lucide-react";
import { useCart } from "./CartVariablesProvider";

function Navigation({title, kind, event}){
    
    const text = title || ""


    if (kind === "settings"){
        return(
        <div onClick={event}
        className="flex flex-col items-center justify-center transform duration-300 hover:scale-125">
            <Settings className="w-8 h-8 text-gray-500 stroke-2 cursor-pointer"/>
            <p className="text-gray-400 text-sm">{text}</p>
        </div>
        )
    }else if (kind === "profile"){
       return(
         <div onClick={event} 
         className="flex flex-col items-center justify-center transform duration-300 hover:scale-125">
            <CircleUserRound className="w-8 h-8 text-gray-500 stroke-2 cursor-pointer"/>
            <p className="text-gray-400 text-sm">{text}</p>
        </div>
       )
    }else if (kind === "home"){
       return(
         <div onClick={event}
         className="flex flex-col items-center justify-center transform duration-300 hover:scale-125">
            <House className="w-8 h-8 text-gray-500 stroke-2 cursor-pointer"/>
            <p className="text-gray-400 text-sm">{text}</p>
        </div>
       )

    }else if (kind === "logout"){
       return(
         <div onClick={event}
         className="flex flex-col items-center justify-center transform duration-300 hover:scale-125">
            <LogOut className="w-8 h-8 text-gray-500 stroke-2 cursor-pointer"/>
            <p className="text-gray-400 text-sm">{text}</p>
        </div>
       )
       
    }else if (kind === "addProduct"){
       return(
         <div onClick={event}
         className="flex flex-col items-center justify-center transform duration-300 hover:scale-125">
            <Plus className="w-8 h-8 text-gray-500 stroke-2 cursor-pointer border-2 rounded-full"/>
            <p className="text-gray-400 text-sm">{text}</p>
        </div>
       )
       
    }else if (kind === "delProduct"){
       return(
         <div onClick={event}
         className="flex flex-col items-center justify-center transform duration-300 hover:scale-125">
            <Minus className="w-8 h-8 text-gray-500 stroke-2 cursor-pointer border-2 rounded-full"/>
            <p className="text-gray-400 text-sm">{text}</p>
        </div>
       )
       
    }else if (kind === "updateProduct"){
       return(
         <div onClick={event}
         className="flex flex-col items-center justify-center transform duration-300 hover:scale-125">
            <ArrowBigUpDash className="w-8 h-8 text-gray-500 stroke-2 cursor-pointer border-2 rounded-full"/>
            <p className="text-gray-400 text-sm">{text}</p>
        </div>
       )
       
    }else if (kind === "cart"){
        const {numberOfProductsInCart} = useCart();
       return(
         <div onClick={event} className="flex flex-col items-center justify-center transform duration-300 hover:scale-125">
            <div className="flex flex-row items-start justify-start">
                <ShoppingCart className="w-8 h-8 text-gray-500 stroke-2 cursor-pointer"/>
                <div className="rounded-full bg-red-500 flex items-center justify-center w-5 h-5">
                    <p>{numberOfProductsInCart}</p>
                </div>
            </div>
            <p className="text-gray-400 text-sm">{text}</p>
        </div>
       )
    }
    
    
}
export default Navigation;