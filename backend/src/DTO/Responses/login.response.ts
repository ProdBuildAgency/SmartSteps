export interface LoginResponse {
    token: string;
    user: {
        id: string;
        role: number;
        name: string;
    }
}