import Layout from "../../components/layout";
import Cookies from "js-cookie";

const Profiles = () => {
    // const [profiles, setProfiles] = useState<Profile[]>([]);
    // useEffect(() => {
    //     getProfiles()
    // }, [])

    // const getProfiles = async () => {
    //     try {
    //         const res = await api.get("/profile", {
    //             headers: {
    //                 Authorization: `Bearer ${Cookies.get("token")}`
    //             }
    //         })
    //         setProfiles(res.data);
    //         console.log(res.data);
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const logout = () => {
        Cookies.remove("token")
        location.assign('/entrar')
    }

    return (
        <Layout>
            <div>
                <div className=" py-[40px] px-[100px] flex flex-col items-start">
                    <h1>Perfil</h1>
                    <h3>Edite suas informações abaixo</h3>
                    <div>
                        <button onClick={logout}>Sair</button>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Profiles;