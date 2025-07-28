import React from "react";

function AdminDashboard(){
    const logOut = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('is_superuser')
        window.location.reload()
    }
    return(
        <>
        <div className="w-full h-full flex  items-center">
            

            <button onClick={logOut} className=" w-40 h-10 bg-amber-50 border-2 borderBlack">
                logOut
            </button>


            <div className="w-full h-[15%] rounded-2xl border-[1px] border-gray-50 shadow-2xl flex flex-row items-center justify-center fixed left-0 bottom-0">

            </div>

        </div>  
        </>
    );
}




export default AdminDashboard;