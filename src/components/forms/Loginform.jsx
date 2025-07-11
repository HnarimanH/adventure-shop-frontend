import HandleApiCalls from "../auth/Api";
import Input from "../miniComponents/Input";
import Button from "../miniComponents/Button";
import Title from "../miniComponents/Title";
import React, { useState } from "react";

const api = new HandleApiCalls();
function Loginform(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");



    
    const event  = async () => {
        const res = await api.Login(email, password)
        setError(res);
        setTimeout(() => {
                setError("");
            }, 5000);

    }
    return(
        <>

                <Title fileName={"BmoSayingHi.png"} text={""}/>

                <h1 className="text-white sm:text-black">
                    {error}
                </h1>
                <div className="w-[375px] h-[300px] flex flex-col items-center justify-center gap-[15px] ">

                    
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


                    <h1 className=" underline text-white sm:text-black">
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