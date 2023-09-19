
export interface UserInvite {
    id: string;
    invite: string;
    used: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    birthDate: Date;
}