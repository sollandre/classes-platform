import { DefaultUi, Player, Youtube } from "@vime/react";
import { gql, useQuery } from "@apollo/client";
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning,
} from "phosphor-react";

import '@vime/core/themes/default.css'
import { VideoSkeleton } from "./VideoSkeleton";

const GET_LESSON_BY_SLUG = gql`
  query GetLessonBySLug($slug: String) {
  lesson(where: {slug: $slug}) {
    id
    title
    videoId
    description
    teacher {
      bio
      avatarURL
      name
    }
  }
}
`

interface VideoProps {
  lessonSlug: string;
}

interface GetLessonBySlugResponse {
  lesson: {
    id: string
    title: string
    videoId: string
    description: string
    teacher: {
      bio: string;
      avatarURL: string;
      name: string;
    }
  }
}

export function Video(props: VideoProps ) {

  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG, {
    variables: {
      slug: props.lessonSlug
    }
  })


  if(!data){
    return (
      <div className="flex-1 animate">
        <VideoSkeleton />
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId}/>
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="lg:flex lg:items-start lg:gap-16">
          <div className="flex-1">
            
            <h1 className="text-lg lg:text-2xl font-bold">
              {data.lesson.title}
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed text-sm lg:text-base">
              {data.lesson.description}
            </p>
            
            <div className="flex items-center gap-4 mt-6">
              
              <img
                className="h-16 w-16 rounded-full border-2 border-blue-500"
                src={data.lesson.teacher.avatarURL}
                alt="Avatar do professor da aula"
              />
              
              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">
                  {data.lesson.teacher.name}
                </strong>
                <span className="text-gray-200 text-sm block mt-2">
                  {data.lesson.teacher.bio}
                </span>
              </div>
          
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-8 lg:mt-0">
            <a
              href="#"
              className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors"
            >
              <DiscordLogo size={24} />
              Comunidade de Discord
            </a>
            <a
              href="#"
              className="p-4 text-sm flex items-center rounded font-bold uppercase gap-2 justify-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-gray-900 transition-colors"
            >
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className="mt-16 gap-8 lg:mt-20 grid xl:grid-cols-2">
          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-lg lg:text-2xl">
                Material Complementar
              </strong>
              <p className="text-xs lg:text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
            <div className="h-full p-4 lg:p-6 flex items-center ml-auto">
              <CaretRight size={24} />
            </div>
          </a>
          
          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-lg lg:text-2xl">
                Wallpapers exclusivos
              </strong>
              <p className="text-xs lg:text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua maquina
              </p>
            </div>
            <div className="h-full p-4 lg:p-6 flex items-center ml-auto">
              <CaretRight size={24} />
            </div>
          </a>

        </div>
      </div>
    </div>
  );
}
