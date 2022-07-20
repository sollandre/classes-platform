
export function SlideLeftFadeRigth({ children, toggle }: {children: JSX.Element, toggle: boolean}){
  return (
    <div className={`transition-all duration-500 ${toggle ? 'translate-x-0 opacity-1' : '-translate-x-full opacity-0 absolute [visibility: hidden]'}`}>
      { children }
    </div>
  )
}