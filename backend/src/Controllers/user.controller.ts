import { Request, Response } from 'express';
import { UserResponse } from '../DTO/Responses';
import { UserRequest, UserSchema } from '../DTO/Requests';
import { AppError } from '../Utilities';
import { UserService } from '../Services';

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
}
