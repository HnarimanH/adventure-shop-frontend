import React from "react";

function Dashboard(){

    const logOut = () =>{
        localStorage.removeItem('token')
        window.location.reload()
    }
    return(
        <>
        <div className="w-full h-full flex justify-center items-center">
            <h1>
                Yay you loged in!
            </h1>

            <button onClick={logOut} className=" w-40 h-10 bg-amber-50 border-2 borderBlack">
                logOut
            </button>

        </div>  
        </>
    );
}




export default Dashboard;