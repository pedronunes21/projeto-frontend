import { useState, useEffect } from "react";
import Layout from "../../components/layout"
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../service/api";
import { toast } from "react-toastify";
import { ButtonLoading } from "../../components/loading";
import { Training, TrainingCategory } from "../../types/Training";
import { getTraining, getTrainingCategories } from "../../utils/training";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

interface Inputs {
    description: string;
    categoryId: string;
}

const AdminEditTraining = () => {

    const [loading, setLoading] = useState(false);
    const [formError] = useState("");
    const [categories, setCategories] = useState<TrainingCategory[]>([])
    const [training, setTraining] = useState<Training>()

    const params: { id: string } = useParams()

    useEffect(() => {
        getTraining(params.id, setTraining)
        getTrainingCategories(setCategories)
    }, [])

    useEffect(() => {
        reset({
            description: training?.description,
            categoryId: training?.category.id
        })
    }, [training])

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        const { description, categoryId } = data;

        try {
            const res = await api.put(`/training/${params.id}`, {
                description,
                categoryId
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            console.log(res.data)
            reset()

            toast("Treino criado com sucesso", {
                position: "bottom-right",
                type: "success"
            })
            setTimeout(() => {
                location.assign("/treinos")
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
                <div className="flex flex-col items-center shadow-md py-[40px] bg-white w-full max-w-[400px] rounded-[25px] px-[20px] gap-[20px]">
                    <div className="w-full flex flex-col items-start">
                        <h1 className="text-left leading-[110%]">Editar Treino</h1>
                        <span className="subtitle">Edite os campos abaixo para atualizar o treino</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[20px] mt-[20px] items-center justify-center w-full">

                        <div className='w-full max-w-[450px]'>
                            <select className="input" {...register("categoryId", { required: true })}>
                                {categories.map((c, i) => (
                                    <option key={i} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            {errors.description && <span className="error">Campo descrição é obrigatório!</span>}
                        </div>

                        <div className='w-full max-w-[450px]'>
                            <textarea {...register("description", {
                                required: true
                            })} className={`input h-auto ${errors.description && "input-error"}`} placeholder="Descrição do Treino" rows={7} />
                            {errors.description && <span className="error">Campo descrição é obrigatório!</span>}
                        </div>

                        {formError && <span className="error">{formError}</span>}

                        <div className='w-full max-w-[450px]'>
                            <button disabled={loading} className='w-full bg-orange h-[45px] flex items-center justify-center rounded-[3px] font-bold text-white'>
                                {loading ? <ButtonLoading /> : "Criar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </Layout>
    )
}

export default AdminEditTraining