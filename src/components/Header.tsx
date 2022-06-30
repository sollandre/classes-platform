import { List, X } from "phosphor-react";
import { Logo } from "./Logo";
import { Dispatch } from 'react'

interface HeaderProps {
  setIsSidebarOpen: (arg: boolean) => void
  isSidebarOpen: boolean
}

export function Header({ setIsSidebarOpen, isSidebarOpen }: HeaderProps){
  return (
    <header className="w-full py-5 px-8 flex items-center justify-between lg:justify-center bg-gray-700 border-b border-gray-600">
      <div className="w-[calc(40vw+1rem)] flex lg:max-w-max">
        <Logo />
      </div>
      <button 
        className="flex items-center gap-2 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span>Aulas</span>
        {
          isSidebarOpen
          ? <X size={32} color='#81d8f7' />
          : <List size={32} color='#81d8f7' />
        }
      </button>
    </header>
  )
}