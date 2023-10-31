//TODO
// 1. Refactor to include a asChild prop as in Remix UI where the user can define the Container Element and this component just add the animation style
// 2. Add a way to include custom style to the container
// 3. Find a way to encapsulate the need to use a flex container when two elements are used
export function SlideLeftFadeRigth({ children, toggle }: {children: JSX.Element, toggle: boolean}){
  return (
    <div className={`transition-all duration-500 ${toggle ? 'translate-x-0 opacity-1' : '-translate-x-full opacity-0 absolute [visibility: hidden]'}`}>
      { children }
    </div>
  )
}