import { CheckCircle, Circle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { supabase } from '../services/supabase';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

interface LessonProps {
  id: string;
  title: string;
  slug: string;
  course: string;
  availableAt: Date;
  type: 'live' | 'class';
  isComplete: boolean;
}

export function Lesson(props: LessonProps) {
  
  const { state } = useContext(AuthContext)
  const { slug } = useParams<{slug: string}>()
  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormat = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  })

  const [isComplete, setIsComplete] = useState(props.isComplete)

  const isActiveLesson = slug === props.slug;

  async function handleToggleComplete(){
    const { data, error } = await supabase.from('lessons_completion')
      .upsert([
        {user_id: state.userId, lesson_uid: props.id, status: !isComplete}
      ])

    if(error){
      console.log('Error:'+error)
      return 
    }

    if(data.length === 0 || !data[0]){
      console.log("It was not possible to retrieve information", data)
      return
    }

    setIsComplete(!isComplete)
  }

  useEffect(() => {
    setIsComplete(props.isComplete)
  },[props.isComplete])


  return (
    <Link to={`/event/${props.course}/${props.slug}`} className='group'>
      <span className="text-gray-300">
        {availableDateFormat}
      </span>
      <div className={classNames('flex items-center', {
         '-ml-2.5npm  before:content-[""] before:inline-block before:w-4 before:h-4 before:bg-green-500 before:rotate-45 before:-mr-2.5': isActiveLesson
        })
      }>
        <div className={classNames(
          'rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 flex-1', {
          'bg-green-500' : isActiveLesson
          })}>
          <header className="flex items-center justify-between">
            { isLessonAvailable ?
              <span 
                className={classNames("text-sm font-medium flex items-center gap-2", {
                  'text-white': isActiveLesson,
                  'text-blue-500': !isActiveLesson
                })}
                onClick={handleToggleComplete}
              >
                {
                  isComplete 
                  ? <CheckCircle size={20} />
                  : <Circle size={20} />
                }
                Conteúdo Liberado
              </span>
              :
              <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                <Lock size={20} />
                Em breve
              </span>
            }

            <span className={classNames("text-xs rounded px-2 py-[0.125rem] text-white border  uppercase font-bold", {
              'border-white': isActiveLesson,
              'border-green-300': !isActiveLesson
            })}>
              { props.type === 'live' ? 'Ao vivo' : 'Aula prática'}
            </span>
          </header>
          <strong className={classNames("mt-5 block", {
            'text-white': isActiveLesson,
            'text-gray-200': !isActiveLesson
          })}>
            {props.title}
          </strong>
        </div>
      </div>
    </Link>
  )
}