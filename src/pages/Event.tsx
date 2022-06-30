import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Sidebar } from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { useState } from "react";

export function Event() {
  const { slug } = useParams<{ slug: string }>();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Header setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
      <main className="flex flex-1">
        <div className={
          isSidebarOpen 
          ? "-z-10 transition-all opacity-20 fixed" 
          : "flex-1"
        }>
          { slug 
            ? <Video lessonSlug={slug}  /> 
            : <div className="flex-1" />
          }
        </div>
        
        <div className={
          isSidebarOpen 
          ? "flex flex-1 justify-end animate-appearLeft lg:block lg:max-w-max" 
          : "lg:flex lg:flex-1 lg:max-w-max hidden"
        }>
          <Sidebar />
        </div>       
      
      </main>
    </div>
  );
}
