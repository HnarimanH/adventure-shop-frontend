import React, { useState } from "react";
import Input from "../miniComponents/Input";
import Button from "../miniComponents/Button";
import HandleApiCalls from "../auth/Api";
import Title from "../miniComponents/Title";
const api = new HandleApiCalls()
function ChangePassForm({isBack, setIsBack}){
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [new_password, setPassword] = useState("");


    const back = () =>{
        setIsBack('hidden')
    }


    const event  = async () => {
        if (email && new_password){

            await api.ForgotPass(email, new_password).then((res) =>{
            setError(res);
            setTimeout(() => {
                setError("");
            }, 5000);
            })

        }else{
            
            setError('all fields must be filled')
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }
    


    return(
    <>
    <div className={`${isBack} flex-col gap-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full backdrop-blur-md backdrop-brightness-50 z-50 flex justify-center items-center shadow-2xl `}>
            <div className="w-1/2 h-2/3 bg-white rounded-2xl flex flex-col items-center justify-center gap-10">
            <Title fileName={"BmoSayingHi.png"} text={"Please enter your email"}/>
            <h1 className="text-white sm:text-black text-shadow-2xs h-10">
                    {error}
                </h1>
            <Input 
                widthInput={"w-[355px]"} 
                placeHolder={"Email:"}
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            <Input 
                widthInput={"w-[355px]"} 
                placeHolder={"New password:"}
                type={"password"}
                value={new_password}
                onChange={(e) => setPassword(e.target.value)}/>


            <Button 
               bgButton={"bg-[#E8F0FE]"}
               marginBottom={"mb-5"}
               text={"send reset email"} 
               event={event} 
               widthButton={"w-[190px]"}
               heightButton={"h-[48px]"}/>


            <Button 
               bgButton={"bg-[#E8F0FE]"}
               marginBottom={"mb-5"}
               text={"Back"} 
               event={back} 
               widthButton={"w-[190px]"}
               heightButton={"h-[48px]"}/>
            </div>
        
    </div>
    </>
    )
}


export default ChangePassForm