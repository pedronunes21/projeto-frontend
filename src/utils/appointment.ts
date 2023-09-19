import api from "../service/api";
import Cookies from "js-cookie";
import { Appointment } from "../types/Appointment";

const getAppointments = async (setState: React.Dispatch<React.SetStateAction<Appointment[]>>) => {
    try {
        const res = await api.get("/appointment", {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        setState(res.data);
    } catch (err) {
        console.log(err)
    }
}

const getAppointmentsHistory = async (setState: React.Dispatch<React.SetStateAction<Appointment[]>>) => {
    try {
        const res = await api.get("/appointment/history", {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        setState(res.data);
    } catch (err) {
        console.log(err)
    }
}

const getAppointmentByLesson = async (lessonId: string, setState: React.Dispatch<React.SetStateAction<Appointment[]>>) => {
    try {
        const res = await api.get(`/appointment/lesson/${lessonId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        setState(res.data)
    } catch (err) {
        console.log(err)
    }
}

export { getAppointments, getAppointmentByLesson, getAppointmentsHistory }