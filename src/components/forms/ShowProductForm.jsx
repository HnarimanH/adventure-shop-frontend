import React, { use } from "react";
import HandleApiCalls from "../auth/Api";
import { useState, useEffect } from "react";

function ShowProductForm({products, price, category, sortBy}){
  



  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);


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
  const sortedProducts = () => {
  const sorted = [...filteredProducts]; // COPY that damn array
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
  <div className="h-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 translate-y-20">
    {
      sortedProducts().map((product) => (
    <div key={product.id} className="bg-white w-80 p-4 rounded shadow-2xl flex flex-col items-center justify-center hover:scale-125 transition-transform duration-300">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <div className="w-1/2 h-32 flex items-center justify-center border-2 rounded-2xl overflow-hidden">
          <img src={product.image_url} alt={product.name} className=" h-full object-cover " />
        </div>
        <div className="w-4/5 h-auto text-center">
          <p>{product.description}</p>
        </div>
        <p className="text-green-600 font-semibold">${product.price}</p>
        <p className="text-gray-500">Stock: {product.stock}</p>
    </div>
))}
    <div className="h-20">

    </div>
  </div>)

    
  }




    




export default ShowProductForm;