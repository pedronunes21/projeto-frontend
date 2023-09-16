import { useEffect, useState } from "react"
import { AdminContext } from "./context/admin"
import Router from "./routes"
import api from "./service/api";
import Cookies from "js-cookie";


const App = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => { validateAdmin() }, [])

    const validateAdmin = async () => {
        try {
            await api.get("/auth/admin", {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            setIsAdmin(true);
        } catch (err: any) {
            // Cookies.remove("token")
            // window.location.replace("/entrar")
        }
    }

    return (
        <AdminContext.Provider value={isAdmin}>
            <Router />
        </AdminContext.Provider>
    )
}

export default App;