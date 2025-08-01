import React from "react";
import Profile from "../miniComponents/Profile";
import Navigation from "../miniComponents/Navigation";
import Menue from "../miniComponents/Menues";
import { useState, useEffect } from "react";
import ShowProductForm from "./ShowProductForm";
import Filters from "../miniComponents/Filters";
import { ChevronLeft } from "lucide-react"
import { useApi } from "../auth/ApiProvider";

function UserDashboard(){
    const { api, isLoading } = useApi();


    const [price, setPrice] = useState(100); 
    const [category, setCategory] = useState('All')
    const [sortBy, setSortBy] = useState('price')




    const [products, setProducts] = useState([]);
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await api.GetData()
            setProducts(res.data)
        };
        fetchData();
    }, []);


    const logOut = () =>{
        localStorage.clear();
        window.location.reload()
    }

    
    const [isOpen, setIsOpen] = useState(false)
     const [isOpenFilter, setIsOpenFilter] = useState(true)

    const open = () => {
        setIsOpen(!isOpen)
    }


    const [openSettings, setOpenSettigns] = useState(false)

    const OpenSettings = () => {
        setOpenSettigns(!openSettings)
    }
    return(
        
        
        <div className="w-full h-full flex flex-col justify-center items-center relative overflow-x-hidden">

            <Menue kind={"settings"} event={OpenSettings} variable={openSettings}/>
            <div className={`w-full max-w-[700px] h-40 z-20  flex flex-col items-center justify-center fixed top-0 transform transition-transform duration-300 ${isOpen ? "translate-y-0" : "-translate-y-40"}`}>
                <div className={`w-full h-full bottom-shadow rounded-b-2xl bg-[#c44e08] flex flex-row items-center justify-center fixed top-0`}>
                    <div className="w-1/2 h-full flex flex-row items-start justify-start">
                        <div className="w-auto h-auto mt-[30px]  ml-5">
                            <Profile title={"Welcome"} titleSize={"sm"} size={"100"}/>
                        </div>
                    </div>
                    <div className="w-1/2 h-full flex flex-row items-start justify-start ">
                            
                    </div>
                    
                </div>
            </div>


            <div className={` transform duration-300 ${isOpenFilter ? "translate-x-0" : "translate-x-[80%]"} w-full max-w-[300px] h-full  max-h-[600px]  fixed right-0 z-16 flex flex-row-reverse items-center justify-center`}>
                <Filters price={price} setPrice={setPrice} isOpenFilter ={isOpenFilter} setIsOpenFilter={setIsOpenFilter} setCategory={setCategory} setSortBy={setSortBy}/>
                <div className="w-[20%]">
                    <ChevronLeft className="w-10 h-10" onClick={()=>{setIsOpenFilter(!isOpenFilter)}}/>
                </div>
            </div>
            
            
            
            <div className="w-full h-full overflow-y-auto flex items-center justify-center">
                <ShowProductForm products={products} price={price} category={category} sortBy={sortBy}/>
            </div>
            

            <div className="w-full max-w-[700px] h-24 rounded-t-2xl bg-white  top-shadow flex flex-row items-center justify-center fixed bottom-0">
                <div className="w-[90%] h-full flex flex-row items-center justify-between">
                    <Navigation title={"Home"} kind={"home"}/>
                    <Navigation title={"Settings"} kind={"settings"} event={OpenSettings}/>
                    <Navigation title={"Profile"} kind={"profile"} event={open}/>
                    <Navigation title={"cart"} kind={"cart"}/>
                </div>
            </div>

        </div>  
        
    );
}




export default UserDashboard;