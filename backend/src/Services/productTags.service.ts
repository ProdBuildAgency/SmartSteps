import { prisma } from "../Configs/prisma";
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