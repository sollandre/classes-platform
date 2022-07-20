import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Sidebar } from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export function Event() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>();
  
  async function handleSignOut(){
    const { error } = await supabase.auth.signOut()
    if(error){
      console.log(error)
    }
  }
  
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  
  useEffect(() => {
    const body = document.getElementById('body')
    isSidebarOpen? body?.classList.add('overflow-hidden') : body?.classList.remove('overflow-hidden') 
  }, [isSidebarOpen])
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
      <main className="flex">
          <div
            className={`bg-gray-900 w-full h-full z-[1000] fixed bg-opacity-50 flex-1 flex justify-end lg:hidden transition-all duration-500 ${ isSidebarOpen
              ? 'opacity-100' 
              : 'opacity-0 -z-10'
            }`}
          >
            <div className={`flex transition-transform duration-500 ${isSidebarOpen 
            ? "translate-x-0"
            : "translate-x-full"
            }`}>
              <Sidebar />
            </div>
          </div>
          { slug 
            ? <Video lessonSlug={slug}  /> 
            : 
              <div className="flex-1 flex items-center justify-center h-screen">
                
                <button 
                  className="px-4 py-2 bg-blue-500 rounded text-gray-800"
                  onClick={() => {
                    handleSignOut();
                    navigate('/')
                  }}
                >
                  Sign out
                </button>
              </div>
          }
          

          <div className="hidden lg:flex">
            <Sidebar />
          </div>
               
      
      </main>
    </div>
  );
}
