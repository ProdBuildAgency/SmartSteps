import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const ping = Router();

// GET /users/:id
ping.get("/users", async (req: Request, res: Response) => {
  const id = "2faef5a2-374d-44f4-bcaf-fd125580c74a";

  try {
    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default ping;
