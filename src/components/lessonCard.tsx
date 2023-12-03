import { AdminContext } from "@/context/admin"
import { useContext, useEffect, useState } from 'react'
import EditButton from "./editButton"
import { Lesson } from "@/types/Lesson"
import { ButtonLoading } from "./loading"
import api from "@/service/api"
import Cookies from "js-cookie"
import { toast } from 'react-toastify'
import { Appointment } from "@/types/Appointment"
import { FaCheck, FaPlus, FaUserFriends } from "react-icons/fa"
import { getAppointmentByLesson } from "@/utils/appointment"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { minutesToHour } from "@/utils/lesson"
import { ConfirmationPopover } from "./confirmationPopover"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/src/components/ui/hover-card"

export default function LessonCard(props: {
    lesson: Lesson,
    appointment: Appointment | undefined,
    appointments: Appointment[] | undefined,
    showTime?: boolean,
    disabled?: boolean,
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

    const timeConflict = props.appointments?.find((a) => a.lesson?.time === props.lesson.time && a.lesson.weekday === props.lesson.weekday && a.lesson.id !== props.lesson.id)

    return (
        <div className="relative bg-white shadow-lg px-[20px] py-[30px] rounded-[5px] max-w-[350px] w-full h-full">
            {/* <ToastContainer /> */}
            <div className="pb-[20px]">
                {props.showTime && <span>{minutesToHour(props.lesson.time)}</span>}
                <div className="flex items-center justify-between">
                    <h2>{props.lesson.title}</h2>
                    {isAdmin && <div className="flex items-center gap-[10px]">
                        <HoverCard>
                            <HoverCardTrigger><EditButton link={`/admin/aulas/editar/${props.lesson.id}`} /></HoverCardTrigger>
                            <HoverCardContent className="relative !left-[-50px]">
                                Editar aula
                            </HoverCardContent>
                        </HoverCard>
                        <ConfirmationPopover hoverCard="Excluir aula" message="Tem certeza que deseja excluir essa aula?" action={() => deleteLesson(props.lesson.id)} />
                    </div>}
                </div>
                <div className="flex gap-[20px] py-[10px]">
                    <span className="bg-orangeBackGround text-black px-[20px] py-[5px] rounded-full font-bold">{props.lesson.training.category}</span>
                </div>
                <div>
                    <p className="font-medium whitespace-pre-wrap">{props.lesson.training.description}</p>
                </div>

            </div>
            {!props.disabled && <div className="absolute left-[50%] translate-x-[-50%] top-[calc(100%-40px)] flex items-center -justify-center flex-col">
                <span className="text-[14px] text-center">
                    {!!props.appointment ?
                        "Presença confirmada" :
                        timeConflict ?
                            "Horário ocupado" :
                            "Participar da aula:"}
                </span>
                <div className="text-[20px] flex items-center">
                    <span>{lessonAppointments.length}</span>
                    <HoverCard>
                        <HoverCardTrigger className="flex items-center justify-center">
                            <button
                                onClick={!!props.appointment ?
                                    () => unscheduleLesson(props.lesson.id) :
                                    timeConflict ?
                                        () => { } :
                                        () => scheduleLesson(props.lesson.id)
                                }
                                className={`p-[10px] rounded-full 
                        ${!!props.appointment ?
                                        "bg-green" :
                                        timeConflict ?
                                            "bg-gray-300" :
                                            lessonAppointments.length >= props.lesson.max_users ?
                                                "bg-orange" :
                                                "bg-blue"
                                    } mx-[5px]`}
                            >
                                {loading ?
                                    <ButtonLoading /> :
                                    timeConflict ?
                                        <FaPlus className="rotate-45" color="white" size={20} /> :
                                        <FaCheck color="white" size={20} />
                                }
                            </button>
                        </HoverCardTrigger>
                        <HoverCardContent className="text-[16px]">
                            {!!props.appointment ?
                                "Cancelar agendamento" :
                                timeConflict ?
                                    "Horário indisponível" :
                                    lessonAppointments.length >= props.lesson.max_users ?
                                        "Aula cheia" :
                                        "Agendar horário"
                            }
                        </HoverCardContent>
                    </HoverCard>

                    <span className="font-bold">{props.lesson.max_users}</span></div>
            </div>}

            <div className="absolute right-[20px] bottom-[20px] z-50">
                {isAdmin ?
                    <HoverCard>
                        <HoverCardTrigger className="flex items-center justify-center">
                            <a href={`/admin/aulas/alunos/${props.lesson.id}`}><FaUserFriends size={20} /></a>
                        </HoverCardTrigger>
                        <HoverCardContent className="relative !left-[-50px]">
                            Ver participantes
                        </HoverCardContent>
                    </HoverCard> :
                    <Popover>
                        <HoverCard>
                            <HoverCardTrigger className="flex items-center justify-center">
                                <PopoverTrigger><FaUserFriends size={20} /></PopoverTrigger>
                            </HoverCardTrigger>
                            <HoverCardContent className="relative !left-[-50px]">
                                Ver participantes
                            </HoverCardContent>
                        </HoverCard>

                        <PopoverContent className="bg-white p-[15px] rounded-[5px] min-w-[200px] shadow-lg border border-gray-300">
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