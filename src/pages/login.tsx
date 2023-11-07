import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../service/api";
import { ButtonLoading } from "../components/loading";
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Layout from "../components/layout";
import { errorHandler } from "../utils/errorHandler";

type Inputs = {
    email: string;
    password: string;
};

export default function Login() {

    const [resError, setResError] = useState("");
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
        setLoading(true);
        try {
            const res = await api.post("/auth", {
                email: data.email,
                password: data.password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(res.data)
            setResError("");
            reset();
            const token = res.data.access_token;
            Cookies.set("token", token);
            toast("Bem vindo de volta! Você será redirecionado.", {
                type: "success",
            })
            setTimeout(() => {
                location.assign("/treinos")
            }, 2500);
        } catch (err: any) {
            setResError(errorHandler(err.response.data.message))
            console.log(err.response.data)
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        if (!!Cookies.get("token"))
            window.location.replace("/treinos")
    }, [])

    return (
        <Layout>
            <div className="flex items-center justify-center px-[20px] h-[calc(100vh-60px)]">
                <ToastContainer />
                <div className="flex items-center justify-center md:justify-between w-full max-w-[1024px] gap-[20px]">
                    <div className="max-w-[450px] hidden md:block">
                        <img src="./images/amico.png" alt="Mulher Fazendo Exercicio" className="w-full h-full" />
                    </div>
                    <div className="flex flex-col items-center shadow-md py-[40px] bg-white w-full max-w-[400px] rounded-[25px] px-[20px] gap-[20px]">
                        <div className="w-full flex flex-col items-start">
                            <h1 className="text-left leading-[110%]">Bem-vindo(a) de volta!</h1>
                            <span className="subtitle">Preencha as informações para acessar sua conta.</span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-[20px] w-full">
                            <div className="w-full max-w-[350px]">
                                <h2>Email:</h2>
                                <input className={`${errors.email && "border-[#cc0000]"}`} {...register("email", { required: true })} type="text" placeholder="Digite seu email" />
                                <span className="error">{errors.email && "Campo email é obrigatório!"}</span>
                            </div>
                            <div className="w-full max-w-[350px]">
                                <h2>Senha:</h2>
                                <input className={`${errors.email && "border-[#cc0000]"}`} {...register("password", { required: true })} type="password" placeholder="Digite sua senha" />
                                <span className="error">{errors.password && "Campo senha é obrigatório!"}</span>
                            </div>
                            {resError && <span className="error">{resError}</span>}
                            <button disabled={loading} className="button" type="submit">{loading ? <ButtonLoading /> : "Entrar"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
