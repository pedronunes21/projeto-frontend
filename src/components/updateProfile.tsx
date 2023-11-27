import { User } from "@/types/User";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ButtonLoading } from "./loading";
import api from "@/service/api";
import Cookies from "js-cookie";

interface Inputs {
    name: string;
    email: string;
    birthDate: string;
    password?: string;
}

export default function UpdateProfile() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const [loading, setLoading] = useState(false);
    const [resError, _] = useState("");
    const [me, setMe] = useState<User>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true)
        const { birthDate, email, name, password } = data;
        console.log(data)

        try {
            const res = await api.put("/user", {
                birthDate: new Date(birthDate),
                name,
                email,
                password
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            console.log(res)
            toast("Seu perfil foi atualizado!", {
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
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMe()
    }, [])

    async function getMe() {
        try {
            const res = await api.get("/user/me", {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            setMe(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (me) {
            let date = new Date(me?.birthDate)
            const parsedDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1 >= 10 ? date.getUTCMonth() + 1 : `0${date.getUTCMonth() + 1}`}-${date.getUTCDate() >= 10 ? date.getUTCDate() : `0${date.getUTCDate()}`}`

            reset({
                birthDate: parsedDate,
                name: me?.name,
                email: me?.email,
            })
        }
    }, [me])

    return (
        <div className="flex items-center justify-center px-[20px]">
            <div className="flex items-center justify-center md:justify-between w-full max-w-[1024px] gap-[80px]">


                <form onSubmit={handleSubmit(onSubmit)} className="flex items-stretch justify-center flex-col sm:flex-row gap-[20px] w-full">
                    <div className="flex flex-col w-full gap-[20px] items-center justify-between">
                        <div className="w-full max-w-[350px]">
                            <h3>Nome:</h3>
                            <input className={`${errors.name && "border-[#cc0000]"}`} {...register("name", { required: true })} type="text" placeholder="Seu nome" />
                            <span className="error">{errors.name && "Campo nome é obrigatório!"}</span>
                        </div>
                        <div className="w-full max-w-[350px]">
                            <h3>Email:</h3>
                            <input className={`${errors.email && "border-[#cc0000]"}`} {...register("email", { required: true })} type="email" placeholder="Seu email" />
                            <span className="error">{errors.email && "Campo email é obrigatório!"}</span>
                        </div>
                        <div className="w-full max-w-[350px]">
                            <h3>Data de nascimento:</h3>
                            <input className={`${errors.birthDate && "border-[#cc0000]"}`} {...register("birthDate", { required: true })} type="date" placeholder="Sua data de nascimento" />
                            <span className="error">{errors.birthDate && "Campo data de nascimento é obrigatório!"}</span>
                        </div>
                        <div className="w-full max-w-[350px]">
                            <h3>Senha:</h3>
                            <input className={`${errors.password && "border-[#cc0000]"}`} {...register("password")} type="password" placeholder="Sua senha" />
                            <span className="error">{errors.password && "Campo senha é obrigatório!"}</span>
                        </div>
                        {resError && <span className="error">{resError}</span>}
                        <button disabled={loading} className="button" type="submit">{loading ? <ButtonLoading /> : "Salvar"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}