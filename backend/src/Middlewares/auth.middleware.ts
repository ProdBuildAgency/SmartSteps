import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: number };
}

export class AuthMiddleWare {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      (req as AuthenticatedRequest).user = {
        id: decoded.userId || decoded.id,
        role: decoded.role,
      };
      next();
    } catch {
      res.status(401).json({ message: "Invalid token" });
    }
  }
}