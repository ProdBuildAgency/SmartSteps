export interface RegisterResponse {
  token: string;
  user: {
    id: string;
    role: number;
    name: string;
  };
  business?: {
    name: string;
  };
}