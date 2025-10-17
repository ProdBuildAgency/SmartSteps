import { prisma } from "../Configs/prisma";
import { AppError } from "../Utilities";
import { ProductService } from "./product.service";

export class ProductTagsService {
    static async link(tx: any, productId: string, tagIds: string[]) {
        const created = await tx.product_tags.createMany({
            data: tagIds.map((tagId) => ({
                product_id: productId,
                tag_id: tagId,
            })),
            skipDuplicates: true,
        });

        const tags = await tx.tags.findMany({
            where: { id: { in: tagIds } },
            select: { id: true, name: true },
        });

        return tags;
    }
    static async linkTags(productId: string, tagIds: string[]) {
        const productExists = await prisma.products.findUnique({
            where: { id: productId },
            select: { id: true },
        });

        if (!productExists) {
            throw new AppError("Invalid product ID — product not found.", 404);
        }

        const existingTags = await prisma.tags.findMany({
            where: { id: { in: tagIds } },
            select: { id: true },
        });

        if (existingTags.length !== tagIds.length) {
            const missing = tagIds.filter(
                (id) => !existingTags.find((tag) => tag.id === id)
            );
            throw new AppError(
                `Some tags not found: ${missing.join(", ")}`,
                400
            );
        }
        await prisma.product_tags.createMany({
            data: tagIds.map((tagId) => ({
                product_id: productId,
                tag_id: tagId,
            })),
            skipDuplicates: true,
        });

        return ProductService.get(productId);
    }

    static async unlink(productId: string, tagId: string) {
        const productExists = await prisma.products.findUnique({
            where: { id: productId },
            select: { id: true },
        });

        if (!productExists) {
            throw new AppError("Invalid product ID — product not found.", 404);
        }

        const existingTag = await prisma.tags.findUnique({
            where: { id: tagId },
            select: { id: true },
        });

        if (!existingTag) {
            throw new AppError(`Tag not found`, 400);
        }
        await prisma.product_tags.delete({
            where: {
                product_id_tag_id: {
                    product_id: productId,
                    tag_id: tagId,
                }
            }
        });

        return ProductService.get(productId);
    }
}