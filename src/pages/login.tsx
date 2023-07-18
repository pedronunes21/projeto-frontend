import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../service/api";
import ButtonLoading from "../components/ButtonLoading";
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';

type Inputs = {
    email: string;
    password: string;
};

export default function Login() {

    const [resError, setResError] = useState("");
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        try {
            const res = await api.post("/login", {
                email: data.email,
                password: data.password
            })
            const token = res.data.data.token;
            Cookies.set("token", token);
            toast("Logado com sucesso!", {
                type: "success",
            })
            setTimeout(() => {
                location.assign("/")
            }, 3000);
            setResError("");
            reset();
        } catch (err: any) {
            setResError(err.response.data.message)
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="flex items-center justify-center bg-purple min-h-screen py-[50px]">
            <ToastContainer />

            <div className="flex flex-col items-center justify-center px-[20px] py-[75px] bg-white w-full max-w-[500px] rounded-[10px]">
                <div className="max-w-[350px] w-full pb-[20px]">
                    <h1>Entrar</h1>
                    <span className="subtitle">Preencha os campos abaixo para acessar sua conta.</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-[20px] w-full">
                    <div className="w-full max-w-[350px]">
                        <input className={`${errors.email && "border-[#cc0000]"}`} {...register("email", { required: true })} type="text" placeholder="Email" />
                        <span className="error">{errors.email && "Campo email é obrigatório!"}</span>
                    </div>
                    <div className="w-full max-w-[350px]">
                        <input className={`${errors.email && "border-[#cc0000]"}`} {...register("password", { required: true })} type="password" placeholder="Senha" />
                        <span className="error">{errors.password && "Campo senha é obrigatório!"}</span>
                    </div>
                    {resError && <span className="error">{resError}</span>}
                    <button disabled={loading} className="button" type="submit">{loading ? <ButtonLoading /> : "Entrar"}</button>
                </form>
                <span className="text-[12px] pt-[10px]">Ainda não possui uma conta? Registre-se <a className="text-purple font-bold" href="/register">aqui</a></span>
            </div>
        </div>
    )
}
