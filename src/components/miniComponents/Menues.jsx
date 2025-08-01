import React from "react";
import Title from "./Title";
import Profile from "./Profile";
import Button from "./Button";
import ChangePassForm from "../forms/ChangePassForm";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";


function Menue({kind, event, variable}){
    const logout = () =>{
        localStorage.clear()
        window.location.reload()
    }
    const [open, setOpen] = useState('');
    const [back, setBack] = useState('hidden');
    const ForgotPassword = ()=>{
            setBack('flex')
        }



    if (kind === "settings"){   
        return(
            <div className={`absolute top-0 right-0 w-full h-full bg-gray-300 z-2 transform duration-300 sm:hidden ${variable ? "" : "hidden"}`}>
                <div className="w-full h-full flex flex-col items-center justify-center">
                    
                    <div className="w-3/4 h-2/3  border-l-4 border-white flex flex-col items-center justify-center gap-20">

                        
                        


                        <div onClick={ForgotPassword}
                         className="cursor-pointer w-40 h-20 text-3xl text-white hover:text-4xl hover:text-gray-400 transform duration-300">
                            Change Password
                        </div>
                        

                        <div onClick={logout} className="cursor-pointer w-40 h-10 text-3xl text-white hover:text-4xl hover:text-gray-400 transform duration-300">
                            logOut
                        </div>

                    </div>

                    <div onClick={event} 
                    className="cursor-pointer fixed bottom-5 left-5 w-20 h-20 text-3xl text-white hover:text-4xl hover:text-gray-400 flex items-center justify-center">
                        <ArrowLeft className="w-10 h-10 hover:w-14 hover:h-14 transform duration-300"/>
                    </div>
                </div>
                <ChangePassForm isBack={back} setIsBack={setBack}/>
            </div>
            
        )
    }
}


export default Menue;