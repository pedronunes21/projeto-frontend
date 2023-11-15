import { useState, useEffect } from "react";
import Layout from "../../components/layout"
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../service/api";
import { toast, ToastContainer } from "react-toastify";
import { ButtonLoading } from "../../components/loading";
import { Training } from "../../types/Training";
import { getTraining, getTrainings } from "../../utils/training";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { getLesson, minutesToHour } from "../../utils/lesson";
import { Lesson } from "../../types/Lesson";
import ContextHelper from "@/components/contextHelper";

interface Inputs {
    weekday: string | number;
    time: string;
    title: string;
    max_users: string | number;
    trainingId: string;
}

const AdminEditLesson = () => {

    const [loading, setLoading] = useState(false);
    const [formError] = useState("");
    const [lesson, setLesson] = useState<Lesson>()
    const [trainings, setTrainings] = useState<Training[]>([])

    const params: { id: string } = useParams()

    useEffect(() => {
        getLesson(params.id, setLesson)
        getTrainings(setTrainings)
    }, [])

    useEffect(() => {
        if (lesson !== undefined)
            reset({
                max_users: lesson.max_users,
                time: minutesToHour(lesson.time),
                title: lesson.title,
                trainingId: lesson.training.id,
                weekday: lesson.weekday,

            })
    }, [lesson, trainings])

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        const { max_users, time, title, trainingId, weekday } = data;

        let maxUsers = Number(max_users)
        let weekDay = Number(weekday)

        let hour = Number(time.split(":")[0])
        let minutes = Number(time.split(":")[1])

        let timeInMinutes = hour * 60 + minutes;

        console.log(data)

        try {
            const res = await api.put(`/lesson/${params.id}`, {
                max_users: maxUsers,
                time: timeInMinutes,
                title,
                trainingId,
                weekday: weekDay
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            console.log(res.data)
            reset()

            toast("Aula atualizada com sucesso", {
                position: "bottom-right",
                type: "success"
            })
            setTimeout(() => {
                location.assign("/aulas")
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

    return (
        <Layout>
            <div className="flex items-center justify-center min-h-[calc(100vh-70px)]">
                <ContextHelper
                    adminText="Para editar as informações da aula, basta alterá-las no formulário abaixo e salvar."
                />
                <ToastContainer />
                <div className="flex flex-col items-center shadow-md py-[40px] bg-white w-full max-w-[400px] rounded-[25px] px-[20px] gap-[20px]">
                    <div className="w-full flex flex-col items-start">
                        <h1 className="text-left leading-[110%]">Editar Aula</h1>
                        <span className="subtitle">Edite os campos abaixo para atualizar a aula</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[20px] mt-[20px] items-center justify-center w-full">

                        <div className='w-full max-w-[450px]'>
                            <label>Escolha um treino:</label>
                            <select {...register("trainingId", {
                                required: true
                            })} className={`input h-auto ${errors.trainingId && "input-error"}`} placeholder="Treino" >
                                <option value="">Selecione um treino</option>
                                {trainings.map((t, i) => (
                                    <option key={i} value={t.id}>{t.category}</option>
                                ))}
                            </select>
                            {errors.trainingId && <span className="error">Campo treino é obrigatório!</span>}
                        </div>
                        <div className='w-full max-w-[450px]'>
                            <label>Dia da semana:</label>
                            <select {...register("weekday", {
                                required: true
                            })} className={`input h-auto ${errors.weekday && "input-error"}`} placeholder="Treino" >
                                <option value="">Selecione um dia da semana</option>
                                <option value={1}>Segunda</option>
                                <option value={2}>Terça</option>
                                <option value={3}>Quarta</option>
                                <option value={4}>Quinta</option>
                                <option value={5}>Sexta</option>
                                <option value={6}>Sábado</option>
                                <option value={0}>Domingo</option>
                            </select>
                            {errors.weekday && <span className="error">Campo dia da semana é obrigatório!</span>}
                        </div>
                        <div className='w-full max-w-[450px]'>
                            <label>Título:</label>
                            <input {...register("title", {
                                required: true
                            })} className={`h-auto ${errors.title && "input-error"}`} placeholder="Título da Aula" />
                            {errors.title && <span className="error">Campo título é obrigatório!</span>}
                        </div>

                        <div className='w-full max-w-[450px]'>
                            <label>Horário:</label>
                            <input {...register("time", {
                                required: true
                            })} type="time" className={`h-auto ${errors.time && "input-error"}`} placeholder="Horário da Aula" />
                            {errors.time && <span className="error">Campo horário é obrigatório!</span>}
                        </div>

                        <div className='w-full max-w-[450px]'>
                            <label>Tamanho da turma:</label>
                            <input {...register("max_users", {
                                required: true
                            })} type="number" min="1" className={`h-auto ${errors.max_users && "input-error"}`} placeholder="Máximo de pessoas que podem participar" />
                            {errors.max_users && <span className="error">Campo máximo de usuários é obrigatório!</span>}
                        </div>
                        {formError && <span className="error">{formError}</span>}

                        <div className='w-full max-w-[450px]'>
                            <button disabled={loading} className='w-full bg-orange h-[45px] flex items-center justify-center rounded-[3px] font-bold text-white'>
                                {loading ? <ButtonLoading /> : "Salvar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </Layout>
    )
}

export default AdminEditLesson