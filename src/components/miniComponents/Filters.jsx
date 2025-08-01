import React from "react";
import { useState } from "react";
import CategoryDropdown from "./CategoryDropdown";

function Filters({price, setPrice, setIsOpenFilter, isOpenFilter, setCategory, setSortBy}){
    
    return(
        <div className={`w-[80%] h-full  flex flex-col items-center justify-center left-shadow rounded-2xl transform duration-300 bg-white`}>
            <div className="w-full h-1/3 flex flex-col items-center justify-center">
                <div className="text-xl w-[200px] max-w-md text-center">${price}</div>
                <div className="w-[200px] max-w-md flex flex-col items-center justify-center gap-4 mb-10">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full accent-black"
                    />
                    
                </div>
            </div>
            <div className="w-full h-1/3 flex flex-col items-center justify-center">
                <CategoryDropdown setCategory={setCategory} categories={["Swords", "Armors", "Curses", "Musics", "All"]} placeHolder={"Select Category"}/></div>
            <div className="w-full h-1/3 flex flex-col items-center justify-center">
            <CategoryDropdown setCategory={setSortBy} categories={["Price", "Name", "Stock"]} placeHolder={"Sort by"}/></div>

           
           
         </div>
         )
}

export default Filters;