import { Request, Response } from 'express';
import { UserResponse } from '../DTO/Responses';
import { UserRequest, UserSchema } from '../DTO/Requests';
import { AppError } from '../Utilities';
import { UserService } from '../Services';
import { AuthenticatedRequest } from '../Middlewares';

export class UserController {
  static async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user: UserResponse = await UserService.getUser(id);
    res.json(user);
  };

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const parsed = UserSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new AppError("Invalid request body", 400, parsed.error.issues);
    }

    const requestData: UserRequest = parsed.data;
    const user: UserResponse = await UserService.updateUser(id, requestData);
    res.json(user);
  }

  static async authorize(req: AuthenticatedRequest, res: Response) {
    if (!req.user || !req.user.id) {
      throw new AppError("Please login first", 401);
    }

    const id = req.user.id;
    const user = await UserService.getUser(id);

    return res.status(200).json(user);
  }
}
