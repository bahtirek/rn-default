import { getCurrentUser } from "lib/appwrite";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const GlobalContext = createContext<any>([[], () => null]);

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children}: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) =>{
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])
  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        user,
        setUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;