import React, { useState } from "react";

function Input({placeHolder, widthInput, type, value, onChange, Limit}){
    const width = widthInput || "w-full";
    const [isVisible, setIsVisible] = useState(false)
    const eyeIconPath = isVisible ? '/assets/eye.png' : '/assets/closedEye.png';
    const visibleType = isVisible ? 'text' : type;
    let hidden = 'hidden'
    let limit = Limit || 180
    if (type == 'password'){
        hidden = ''
        limit = 30
    }
    const event = () =>{
        setIsVisible(!isVisible)
    }

    return(
       <div className=" relative flex flex-row justify-center items-center  bg-[#E8F0Fe] h-10  shadow-2xl hover:bg-gray-200 transition duration-200 backdrop-blur-md border-white/50 border-2 rounded-2xl">
            <input 
            type={visibleType} 
            placeholder={placeHolder} 
            value={value}
            onChange={onChange}
            maxLength={limit}
            className={`${width} h-10 rounded-2xl hover:bg-gray-200 text-center focus:outline-none focus:ring-0 bg-none border-2`}/>
            <img src={eyeIconPath} alt="image" className={` absolute right-2 h-[40px] ${hidden} `} onClick={event}/>
        </div>
    );  
}



export default Input;

