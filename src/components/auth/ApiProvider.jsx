import { createContext, useContext, useState } from "react";
import HandleApiCalls from "./Api";
const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const api = new HandleApiCalls(setIsLoading, isLoading);

  return (
    <ApiContext.Provider value={{ api, isLoading }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
