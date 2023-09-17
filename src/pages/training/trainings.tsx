import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Training } from "../../types/Training";
import { AdminContext } from "../../context/admin";
import AddButton from "../../components/addButton";
import EditButton from "../../components/editButton";
import { getTrainings } from "../../utils/training";

const Trainigns = () => {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const isAdmin = useContext(AdminContext)
    useEffect(() => {
        getTrainings(setTrainings)
    }, [])

    return (
        <Layout>
            <div>
                <div className=" py-[40px] px-[100px] flex items-center justify-between">
                    <div>
                        <h1 className="flex items-left px-[10px] ">Treinos</h1>
                        <h3 className="px-[11px] ">Lista completa de todos os treinos da academia</h3>
                    </div>
                    {isAdmin && <div>
                        <AddButton link="/admin/treinos/criar" />
                    </div>}
                </div>
                <div className="flex gap-[20px] flex-wrap items-stretch justify-center py-[50px]">
                    {trainings.map((t, i) => (
                        <div key={i} className="bg-[rgba(200,165,125,.5)] p-[20px] rounded-[5px] max-w-[350px] w-full">
                            <div className="flex justify-between items-center gap-[20px] py-[10px]">
                                <span className="bg-orangeBackGround text-black px-[20px] py-[5px] rounded-full font-bold">{t.category.name}</span>
                                {isAdmin && <div>
                                    <EditButton link={`/admin/treinos/editar/${t.id}`} />
                                </div>}
                            </div>
                            <div>
                                <p className="font-medium text-white">{t.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Trainigns;