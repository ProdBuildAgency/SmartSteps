import { Request, Response } from "express";
import { LoginRequest } from "../DTO/Requests";
import { LoginResponse } from "../DTO/Responses";
import { AuthService } from "../Services";

export class AuthController {
    static async login(req: Request, res: Response) {
        const requestData: LoginRequest = req.body;
        const responseData: LoginResponse = await AuthService.login(requestData);
        res.json(responseData);
    }
}