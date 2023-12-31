import { useState, useEffect } from "react";
import Layout from "../../components/layout"
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../service/api";
import { toast, ToastContainer } from "react-toastify";
import { ButtonLoading, ContentLoading } from "../../components/loading";
import { Training } from "../../types/Training";
import { getTrainings } from "../../utils/training";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { getLesson, minutesToHour } from "../../utils/lesson";
import { Lesson } from "../../types/Lesson";
import ContextHelper from "@/components/contextHelper";

interface Inputs {
    users: { [name: string]: boolean }
}

const AdminListLessonUsers = () => {

    const [loading, setLoading] = useState(false);
    const [lesson, setLesson] = useState<Lesson>()
    const [_, setTrainings] = useState<Training[]>([])
    const [pageLoading, setPageLoading] = useState(false);

    const params: { id: string } = useParams()

    useEffect(() => {
        setPageLoading(true)
        getData().finally(() => setPageLoading(false))
    }, [])

    const getData = async () => {
        await getLesson(params.id, setLesson)
        await getTrainings(setTrainings)
    }

    useEffect(() => {

        if (lesson !== undefined) {
            let confirmedUsers: { [x: string]: boolean } = {}

            lesson.appointment.map((a) => {
                confirmedUsers[a.id] = a.presence
            })

            reset({
                users: confirmedUsers
            })
        }

    }, [lesson])

    const { register, handleSubmit, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        console.log({ ...data.users });
        try {
            const res = await api.post("/appointment/presence", { ...data.users }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            console.log(res.data)

            toast("Alunos confirmados!", {
                position: "bottom-right",
                type: "success"
            })
            setTimeout(() => {
                location.reload()
            }, 500)
        } catch (err) {
            toast("Ocorreu algum erro! Tente novamente mais tarde.", {
                position: "bottom-right",
                type: "error"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            {pageLoading ? <div className="h-[calc(100vh-60px)] flex items-center justify-center"><ContentLoading /></div> : <div>
                <ToastContainer />
                <ContextHelper
                    adminText="Abaixo, você pode verificar todos os alunos confirmados para essa aula e marcar presença para os alunos que comparecerem."
                />
                {!!lesson &&
                    <div className="pb-[20px]">
                        <span>{minutesToHour(lesson.time)}</span>
                        <div className="flex items-center justify-between">
                            <h2 className="text-[24px] font-bold">{lesson.title}</h2>

                        </div>
                        <div className="flex gap-[20px] py-[10px]">
                            <span className="bg-orangeBackGround text-black px-[20px] py-[5px] rounded-full font-semibold">{lesson.training.category}</span>
                        </div>
                        <div>
                            <p className="font-medium text-[12px]">{lesson.training.description}</p>
                        </div>

                        <div className="pt-[30px] px-[20px]">
                            <h4 className="font-semibold text-[20px]">Alunos confirmados:</h4>
                            {lesson.appointment.length <= 0 && <span className="text-[14px] pl-[20px] py-[10px] block">Nenhum aluno confirmado ainda!</span>}
                            <form onSubmit={handleSubmit(onSubmit)} className="pl-[20px] py-[10px]">
                                {lesson.appointment.map((a, i) => (
                                    <div key={i} className="flex items-center gap-[10px] border-b border-black/20 py-[5px]">
                                        <input className="w-[15px] h-[15px]" type="checkbox" {...register(`users.${a.id}`)} />
                                        <label className="text-[16px] font-normal">{a.user?.name}</label>
                                    </div>
                                ))}

                                {lesson.appointment.length > 0 && <div className="flex items-center justify-center py-[20px]">
                                    <button className="bg-orange px-[30px] py-[5px] rounded-[5px] text-white font-medium" type="submit">{loading ? <ButtonLoading /> : "Salvar"}</button>
                                </div>}
                            </form>
                        </div>
                    </div>}
            </div>}

        </Layout>
    )
}

export default AdminListLessonUsers