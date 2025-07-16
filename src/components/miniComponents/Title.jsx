import React from "react";





function Title({text, fileName, }){
    return(
        <>
            <div style={{fontFamily:"cursive"}}
            className="h-[100px] w-[200px]  flex  flex-col sm:flex-row lg:flex-col items-center justify-center mb-10 sm:mb-0 lg:mb-10">

                <img src={`./src/assets/${fileName}`} alt="image" className="h-full w-auto object-cover"/>

                <h1 className="text-2xl text-center text-white text-shadow-lg/30 sm:text-black">
                   {text}
                </h1>


            </div>
        </>
    );
}




export default Title;