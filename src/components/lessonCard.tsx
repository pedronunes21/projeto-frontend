import { AdminContext } from "@/context/admin"
import { useContext, useEffect, useState } from 'react'
import EditButton from "./editButton"
import { Lesson } from "@/types/Lesson"
import { ButtonLoading } from "./loading"
import api from "@/service/api"
import Cookies from "js-cookie"
import { toast, ToastContainer } from 'react-toastify'
import { Appointment } from "@/types/Appointment"
import { FaCheck, FaPlus, FaTrash, FaUserFriends } from "react-icons/fa"
import { getAppointmentByLesson } from "@/utils/appointment"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { minutesToHour } from "@/utils/lesson"
import { ConfirmationPopover } from "./confirmationPopover"

export default function LessonCard(props: {
    lesson: Lesson,
    appointment: Appointment | undefined,
    showTime?: boolean,
}) {
    const isAdmin = useContext(AdminContext)

    const [loading, setLoading] = useState(false);
    const [lessonAppointments, setLessonAppointments] = useState<Appointment[]>([])

    useEffect(() => {
        getAppointmentByLesson(props.lesson.id, setLessonAppointments)
    }, [])



    const scheduleLesson = async (lessonId: string) => {
        setLoading(true);
        try {
            await api.post("/appointment", {
                lessonId,
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })

            toast("Agendamento realizado com sucesso!", {
                position: "bottom-right",
                type: "success"
            })
            setTimeout(() => {
                location.reload()
            }, 1000)
        } catch (err: any) {
            toast(err.response.data.message, {
                position: "bottom-right",
                type: "error"
            })
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const unscheduleLesson = async (lessonId: string) => {
        setLoading(true);
        try {
            await api.delete(`/appointment/${lessonId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })

            toast("Agendamento removido com sucesso!", {
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
            setLoading(false)
        }
    }

    async function deleteLesson(lessonId: string) {
        try {
            await api.delete(`/lesson/${lessonId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })

            toast("Aula removida com sucesso!", {
                position: "bottom-right",
                type: "success"
            })
            setTimeout(() => {
                location.reload()
            }, 1000)
        } catch (err: any) {
            toast(err.response.data.message, {
                position: "bottom-right",
                type: "error"
            })
        }
    }

    return (
        <div className="relative bg-white shadow-lg px-[20px] py-[30px] rounded-[5px] max-w-[350px] w-full">
            <ToastContainer />
            <div className="pb-[20px]">
                {props.showTime && <span>{minutesToHour(props.lesson.time)}</span>}
                <div className="flex items-center justify-between">
                    <h2>{props.lesson.title}</h2>
                    {isAdmin && <div className="flex items-center gap-[10px]">
                        <EditButton link={`/admin/aulas/editar/${props.lesson.id}`} />
                        {/* <button onClick={() => deleteLesson(props.lesson.id)}><FaTrash color="red" size={15} /></button> */}
                        <ConfirmationPopover message="Tem certeza que deseja excluir essa aula?" action={() => deleteLesson(props.lesson.id)} />
                    </div>}
                </div>
                <div className="flex gap-[20px] py-[10px]">
                    <span className="bg-orangeBackGround text-black px-[20px] py-[5px] rounded-full font-bold">{props.lesson.training.category}</span>
                </div>
                <div>
                    <p className="font-medium">{props.lesson.training.description}</p>
                </div>

            </div>
            <div className="absolute left-[50%] translate-x-[-50%] top-[calc(100%-40px)] flex items-center -justify-center flex-col">
                <span className="text-[14px]">{!!props.appointment ? "Presença confirmada" : "Participar da aula:"}</span>
                <div className="text-[20px] flex items-center">
                    <span>{lessonAppointments.length}</span>
                    <button onClick={!!props.appointment ? () => unscheduleLesson(props.lesson.id) : () => scheduleLesson(props.lesson.id)} className={`p-[10px] rounded-full ${!!props.appointment ? "bg-green" : lessonAppointments.length >= props.lesson.max_users ? "bg-orange" : "bg-blue"} mx-[5px]`}>
                        {loading ? <ButtonLoading /> : <FaCheck color="white" size={20} />}
                    </button>
                    <span className="font-bold">{props.lesson.max_users}</span></div>
            </div>
            <div className="absolute right-[20px] bottom-[20px] z-50">
                {isAdmin ? <a href={`/admin/aulas/alunos/${props.lesson.id}`}><FaUserFriends size={20} /></a> : <Popover>
                    <PopoverTrigger><FaUserFriends size={20} /></PopoverTrigger>
                    <PopoverContent className="bg-white px-[10px] py-[5px] rounded-[10px] min-w-[200px]">
                        <span className="block mb-[20px]">Participantes</span>
                        {lessonAppointments.map((l, j) => (
                            <div className="border-b border-orange px-[5px] mb-[2px]" key={j}>{l.user?.name}</div>
                        ))}

                    </PopoverContent>
                </Popover>}
            </div>
        </div>
    )
}