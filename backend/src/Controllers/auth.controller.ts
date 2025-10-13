import { Request, Response } from "express";
import { BusinessRegisterRequestSchema, LoginRequest, LoginRequestSchema, ResetPasswordRequest, ResetPasswordSchema, UserRegisterRequest, UserRegisterRequestSchema } from "../DTO/Requests";
import { LoginResponse, ResetPasswordResponse } from "../DTO/Responses";
import { AuthService } from "../Services";
import { AppError } from "../Utilities";
import { Role } from "../Enums";

export class AuthController {
    static async login(req: Request, res: Response) {
        const parsed = LoginRequestSchema.safeParse(req.body);

        if (!parsed.success) {
            throw new AppError("Invalid request body", 400, parsed.error.issues);
        }
        const requestData: LoginRequest = parsed.data;
        const responseData: LoginResponse = await AuthService.login(requestData);
        res.json(responseData);
    }

    static async register(req: Request, res: Response) {
        const userParsed = UserRegisterRequestSchema.safeParse(req.body);
        if (!userParsed.success) {
            throw new AppError("Invalid user data", 400, userParsed.error.issues);
        }
        let finalData = userParsed.data;

        if (userParsed.data.role === Role.BUSINESS) {
            const businessParsed = BusinessRegisterRequestSchema.safeParse(req.body);
            if (!businessParsed.success) {
                throw new AppError("Invalid business data", 400, businessParsed.error.issues);
            }
            finalData = { ...userParsed.data, ...businessParsed.data };
        }

        const result = await AuthService.register(finalData);

        res.status(201).json(result);
    }

    static async resetPassword(req: Request, res: Response) {
        const parsed = ResetPasswordSchema.safeParse(req.body);
        
        if (!parsed.success) {
            throw new AppError("Invalid request body", 400, parsed.error.issues);
        }

        const requestData: ResetPasswordRequest = parsed.data;
        const responseData: ResetPasswordResponse = await AuthService.resetPassword(requestData);
        res.json(responseData);
    }
}