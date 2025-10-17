import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    ".mp4",
    ".mov",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword"
];

export const fileSchema = z.any()
    .refine(file => file instanceof File, { message: "Must be a File object" })
    .refine(file => file.size <= 20 * 1024 * 1024, { message: "File size must be less than 20MB" })
    .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png, and .webp .pdf are allowed."
    );