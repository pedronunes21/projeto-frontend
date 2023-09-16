import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import api from "../../service/api";
import Cookies from "js-cookie";
import { Profile } from "../../types/Profile";

const Profiles = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    useEffect(() => {
        getProfiles()
    }, [])

    const getProfiles = async () => {
        try {
            const res = await api.get("/profile", {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            setProfiles(res.data);
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
                    {profiles.map((t, i) => (
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

export default Profiles;