import React, { useEffect, useState } from "react";
import { Minus } from "lucide-react";
import { useCart } from "../miniComponents/CartVariablesProvider";
import NextProducts from "../miniComponents/NextProducts";
import { useApi } from "../auth/ApiProvider";
import Product from "../miniComponents/product";
export default function Cart() {
  const {api} = useApi();
  const {productsInCart, setProductsInCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);




    useEffect(() => {
  const getCart = async () => {
    try {
      const res = await api.Cart("get");
      if (res?.data?.cart) {
        setProductsInCart(res.data.cart);
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
        <Product type={'delete'} sortedProducts={currentProducts}/>
      </div>
      <div className="h-20 w-full items-center justify-center flex mb-30">
        <NextProducts number={currentPage} event={prevNum} event2={nextNum} />
      </div>
    </div>
  );
}