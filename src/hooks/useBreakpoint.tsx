import { useEffect, useState } from "react";

export function useBreakpoint(breakpoint: number){
  const [isMobile, setIsMobile] = useState(false)

  function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  function getBreakpoint() {
    if(getWidth() <= breakpoint === isMobile) return
    setIsMobile((state) => !state);
  }

  useEffect(() => {
    getBreakpoint() 
    window.addEventListener('resize', getBreakpoint)
    return () => window.removeEventListener('resize', getBreakpoint);
  }, [isMobile])

  return isMobile
}