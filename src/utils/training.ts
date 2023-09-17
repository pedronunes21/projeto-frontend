import api from "../service/api";
import { Training, TrainingCategory } from "../types/Training";
import Cookies from "js-cookie";

const getTrainings = async (setState: React.Dispatch<React.SetStateAction<Training[]>>) => {
    try {
        const res = await api.get("/training", {
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

const getTraining = async (id: string, setState: React.Dispatch<React.SetStateAction<Training | undefined>>) => {
    try {
        const res = await api.get(`/training/${id}`, {
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

const getTrainingCategories = async (setState: React.Dispatch<React.SetStateAction<TrainingCategory[]>>) => {
    try {
        const res = await api.get("/category/training", {
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

export { getTrainings, getTrainingCategories, getTraining }