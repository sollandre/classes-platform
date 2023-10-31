import { useEffect } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { useBreakpoint } from "../../hooks/useBreakpoint";

interface AuthContextValue{
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const DrawerContext = createContext({} as AuthContextValue);


export function DrawerProvider({ children }: React.PropsWithChildren<any>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DrawerContext.Provider value={{isOpen, setIsOpen}}>
      {children}
    </DrawerContext.Provider>
  )

}