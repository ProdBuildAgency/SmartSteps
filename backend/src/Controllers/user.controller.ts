import { Request, Response } from 'express';
import { prisma } from '../Configs/prisma';

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.users.findUnique({ where: { id } });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const user = await prisma.users.update({ where: { id }, data });
  res.json(user);
};
