import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";

export function Sidebar(){
  const { data } = useGetLessonsQuery();
  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>
      
      <div className="flex flex-col gap-8">
        {
          data ? 
          data.lessons.map((lesson) => {
            return (
              <Lesson 
                key={lesson.id}
                title={lesson.title}
                slug={lesson.slug}
                availableAt={new Date(lesson.availableAt)}
                type={lesson.lessonType}
              />
            )
          })
          :
          <>
            <div className="bg-gray-500 h-36 rounded w-full animate-pulse" />
            <div className="bg-gray-500 h-36 rounded w-full animate-pulse" />
          </>
        }
        

      </div>
    </aside>  
  )
}