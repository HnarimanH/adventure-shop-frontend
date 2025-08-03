import React from "react";



function NextProducts({number, event, event2}){







    return(
        <div className="w-full h-10 flex flex-row items-center justify-center gap-2 ">
            <div onClick={event} className="w-8 h-10 cursor-pointer hover:scale-125 shadow-lg flex flex-row items-center justify-center text-2xl  text-black rounded-full transform duration-300 ">
                {"<"}
            </div>
            <h1>
                {number}
            </h1>
            <div onClick={event2} className="w-8 h-10 cursor-pointer hover:scale-125 shadow-lg flex flex-row items-center justify-center text-2xl  text-black rounded-full transform duration-300 ">
                {">"}
            </div>
        </div>
    );
}


export default NextProducts