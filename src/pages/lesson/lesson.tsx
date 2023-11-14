import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout";
import api from "../../service/api";
import Cookies from "js-cookie";
import { Lesson } from "../../types/Lesson";
import { AdminContext } from "../../context/admin";
import AddButton from "../../components/addButton";
import { minutesToHour } from "../../utils/lesson";

import { ToastContainer } from 'react-toastify'
import { getAppointments } from "../../utils/appointment";
import { Appointment } from "../../types/Appointment";
import LessonCard from "@/components/lessonCard";
import ReportButton from "@/components/reportButton";
import CalendarButton from "@/components/calendarButton";
import EmblaCarousel from "@/components/embla/carousel";

const WeekdayMap = {
    0: "Domingo",
    1: "Segunda",
    2: "Terça",
    3: "Quarta",
    4: "Quinta",
    5: "Sexta",
    6: "Sábado",
}

const Lessons = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [lessonsSchedule, setLessonsSchedule] = useState<number[]>([])
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const isAdmin = useContext(AdminContext)

    useEffect(() => {
        getAppointments(setAppointments)
        if (isAdmin) getAllLessons()
        else getLessons()
    }, [isAdmin])

    const getLessons = async () => {
        try {
            const res = await api.get("/today/lesson", {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })

            const schedules: number[] = []
            res.data.forEach((v: Lesson) => {
                if (!schedules.find((s) => s === v.time)) schedules.push(v.time)
            })
            setLessonsSchedule(schedules)
            setLessons(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    const getAllLessons = async () => {
        try {
            const res = await api.get("/lesson", {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            setLessons(res.data)
            // const schedules: number[] = []
            // res.data.forEach((v: Lesson) => {
            //     if (!schedules.find((s) => s === v.time)) schedules.push(v.time)
            // })
            // setLessonsSchedule(schedules)
            // setLessons(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Layout>
            <div className="px-[20px]">
                <ToastContainer />
                <div className=" py-[40px] flex items-start justify-between">
                    <div>
                        <h1 className="flex items-left px-[10px] ">Aulas do Dia</h1>
                        <h3 className="px-[11px] ">As aulas de hoje</h3>
                    </div>
                    {isAdmin ?
                        <div className="flex flex-col gap-[10px]">
                            <AddButton link="/admin/aulas/criar" />
                            <ReportButton link="/admin/aulas/relatorios" />
                        </div> :
                        <div className="flex flex-col gap-[10px]">
                            <CalendarButton link="/calendario/aulas" />
                        </div>
                    }
                </div>
                <div className="">
                    {!isAdmin ?

                        <>
                            {lessonsSchedule.length > 0 ?
                                lessonsSchedule.map((ls, i) => (
                                    <div key={i}>
                                        <h2 className="text-[22px] font-bold">{minutesToHour(ls)}</h2>
                                        <div className="w-full">
                                            <EmblaCarousel
                                                options={{
                                                    loop: true,
                                                    slidesToScroll: 1
                                                }}
                                                className='pt-[80px] pb-[80px] w-full'
                                            >
                                                {lessons.filter((l) => l.time === ls).map((l, j) => {
                                                    const appointment = appointments.find((a) => a.lessonId === l.id)
                                                    const appointmentsNotDone = appointments.filter((a) => !a.done)
                                                    return <div className="embla__slide max-w-[350px] mx-[10px]">
                                                        <LessonCard
                                                            lesson={l}
                                                            appointment={appointment}
                                                            appointments={appointmentsNotDone}
                                                            key={j}
                                                        />
                                                    </div>
                                                })}
                                            </EmblaCarousel>
                                        </div>
                                    </div>
                                )) :
                                <div className="flex justify-center w-full">
                                    <span className="font-rubik">Nenhuma aula para hoje :(</span>
                                </div>
                            }
                        </> :

                        <>
                            {[1, 2, 3, 4, 5, 6, 0].map((w, i) => {
                                let ls = lessons.filter((l) => l.weekday == w)
                                if (ls.length <= 0) return;
                                return (
                                    <div key={i}>
                                        <h2 className="text-[22px] font-bold">{WeekdayMap[w]}</h2>
                                        <div className="w-full">
                                            <EmblaCarousel
                                                options={{
                                                    loop: true,
                                                    slidesToScroll: 1
                                                }}
                                                className='pt-[80px] pb-[80px] w-full'
                                            >
                                                {ls.map((l, j) => {
                                                    const appointment = appointments.find((a) => a.lessonId === l.id)
                                                    const appointmentsNotDone = appointments.filter((a) => !a.done)
                                                    let date = new Date()

                                                    return <div className="embla__slide max-w-[350px] mx-[10px]">
                                                        <LessonCard
                                                            showTime={true}
                                                            lesson={l}
                                                            appointment={appointment}
                                                            appointments={appointmentsNotDone}
                                                            key={j}
                                                            disabled={l.weekday < date.getDay() || (l.weekday == date.getDay() && l.time < date.getHours() * 60 + date.getMinutes())}
                                                        />
                                                    </div>
                                                })}
                                            </EmblaCarousel>
                                        </div>
                                        {/* <div className="flex flex-wrap gap-x-[20px] gap-y-[30px]  justify-start pl-[20px] pt-[20px] pb-[40px]">
                                            {ls.map((l, j) => {
                                                const appointment = appointments.find((a) => a.lessonId === l.id)
                                                const appointmentsNotDone = appointments.filter((a) => !a.done)
                                                return <LessonCard
                                                    showTime={true}
                                                    lesson={l}
                                                    appointment={appointment}
                                                    appointments={appointmentsNotDone}
                                                    key={j}
                                                />
                                            })}
                                        </div> */}
                                    </div>
                                )
                            })}
                        </>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Lessons;