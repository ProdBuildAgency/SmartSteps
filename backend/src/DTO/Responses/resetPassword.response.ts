export interface ResetPasswordResponse {
  user: {
    id: string;
    role: number;
    name: string;
  };
}