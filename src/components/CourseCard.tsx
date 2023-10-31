import { Course } from "../graphql/generated"

export function CourseCard({course, Button }: {course: Course, Button: JSX.Element}) {
  return (
    <div key={course.id} className="bg-gray-700 rounded p-6 flex flex-col justify-between">
      <div className="flex items-center justify-around">
        <div className="w-20 h-20 flex">
          <img
            src={`/src/assets/${course.iconUrl}`}
            alt={`${course.title}  logo`}
          />
        </div>
        <span className="text-2xl font-bold">{course.title}</span>
      </div>
      <p className="text-gray-200 my-6 text-justify">
        {course.description || ""}
      </p>
      {Button}
    </div>
  )
}