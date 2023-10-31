import { List, X } from "phosphor-react";
import { Logo } from "./Logo";
import { useEffect } from 'react'
import { UserProfileMenu } from "./UserProfileMenu";
import { useNavigate } from "react-router-dom";
import { DrawerToggle } from "./Drawer/DrawerToggle";
import { DrawerProvider } from "./Drawer/DrawerContext";



export function Header(){
  
  const navigate = useNavigate()

  return (
    <header className="w-full py-5 px-8 flex items-center justify-between lg:justify-center bg-gray-700 border-b border-gray-600">
      <div 
        className="w-[calc(40vw+1rem)] flex lg:max-w-max hover:cursor-pointer"
        onClick={() => {
          navigate('/event')
        }}
      >
        <Logo />
      </div>
      <DrawerToggle
        className="flex items-center gap-2 lg:hidden"
        childrenDrawerOpen={
          <>
            <span>Aulas</span>
            <X size={32} color='#81d8f7' />
          </>
        }
        childrenDrawerClosed={
          <>
            <span>Aulas</span>
            <List size={32} color='#81d8f7' />
          </>
        }
      />
      <div className="hidden lg:ml-auto lg:block">
        <UserProfileMenu />
      </div>
    </header>
  )
}