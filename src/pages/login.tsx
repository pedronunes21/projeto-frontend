import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../service/api";
import ButtonLoading from "../components/ButtonLoading";
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from "axios";

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
            // const token = res.data.data.token;
            // Cookies.set("token", token);
            // toast("Logado com sucesso!", {
            //     type: "success",
            // })
            // setTimeout(() => {
            //     location.assign("/")
            // }, 3000);
            // setResError("");
            // reset();
        } catch (err: any) {
            console.log(err.response.data)
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="flex items-center justify-center bg-orangeBackGround min-h-screen">
            <ToastContainer />
            <div className="pumpi absolute top-[20px] left-[20px]">PUMPI</div>
            <div className="w-[50%]">
            <img src="./images/amico.png" alt="Mulher Fazendo Exercicio" className="w-full h-full" />
            </div>
            <div className="flex flex-col items-center shadow-md py-[40px] bg-white w-full max-w-[400px] rounded-[25px] ml-auto mr-[145px] px-[20px]">
                <div className="max-w-[330px] w-[360px] pb-[23px]">
                    <h1>Bem-vindo(a) de volta!</h1>
                    <span className="subtitle max-w-[310px]">Preencha as informações para acessar sua conta.</span>
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
                <span className="max-w-[348px] w-full text-[14px] pt-[8px] items-left justify-left font-raleway font-extralight">Ainda não possui uma conta? Registre-se <a className="text-blue font-raleway font-bold hover:text-orange" href="/register">aqui</a></span>
            </div>
        </div>
    )
}
