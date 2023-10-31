import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Sidebar } from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export function Event() {
  const navigate = useNavigate()
  const { course, slug } = useParams<{ course: string, slug: string }>();
  
  
  
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  
  
  return (
    <div className="flex flex-col min-h-full">
      <Header />
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
          { slug && course
            ? <Video lessonSlug={slug} courseSlug={course} /> 
            : 
              <div className="flex-1 flex items-center justify-center h-screen">
                
                <button 
                  className="px-4 py-2 bg-blue-500 rounded text-gray-800"
                >
                  Sign out
                </button>
              </div>
          }
          

          <div className="hidden lg:flex">
            <Sidebar courseSlug={course} />
          </div>
               
      
      </main>
    </div>
  );
}
