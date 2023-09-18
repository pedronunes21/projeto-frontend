import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout";
import api from "../../service/api";
import Cookies from "js-cookie";
import { Lesson } from "../../types/Lesson";
import { AdminContext } from "../../context/admin";
import AddButton from "../../components/addButton";
import EditButton from "../../components/editButton";
import { minutesToHour } from "../../utils/lesson";
import { FaCheck, FaPlus } from "react-icons/fa";

import { toast, ToastContainer } from 'react-toastify'
import { ButtonLoading } from "../../components/loading";
import { getAppointments } from "../../utils/appointment";
import { Appointment } from "../../types/Appointment";

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
            console.log(res.data)

            const schedules: number[] = []
            res.data.forEach((v: Lesson) => {
                if (!schedules.find((s) => s === v.time)) schedules.push(v.time)
            })
            setLessonsSchedule(schedules)
            setLessons(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    const [loading, setLoading] = useState("");

    const scheduleLesson = async (lessonId: string) => {
        setLoading(lessonId);
        try {
            const res = await api.post("/appointment", {
                lessonId,
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })

            console.log(res.data)

            toast("Agendamento realizado com sucesso!", {
                position: "bottom-right",
                type: "success"
            })
            setTimeout(() => {
                location.reload()
            }, 1000)
        } catch (err) {
            toast("Ocorreu algum erro! Tente novamente mais tarde.", {
                position: "bottom-right",
                type: "error"
            })
        } finally {
            setLoading("")
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
                                    return (
                                        <div key={j} className="bg-[rgba(200,165,125,.5)] p-[20px] rounded-[5px] max-w-[350px] w-full">
                                            <div className="relative pb-[20px]">
                                                <div className="flex items-center justify-between">
                                                    <h2>{l.title}</h2>
                                                    {isAdmin && <div>
                                                        <EditButton link={`/admin/aulas/editar/${l.id}`} />
                                                    </div>}
                                                </div>
                                                <div className="flex gap-[20px] py-[10px]">
                                                    <span className="bg-orangeBackGround text-black px-[20px] py-[5px] rounded-full font-bold">{l.training.category}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium">{l.training.description}</p>
                                                </div>
                                                <div className="absolute left-[50%] translate-x-[-50%] top-[100%]">
                                                    <div className="text-[20px] flex items-center">
                                                        <span>5</span>
                                                        <button onClick={() => scheduleLesson(l.id)} className={`p-[10px] rounded-full ${!!appointment ? "bg-green" : "bg-blue"} mx-[5px]`}>
                                                            {loading === l.id ? <ButtonLoading /> : !!appointment ? <FaCheck color="white" size={20} /> : <FaPlus color="white" size={20} />}
                                                        </button>
                                                        <span className="font-bold">{l.max_users}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
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