import { z } from "zod";
import { prisma } from "../../../utils/db";
import {
  handleDatabaseError,
  serializeStoreService,
} from "../../../utils/storeServices";

const storeServiceSchema = z.object({
  id: z.number(),
  storeId: z.number().optional(),
  storeSlug: z.string().optional(),
  storeName: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  category: z.string(),
  badge: z.string().optional(),
  description: z.string(),
  detail: z.string(),
  image: z.string(),
  buttonText: z.string(),
  availableStoreIds: z.array(z.number()),
  availableStores: z.array(z.string()),
  features: z.array(z.string()),
});

const storeServicesResponseSchema = z.object({
  Status: z.object({
    Code: z.literal(0),
    Message: z.literal(""),
  }),
  Data: z.object({
    data: z.array(storeServiceSchema),
    total: z.number(),
  }),
});

function getQueryString(value: unknown) {
  if (Array.isArray(value)) {
    return typeof value[0] === "string" ? value[0] : "";
  }

  return typeof value === "string" ? value : "";
}

export default defineEventHandler(async (event) => {
  console.log("[api] GET /api/v1/store-services triggered");

  try {
    const query = getQuery(event);
    const keyword = getQueryString(query.keyword).trim().toLowerCase();

    const services = await prisma.storeService.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
      include: {
        stores: {
          orderBy: {
            sortOrder: "asc",
          },
          include: {
            store: {
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
            },
          },
        },
      },
    });

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

    const storesBySortOrder = new Map(
      stores.map((store) => [store.sortOrder, store]),
    );

    const serializedServices = services.map((service) =>
      serializeStoreService(service, storesBySortOrder.get(service.sortOrder)),
    );
    const filteredServices = keyword
      ? serializedServices.filter((service) => {
          const searchableText = [
            service.title,
            service.category,
            service.description,
            service.detail,
            service.features.join(" "),
            service.availableStores.join(" "),
          ]
            .join(" ")
            .toLowerCase();

          return searchableText.includes(keyword);
        })
      : serializedServices;

    return storeServicesResponseSchema.parse({
      Status: {
        Code: 0,
        Message: "",
      },
      Data: {
        data: filteredServices,
        total: filteredServices.length,
      },
    });
  } catch (error: unknown) {
    handleDatabaseError(error);
  }
});
