import api from "../service/api";
import { Lesson } from "../types/Lesson";
import Cookies from "js-cookie";

const getLesson = async (id: string, setState: React.Dispatch<React.SetStateAction<Lesson | undefined>>) => {
    try {
        const res = await api.get(`/lesson/${id}`, {
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

const minutesToHour = (time: number) => {
    let h = Math.floor(time / 60)
    let hour = h >= 10 ? `${h}` : `0${h}`

    let m = time % 60
    let minutes = m >= 10 ? `${m}` : `0${m}`

    return `${hour}:${minutes}`;
}

export { getLesson, minutesToHour }