import { Plus, Minus } from "lucide-react";
import React from "react";
import { useApi } from "../auth/ApiProvider";
import { useCart } from "./CartVariablesProvider";



function Product({type, sortedProducts}){
    const {api} = useApi()
    const {setProductsInCart, productsInCart} = useCart();
    return(
        sortedProducts.map((product) => (
      <div key={product.id} className="bg-white border-2 rounded-2xl gap-4 cursor-pointer w-60 p-4 shadow-2xl flex flex-col items-center justify-end hover:scale-125 transition-transform duration-300">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <div className="w-auto min-w-1/2 h-32 flex items-center justify-center border-2 rounded-2xl overflow-hidden">
            <img src={product.image_url} alt={product.name} className=" h-full object-cover " />
          </div>
          <div className="w-4/5 h-auto overflow-hidden text-center">
            <p>{product.description}</p>
          </div>
          <p className="text-green-600 font-semibold">${product.price}</p>
          
          {type === 'add' ? 
          <div onClick={async () => {
                const alreadyExists = productsInCart.some(p => p.id === product.id);
                if (!alreadyExists) {
                    const res = await api.Cart('add', product.id)
                    setProductsInCart(res.data.cart);
                }
                }} className="w-1/2 h-14 rounded-2xl text-4xl bg-green-300 border-2 flex items-center justify-center hover:scale-125 transform duration-300">
            <Plus className="w-full"/>
          </div>
          : 
          <div onClick={async () => {
          
            const res = await api.Cart('delete', product.id)
            setProductsInCart(res.data.cart);
            }} className="w-1/2 h-14 rounded-2xl text-4xl bg-red-300 border-2 flex items-center justify-center hover:scale-125 transform duration-300">
            <Minus className="w-full"/>
        </div>}
      </div>
)))}


export default Product