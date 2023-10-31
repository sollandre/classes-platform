import { useContext } from "react"
import { DrawerContext } from "./DrawerContext"

export function Drawer({ children }:{ children: JSX.Element }){
  
  const { isOpen } = useContext(DrawerContext)

  return (
    <div
      className={`bg-gray-900 w-full h-full z-[1000] fixed bg-opacity-50 flex-1 flex justify-end lg:hidden transition-all duration-500 ${ isOpen
        ? 'opacity-100' 
        : 'opacity-0 -z-10'
      }`}
    >
      <div className={`flex transition-transform duration-500 ${isOpen 
      ? "translate-x-0"
      : "translate-x-full"
      }`}>
        {children}
      </div>
    </div>
  )
}