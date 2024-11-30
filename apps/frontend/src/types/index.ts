

export type LoginFormType = {
    username: string;
    password: string;
}

export type SignupFormType = {
    username: string;
    password: string;
    role: string;
}

export interface User{
    id: string;
    username: string;
    role: string;
    token: string;
    avatarId: string;
    updatedAt: string;
    createdAt: string;
}