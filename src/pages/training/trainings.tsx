import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Training } from "../../types/Training";
import { AdminContext } from "../../context/admin";
import AddButton from "../../components/addButton";
import EditButton from "../../components/editButton";
import { getTrainings } from "../../utils/training";
import api from "@/service/api";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { ConfirmationPopover } from "@/components/confirmationPopover";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/src/components/ui/hover-card"
import ContextHelper from "@/components/contextHelper";

const Trainigns = () => {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const isAdmin = useContext(AdminContext)
    useEffect(() => {
        getTrainings(setTrainings)
    }, [])
    async function deleteTraining(trainingId: string) {
        try {
            await api.delete(`/training/${trainingId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })

            toast("Treino removido com sucesso!", {
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
        }
    }

    return (
        <Layout>
            <div className="px-[20px]">
                <ContextHelper
                    text="Nessa página, você pode visualizar os treinos que podem ser realizados na academia."
                    adminText="Nos botões laranja na direita superior da página, você pode adicionar novos treinos. Em cada treino, você pode editá-lo clicando no ícone de lápis ou excluí-lo, clicando no ícone de lixo."
                />
                <ToastContainer />
                <div className=" py-[40px] flex items-center justify-between">
                    <div>
                        <h1 className="flex items-left px-[10px] ">Treinos</h1>
                        <h3 className="px-[11px] ">Lista completa de todos os treinos da academia</h3>
                    </div>
                    {isAdmin && <div>
                        <HoverCard>
                            <HoverCardTrigger><AddButton link="/admin/treinos/criar" /></HoverCardTrigger>
                            <HoverCardContent className="relative !left-[-50px]">
                                Criar novo treino
                            </HoverCardContent>
                        </HoverCard>

                    </div>}
                </div>
                <div className="flex gap-[20px] flex-wrap items-stretch justify-start py-[50px]">
                    {trainings.map((t, i) => (
                        <div key={i} className="bg-white shadow-lg px-[20px] pb-[30px] py-[15px] rounded-[5px] max-w-[350px] w-full">
                            <div className="flex justify-between items-center gap-[20px] py-[10px]">
                                <span className="text-black py-[5px] rounded-full font-bold">{t.category}</span>
                                {isAdmin && <div className="flex items-center gap-[10px]">
                                    <HoverCard>
                                        <HoverCardTrigger><EditButton link={`/admin/treinos/editar/${t.id}`} /></HoverCardTrigger>
                                        <HoverCardContent className="relative !left-[-50px]">
                                            Editar treino
                                        </HoverCardContent>
                                    </HoverCard>
                                    <ConfirmationPopover hoverCard="Excluir treino" message="Tem certeza que deseja excluir esse treino?" action={() => deleteTraining(t.id)} />
                                </div>}
                            </div>
                            <div>
                                <p className="font-medium text-black">{t.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Trainigns;