import React from "react";

function Input({placeHolder, widthInput, type, value, onChange}){
    const width = widthInput || "w-full";
    return(
        <>
            <input 
            type={type} 
            placeholder={placeHolder} 
            value={value}
            onChange={onChange}
            className={`${width} bg-[#E8F0Fe] h-10 text-center hover:bg-gray-200 transition duration-200 backdrop-blur-md border-white/50 border-2 rounded-2xl`}/>
        </>
    );  
}



export default Input;

