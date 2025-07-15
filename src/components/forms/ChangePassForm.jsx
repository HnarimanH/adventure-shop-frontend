import React, { useState } from "react";

function ChangePassForm({isBack, setIsBack}){
    const event = () =>{
        setIsBack('hidden')
    }
    return(
    <>
    <div className={`${isBack} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-400 z-50 flex justify-center items-center`}>
        <h1 onClick={event} className="cursor-pointer">back</h1>
    </div>
    </>
    )
}


export default ChangePassForm