import { Appointment } from "./Appointment";
import { Training } from "./Training";

export interface Lesson {
    id: string;
    weekday: keyof typeof WeekdayMap;
    time: number;
    title: string;
    max_users: number;
    training: Training;
    appointment: Appointment[]
}

export const WeekdayMap = {
    0: "Domingo",
    1: "Segunda",
    2: "Terça",
    3: "Quarta",
    4: "Quinta",
    5: "Sexta",
    6: "Sábado",
}