import { createContext } from "react";
import { supabase } from "../services/supabase";

const authContext = createContext(null);

const session = supabase.auth.session()

// const auth = supabase.auth.onAuthStateChange((event, session) => {
//   if(event === )
// })