import { Lesson } from "./Lesson";

export interface Appointment {
    id: string;
    lesson?: Lesson
    lessonId: string;
    user?: {
        id: string;
        email: string;
    }
    userId: string;
}