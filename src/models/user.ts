export interface IUser {
    id: number;
    email: string;
    auth: boolean;
    message: string;
    token: string;
}

export interface IUserInitial {
    data: {
        id: number;
        email: string;
        auth: boolean;
        message: string;
        token: string;
    };
    error: null | string;
}
