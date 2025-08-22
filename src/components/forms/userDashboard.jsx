import React from "react";
import Profile from "../miniComponents/Profile";
import Navigation from "../miniComponents/Navigation";
import Settings from "../miniComponents/Settings";
import { useState, useEffect } from "react";
import ShowProductForm from "./ShowProductForm";
import Filters from "../miniComponents/Filters";
import { ChevronLeft, LogOut } from "lucide-react"
import { useApi } from "../auth/ApiProvider";
import PopUp from "../miniComponents/popUp";
import { CartVariablesProvider } from "../miniComponents/CartVariablesProvider";
import Cart from "./Cart";
function UserDashboard(){
    const { api, setIsLogedIn } = useApi();
     const [popup, setPopup] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const CartOpen = () => {
        setOpenCart(true)
    }
    const CartClose = () => {
        setOpenCart(false)
    }


    const [price, setPrice] = useState(1000); 
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



    
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenFilter, setIsOpenFilter] = useState(false)

    const open = () => {
        setIsOpen(!isOpen)
    }


    const [openSettings, setOpenSettings] = useState(false)

    const OpenSettings = () => {
        setOpenSettings(!openSettings)
    }
    const logout = () => {
            localStorage.clear()
            setIsLogedIn(false)
        }




    useEffect(()=>{
        
        const validate_token = async()=>{

            if (!localStorage.getItem("refreshToken")) return;
            const validate_refreshtoken = await api.TokenRefresh(localStorage.getItem("refreshToken"))
            if (!validate_refreshtoken){
                setTimeout(() => {
                localStorage.clear();
                setIsLogedIn(false); 
            }, 0);
            }else{
                console.log("yooooooooo")
            }
        }
        validate_token();
    },[])
    return(
        
        <CartVariablesProvider>
        <div className="w-full h-full flex flex-col justify-center items-center relative overflow-x-hidden">
            <PopUp popup={popup} setPopup={setPopup} message={"are you sure you want to delete your account?"}/>
            <Settings setPopup={setPopup} event={OpenSettings} variable={openSettings}/>
            <div className={`w-full max-w-[700px] h-auto z-50  flex flex-col items-center justify-center fixed top-0 transform transition-transform duration-300 ${isOpen ? "translate-y-0" : "-translate-y-40"}`}>
                <div className={`w-full h-40 bottom-shadow border-r-2 border-b-2 border-l-2 rounded-b-2xl bg-[#c44e08] flex flex-row items-center justify-center fixed top-0`}>
                    <div className="w-1/2 h-auto flex flex-row items-center justify-start">
                        <div className="w-auto h-28 ml-5">
                            <Profile title={"Welcome"} titleSize={"sm"} size={"100"}/>
                        </div>
                    </div>
                    <div onClick={logout} className="w-1/2 h-full flex flex-row items-center justify-end ">
                            <LogOut className="w-14 h-14 mr-10 text-white hover:text-gray-400 transform duration-300"/>
                    </div>
                </div>
            </div>


            <div className={` transform duration-300 ${isOpenFilter ? "translate-x-0" : "translate-x-[80%]"} w-full max-w-[300px] h-full  max-h-[600px]  fixed right-0 z-16 flex flex-row-reverse items-center justify-center`}>
                <Filters price={price} setPrice={setPrice} isOpenFilter ={isOpenFilter} setIsOpenFilter={setIsOpenFilter} setCategory={setCategory} setSortBy={setSortBy}/>
                <div className="w-[20%]">
                    <ChevronLeft className="w-10 h-10" onClick={()=>{setIsOpenFilter(!isOpenFilter)}}/>
                </div>
            </div>
            
            
                <div className={` z-10 w-full h-auto  items-center justify-center ${openCart ? "hidden":"flex"}`}>
                    <ShowProductForm products={products} price={price} category={category} sortBy={sortBy}/>
                </div>
                <div className={` w-full  h-auto z-20 items-center justify-center bg-white ${openCart ? "flex":"hidden"}`}>
                    <Cart/>
                </div>


            <div className="w-full max-w-[700px] border-l-2 border-r-2 border-t-2  h-24  rounded-t-2xl bg-white  top-shadow flex flex-row items-center justify-center fixed bottom-0 z-48">
                <div className="w-[90%] h-full flex flex-row items-center justify-between">
                    
                    <Navigation title={"Home"} kind={"home"} event={CartClose}/>
                    <Navigation title={"Settings"} kind={"settings"} event={OpenSettings}/>
                    <Navigation title={"Profile"} kind={"profile"} event={open}/>
                    <Navigation title={"cart"} kind={"cart"} event={CartOpen}/>
                    
                </div>
            </div>

        </div>  
        </CartVariablesProvider>
    );
}




export default UserDashboard;