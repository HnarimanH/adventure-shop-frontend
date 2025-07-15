import HandleApiCalls from "../auth/Api";
import Input from "../miniComponents/Input";
import Button from "../miniComponents/Button";
import Title from "../miniComponents/Title";
import ChangePassForm from "./ChangePassForm";
import React, { useState } from "react";

const api = new HandleApiCalls();
function Loginform(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [back, setBack] = useState('hidden');
     const ForgotPassword = ()=>{
        setBack('flex')
    }
    
    

    
    const event  = async () => {
        const res = await api.Login(email, password)
        setError(res);
        setTimeout(() => {
                setError("");
            }, 5000);

    }
    return(
        <>
                <ChangePassForm isBack={back} setIsBack={setBack}/>
                <Title fileName={"BmoSayingHi.png"} text={"Login"}/>

                <h1 className="text-white sm:text-black text-shadow-2xs h-10">
                    {error}
                </h1>
                
                <div className="w-[375px] h-[200px] sm:h-[300px] lg:h-[200px] flex flex-col items-center justify-center gap-[15px] ">

                    
                    <Input 
                    widthInput={"w-[355px]"} 
                    placeHolder={"Email:"}
                    type={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>


                    <Input 
                    widthInput={"w-[355px]"} 
                    placeHolder={"Password:"} 
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value) }/>


                    <h1 onClick={ForgotPassword}
                    className=" underline text-white sm:text-black cursor-pointer hover:text-blue-400">
                        Forgot Password?
                    </h1>

                </div>
               <Button 
               bgButton={"bg-[#E8F0Fe]"}
               marginBottom={"mb-5"}
               text={"Login"} 
               event={event} 
               widthButton={"w-[190px]"}
               heightButton={"h-[48px]"}/>

            </>
    );
}




export default Loginform;                                      