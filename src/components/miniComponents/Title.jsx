import React from "react";





function Title({text, fileName, }){
    return(
        <>
            <div style={{fontFamily:"cursive"}}
            className="h-[200px] w-[200px]  flex flex-col items-center justify-center">

                <img src={`./src/assets/${fileName}`} alt="image" className="h-auto w-full object-cover"/>

                <h1 className="text-2xl text-white text-shadow-lg/30 sm:text-black">
                   {text}
                </h1>


            </div>
        </>
    );
}




export default Title;