import React from "react";
import { Settings  } from "lucide-react";

function Profile({title, size, titleColor, titleSize}){
    const Title = title || ""
    const Size = size || "10"
    const TitleColor = titleColor || "white"
    const TitleSize = titleSize || "sm"



    const avatar = localStorage.getItem("profilePic")


   
    return(
        <>
        <div className="w-auto h-auto flex flex-row justify-center items-start gap-2">
            <div className={`w-[${Size}px] h-[${Size}px] border-2 rounded-full overflow-hidden flex items-center justify-center border-gray-200`}> 
                <img src={`/assets/profilePics/${avatar}.jpeg`} alt="image" className="h-full" />

            </div>
            <div>
                <p className={`text-${TitleColor} text-${TitleSize}`}>{Title}</p>
                <p className={`text-${TitleColor} text-xl`}>{localStorage.getItem("first_name")}</p>
            </div>
        </div>
         

        
        </>
    )
}


export default Profile;