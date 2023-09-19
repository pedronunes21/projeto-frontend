import api from "../service/api";
import { UserInvite } from "../types/User";
import Cookies from "js-cookie";

const getUserInvites = async (setState: React.Dispatch<React.SetStateAction<UserInvite[]>>) => {
    try {
        const res = await api.get("/invite/user", {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        setState(res.data);
        console.log(res.data);
    } catch (err) {
        console.log(err)
    }
}

const createUserInvite = async () => {
    try {
        const res = await api.post("/invite/user", {}, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })

        return res.data;
    } catch (err) {
        console.log(err)
    }
}

export { getUserInvites, createUserInvite }