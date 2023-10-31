import { 
  GiChessPawn as Pawn, 
  GiChessKnight as Knight, 
  GiChessRook as Rook,
  GiChessBishop as Bishop,
  GiChessQueen as Queen,
  GiChessKing as King } from "react-icons/gi";

export function UserLevelOverview({ lvl }: {lvl: number}){
  
  const checkLvlRange = () => {
    const ranges = [
      {id:1, cap:20, icon: Pawn, iconName: 'Pawn'},
      {id:2, cap:40, icon: Knight, iconName: 'Knight'},
      {id:3, cap:60, icon: Rook, iconName: 'Rook'},
      {id:4, cap:80, icon: Bishop, iconName: 'Bishop'},
      {id:5, cap:99, icon: Queen, iconName: 'Queen'},
      {id:6, cap:100, icon: King, iconName: 'King'},
    ]

    return ranges.find((range) => lvl <= range.cap)
  }

  const range = checkLvlRange();
  if (!range) return <></>
  
  return (
    <div className="flex flex-col items-center -mt-4">

      <range.icon className="text-green-500 mb-4 flex-1 h-24 w-24"/>
      
        <span className="font-bold text-lg text-gray-50 block">
          Level {lvl}
        </span>
        <span className="text-gray-400">
          {range.iconName}
        </span>
    </div>
)
}