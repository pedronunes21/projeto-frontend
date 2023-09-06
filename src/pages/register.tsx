import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../service/api";
import { ButtonLoading } from "../components/loading";
import { ToastContainer, toast } from 'react-toastify';
import Layout from "../components/layout";

type Inputs = {
    name: string;
    email: string;
    date: Date;
    password: string;
    confirmPassword: string;
};

export default function Register() {

    const [resError, setResError] = useState("");
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (data.password !== data.confirmPassword) {
            setResError("As senhas devem ser iguais!");
            return;
        }

        setLoading(true);
        try {
            await api.post("/register", {
                name: data.name,
                email: data.email,
                date: data.date,
                password: data.password
            })
            toast("Usuário criado com sucesso!", {
                type: "success",
            })
            setTimeout(() => {
                location.assign("/login")
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

        <Layout>
            <div className="flex items-center justify-center px-[20px] min-h-screen pt-[60px]">
                <ToastContainer />
                <ToastContainer />
                <div className="flex items-center justify-center md:justify-between w-full max-w-[1024px] gap-[20px]">
                    <div className="w-[30%] max-w-[450px] hidden md:block">
                        <img src="./images/rafiki.png" alt="Homem Agachando" className="w-full h-full" />
                    </div>
                    <div className="flex flex-col items-center shadow-md py-[40px] bg-white w-full max-w-[400px] sm:max-w-[750px] rounded-[25px] px-[20px] gap-[20px]">
                        <div className="w-full flex flex-col items-center sm:items-start">
                            <h1 className="text-left leading-[110%]">Seja bem-vindo(a)!</h1>
                            <span className="subtitle">Preencha com suas informações para criar uma conta.</span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex items-stretch justify-center flex-col sm:flex-row gap-[20px] w-full">
                            <div className="flex flex-col w-full gap-[20px] items-center justify-between">
                                <div className="w-full max-w-[350px]">
                                    <h3>Nome:</h3>
                                    <input className={`${errors.email && "border-[#cc0000]"}`} {...register("name", { required: true })} type="text" placeholder="Seu nome" />
                                    <span className="error">{errors.email && "Campo nome é obrigatório!"}</span>
                                </div>
                                <div className="w-full max-w-[350px]">
                                    <h3>Email:</h3>
                                    <input className={`${errors.email && "border-[#cc0000]"}`} {...register("email", { required: true })} type="text" placeholder="Seu email" />
                                    <span className="error">{errors.email && "Campo email é obrigatório!"}</span>
                                </div>
                                <div className="w-full max-w-[350px]">
                                    <h3>Data de nascimento:</h3>
                                    <input className={`${errors.email && "border-[#cc0000]"}`} {...register("date", { required: true })} type="date" placeholder="Sua data de nascimento" />
                                    <span className="error">{errors.email && "Campo data de nascimento é obrigatório!"}</span>
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-[20px] items-center justify-between">
                                <div className="w-full max-w-[350px]">
                                    <h3>Senha:</h3>
                                    <input className={`${errors.email && "border-[#cc0000]"}`} {...register("password", { required: true })} type="password" placeholder="Sua senha" />
                                    <span className="error">{errors.password && "Campo senha é obrigatório!"}</span>
                                </div>
                                <div className="w-full max-w-[350px]">
                                    <h3>Confirmar senha:</h3>
                                    <input className={`${errors.email && "border-[#cc0000]"}`} {...register("confirmPassword", { required: true })} type="password" placeholder="Confirme sua senha" />
                                    <span className="error">{errors.confirmPassword && "Campo confirmar senha é obrigatório!"}</span>
                                </div>
                                {resError && <span className="error">{resError}</span>}
                                <button disabled={loading} className="button" type="submit">{loading ? <ButtonLoading /> : "Registrar"}</button>
                            </div>
                        </form>
                        <span className="w-full text-[14px] font-normal text-center sm:text-left">Já tem uma conta? Entre <a className="text-blue font-bold" href="/entrar">aqui</a></span>
                    </div>
                </div>
            </div>
        </Layout>



    )
}
