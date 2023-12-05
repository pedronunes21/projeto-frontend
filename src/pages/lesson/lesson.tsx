import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout";
import api from "../../service/api";
import Cookies from "js-cookie";
import { Lesson, WeekdayMap } from "../../types/Lesson";
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

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/src/components/ui/hover-card"
import ContextHelper from "@/components/contextHelper";
import { ContentLoading } from "@/components/loading";


const Lessons = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [lessonsSchedule, setLessonsSchedule] = useState<number[]>([])
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [pageLoading, setPageLoading] = useState(false);

    const isAdmin = useContext(AdminContext)

    useEffect(() => {
        setPageLoading(true)
        getData().finally(() => setPageLoading(false))
    }, [isAdmin])

    const getData = async () => {
        await getAppointments(setAppointments)
        if (isAdmin) await getAllLessons()
        else await getLessons()
    }

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
                <ContextHelper
                    text="Nessa página, você pode visualizar as aulas do dia. Em cada aula, você pode escolher participar clicando no botão mais a baixo da aula. Você não pode participar de duas aulas no mesmo horário. Na direita inferior, você pode verificar quem vai participar dessa aula. No botão laranja na direita superior da página, você pode verificar o cronograma da semana."
                    adminText="Nos botões laranja na direita superior da página, você pode adicionar novas aulas e verificar relatórios dos alunos. Em cada aula, você pode editá-la clicando no ícone de lápis ou excluí-la, clicando no ícone de lixo. No botão de pessoas, você pode marcar quem participou ou não de cada aula."
                />
                <ToastContainer />
                <div className=" py-[40px] flex items-start justify-between">
                    <div>
                        <h1 className="flex items-left px-[10px] ">Aulas do Dia</h1>
                        <h3 className="px-[11px] ">As aulas de hoje</h3>
                    </div>
                    {isAdmin ?
                        <div className="flex flex-col gap-[10px]">


                            <HoverCard>
                                <HoverCardTrigger><AddButton link="/admin/aulas/criar" /></HoverCardTrigger>
                                <HoverCardContent className="relative !left-[-50px]">
                                    Criar nova aula
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger><ReportButton link="/admin/aulas/relatorios" /></HoverCardTrigger>
                                <HoverCardContent className="relative !left-[-50px]">
                                    Ver relatórios
                                </HoverCardContent>
                            </HoverCard>
                        </div> :
                        <div className="flex flex-col gap-[10px]">

                            <HoverCard>
                                <HoverCardTrigger><CalendarButton link="/calendario/aulas" /></HoverCardTrigger>
                                <HoverCardContent className="relative !left-[-50px]">
                                    Ver calendário da semana
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    }
                </div>
                {pageLoading ? <ContentLoading /> : <div>
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
                                                    return <div key={j} className="embla__slide max-w-[350px] mx-[10px]">
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
                            {([1, 2, 3, 4, 5, 6, 0] as (keyof typeof WeekdayMap)[]).map((w, i) => {
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

                                                    return <div key={j} className="embla__slide max-w-[350px] mx-[10px]">
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
                                    </div>
                                )
                            })}
                        </>
                    }
                </div>}
            </div>
        </Layout>
    )
}

export default Lessons;