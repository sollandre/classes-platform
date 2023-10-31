import { Reducer, useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Course, useGetCoursesQuery } from "../graphql/generated";
import { checkError, supabase } from "../services/supabase";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { AuthContext } from "../context/AuthContext";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { LinkButton } from "../components/LinkButton";
import { CardGrid } from "../components/CardGrid";
import { CourseCard } from "../components/CourseCard";
import { CourseOverview } from "../components/CourseOverview";
import { CardCarousel } from "../components/CardCarousel";
import { Drawer } from "../components/Drawer";
import { DrawerProvider } from "../components/Drawer/DrawerContext";

import {
  Fire,
  Lightbulb,
  Lightning,
  SmileyXEyes,
} from "phosphor-react";

interface UserData {
  mainCourse?: string;
}

interface EnrollmentData {
  course_uid: string;
  created_at: string;
}

export function Profile() {
  const navigate = useNavigate();
  const isMobile = useBreakpoint(1024)
  const { courseSlug } = useParams<{ courseSlug: string }>();


 
  const [enrolledCourses, setEnrolledCourses] = useState<EnrollmentData[]>([]);
  const [displayedCourse, setDisplayedCourse] = useState<Course>({} as Course);

  const { state, dispatch } = useContext(AuthContext);

  const mainCourseUid = state.userInfo?.mainCourse
  
  const { data } = useGetCoursesQuery();
  const courses = data?.courses as Course[];


  function getDisplayedCourse() {
    if (courses === undefined || mainCourseUid === undefined) return undefined;

    if (courseSlug === undefined && mainCourseUid === null) return {};

    if (courseSlug)
      return courses.find((course) => course.courseSlug === courseSlug);

    if (mainCourseUid)
      return courses.find((course) => course.id === mainCourseUid);
  }

  //TODO -> Refactor getEnrollmentInfo to get only info on enrolled courses
  async function getEnrollmentInfo() {
    const { data: profile } = await supabase
      .from("profile")
      .select(
        `
        main_course,
        enrollment(
          course_uid,
          created_at
        )
        `
      )
      .eq("enrollment.status", true);

    if (profile?.length === 0 || !profile) return;

    const enrolledCourses: EnrollmentData[] =
      profile[0]["enrollment"]?.length > 0 ? profile[0]["enrollment"] : [];

    setEnrolledCourses(enrolledCourses);
  }

  //REFACTOR -> authReducer does this
  async function handleMainCourse(courseUid: string) {
    try {
      const { data: mainCourseUpdate, error: mainCourseUpdateError } =
        await supabase
          .from("profile")
          .update({ main_course: courseUid })
          .match({ user_id: state.userId });

      if (
        checkError<{ main_course: string }>(
          mainCourseUpdate,
          mainCourseUpdateError
        )
      ) {
        dispatch({type:"updateUserInfo", payload: {userInfo: {
          mainCourse: mainCourseUpdate[0].main_course
        }}})
      }
    } catch (error) {
      dispatch({type: 'fetchError', payload: {
        error: {
          message: "Main course selection failed",
          details: error,
        }
      }})
    }
  }

  async function handleEnroll(courseUid: string, action: "remove" | "add") {
    if (action !== "add" && action !== "remove") return;

    const addNewEnrolledCourse = (newCourse: EnrollmentData) => {
      const newCourses = [...enrolledCourses, newCourse];
      setEnrolledCourses(newCourses);
    };

    const removeEnrolledCourse = (course: EnrollmentData) => {
      const newCourses = enrolledCourses.filter(
        (enrolledCourse) => course.course_uid !== enrolledCourse.course_uid
      );
      setEnrolledCourses(newCourses);
      navigate("/event");
    };

    try {
      const operation = action === "add" ? true : false;

      const { data: enrollment, error } = await supabase
        .from("enrollment")
        .upsert([
          {
            user_id: state.userId,
            course_uid: courseUid,
            status: operation,
          },
        ]);

      if (!checkError<EnrollmentData>(enrollment, error)) return;

      if (operation) {
        addNewEnrolledCourse(enrollment[0]);
      } else {
        removeEnrolledCourse(enrollment[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function parseEnrolledCourseCards(coursesData: Course[] | undefined) {
    return coursesData?.map((course) => {
      return (
        <CourseCard
          key={course.id}
          course={course}
          Button={
            <div className="flex justify-between gap-4 items-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleMainCourse(course.id);
                }}
                className={`text-gray-50 flex flex-col gap-2 group  hover:text-red-500 leading-none ${
                  mainCourseUid === course.id
                    ? "pointer-events-none text-red-500"
                    : ""
                }`}
              >
                <>
                  <div className={`z-[0] flex items-center justify-center`}>
                    <Fire
                      size={26}
                      weight="fill"
                      className={`absolute -z-10 ${
                        mainCourseUid !== course.id
                          ? "group-hover:text-red-500 group-hover:block hidden transition-all"
                          : "text-red-500"
                      }`}
                    />
                    <Fire
                      size={20}
                      weight="fill"
                      className={`flex-1 z-10 ${
                        mainCourseUid !== course.id
                          ? "group-hover:text-orange-500 transition-all"
                          : "text-orange-500"
                      } `}
                    />
                  </div>
                  Curso principal
                </>
              </button>
              <LinkButton
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/event/${course.courseSlug}`);
                }}
                href={course.courseSlug || "#"}
              >
                <>
                  <Lightning size={20} />
                  Entrar
                </>
              </LinkButton>
            </div>
          }
        />
      );
    });
  }

  function parseAvailableCourseCards(coursesData: Course[] | undefined) {
    if (!coursesData || coursesData.length === 0) return undefined;

    return coursesData?.map((course) => {
      return (
        <CourseCard
          key={course.id}
          course={course}
          Button={
            <LinkButton
              onClick={(e) => {
                e.preventDefault();
                handleEnroll(course.id, "add");
              }}
            >
              <>
                <Lightbulb size={20} />
                Matricula
              </>
            </LinkButton>
          }
        />
      );
    });
  }

  useEffect(() => {
    getEnrollmentInfo();
  }, []);

  useEffect(() => {
    setDisplayedCourse(getDisplayedCourse() as Course);
  }, [courses, mainCourseUid, courseSlug]);

  return (
    <DrawerProvider>
      <Header />
      <div className="flex flex-1">
        <main className="max-w-7xl px-6 mx-auto flex flex-1 flex-col items-center">
          {displayedCourse === undefined ? (
            <h1>Loading</h1>
          ) : typeof displayedCourse === "object" &&
            Object.keys(displayedCourse).length === 0 ? (
            <section className="flex items-center w-full mt-10 bg-gray-700 py-6 px-10">
              <h2 className="text-3xl text-center text-gray-50 font-bold leading-loose row-span-2 max-w-[25%]">
                Nenhum curso selecionado 😢
              </h2>
              <div className="flex-1 text-center leading-relaxed text-lg">
                Caso nao esteja matriculado,
                <a
                  href="#available-courses"
                  className="mx-auto block w-fit self-center justify-self-center text-blue-500 font-bold hover:scale-105 hover:underline transition-all"
                >
                  selecione um curso
                </a>
              </div>
              <div className="flex-1 text-center leading-relaxed text-lg inline-grid grid-rows-[auto_1fr]">
                Se ja estiver matriculado em algum curso,
                <div>
                  <a
                    href="#enrolled-courses"
                    className="flex justify-center gap-4 group font-bold text-orange-500 hover:text-red-500 hover:scale-105 transition-all"
                  >
                    escolha seu curso principal
                    <div
                      className={`w-fit z-[0] flex items-center justify-center`}
                    >
                      <Fire
                        size={26}
                        weight="fill"
                        className={`absolute -z-10 group-hover:text-red-500 group-hover:block hidden transition-all`}
                      />
                      <Fire
                        size={20}
                        weight="fill"
                        className={`flex-1 z-10 group-hover:text-orange-500 transition-all text-orange-500`}
                      />
                    </div>
                  </a>
                  ou
                  <a
                    href="#enrolled-courses"
                    className="block text-green-600 font-bold hover:underline hover:text-green-400 hover:scale-105 transition-all"
                  >
                    entre em um curso
                  </a>
                </div>
              </div>
            </section>
          ) : (
            <CourseOverview
              course={displayedCourse}
              enrollmentDate={
                enrolledCourses.find(
                  (course) => course.course_uid === displayedCourse.id
                )?.created_at
              }
              unregisterHandler={(courseUid: string) =>
                handleEnroll(courseUid, "remove")
              }
            />
          )}
          {courses ? 
            !(isMobile) ? 
            (<>
              <section className="mt-10 w-full hidden lg:block">
                <h2 className="text-3xl font-bold mb-5">Meus cursos</h2>
                <CardGrid
                  data={parseEnrolledCourseCards(
                    courses?.filter(({ id }) =>
                      enrolledCourses.some((ele) => ele.course_uid === id)
                    )
                  )}
                />
              </section>
              <section className="mt-10 w-full">
                <h2 className="text-3xl font-bold mb-5">Cursos disponíveis</h2>
                <CardGrid
                  data={parseAvailableCourseCards(
                    courses?.filter(
                      ({ id }) =>
                        !enrolledCourses.some((ele) => ele.course_uid === id)
                    )
                  )}
                  fallback={
                    <span className="py-6 block text-center font-bold text-xl">
                      Nenhum curso disponível
                    </span>
                  }
                />
              </section>
            </>
          ) : (
            <section className="flex justify-around flex-wrap gap-y-5 mt-5 w-full">
                <div className="max-w-sm flex flex-col mb-4">
                  <h2 className="text-3xl font-bold mb-5 text-center">Meus cursos</h2>
                  <CardCarousel 
                    cards={
                      parseEnrolledCourseCards(
                        courses?.filter(({ id }) =>
                          enrolledCourses.some((ele) => ele.course_uid === id)
                        )
                      )
                    }
                    cardTitles={
                      courses
                      ?.filter(({ id }) =>
                        enrolledCourses.some((ele) => ele.course_uid === id)
                      )
                      ?.map((course) => course.title) 
                    }
                  />
                </div>
                <div className="max-w-sm flex flex-col mb-4">
                  <h2 className="text-3xl font-bold mb-5 text-center">Cursos disponíveis</h2>
                  <CardCarousel 
                    cards={
                      parseAvailableCourseCards(
                        courses?.filter(
                          ({ id }) =>
                            !enrolledCourses.some((ele) => ele.course_uid === id)
                        )
                      )
                    }
                    cardTitles={
                      courses
                      ?.filter(({ id }) =>
                        !enrolledCourses.some((ele) => ele.course_uid === id)
                      )
                      ?.map((course) => course.title) 
                    }
                    fallback={
                      <div className="bg-gray-700 rounded p-6 flex flex-col justify-around flex-1 max-h-[78%]">
                        <SmileyXEyes className="w-20 h-20 mx-auto" />
                        <span className="py-6 block text-center font-bold text-xl">
                          Nenhum curso disponível
                        </span>
                      </div>
                    } 
                  />
                </div>
              </section>
          ) : (
            <h1>Loading</h1>
          )}
        </main>
        {
          isMobile ?
          <Drawer>
            <Sidebar courseSlug={displayedCourse?.courseSlug || undefined} />
          </Drawer>
          : <Sidebar courseSlug={displayedCourse?.courseSlug || undefined} />
        }
      </div>
    </DrawerProvider>
  );
}
