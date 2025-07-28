import React from "react";
import Profile from "../miniComponents/Profile";
import Navigation from "../miniComponents/Navigation";
function UserDashboard(){
    console.log(localStorage.getItem("token"))
    const logOut = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('is_superuser')
        window.location.reload()
    }
    return(
        
        <>
        <div className="w-full h-full flex justify-center items-center">
            

            <button onClick={logOut} className=" w-40 h-10 bg-amber-50 border-2 borderBlack">
                logOut
            </button>

            <div className="w-full max-w-[700px] h-24 rounded-2xl top-shadow flex flex-row items-center justify-center fixed left-0 bottom-0">
                <div className="w-[90%] h-full flex flex-row items-center justify-between">
                    <Navigation title={"Settings"} kind={"settings"}/>
                    <Navigation title={"Profile"} kind={"profile"}/>
                    <Navigation title={"Home"} kind={"home"}/>
                </div>
            </div>

        </div>  
        </>
    );
}




export default UserDashboard;