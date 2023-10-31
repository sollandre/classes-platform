import { ComponentPropsWithoutRef, PropsWithChildren, ReactComponentElement } from "react";

interface LinkButtonProps {
  className?: 'primary'|'secondary'|string;
  href?: string;
  children: JSX.Element
  [x: string]: string | undefined | ((param: any) => void) | JSX.Element
}

export function LinkButton({children, className = 'primary', href = '#', ...rest}: LinkButtonProps) {
  return (
    <a
      href={href}
      className={`p-4 text-sm flex items-center rounded font-bold uppercase gap-2 justify-center ${
        className === 'primary' ?  "bg-green-500 hover:bg-green-700 transition-colors" 
        : className === 'secondary' ? "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-gray-900 transition-colors"
        : className
      }`}
      {...rest}           
    >
      {children}
    </a>
  );
}