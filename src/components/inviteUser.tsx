import mail from "@/service/mail";
import { UserInvite } from "@/types/User";
import { createUserInvite } from "@/utils/user";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ButtonLoading } from "./loading";

interface Inputs {
    email: string;
}

export default function InviteUser() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const userInvite: UserInvite = await createUserInvite();

        if (!!userInvite) {
            setLoading(true)
            // http://localhost:5173
            const link = `${window.location.origin}/registro?invite=` + userInvite.invite

            const body = `
            <h1 style="margin: 0;">Você foi convidado para o Box Pumpi</h1>
            <span>Acesse o link abaixo para criar sua conta</span>
            <div style="display: grid; padding: 20px 10px;">
                <div style="padding: 20px 0;">
                    <a href=${link}>Clique aqui!</a>
                </div>
                <div style="display: grid;">
                    <span>Ou se preferir copie o link abaixo:</span>
                    <span style="color: blue">${link}</span>
                </div>
            </div>
        `

            try {
                await mail.post("", {
                    to: data.email,
                    subject: "Convite para você!",
                    message: body,
                    from: "pedro.neto72pn@gmail.com",
                    as: "Pumpi"
                })

                reset()
                toast("Convite enviado com sucesso!", {
                    position: "bottom-right",
                    type: "success"
                })
                setTimeout(() => {
                    location.reload()
                }, 1500)
            } catch (err) {
                toast("Ocorreu algum erro! Tente novamente mais tarde.", {
                    position: "bottom-right",
                    type: "error"
                })
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[20px]">
            <h4>Digite o email do usuário para convidar</h4>
            <div className='w-full max-w-[450px]'>
                <input {...register("email", {
                    required: true
                })} type="email" min="1" className={`h-auto ${errors.email && "input-error"}`} placeholder="Email" />
                {errors.email && <span className="error">Campo email é obrigatório!</span>}
            </div>

            <div className='w-full max-w-[450px]'>
                <button disabled={loading} className='w-full bg-orange h-[45px] flex items-center justify-center rounded-[3px] font-bold text-white'>
                    {loading ? <ButtonLoading /> : "Convidar"}
                </button>
            </div>
        </form>
    )
}