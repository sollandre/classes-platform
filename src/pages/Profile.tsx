import { BracketsAngle, CheckCircle, DiscordLogo } from "phosphor-react";
import { Header } from "../components/Header";
import { LinkButton } from "../components/LinkButton";
import { ProfileStatistics } from "../components/ProfileStatistics";
import { Sidebar } from "../components/Sidebar";

export function Profile() {
  return (
    <>
    <Header isSidebarOpen={false} setIsSidebarOpen={(bool: boolean) => {false}} />
      <div className="flex justify-between">
        <main className="max-w-7xl px-6 flex flex-col justify-center items-center flex-1 mx-auto">
          <section className="mt-20 flex gap-8 w-full">
            
            <div className="max-w-xs bg-gray-700 rounded flex flex-col justify-center items-center p-6">
              <div className="max-h-[144px] h-[144px] w-[144px] rounded-full border-4 border-blue-500 flex items-center justify-center">
                <img src="" alt="Profile avatar" />
              </div>
              <div className="text-center mt-6">
                <p className="text-2xl font-bold text-gray-50 leading-relaxed">
                  Nome do usuario
                </p>
                <p className="text-gray-400 leading-8">
                  User bios and brief description of who they are 
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between flex-1">
                <ProfileStatistics text="Aulas realizadas" number="10" />
                <ProfileStatistics text="Desafios concluídos" number="5" />
                <ProfileStatistics text="Cursos finalizados" number="1" />
              </div>

              <div className="bg-gray-700 mt-6 py-5 px-9">
                <header className="text-3xl">
                  Curso atual: <span className="font-bold">ReactJS</span>
                </header>
                <div className="flex justify-around">
                  <div className="flex flex-col gap-4 max-w-max">                
                    <div className="mt-4 flex gap-2">
                      <CheckCircle size={24} />
                      <span className="font-bold">Inscrição: 07/07/2022</span>
                    </div>

                    <LinkButton>
                      <>
                        <DiscordLogo size={20} />
                        Comunidade no discord
                      </>
                    </LinkButton>

                    <LinkButton className="secondary">
                      <>
                        <BracketsAngle size={20} />
                        Materiais extras
                      </>
                    </LinkButton>
                  </div>  

                  <div className="flex flex-col gap-4 max-w-max">                
                    <div className="mt-4 flex gap-2">
                      <CheckCircle size={24} />
                      <span className="font-bold">Percentual de conclusão</span>
                    </div>

                  </div>              
                </div>


              </div>
              

            </div>

          </section>
        </main>

        <Sidebar />
      </div>
    </>
  );
}