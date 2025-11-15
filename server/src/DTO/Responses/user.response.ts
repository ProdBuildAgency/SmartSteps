import { Role } from "../../Enums";

export interface UserResponse {
    id: string,
    email: string,
    phone: string,
    role: Role,
    name: string,
    createdAt: Date | null,
    updatedAt: Date | null
}