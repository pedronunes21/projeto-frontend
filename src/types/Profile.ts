
export interface Profile {
    id: string;
    description: string;
    category: Category[];
}

interface Category {
    id: string;
    name: string;
}