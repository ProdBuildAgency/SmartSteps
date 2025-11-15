import { prisma } from "../Configs/prisma";
import { CategoryRequest, CategoryStatusRequest } from "../DTO/Requests";
import { CategoryResponse } from "../DTO/Responses";
import { Category } from "../Enums";
import { AppError } from "../Utilities";

export class CategoryService {
    static async create(data: CategoryRequest): Promise<CategoryResponse> {
        const existingCategory = await prisma.categories.findFirst({
            where: {
                OR: [
                    { name: data.name },
                    { slug: data.slug },
                ],
            },
        });
        if (existingCategory) {
            throw new AppError("Category already exists with this name", 409);
        }
        if (!data.name && !data.status) {
            throw new AppError("Some data is missing.", 409);
        }
        const newCategory = await prisma.categories.create({
            data: {
                name: data.name ?? "",
                slug: data.slug,
                status: data.status ?? 1,
                parent_category_id: data.parent_category_id
            }
        })

        let parentCategory: (CategoryResponse | null) = null;
        if (newCategory.parent_category_id != null) {
            parentCategory = await this.get(newCategory.parent_category_id)
        }

        const response: CategoryResponse = {
            id: newCategory.id,
            name: newCategory.name,
            slug: newCategory.slug,
            status: Category[newCategory.status],
            parent_category: parentCategory,
            createdAt: newCategory.created_at
        }
        return response
    }

    static async getAll(): Promise<CategoryResponse[]> {
        const categories = await prisma.categories.findMany();

        const response: CategoryResponse[] = await Promise.all(categories.map(async (cat) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            status: Category[cat.status],
            parent_category: cat.parent_category_id
                ? await this.get(cat.parent_category_id)
                : null,
            createdAt: cat.created_at,
        })));
        return response
    }

    static async get(id: string): Promise<CategoryResponse> {
        const category = await prisma.categories.findUnique({
            where: {
                id: id
            }
        })

        if (!category) {
            throw new AppError("Category doesn't exist!", 404);
        }
        let parentCategory: (CategoryResponse | null) = null;
        if (category.parent_category_id != null) {
            parentCategory = await this.get(category.parent_category_id)
        }

        const response: CategoryResponse = {
            id: category.id,
            name: category.name,
            slug: category.slug,
            status: Category[category.status],
            parent_category: parentCategory,
            createdAt: category.created_at
        }
        return response
    }

    static async update(id: string, data: CategoryRequest): Promise<CategoryResponse> {
        const category = await prisma.categories.findUnique({
            where: { id }
        })

        if (!category) {
            throw new AppError("Category doesn't exist!", 404);
        }

        const allowedFields: (keyof CategoryRequest)[] = ["name", "parent_category_id", "slug"];
        const updateData = Object.fromEntries(
            Object.entries(data).filter(([key]) => allowedFields.includes(key as keyof CategoryRequest))
        );

        if (Object.keys(updateData).length === 0) {
            throw new AppError("No valid fields provided for update", 400);
        }

        const updatedCategory = await prisma.categories.update({
            where: { id },
            data: {
                name: { set: typeof updateData.name === "string" ? updateData.name : (typeof category.name === "string" ? category.name : "") },
                slug: { set: typeof updateData.phoneNumber === "string" ? updateData.phoneNumber : (typeof category.slug === "string" ? category.slug : "") },
                parent_category_id: {
                    set:
                        typeof updateData.parent_category_id === "string" && updateData.parent_category_id.trim() !== ""
                            ? updateData.parent_category_id
                            : category.parent_category_id ?? null,
                },
            },
        });

        let parentCategory: (CategoryResponse | null) = null;
        if (updatedCategory.parent_category_id != null) {
            parentCategory = await this.get(updatedCategory.parent_category_id)
        }

        const response: CategoryResponse = {
            id: updatedCategory.id,
            name: updatedCategory.name,
            slug: updatedCategory.slug,
            status: Category[updatedCategory.status],
            parent_category: parentCategory,
            createdAt: updatedCategory.created_at
        }
        return response
    }

    static async updateStatus(id: string, data: CategoryStatusRequest): Promise<CategoryResponse> {
        const category = await prisma.categories.findUnique({
            where: {
                id: id
            }
        })

        if (!category) {
            throw new AppError("Category doesn't exist!", 404);
        }

        const allowedFields: (keyof CategoryStatusRequest)[] = ["status"];
        const updateData = Object.fromEntries(
            Object.entries(data).filter(([key]) => allowedFields.includes(key as keyof CategoryStatusRequest))
        );

        if (Object.keys(updateData).length === 0) {
            throw new AppError("No valid fields provided for update", 400);
        }

        const updatedCategory = await prisma.categories.update({
            where: { id },
            data: {
                status: updateData.status
            },
        });

        let parentCategory: (CategoryResponse | null) = null;
        if (updatedCategory.parent_category_id != null) {
            parentCategory = await this.get(updatedCategory.parent_category_id)
        }

        const response: CategoryResponse = {
            id: updatedCategory.id,
            name: updatedCategory.name,
            slug: updatedCategory.slug,
            status: Category[updatedCategory.status],
            parent_category: parentCategory,
            createdAt: updatedCategory.created_at
        }
        return response
    }
}