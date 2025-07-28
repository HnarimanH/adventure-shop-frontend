import React from "react";
import Button from "../miniComponents/Button";
import Loginform from "../forms/Loginform";
import CreatAccform from "../forms/CreatAccForm";
import ChangePassForm from "../forms/ChangePassForm";
import { useState } from "react";
function SignPage(){
    const [isLogin, setIsLogin] = useState(true);
    

    const pageHandler = ()=>{
        setIsLogin(!isLogin)
        
    }
   


    



    


    

    return(
        <div className="w-full h-full flex flex-col-reverse lg:flex-row justify-center items-center">
            <div className=" w-full lg:w-1/2 h-full smh-1/2 lg:h-full overflow-hidden relative flex justify-center items-center gap-7">
                
                
                <div className="absolute z-10 w-full h-full sm:hidden flex flex-col items-center justify-center  backdrop-blur-md ">
                    {isLogin ? <Loginform /> : <CreatAccform/>}
                    
                    <Button 
                    bgButton={"bg-[#E8F0Fe]"}
                    text={`${isLogin ? "Create account" : "Log in"}`} 
                    event={pageHandler} 
                    widthButton={"w-[190px]"}
                    heightButton={"h-[48px]"}/>
                </div>


                <img src="/assets/treehouse.png" alt="image" className="absolute h-full sm:w-full sm:h-full lg:w-auto object-cover"/>
                 
                <div className="absolute w-[400px] h-[500px] hidden sm:flex flex-col justify-center items-center">
                    

                    <div 
                    className="w-full h-full shadow-2xl flex flex-col font-Glandolia justify-center items-center backdrop-blur-md border-white/50 border-2 rounded-2xl">

                        <div className="h-1/2 flex flex-col items-center justify-center">
                            <h1 className="text-3xl text-white title-font">Welcome to</h1>
                            <h1 className="text-4xl text-white title-font">Adventure Shop</h1>
                        </div>

                        <div className="h-1/2 flex flex-col items-center justify-center">
                            <Button 
                            bgButton={"bg-[#E8F0Fe]"}
                            text={`${isLogin ? "Create account" : "Log in"}`} 
                            event={pageHandler} 
                            widthButton={"w-[190px]"}
                            heightButton={"h-[48px]"}/>
                        </div>
                        
                    </div>

                   

                    

                </div>

            </div>


            <div className="w-full lg:w-1/2 h-full sm:h-1/2 lg:h-full  hidden sm:flex flex-col items-center justify-center bg-">

                {isLogin ? <Loginform/> : <CreatAccform/>}
            </div>
        </div>
    )
}



export default SignPage;