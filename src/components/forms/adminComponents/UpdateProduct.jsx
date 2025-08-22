import React, {useState, useEffect} from "react";
import { useApi } from "../../auth/ApiProvider";
import Input from "../../miniComponents/Input";
import Button from "../../miniComponents/Button";
import ShowProduct from "./showProduct";
import NextProducts from "../../miniComponents/NextProducts";


export default function UpdateProduct({setProduct, products, price, category, sortBy ,}){
    const [currentPage, setCurrentPage] = useState(1);
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
  const everyProducts = filteredProducts.length
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


    return(
        <div className="h-full grid grid-cols-1 mt-10">

            


            <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <ShowProduct type={'update'} sortedProducts={sortedProducts()} setProducts={setProduct}/>

            </div>
            <div className="h-20 w-full items-center justify-center flex mb-30">
                <NextProducts number={currentPage} event={prevNum} event2={nextNum} />
            </div>  
        
        </div>
    )
}