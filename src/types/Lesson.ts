import { Training } from "./Training";

export interface Lesson {
    id: string;
    weekday: number;
    time: number;
    title: string;
    max_users: number;
    training: Training;
}