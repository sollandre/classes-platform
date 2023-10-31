import { useState } from "react";

export function ToggleShowHide({toggle, children, className = ''}: {toggle: JSX.Element, children: JSX.Element, className?: string}){

  const [showComponent, setShowComponent] = useState(false)

  return (
    <>
      <button 
        className={className}
        onClick={() => setShowComponent((state) => !state) }
      >
        {toggle}
      </button>
      <div className={`${showComponent ? 'block' : 'hidden'}`}>
        {children}
      </div>
    </>
  );
}