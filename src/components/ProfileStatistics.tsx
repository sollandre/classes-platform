export function ProfileStatistics({text, number}: { text: string, number: string }){
  return (
    <div className="flex items-center justify-between">
      <div className="bg-gray-700 py-3 px-6 rounded flex items-center gap-4">
        <span className="text-gray-400">
          {text} 
        </span>
        <span className="font-bold text-2xl">
          {number}
        </span>  
      </div>
    </div>
  )
}