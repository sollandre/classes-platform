import { Navigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export function RequireAuth({ children }: { children: JSX.Element }){
  const session = supabase.auth.session() 

  return (
    session ? children : <Navigate to={'/'} replace />
  )
}