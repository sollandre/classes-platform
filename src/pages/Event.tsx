import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Sidebar } from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function Event() {
  const { slug } = useParams<{ slug: string }>();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  
  const body = document.getElementById('body')
  useEffect(() => {
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
            : <div className="flex-1" />
          }
          

          <div className="hidden lg:flex">
            <Sidebar />
          </div>
               
      
      </main>
    </div>
  );
}
