import React from "react";
import Profile from "../miniComponents/Profile";
import Navigation from "../miniComponents/Navigation";
import { useState } from "react";

function UserDashboard(){
    console.log(localStorage.getItem("token"))
    const logOut = () =>{
        localStorage.clear();
        window.location.reload()
    }


    const [isOpen, setIsOpen] = useState(true)

    const open = () => {
        setIsOpen(!isOpen)
    }


    return(
        
        
        <div className="w-full h-full flex flex-col justify-center items-center">

            <div className="w-full max-w-[700px] h-40 rounded-b-2xl bottom-shadow bg-[#c44e08] flex flex-row items-center justify-center fixed top-0">
                <div className="w-1/2 h-full flex flex-row items-start justify-start">
                    <div className="w-auto h-auto mt-[30px]  ml-5">
                        <Profile title={"Welcome"} titleSize={"sm"} size={"100"}/>
                    </div>
                </div>
                <div className="w-1/2 h-full flex flex-row items-start justify-start">
                    
                </div>
            </div>
            

            <button onClick={logOut} className=" w-40 h-10 bg-amber-50 border-2 border-black">
                logOut
            </button>

            <div className="w-full max-w-[700px] h-24 rounded-t-2xl  top-shadow flex flex-row items-center justify-center fixed bottom-0">
                <div className="w-[90%] h-full flex flex-row items-center justify-between">
                    <Navigation title={"Settings"} kind={"settings"}/>
                    <Navigation title={"Profile"} kind={"profile"}/>
                    <Navigation title={"Home"} kind={"home"}/>
                </div>
            </div>

        </div>  
        
    );
}




export default UserDashboard;