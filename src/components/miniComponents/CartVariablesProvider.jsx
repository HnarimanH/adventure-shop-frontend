import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartVariablesProvider = ({children}) => {
    const [productsInCart, setProductsInCart] = useState([])
    const numberOfProductsInCart = productsInCart.length
    return (
        <CartContext.Provider value={{ productsInCart, setProductsInCart, numberOfProductsInCart}}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => useContext(CartContext);