import React from "react";
import HandleApiCalls from "../auth/Api";
import {useState} from "react";
import Input from "../miniComponents/Input";
import Button from "../miniComponents/Button";
import Title from "../miniComponents/Title";
const api = new HandleApiCalls();
function CreatAccform(){
    const [email,      setEmail] = useState("");
    const [username,   setUsername] = useState("");
    const [password,   setPassword] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name,  setLast_name] = useState("");
    const [error, setError] = useState("");
    
    const event  = async () =>{
        if (username && email && password && first_name && last_name){

            await api.Register(username, email, password, first_name, last_name).then((res) =>{
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
                <Title fileName={"BmoSayingHi.png"} text={"Register"}/>

                <h1 className="text-white sm:text-black text-shadow-2xs h-5">
                    {error}
                </h1>
                <div className="w-[375px] h-[300px] flex flex-col items-center justify-center gap-[15px] ">

                    <Input 
                    widthInput={"w-[355px]"}
                    placeHolder={"User name:"} t
                    type={"text"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />


                    <div className="w-full h-10 flex flex-row items-center justify-center gap-[15px]">
                        
                        <Input 
                        widthInput={"w-[170px]"} 
                        placeHolder={"Fist Name:"} 
                        type={"text"}
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}/>
                        
                        <Input 
                        widthInput={"w-[170px]"} 
                        placeHolder={"Last Name:"} 
                        type={"text"}
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}/>
                    
                    </div>
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
                    onChange={(e) => setPassword(e.target.value)}/>
                    

                </div>
               <Button 
               bgButton={"bg-[#E8F0Fe]"}
               marginBottom={"mb-5"}
               text={"Submit"} 
               event={event}  
               widthButton={"w-[190px]"}
               heightButton={"h-[48px]"}/>
            </>
    );
}




export default CreatAccform;