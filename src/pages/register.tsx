import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../service/api";
import ButtonLoading from "../components/ButtonLoading";
import { ToastContainer, toast } from 'react-toastify';

type Inputs = {
    email: string;
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
                email: data.email,
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
        <div className="flex items-center justify-center bg-purple min-h-screen py-[50px]">
            <ToastContainer />

            <div className="flex flex-col items-center justify-center px-[20px] py-[75px] bg-white w-full max-w-[500px] rounded-[10px]">
                <div className="max-w-[350px] w-full pb-[20px]">
                    <h1>Criar uma conta</h1>
                    <span className="subtitle">Preencha os campos abaixo para criar uma conta.</span>
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
                    <div className="w-full max-w-[350px]">
                        <input className={`${errors.email && "border-[#cc0000]"}`} {...register("confirmPassword", { required: true })} type="password" placeholder="Confirmar senha" />
                        <span className="error">{errors.confirmPassword && "Campo confirmar senha é obrigatório!"}</span>
                    </div>
                    {resError && <span className="error">{resError}</span>}
                    <button disabled={loading} className="button" type="submit">{loading ? <ButtonLoading /> : "Registrar"}</button>
                </form>
                <span className="text-[12px] pt-[10px]">Já possui uma conta? Entre <a className="text-purple font-bold" href="/login">aqui</a></span>
            </div>
        </div>
    )
}
