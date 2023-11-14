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

const LessonsCalendar = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [lessonsSchedule, setLessonsSchedule] = useState<number[]>([])
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const isAdmin = useContext(AdminContext)

    useEffect(() => {
        getAppointments(setAppointments)
        getAllLessons()
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
                        <h1 className="flex items-left px-[10px] ">Aulas da Semana</h1>
                        <h3 className="px-[11px] ">Cronograma de aulas da semana</h3>
                    </div>
                </div>
                <div className="">

                    {[1, 2, 3, 4, 5, 6, 0].map((w, i) => {
                        let ls = lessons.filter((l) => l.weekday == w)
                        if (ls.length <= 0) return;
                        return (
                            <div key={i}>
                                <h2 className="text-[22px] font-bold">{WeekdayMap[w]}</h2>
                                <div className="">
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
                                            const date = new Date()
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
                                    {/* {ls.map((l, j) => {
                                        const appointment = appointments.find((a) => a.lessonId === l.id)
                                        const appointmentsNotDone = appointments.filter((a) => !a.done)
                                        const date = new Date()
                                        return <LessonCard
                                            showTime={true}
                                            lesson={l}
                                            appointment={appointment}
                                            appointments={appointmentsNotDone}
                                            key={j}
                                            disabled={l.weekday < date.getDay() || (l.weekday == date.getDay() && l.time < date.getHours() * 60 + date.getMinutes())}
                                        />
                                    })} */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default LessonsCalendar;