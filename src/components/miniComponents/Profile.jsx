import React from "react";
import { Settings  } from "lucide-react";

function Profile({title}){
    const text = title || ""
    console.log(text);
    const path = () => { 
        return Math.floor(Math.random() * 12)

    }
    if (!localStorage.getItem("avatar")) {
        localStorage.setItem("avatar", path());
    }
    const avatar = localStorage.getItem("avatar")
    return(
        <>
        <div className="w-auto h-20 flex flex-col justify-center items-center">
            <div className="w-10 h-10 border-2 rounded-full overflow-hidden flex items-center justify-center border-gray-200"> 
                <img src={`./src/assets/profilePics/${avatar}.jpeg`} alt="image" className="h-full" />
            
            </div>
            <p className="text-gray-400 text-sm">{text}</p>
        </div>
         

        
        </>
    )
}


export default Profile;