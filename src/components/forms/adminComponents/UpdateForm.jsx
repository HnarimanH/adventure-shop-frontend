import React,{useState, useEffect} from "react";
import { useApi } from "../../auth/ApiProvider";
import CategoryDropdown from "../../miniComponents/CategoryDropdown";
import Input from "../../miniComponents/Input";
import Button from "../../miniComponents/Button";

export default function UpdateForm({productToUpdate}){
    if (!productToUpdate) return null;
    const {api} = useApi()
    const [productId, setProductId] = useState(productToUpdate.Id)
    const [productName, setProductName] = useState(productToUpdate.name)
    const [productImageUrl, setProductImageUrl] = useState(productToUpdate.image_url)
    const [productDescription, setProductDescription] = useState(productToUpdate.description)
    const [productPrice, setProductPrice] = useState(productToUpdate.price)
    const [productCategory, setProductCategory] = useState(productToUpdate.category)
    const [error, setError] = useState(undefined)
    useEffect(() => {
        setProductId(productToUpdate.id)
        setProductName(productToUpdate.name);
        setProductImageUrl(productToUpdate.image_url || null);
        setProductDescription(productToUpdate.description);
        setProductPrice(productToUpdate.price);
        setProductCategory(productToUpdate.category || "");
    }, [productToUpdate]);


    const updateProduct = async () => {
        if (productId && productName && productImageUrl && productDescription && productPrice && productCategory){
            const res = await api.UpdateProduct(productId, productName, productPrice, productCategory, productDescription, productImageUrl)
            if (res === null){
                setError("null")
            }else{
                setError(res)
                setTimeout(() => {
                    setError("");
                }, 5000);
            }
        }else{
            setError('all fields must be filled')
            setTimeout(() => {
                setError("");
            }, 5000);
        }
       
    }
    return(
        <div className="h-full w-full flex flex-col items-center justify-center bg-white">
        <div className="w-auto h-10 text-black text-2xl text-shadow-2xs">
            {error}
        </div>
        <div className={` flex
        flex-col justify-end items-center w-full 
        max-w-[400px] h-full max-h-[700px] 
        rounded-2xl border-2 shadow-2xl bg-white`}>

            <div className="w-auto min-w-1/2 h-32 flex items-center justify-center border-2  rounded-2xl overflow-hidden">

                <img src={productImageUrl} alt="image" className=" h-full object-cover" />

            </div>



            <div className="flex flex-col items-center justify-center gap-6 h-8/12">
                <CategoryDropdown 
                setCategory={setProductCategory} 
                categories={["Swords", "Armors", "Curses", "Musics"]} 
                placeHolder={"Select Category"}/>

                <Input 
                placeHolder={"Product Image URL"}
                type={"text"}
                value={productImageUrl}
                onChange={(e)=>{setProductImageUrl(e.target.value)}}
                />

                <Input 
                placeHolder={"Product Name"}
                type={"text"}
                value={productName}
                onChange={(e)=>{setProductName(e.target.value)}}
                />

                <Input
                Limit={200}
                placeHolder={"Product Description"}
                type={"text"}
                value={productDescription}
                onChange={(e)=>{setProductDescription(e.target.value)}}
                />

                <Input 
                placeHolder={"Product Price"}
                type={"number"}
                value={productPrice}
                onChange={(e)=>{setProductPrice(e.target.value)}}
                />

                <Button text={"Add"} event={updateProduct}  heightButton={"h-20"}  />
            </div>



        </div>
        </div>
        )
}