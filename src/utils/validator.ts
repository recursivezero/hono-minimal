import { z } from "@hono/zod-openapi";
import mongoose, { isValidObjectId } from "mongoose";

export const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];
export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const objectIdSchema = z
  .string()
  .openapi({
    description: "A valid MongoDB ObjectId",
    example: "650c822709e3e3708304910f",
  });


export const objectIdValidator = objectIdSchema
  .refine(val => isValidObjectId(val), {
    message: "Invalid ObjectId",
  })
  .transform(val => new mongoose.Types.ObjectId(val));


export const inputImageSchema = z.any().openapi({
  type: "string",
  format: "binary",
  description: "The image file to be uploaded.",
});


export const inputImageValidator = inputImageSchema
  .refine(file => file instanceof File, {
    message: "Must be a File object",
  })
  .refine(file => file.size <= MAX_FILE_SIZE, {
    message: "Max image size is 5MB.",
  })
  .refine(file => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type), {
    message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
  });

export const dateValidator = z.string().default(new Date().toISOString());
export const EmailRegexValidator = /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
export const PhoneNumberRegexValidator = /^\d{10}$/;
export const emailValidator = z.email("Invalid email format").openapi({
  type: "string",
  description: "The image file to be uploaded.",
});
export const phoneNumberValidator = z
  .string()
  .regex(PhoneNumberRegexValidator, "Phone number should be 10 digits only.");
