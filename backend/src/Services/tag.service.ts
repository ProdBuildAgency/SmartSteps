import { prisma } from "../Configs/prisma";
import { TagRequest, TagStatusRequest } from "../DTO/Requests";
import { TagResponse } from "../DTO/Responses";
import { Tag } from "../Enums";
import { AppError } from "../Utilities";

export class TagService {
    static async create(data: TagRequest) {
        const existingTag = await prisma.tags.findFirst({
            where: {
                OR: [
                    { name: data.name },
                    { slug: data.slug },
                ]
            },
        });
        if (existingTag) {
            throw new AppError("Tag already exists with this name", 409);
        }
        const newTag = await prisma.tags.create({
            data: {
                name: data.name ?? "",
                slug: data.slug,
                status: data.status ?? 1,
            }
        })

        const response: TagResponse = {
            id: newTag.id,
            name: newTag.name,
            slug: newTag.slug,
            status: Tag[newTag.status],
            createdAt: newTag.created_at
        }
        return response
    }

    static async getAll(): Promise<TagResponse[]> {
        const tags = await prisma.tags.findMany();

        const response: TagResponse[] = tags.map((tag) => ({
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
            status: Tag[tag.status],
            createdAt: tag.created_at,
        }));
        return response
    }

    static async get(id: string): Promise<TagResponse> {
        const tag = await prisma.tags.findUnique({
            where: {
                id: id
            }
        })

        if (!tag) {
            throw new AppError("Tag doesn't exist!", 404);
        }

        const response: TagResponse = {
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
            status: Tag[tag.status],
            createdAt: tag.created_at
        }
        return response
    }


    static async update(id: string, data: TagRequest): Promise<TagResponse> {
        const tag = await prisma.tags.findUnique({
            where: {
                id: id
            }
        })

        if (!tag) {
            throw new AppError("Tag doesn't exist!", 404);
        }

        const allowedFields: (keyof TagRequest)[] = ["name", "slug"];
        const updateData = Object.fromEntries(
            Object.entries(data).filter(([key]) => allowedFields.includes(key as keyof TagRequest))
        );

        if (Object.keys(updateData).length === 0) {
            throw new AppError("No valid fields provided for update", 400);
        }

        const updatedTag = await prisma.tags.update({
            where: { id },
            data: {
                name: { set: typeof updateData.name === "string" ? updateData.name : (typeof tag.name === "string" ? tag.name : "") },
                slug: { set: typeof updateData.phoneNumber === "string" ? updateData.phoneNumber : (typeof tag.slug === "string" ? tag.slug : "") },
            },
        });

        const response: TagResponse = {
            id: updatedTag.id,
            name: updatedTag.name,
            slug: updatedTag.slug,
            status: Tag[updatedTag.status],
            createdAt: updatedTag.created_at
        }
        return response
    }

    static async updateStatus(id: string, data: TagStatusRequest): Promise<TagResponse> {
        const tag = await prisma.tags.findUnique({
            where: {
                id: id
            }
        })

        if (!tag) {
            throw new AppError("Tag doesn't exist!", 404);
        }

        const allowedFields: (keyof TagStatusRequest)[] = ["status"];
        const updateData = Object.fromEntries(
            Object.entries(data).filter(([key]) => allowedFields.includes(key as keyof TagStatusRequest))
        );

        if (Object.keys(updateData).length === 0) {
            throw new AppError("No valid fields provided for update", 400);
        }

        const updatedTag = await prisma.tags.update({
            where: { id },
            data: {
                status: updateData.status
            },
        });

        const response: TagResponse = {
            id: updatedTag.id,
            name: updatedTag.name,
            slug: updatedTag.slug,
            status: Tag[updatedTag.status],
            createdAt: updatedTag.created_at
        }
        return response
    }
}