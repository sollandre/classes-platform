import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle, DiscordLogo, Hand, Lightning } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Course } from "../graphql/generated";
import { supabase } from "../services/supabase";

import { LinkButton } from "./LinkButton";
import { ProgressBar } from "./ProgressBar";
import { UserLevelOverview } from "./UserLevelOverview";

//TODO
// Quando sair do curso precisa atualizar o CourseOverview
// Error handling with try catch in getLessonInfo(), set data to null if nothing is found
//

export function CourseOverview({ course, enrollmentDate = '', unregisterHandler }: { course: Course, enrollmentDate?: string, unregisterHandler: (course_uid: string) => void }){

  const [lessonStats, setLessonStats] = useState<any[]>([])
  const [challengeStats, setChallengeStats] = useState<any[]>([])

  const completedLessons = lessonStats.filter((lesson) => lesson.status).length
  const totalLessons = lessonStats.length
  
  const completedChallenges = challengeStats.filter((challenge) => challenge.status).length
  const totalChallenges = challengeStats.length

  const level = ((completedLessons + completedChallenges)/(totalLessons + totalChallenges))*100

  

  const enrollmentDateFormatted = !enrollmentDate || enrollmentDate == '' ? "Loading" : format(new Date(enrollmentDate), 'dd/MM/yyyy', {
    locale: ptBR
  })

  const { profile } = useContext(AuthContext)


  async function getLessonInfo(){
    const { data, error } = await supabase.from('lessons')
      .select(`
        lesson_uid,
        lessons_completion(
          status
        ),
        challenges(
          challenge_uid,
          challenge_completion(
            status
          )
        )
      `)
      .eq('course_uid', course.id)


    if(error) {
      console.log('Unexpected error with lesson info')
      return
    }

    if(data.length === 0) {
      console.log('No data')
      return
    }

    const lessontRetrievedStats = data.map((lesson) => {
      const status = lesson.lessons_completion[0]?.status || false 

      return {
        lessonUid: lesson.lesson_uid,
        status: status
      }
    })
    
    setLessonStats(lessontRetrievedStats)
    
    const challengeRetrievedStats = data.map((lesson) => {
      return {
        challengeUid: lesson.challenges.challenge_uid,
        status: lesson.challenges.challenge_completion?.status || false
      }
    })
    setChallengeStats(challengeRetrievedStats)
  }

  useEffect(() => {
    getLessonInfo()
  },[course])

  return (
    <section className="gap-8 w-full mt-10 flex justify-center max-w-fit xl:max-w-full">   
      <div className="hidden xl:flex flex-1 flex-col justify-center gap-6 items-center p-6 xl:max-w-[200px] bg-gray-700 rounded bg-gradient-to-t from-green-500-30">
        <img src={`/src/assets/${course.iconUrl}`} alt={course.title}
          className="w-20" 
        />
        <p className="text-3xl font-bold text-gray-50 leading-relaxed">
          {course.title}
        </p>
      </div>

      <div className="bg-gray-700 py-6 px-9 flex-1 flex flex-col justify-around rounded lg:col-span-2">                
        <h1 className="text-3xl">
          Curso atual: <span className="font-bold text-blue-500">{course.title}</span>
        </h1>

        <div className="flex flex-wrap gap-y-6 gap-x-10 mt-4 justify-around ">
          
          <div className="flex flex-col gap-4">                
            <div className="flex gap-2">
              <CheckCircle className='h-6 w-6' />
              <span className="font-bold">Inscrição: {enrollmentDateFormatted}</span>
            </div>

            <LinkButton>
              <>
                <DiscordLogo className='h-5 w-5' />
                Comunidade no discord
              </>
            </LinkButton>

            <LinkButton className={`border border-gray-50 hover:bg-red-700 hover:text-gray-50 hover:border-red-700 transition-colors ${
              profile?.mainCourse === course?.id && 'pointer-events-none' 
            }`}
              onClick={(e) => {
                e.preventDefault()
                unregisterHandler(course.id)
              }}
            >
              <>
                <Hand className='h-5 w-5' />
                Sair do curso
              </>
            </LinkButton>
          </div>
          
          <div className="flex gap-12">
          
            <div className="flex flex-col gap-4 max-w-max">                
              <div className="flex gap-2">
                <CheckCircle className='h-6 w-6' />
                <span className="font-bold">Percentual de conclusão</span>
              </div>

              <div>
                <p className="text-gray-400">
                  <span className="font-bold">Aulas:</span> {completedLessons} de {totalLessons}
                </p>
                <ProgressBar value={totalLessons > 0 ? (completedLessons/totalLessons)*100 : 0} />
              </div>

              <div>
                <p className="text-gray-400">
                  <span className="font-bold">Desafios:</span> {completedChallenges} de {totalChallenges}
                </p>
                <ProgressBar value={totalChallenges > 0 ? (completedChallenges/totalChallenges)*100 : 0} />
              </div>
            </div>

            <UserLevelOverview lvl={level > 0 ? level : 0} />
          
          </div>
        </div>
      </div>
      
      <div className="xl:max-w-[200px] bg-gray-700 rounded hidden xl:flex flex-col justify-center items-center py-6 p-4 overflow-auto">
        {
          course.teacher ?
            <>
              <img 
                src={course.teacher.avatarURL} 
                alt="Profile avatar" 
                className="max-h-[96px] rounded-full border-4 border-blue-500 flex items-center justify-center text-center" 
              />
              <div className="text-center mt-3 overflow-hidden">
                <p className="text-lg font-bold text-gray-50 leading-relaxed">
                  {course.teacher.name} 
                </p>
                <p className="text-gray-400 text-sm max-h-[5ex] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:_vertical] [display:-webkit-box]">
                    {course.teacher.bio}
                </p>
              </div>
            </>
          : <h1>Loading</h1>
        }
          
        </div>
    </section>
  )
}