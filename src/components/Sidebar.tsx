//TODO
// Set current course name on title ? See if it really is necessary

import { useEffect, useState } from "react";
import { GetLessonsByCourseQuery, useGetLessonsByCourseQuery } from "../graphql/generated";
import { supabase } from "../services/supabase";
import { Lesson } from "./Lesson";
import { UserProfileMenu } from "./UserProfileMenu";

export function Sidebar({ courseSlug }: {courseSlug?: string}){
  
  const [lessonsStatus, setLessonsStatus] = useState([] as {lesson_uid: string, status: boolean}[])

  let lessonsInfo: GetLessonsByCourseQuery | undefined;

  
    const { data } = useGetLessonsByCourseQuery({
      variables: {
        courseSlug: courseSlug
      }
    });

    lessonsInfo = data;
  

  async function getLessonCompletion(){
    
    const lessonsIds = lessonsInfo?.lessons.map((lesson) => {
      return lesson.id
    })

    if(!lessonsIds || lessonsIds.length === 0) return

    const { data: lessonsStatus, error } = await supabase.from('lessons_completion')
      .select('lesson_uid, status')
      .in('lesson_uid', lessonsIds)

    if(error || lessonsStatus.length === 0) return
    setLessonsStatus(lessonsStatus)
  }

  useEffect(() =>{
    getLessonCompletion()
  }, [lessonsInfo])


  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <div className="mb-6 lg:hidden">
        <UserProfileMenu />
      </div>
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>
      {
        courseSlug && lessonsInfo?.lessons && lessonsInfo?.lessons.length > 0 ? (
          <div className="flex flex-col gap-8">
            {
              lessonsInfo ? 
              lessonsInfo.lessons.map((lesson) => {
                
                const curStatus = lessonsStatus.find((element) => element.lesson_uid === lesson.id)
                const isComplete = curStatus === undefined ? false : curStatus.status

                return (
                  <Lesson 
                    key={lesson.id}
                    id={lesson.id}
                    title={lesson.title}
                    slug={lesson.slug}
                    course={courseSlug}
                    availableAt={new Date(lesson.availableAt)}
                    type={lesson.lessonType}
                    isComplete={isComplete}
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
        ) : (
          <div className="flex flex-1 justify-center">
            <span className="font-bold text-xl">
              Sem aulas disponíveis
            </span>
          </div>
        )
      }
      

    </aside>  
  )
}