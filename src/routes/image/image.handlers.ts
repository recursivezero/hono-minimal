import type { AppRouterHandler } from "@/types/common";
import type { AddStockImagesRoute, GetImageListRoute } from "./image.routes";

export const getImageList: AppRouterHandler<GetImageListRoute> = async (c) => {
  try {
    const images = [] as any;
    if (!images || images.length === 0) {
      return c.json({ message: "images not found", imageList: [] }, 404);
    }
    return c.json({ message: "successfully fetched image list", imageList: images }, 200);
  }
  catch (error: any) {
    return c.json({ message: error.message || "Not Found", error }, 501);
  }
};


export const addStockImages: AppRouterHandler<AddStockImagesRoute> = async (c) => {
  try {
    const formData = await c.req.formData();

    // Get all values under 'images'
    let imageList = formData.getAll("images") as File[];

    // handle single image upload
    if (imageList.length === 0) {
      const maybeSingle = formData.get("images");
      if (maybeSingle && maybeSingle instanceof File) {
        imageList = [maybeSingle];
      }
    }
    return c.json({
      message: "Images uploaded successfully.",
      _id: "some_random_id",
    }, 201);
  } catch (error: any) {
    return c.json({
      message: error.message || "Internal Server Error",
      error,
    }, 501);
  }
};
