import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import api from '../service/api';
import ScreenLoading from '../components/ScreenLoading';
import { BiSolidUserCircle } from 'react-icons/bi'
import { TbLogout } from 'react-icons/tb'

type UserType = {
    id: string;
    email: string;
}

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<UserType[]>([])
    const [user, setUser] = useState<UserType>();

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        const token = Cookies.get("token");
        const isTokenValid = await validateToken(token!);

        if (!isTokenValid) {
            location.replace("/login");
            return;
        }

        try {
            const res = await api.get("/users")
            console.log(res);
            setUsers(res.data.data.users)
            setLoading(false);
        } catch (err) {
            console.log(err);
        }

    }

    async function validateToken(token: string) {
        try {
            const res = await api.post("/token/validate", { token })
            setUser(res.data.data.user);
            return true;
        } catch (err) {
            return false;
        }
    }

    function logout() {
        Cookies.remove("token")
        location.assign("/login");
    }

    if (loading) return <ScreenLoading />
    else return (
        <div className="flex items-center justify-center bg-purple min-h-screen py-[50px]">

            <div className="flex flex-col items-center justify-center px-[20px] py-[75px] bg-white w-full max-w-[500px] rounded-[10px]">
                <div className="max-w-[350px] w-full pb-[20px]">
                    <div className='flex items-center justify-between'>
                        <h1>Usuários</h1>
                        <button onClick={logout}><TbLogout color="#35363A" size={25} /></button>
                    </div>
                    <div className='flex items-start justify-center flex-col gap-[20px]'>
                        {users.map((u, i) => {
                            if (u.id === user?.id) {
                                return <div className='w-full flex items-center border-b border-purple/30'>
                                    <BiSolidUserCircle color="#8276f4" size={40} />
                                    <div className='max-w-[350px] w-full p-[10px]' key={i}>
                                        <span className="subtitle text-[11px]">{u.id}</span>
                                        <span>{u.email}</span>
                                    </div>
                                </div>
                            } else {
                                return <div className='w-full flex items-center border-b border-black/30'>
                                    <BiSolidUserCircle color="rgba(0,0,0,.3)" size={40} />
                                    <div className='max-w-[350px] w-full p-[10px]' key={i}>
                                        <span className="subtitle text-[11px]">{u.id}</span>
                                        <span>{u.email}</span>
                                    </div>
                                </div>
                            }
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}