import { z } from "zod";
import { ProductStatus } from "../../Enums";

export const productStatusRequestSchema = z.object({
  status: z.nativeEnum(ProductStatus, "Status is not present."),
});

export type ProductStatusRequest = z.infer<typeof productStatusRequestSchema>;
