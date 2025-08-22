import React from "react";
import Navigation from "../miniComponents/Navigation";
import { useState, useEffect } from "react";
import Filters from "../miniComponents/Filters";
import { ChevronLeft} from "lucide-react"
import { useApi } from "../auth/ApiProvider";
import AddProduct from "./adminComponents/AddProduct";
import DeleteProduct from "./adminComponents/DeleteProduct";
import UpdateProduct from "./adminComponents/UpdateProduct";
import UpdateForm from "./adminComponents/UpdateForm";
function UserDashboard(){
    const {api, setIsLogedIn} = useApi()
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [price, setPrice] = useState(1000); 
    const [category, setCategory] = useState('All')
    const [sortBy, setSortBy] = useState('price')
    const [state, setState] = useState("addProduct")

    const [products, setProducts] = useState([]);
    const [productToUpdate, setProductToUpdate] = useState(null);
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await api.GetData()
            setProducts(res.data)
        };
        fetchData();
    }, []);
    useEffect(()=>{
        setState("updateForm")
    }, [productToUpdate])
    const logout = () => {
        localStorage.clear()
        setIsLogedIn(false)
    }

    




    


















    return(
        

        <div className="w-full h-full flex flex-col justify-center items-center relative overflow-x-hidden">
            


            <div className={` transform duration-300 ${isOpenFilter ? "translate-x-0" : "translate-x-[80%]"} w-full max-w-[300px] h-full  max-h-[600px]  fixed right-0 z-16 flex flex-row-reverse items-center justify-center`}>
                <Filters price={price} setPrice={setPrice} isOpenFilter ={isOpenFilter} setIsOpenFilter={setIsOpenFilter} setCategory={setCategory} setSortBy={setSortBy}/>
                <div className="w-[20%]">
                    <ChevronLeft className="w-10 h-10" onClick={()=>{setIsOpenFilter(!isOpenFilter)}}/>
                </div>
            </div>
            <div className={` z-20 w-full h-full  items-center justify-center ${state === "addProduct" ? "flex":"hidden"}`}>
                <AddProduct/>
            </div>
            <div className={` w-full  h-auto z-10 items-center justify-center bg-white ${state === "deleteProduct" ? "flex":"hidden"}`}>
                <DeleteProduct setProduct={setProducts} products={products} price={price} category={category} sortBy ={sortBy}/>
            </div>
            <div className={` w-full  h-auto z-10 items-center justify-center bg-white ${state === "updateProduct" ? "flex":"hidden"}`}>
                <UpdateProduct setProduct={setProductToUpdate} products={products} price={price} category={category} sortBy ={sortBy}/>
            </div>
            <div className={` w-full  h-full z-10 items-center justify-center bg-white ${state === "updateForm" ? "flex":"hidden"}`}>
                <UpdateForm productToUpdate={productToUpdate}/>
            </div>
           
            


            <div className="w-full max-w-[700px] border-l-2 border-r-2 border-t-2  h-24  rounded-t-2xl bg-white  top-shadow flex flex-row items-center justify-center fixed bottom-0 z-48">
                <div className="w-[90%] h-full flex flex-row items-center justify-between">
                    
                    <Navigation title={"Add Product"} kind={"addProduct"} event={()=>{setState("addProduct")}} />
                    <Navigation title={"Delete Product"} kind={"delProduct"} event={()=>{setState("deleteProduct")}} />
                    <Navigation title={"Update Product"} kind={"updateProduct"} event={()=>{setState("updateProduct")}} />
                    <Navigation title={"Logout"} kind={"logout"} event={logout}/>
                    
                </div>
            </div>

        </div>  

    );
}




export default UserDashboard;