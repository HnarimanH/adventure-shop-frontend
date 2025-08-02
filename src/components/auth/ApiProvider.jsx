import { createContext, useContext, useState } from "react";
import HandleApiCalls from "./Api";
const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [api] = useState(() => new HandleApiCalls(setIsLoading, isLoading, setIsLogedIn));

  return (
    <ApiContext.Provider value={{ api, isLoading, isLogedIn, setIsLogedIn }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
