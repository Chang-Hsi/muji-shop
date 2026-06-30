import { z } from "zod";
import { prisma } from "../../../utils/db";
import {
  handleDatabaseError,
  serializeStore,
} from "../../../utils/storeServices";

const storeSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  region: z.string(),
  regionLabel: z.string(),
  address: z.string(),
  phone: z.string(),
  hours: z.string(),
  image: z.string(),
  facadeImage: z.string().optional(),
  layoutImages: z.array(z.string()),
  lat: z.number(),
  lng: z.number(),
  services: z.array(z.string()),
});

const storesResponseSchema = z.object({
  Status: z.object({
    Code: z.literal(0),
    Message: z.literal(""),
  }),
  Data: z.object({
    data: z.array(storeSchema),
    total: z.number(),
  }),
});

export default defineEventHandler(async () => {
  console.log("[api] GET /api/v1/stores triggered");

  try {
    const stores = await prisma.store.findMany({
      where: {
        isActive: true,
        services: {
          some: {},
        },
      },
      orderBy: {
        sortOrder: "asc",
      },
      include: {
        services: {
          orderBy: {
            sortOrder: "asc",
          },
          include: {
            storeService: true,
          },
        },
      },
    });

    return storesResponseSchema.parse({
      Status: {
        Code: 0,
        Message: "",
      },
      Data: {
        data: stores.map(serializeStore),
        total: stores.length,
      },
    });
  } catch (error: unknown) {
    handleDatabaseError(error);
  }
});
