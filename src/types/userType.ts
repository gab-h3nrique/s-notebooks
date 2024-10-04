export interface UserType {
    id: number;
    name: string;
    email: string;
    password: string;
    role: number
}

export const EMPTY_USER = {

    id: -1,
    name: '',
    email: '',
    password: '',
    role: 200
    
}