import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout";
import api from "../../service/api";
import Cookies from "js-cookie";
import { Lesson } from "../../types/Lesson";
import { AdminContext } from "../../context/admin";
import AddButton from "../../components/addButton";
import EditButton from "../../components/editButton";

const Lessons = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const isAdmin = useContext(AdminContext)

    useEffect(() => {
        getLessons()
    }, [])

    const getLessons = async () => {
        try {
            const res = await api.get("/lesson", {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            console.log(res.data)
            setLessons(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    const minutesToHour = (time: number) => {
        let h = Math.floor(time / 60)
        let hour = h >= 10 ? `${h}` : `0${h}`

        let m = time % 60
        let minutes = m >= 10 ? `${m}` : `0${m}`

        return `${hour}:${minutes}`;
    }

    return (
        <Layout>
            <div>
                <div className=" py-[40px] px-[100px] flex items-center justify-between">
                    <div>
                        <h1 className="flex items-left px-[10px] ">Aulas do Dia</h1>
                        <h3 className="px-[11px] ">As aulas de hoje</h3>
                    </div>
                    {isAdmin && <div>
                        <AddButton link="/admin/aulas/criar" />
                    </div>}
                </div>
                <div className="flex gap-[20px] flex-wrap items-stretch justify-center py-[50px]">
                    {lessons.map((l, i) => (
                        <div key={i} className="bg-[rgba(200,165,125,.5)] p-[20px] rounded-[5px] max-w-[350px] w-full">
                            <div>
                                <span>{minutesToHour(l.time)}</span>

                                <div className="flex items-center justify-between">
                                    <h2>{l.title}</h2>
                                    {isAdmin && <div>
                                        <EditButton link={`/admin/aulas/editar/${l.id}`} />
                                    </div>}
                                </div>
                                <div className="flex gap-[20px] py-[10px]">
                                    <span className="bg-orangeBackGround text-black px-[20px] py-[5px] rounded-full font-bold">{l.training.category.name}</span>
                                </div>
                                <div>
                                    <p className="font-medium">{l.training.description}</p>
                                </div>
                                <div>
                                    <span>0/{l.max_users}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Lessons;