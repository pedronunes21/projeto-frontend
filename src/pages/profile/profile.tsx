import { useContext, useState, useEffect } from "react";
import AddButton from "../../components/addButton";
import Layout from "../../components/layout";
import Cookies from "js-cookie";
import { AdminContext } from "../../context/admin";
import api from "../../service/api";
import { User, UserInvite } from "../../types/User";
import { getUserInvites } from "../../utils/user";
import { FaTrash } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/components/ui/popover"
import { getAppointmentsHistory } from "@/utils/appointment";
import { Appointment } from "@/types/Appointment";
import { minutesToHour } from "@/utils/lesson";
import InviteUser from "@/components/inviteUser";
import UpdateProfile from "@/components/updateProfile";

const Profiles = () => {
    const isAdmin = useContext(AdminContext)
    const [userInvites, setUserInvites] = useState<UserInvite[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        if (isAdmin) {
            getUserInvites(setUserInvites)
            listUsers()
            getMe()
        }
        getAppointmentsHistory(setAppointments)
    }, [isAdmin])

    const logout = () => {
        Cookies.remove("token")
        location.assign('/entrar')
    }

    const deleteUserInvite = async (id: string) => {
        try {
            await api.delete(`/invite/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })

            toast("Convite excluído com sucesso!", {
                position: "bottom-right",
                type: "success"
            })
            setTimeout(() => {
                location.reload()
            }, 1000)
        } catch (err) {
            toast("Ocorreu algum erro! Tente novamente mais tarde.", {
                position: "bottom-right",
                type: "error"
            })
        }
    }

    const deleteUser = async (id: string) => {
        try {
            await api.delete(`/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })

            toast("Usuário excluído com sucesso!", {
                position: "bottom-right",
                type: "success"
            })
            setTimeout(() => {
                location.reload()
            }, 1000)
        } catch (err) {
            toast("Ocorreu algum erro! Tente novamente mais tarde.", {
                position: "bottom-right",
                type: "error"
            })
        }
    }

    const listUsers = async () => {
        try {
            const res = await api.get(`/user`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            setUsers(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const [me, setMe] = useState<User>()
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

    return (
        <Layout>
            <div className="px-[20px]">
                <ToastContainer />
                <div>
                    <div className="py-[40px] flex items-center justify-between">
                        <div>
                            <h1>Perfil</h1>
                            <h3>Seu perfil</h3>
                        </div>
                        <button onClick={logout}><FiLogOut size={30} color="black" /></button>
                    </div>

                    <div>
                        <UpdateProfile />
                    </div>
                </div>

                <div>
                    <div className=" pt-[40px] flex items-center justify-between">
                        <div>
                            <h1>Agendamentos Realizados</h1>
                            <h3>Lista dos seus agendamentos</h3>
                        </div>
                    </div>
                    <div className="px-[10px] py-[20px] pb-[50px]">
                        {appointments.length > 0 ? <table>
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Categoria</th>
                                    <th>Horário</th>
                                    <th>Criado em</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((a, i) => {
                                    console.log(a)
                                    return (
                                        <tr key={i}>
                                            <td>{a.lesson?.title}</td>
                                            <td>{a.lesson?.training.category}</td>
                                            <td>{minutesToHour(a.lesson?.time!)}</td>
                                            <td>{new Date(a.createdAt).toLocaleDateString("pt-BR", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric"
                                            })}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table> : <span className="text-[14px] block text-center">Você ainda não participou de nenhuma aula!</span>}

                    </div>
                </div>

                {isAdmin && <div>
                    <div className=" py-[40px] flex items-center justify-between">
                        <div>
                            <h1>Gerenciar Usuários</h1>
                            <h3>Todos os usuários cadastrados</h3>
                        </div>
                    </div>
                    <div className="px-[10px] py-[20px]">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Data de Nascimento</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u, i) => {
                                    let date = new Date(u.birthDate)
                                    const parsedDate = `${date.getUTCDate() >= 10 ? date.getUTCDate() : `0${date.getUTCDate()}`}/${date.getUTCMonth() + 1 >= 10 ? date.getUTCMonth() + 1 : `0${date.getUTCMonth() + 1}`}/${date.getUTCFullYear()}`
                                    return (
                                        <tr key={i}>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>{parsedDate}</td>
                                            <td>
                                                {!!me && me.id !== u.id && <button onClick={() => deleteUser(u.id)}>
                                                    <FaTrash color="red" size={15} />
                                                </button>}
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>

                    </div>
                    <div className=" py-[40px] flex items-center justify-between">
                        <div>
                            <h1>Convidar usuários</h1>
                            <h3>Lista de convites gerados</h3>
                        </div>
                        <div>
                            <Popover>
                                <PopoverTrigger><AddButton /></PopoverTrigger>
                                <PopoverContent className="mr-[50px]">
                                    <InviteUser />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="px-[10px] py-[20px]">
                        {userInvites.map((u, i) => (
                            <div className="border-b border-orange p-[10px] flex justify-between" key={i}>
                                <span>{u.invite}</span>
                                <button onClick={() => deleteUserInvite(u.id)}><FaTrash color="red" size={15} /></button>
                            </div>
                        ))}
                    </div>
                </div>
                }
            </div>
        </Layout>
    )
}

export default Profiles;