import { z } from "zod";
import { Asset } from "../../Enums";

export const productAssetStatusRequestSchema = z.object({
  status: z.nativeEnum(Asset, "Status is not present."),
});

export type ProductAssetStatusRequest = z.infer<typeof productAssetStatusRequestSchema>;
