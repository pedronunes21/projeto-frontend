import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import api from "../../service/api";
import Cookies from "js-cookie";
import { Training } from "../../types/Training";

const Trainigns = () => {
    const [trainings, setTrainings] = useState<Training[]>([]);
    useEffect(() => {
        getTrainings()
    }, [])

    const getTrainings = async () => {
        try {
            const res = await api.get("/training", {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            setTrainings(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Layout>
            <div className="pt-[60px] px-[20px]">
                <h1>Treinos</h1>
                <div className="flex gap-[20px] flex-wrap items-stretch justify-center py-[50px]">
                    {trainings.map((t, i) => (
                        <div key={i} className="bg-[rgba(200,165,125,.5)] p-[20px] rounded-[5px] max-w-[350px] w-full">
                            <div className="flex gap-[20px] py-[10px]">
                                {t.category.map((c, j) => <span className="bg-orangeBackGround text-black px-[20px] py-[5px] rounded-full font-bold" key={j}>{c.name}</span>)}
                            </div>
                            <div>
                                <p className="font-medium">{t.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Trainigns;