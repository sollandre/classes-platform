import { List, X } from "phosphor-react"
import { PropsWithChildren, ReactNode, useContext, useEffect } from "react"
import { DrawerContext } from "./DrawerContext"

interface DrawerToggleProps  {
  className?: string;
  childrenDrawerOpen: ReactNode
  childrenDrawerClosed: ReactNode
}

export function DrawerToggle(props: DrawerToggleProps | PropsWithChildren<{className?: string}>){
  
  const {isOpen, setIsOpen} = useContext(DrawerContext)

  useEffect(() => {
    const body = document.getElementById('body')
    isOpen? body?.classList.add('overflow-hidden') : body?.classList.remove('overflow-hidden') 
  }, [isOpen])
  
  if('childrenDrawerOpen' in props && 'childrenDrawerClosed' in props){
    const { childrenDrawerOpen, childrenDrawerClosed, className } = props

    return (
      <button 
        className={className || ''}
        onClick={() => {
          setIsOpen((prevState) => !prevState)
        }}
      >
        {
          isOpen
          ? childrenDrawerOpen
          : childrenDrawerClosed
        }
      </button>
    );

  } else {
    const { children, className } = props

    return (
      <button 
        className={className || ''}
        onClick={() => {
          setIsOpen((prevState) => !prevState)
        }}
      >
        {children}
      </button>
    );
  }
}