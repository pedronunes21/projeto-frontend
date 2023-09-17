import { useState, useEffect } from "react";
import Layout from "../../components/layout"
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../service/api";
import { toast } from "react-toastify";
import { ButtonLoading } from "../../components/loading";
import { TrainingCategory } from "../../types/Training";
import { getTrainingCategories } from "../../utils/training";
import Cookies from "js-cookie";

interface Inputs {
    description: string;
    categoryId: string;
}

const AdminCreateTraining = () => {

    const [loading, setLoading] = useState(false);
    const [formError] = useState("");
    const [categories, setCategories] = useState<TrainingCategory[]>([])

    useEffect(() => {
        getTrainingCategories(setCategories)
    }, [])

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        const { description, categoryId } = data;
        console.log(data)
        try {
            const res = await api.post("/training", {
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
                        <h1 className="text-left leading-[110%]">Criar Treino</h1>
                        <span className="subtitle">Preencha os campos abaixo para criar um treino</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[20px] mt-[20px] items-center justify-center w-full">

                        <div className='w-full max-w-[450px]'>
                            <select defaultValue="" className="input" {...register("categoryId", {
                                required: true
                            })}>
                                <option value="">Selecione uma categoria</option>
                                {categories.map((c, i) => (
                                    <option key={i} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            {errors.categoryId && <span className="error">Você deve selecionar uma categoria</span>}
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

export default AdminCreateTraining