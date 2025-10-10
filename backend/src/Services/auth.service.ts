import { prisma } from "../Configs/prisma";
import { LoginRequest } from "../DTO/Requests";
import { userSchema } from "../Schemas";
import { LoginResponse } from '../DTO/Responses/login.response';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export class AuthService {
    static async login(data: LoginRequest) : Promise<LoginResponse> {
        // validate data and convert to Schema
        const validData = userSchema.pick({ email: true, password: true, phone: true}).parse(data);

        const isEmailPresent: boolean = !!validData?.email;

        // pass data to prisma to check in db
        const user = await prisma.user.findUnique({
            where: { [isEmailPresent ? 'email' : 'phone']: validData[isEmailPresent ? 'email' : 'phone']! }
        })

        if (!user || !(await bcrypt.compare(validData.password, user.password))) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        // return data in response format
        const res: LoginResponse = {
            token,
            user: {
                id: user.id,
                role: user.role,
                name: user.name
            }
        }
        return res;
    }
}