
export interface Training {
    id: string;
    description: string;
    category: Category;
}

interface Category {
    id: string;
    name: string;
}