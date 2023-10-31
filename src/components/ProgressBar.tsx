import { useEffect, useRef } from "react"

export function ProgressBar({ value }:{ value: number }) {
  if(value < 0 || value > 100) return (<div>Value must be between 0 and 100</div>);

  const progress = useRef<HTMLDivElement>(null)

  useEffect(() => {
    progress.current ? progress.current.style.backgroundImage = `linear-gradient(to right, var(--green-500) ${value === 100 ? 100 : value-10 > 0 ? value-10 : 0}%, var(--gray-600) ${value}%)` : ""
  },[value])

  return (
    <div className={`h-3 w-full mt-1 rounded bg-gray-600 overflow-hidden`}>
      <div ref={progress} className={`h-3 rounded`} />
    </div>
  )
}