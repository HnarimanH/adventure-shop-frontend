import React, { useEffect, useState } from "react";
import { Minus } from "lucide-react";
import { useCart } from "../miniComponents/CartVariablesProvider";
import NextProducts from "../miniComponents/NextProducts";
import { useApi } from "../auth/ApiProvider";
import Product from "../miniComponents/product";
import CheckoutForm from "../miniComponents/Checkout";
export default function Cart() {
  const {api} = useApi();
  const {productsInCart, setProductsInCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaying, setIsPaying] = useState(false)



    useEffect(() => {
  const getCart = async () => {
    try {
      const res = await api.Cart("get");
      if (res?.data?.cart_items) {
        setProductsInCart(res.data.cart_items);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };
  getCart();
}, []);




  const productsPerPage = 6;
  const totalPages = Math.ceil(productsInCart.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;




  const nextNum = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };





  const prevNum = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };





  const currentProducts = productsInCart.slice(indexOfFirstProduct, indexOfLastProduct);
  
  if (!productsInCart || productsInCart.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white text-gray-500 text-xl mt-10">
        Cart is empty 🛒
      </div>
    );
  }


  
  return (
    <div className="h-full grid grid-cols-1 mt-10 ">
      <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Product type={'delete'} sortedProducts={currentProducts} cart={true}/>
      </div>
      <div className="h-20 w-full items-center justify-center flex mb-30">
        <NextProducts number={currentPage} event={prevNum} event2={nextNum} />
      </div>
      <div className="h-20 w-full items-center justify-center flex mb-30 ">
          <div
          onClick={()=>{setIsPaying(true)}}
           className="h-20 w-40 flex items-center justify-center border-2 rounded-2xl shadow-2xl  hover:scale-110 hover:bg-green-200 transform duration-300">
            Continue
          </div>
      </div>
      
      {isPaying && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl">
              <CheckoutForm />
              <button onClick={() => setIsPaying(false)}>Close</button>
            </div>
          </div>
        )}
    </div>
  );
}