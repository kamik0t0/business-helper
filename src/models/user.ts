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
    isLoading: boolean;
    error: null | string;
}
