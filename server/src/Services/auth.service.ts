import { prisma } from "../Configs/prisma";
import { BusinessRegisterRequest, LoginRequest, ResetPasswordRequest, UserRegisterRequest } from "../DTO/Requests";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { RegisterResponse, LoginResponse, ResetPasswordResponse } from "../DTO/Responses";
import { Role } from "../Enums";
import { AppError } from "../Utilities";

export class AuthService {
    static async login(data: LoginRequest): Promise<LoginResponse> {
        const validData = data;

        const isEmailPresent: boolean = data.emailOrPhone.includes("@");

        const user = await prisma.users.findUnique({
            where: isEmailPresent
                ? { email: validData.emailOrPhone }
                : { phone: validData.emailOrPhone }
        })

        if (
            !user ||
            !user.password_hash ||
            !(await bcrypt.compare(validData.password, user.password_hash))
        ) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '700d' }
        );

        const res: LoginResponse = {
            token,
            user: {
                id: user.id,
                role: Role[user.role],
                name: user?.name ?? ""
            }
        }
        return res;
    }
    static async register(data: UserRegisterRequest & Partial<BusinessRegisterRequest>): Promise<RegisterResponse> {
        const validatedUser = data;

        const validatedBusiness = validatedUser.role === Role.BUSINESS ? data : null;

        const existingUser = await prisma.users.findFirst({
            where: {
                OR: [
                    { email: validatedUser.email },
                    { phone: validatedUser.phoneNumber },
                ],
            },
        });

        if (existingUser) {
            throw new AppError("User already exists with this email or phone", 409);
        }

        const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

        const newUser = await prisma.users.create({
            data: {
                role: validatedUser.role,
                name: validatedUser.name,
                email: validatedUser.email,
                phone: validatedUser.phoneNumber,
                password_hash: hashedPassword,
            },
        });

        let newBusiness = null;
        if (validatedUser.role === Role.BUSINESS && validatedBusiness) {
            newBusiness = await prisma.businesses.create({
                data: {
                    owner_user_id: newUser.id,
                    name: validatedBusiness.name,
                    address: validatedBusiness.address,
                    city: validatedBusiness.city,
                    state: validatedBusiness.state,
                    pincode: validatedBusiness.pincode,
                    phone: validatedUser.phoneNumber,
                    num_preschoolers_pg: validatedBusiness.preschoolersPg,
                    num_preschoolers_nur: validatedBusiness.preschoolersNur,
                    num_preschoolers_jkg: validatedBusiness.preschoolersJkg,
                    num_preschoolers_skg: validatedBusiness.preschoolersSkg,
                    fee_range_min: validatedBusiness.feeRangeMin,
                    fee_range_max: validatedBusiness.feeRangeMax,
                },
            });
        }

        const token = jwt.sign(
            { userId: newUser.id, role: newUser.role },
            process.env.JWT_SECRET!,
            { expiresIn: "700d" }
        );

        const response: RegisterResponse = {
            token,
            user: {
                id: newUser.id,
                role: Role[newUser.role],
                name: newUser.name ?? "",
            },
            business: newBusiness
                ? {
                    businessName: newBusiness.name,
                }
                : undefined,
        };

        return response;
    }
    static async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
        const user = await prisma.users.findUnique({
            where: {
                id: data.userId
            }
        })

        if (!user) {
            throw new Error(`User doesn't Exists`);
        }

        const newPassword = await bcrypt.hash(data.password, 10);
        const updatedUser = await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                password_hash: newPassword
            }
        })
        const response: ResetPasswordResponse = {
            user: {
                id: updatedUser.id,
                role: Role[updatedUser.role],
                name: updatedUser?.name ?? ""
            }
        }
        return response;
    }
}