import { z } from "zod";

export const BusinessRegisterRequestSchema = z.object({
  address: z.string().min(3, "Address is required"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  pincode: z.string().min(4, "Invalid pincode"),
  preschoolersPg: z.number().nonnegative(),
  preschoolersNur: z.number().nonnegative(),
  preschoolersJkg: z.number().nonnegative(),
  preschoolersSkg: z.number().nonnegative(),
  feeRangeMin: z.number().nonnegative(),
  feeRangeMax: z.number().nonnegative(),
}).refine(data => data.feeRangeMax > data.feeRangeMin, {
  message: "Fee range is not proper",
  path: ["feeRangeMax"]
})

export type BusinessRegisterRequest = z.infer<typeof BusinessRegisterRequestSchema>;
