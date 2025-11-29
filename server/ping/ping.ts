import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());


app.put("/product/update-id/", async (req: Request, res: Response) => {
  try {
    const oldId = "1";   // old product uuid
    const newId = "1";     // new product uuid

    const updatedProduct = await prisma.products.update({
      where: { id: oldId },
      data: { id: newId },
    });

    res.status(200).json({
      message: "Product ID updated successfully",
      product: updatedProduct,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed to update product ID",
      error: error.message,
    });
  }
});

// =====================================
// Start Server
// =====================================
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
