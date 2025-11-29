import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateProductId() {
  try {
    const oldId = "1";
    const newId = "1";

    const updatedProduct = await prisma.products.update({
      where: { id: oldId },
      data: { id: newId },
    });

    console.log("Updated product:", updatedProduct);
  } catch (err) {
    console.error("Failed to update product ID", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

updateProductId();
