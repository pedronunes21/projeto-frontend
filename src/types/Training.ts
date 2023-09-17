
export interface Training {
    id: string;
    description: string;
    category: TrainingCategory;
}

export interface TrainingCategory {
    id: string;
    name: string;
}