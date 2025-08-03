import React, { use } from "react";
import HandleApiCalls from "../auth/Api";
import { useState, useEffect } from "react";
import NextProducts from "../miniComponents/NextProducts";
import { Plus }from 'lucide-react';
function ShowProductForm({products, price, category, sortBy}){
  



  const [currentPage, setCurrentPage] = useState(1);
  const everyProducts = products.length
  const productsPerPage = 6;
  const totalPages = Math.ceil(everyProducts / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const nextNum = ()=>{
    if (currentPage === totalPages){
      setCurrentPage(totalPages)
    }else{
      setCurrentPage(currentPage + 1)
    }

  }
  const prevNum = ()=>{
    if (currentPage === 1){
      setCurrentPage(1)
    }else{
      setCurrentPage(currentPage - 1)
    }
  }
  const filteredProducts = products.filter(product => {
    const Price = parseFloat(product.price);
    if (category === "All"){
      category = ""
    }

    return (
      (!category || product.category === category) &&
      Price >= 0 &&
      Price <= price
    );
  });
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const sortedProducts = () => {
  const sorted = [...currentProducts]; 
  if (sortBy === "Price") {
    return sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === "Name") {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "Stock") {
    return sorted.sort((a, b) => a.stock - b.stock);
  }
  return sorted;
};
  
  
  
  


  




    
    return (
      <div className="h-full grid grid-cols-1 mt-10">
          <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {
      sortedProducts().map((product) => (
      <div key={product.id} className="bg-white border-2 rounded-2xl gap-4 cursor-pointer w-60 p-4 shadow-2xl flex flex-col items-center justify-end hover:scale-125 transition-transform duration-300">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <div className="w-1/2 h-32 flex items-center justify-center border-2 rounded-2xl overflow-hidden">
            <img src={product.image_url} alt={product.name} className=" h-full object-cover " />
          </div>
          <div className="w-4/5 h-auto overflow-hidden text-center">
            <p>{product.description}</p>
          </div>
          <p className="text-green-600 font-semibold">${product.price}</p>
          <p className="text-gray-500">Stock: {product.stock}</p>
          <div className="w-1/2 h-14 rounded-2xl text-4xl bg-green-300 border-2 flex items-center justify-center hover:scale-125 transform duration-300">
            <Plus className="w-full"/>
          </div>
      </div>
))}
        </div>
        <div className="h-20 w-full items-center justify-center flex mb-30">
          <NextProducts number={currentPage} event={prevNum} event2={nextNum} />
        </div>  
        
      </div>
  )

    
  }




    




export default ShowProductForm;