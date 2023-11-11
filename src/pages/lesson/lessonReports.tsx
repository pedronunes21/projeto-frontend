import Layout from '@/components/layout'
import { ButtonLoading } from '@/components/loading'
import api from '@/service/api'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select"
import { Appointment } from '@/types/Appointment'
import { User } from '@/types/User'
import { minutesToHour } from '@/utils/lesson'
import Cookies from 'js-cookie'

import { useEffect, useState } from 'react'
import Loading from 'react-loading'

export default function LessonReports() {

    useEffect(() => {
        getUsers()
    }, [])



    const [users, setUsers] = useState<Array<User>>([]);
    const [userId, setUserId] = useState<string | undefined>();
    const [userName, setUserName] = useState<string | undefined>();
    const [loading, setLoading] = useState(false)
    const [appointments, setAppointments] = useState<Array<Appointment>>([]);
    const getUsers = async () => {
        try {
            const res = await api.get("/user", {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })

            setUsers(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getAppointmentsByUser = async () => {
        setLoading(true)
        if (userId !== undefined) {
            try {
                const res = await api.get(`/appointment/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    }
                })

                console.log(res.data)
                setUserName(users.find((u) => u.id === userId)?.name)
                setAppointments(res.data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div className="px-[20px]">
                <div className=" py-[40px] flex items-start justify-between">
                    <div>
                        <h1 className="flex items-left px-[10px] ">Relatórios</h1>
                        <h3 className="px-[11px] ">Escolha um aluno para ver suas atividades</h3>
                    </div>
                </div>

                <div className='flex gap-[20px] items-stretch'>
                    <Select onValueChange={(e) => setUserId(e)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um aluno" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Alunos</SelectLabel>
                                {users.map((u, i) =>
                                    <SelectItem key={i} value={u.id}>{u.name}</SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <button onClick={getAppointmentsByUser} className='px-[20px] flex items-center justify-center rounded-[5px] bg-orange text-white font-semibold'>Consultar</button>
                </div>

                <div className="px-[10px] py-[20px] pb-[50px]">
                    {loading ?
                        <div className='flex items-center justify-center h-[250px]'>
                            <Loading type='spin' color='#000' width={20} height={20} />
                        </div> :
                        <div>
                            {userName !== undefined && <div className='pb-[20px]'>
                                <h4 className='font-raleway font-semibold'>Atividade do aluno <strong className='text-[18px] font-bold'>
                                    {userName}</strong></h4>
                            </div>}
                            {
                                appointments.length > 0 ?
                                    <div>

                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Realizado em</th>
                                                    <th>Título</th>
                                                    <th>Categoria</th>
                                                    <th>Horário</th>
                                                    <th>Participou</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {appointments.map((a, i) => {
                                                    console.log(a)
                                                    return (
                                                        <tr key={i}>
                                                            <td>{new Date(a.createdAt).toLocaleDateString("pt-BR", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric"
                                                            })}</td>
                                                            <td>{a.lesson?.title}</td>
                                                            <td>{a.lesson?.training.category}</td>
                                                            <td>{minutesToHour(a.lesson?.time!)}</td>
                                                            <td>{a.presence ? "Sim" : "Não"}</td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div> :
                                    userName !== undefined &&
                                    <div>
                                        <span className='block text-center text-[14px]'>Esse aluno não possui nenhuma atividade!</span>
                                    </div>
                            }
                        </div>
                    }

                </div>
            </div>
        </Layout>
    )
}
