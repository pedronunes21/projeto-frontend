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

const Lessons = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [lessonsSchedule, setLessonsSchedule] = useState<number[]>([])
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const isAdmin = useContext(AdminContext)

    useEffect(() => {
        getLessons()
        getAppointments(setAppointments)
    }, [])

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

    return (
        <Layout>
            <div className="px-[20px]">
                <ToastContainer />
                <div className=" py-[40px] flex items-center justify-between">
                    <div>
                        <h1 className="flex items-left px-[10px] ">Aulas do Dia</h1>
                        <h3 className="px-[11px] ">As aulas de hoje</h3>
                    </div>
                    {isAdmin && <div>
                        <AddButton link="/admin/aulas/criar" />
                    </div>}
                </div>
                <div className="flex gap-[20px] flex-col py-[50px] px-[10px]">
                    {lessonsSchedule.map((ls, i) => (
                        <div key={i}>
                            <h2 className="text-[22px] font-bold">{minutesToHour(ls)}</h2>
                            <div className="flex flex-wrap gap-[20px] justify-start pl-[20px] pt-[20px] pb-[40px]">
                                {lessons.filter((l) => l.time === ls).map((l, j) => {
                                    const appointment = appointments.find((a) => a.lessonId === l.id)
                                    return <LessonCard
                                        lesson={l}
                                        appointment={appointment}
                                        key={j}
                                    />
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Lessons;