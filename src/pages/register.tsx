import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../service/api";
import ButtonLoading from "../components/ButtonLoading";
import { ToastContainer, toast } from 'react-toastify';

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
        <div className="flex items-center justify-center bg-orangeBackGround min-h-screen py-[50px]">
            <ToastContainer />
            <div className="pumpi">PUMPI</div>
            <img src="./images/rafiki.png" alt="Homem Agachando" className="mt-[80px] mb-[-30px] ml-[-5px] w-[400px] h-[460px]"/>
            <div className="flex flex-col items-center justify-center mt-[-40px] mb-[-40px] px-[30px] py-[45px] bg-white w-full max-w-[500px] rounded-[25px] shadow-md ml-auto mr-[100px]">
                <div className="max-w-[350px] w-full pb-[15px]">
                    <h1>Seja bem-vindo(a)!</h1>
                    <span className="subtitle max-w-[310px]">Preencha com suas informações para criar uma conta.</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-[10px] w-full">
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
                    <button disabled={loading} className="button mt-[8px]" type="submit">{loading ? <ButtonLoading /> : "Registrar"}</button>
                </form>
                <span className="text-[13px] pt-[10px]">Já possui uma conta? Entre <a className="text-blue font-raleway font-bold hover:text-orange" href="/login">aqui</a></span>
            </div>
        </div>
    )
}
