export interface UserInfo {
    id: number;
    name: string;
    avatar?: string;
    email?: string;
    phone?: string;
    gender?: 'male' | 'female' | 'other';
    createdAt: string;
    updatedAt: string;
}

export interface LoginParams {
    name: string;
    password: string;
}

export interface RegisterParams extends LoginParams {
    email?: string;
    phone?: string;
}

export interface UpdateUserParams {
    avatar?: string;
    email?: string;
    phone?: string;
    gender?: 'male' | 'female' | 'other';
}
