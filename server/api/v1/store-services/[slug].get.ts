import { z } from "zod";
import { prisma } from "../../../utils/db";
import {
  getStringArray,
  handleDatabaseError,
  serializeStore,
  serializeStoreService,
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

const serviceSchema = z.object({
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

const storeServiceDetailResponseSchema = z.object({
  Status: z.object({
    Code: z.literal(0),
    Message: z.literal(""),
  }),
  Data: z.object({
    service: serviceSchema,
    displayStore: storeSchema.nullable(),
    layoutImages: z.array(z.string()),
    facadeImage: z.string().optional(),
    services: z.array(serviceSchema),
  }),
});

const storeInclude = {
  services: {
    orderBy: {
      sortOrder: "asc" as const,
    },
    include: {
      storeService: true,
    },
  },
};

const serviceInclude = {
  stores: {
    orderBy: {
      sortOrder: "asc" as const,
    },
    include: {
      store: {
        include: storeInclude,
      },
    },
  },
};

export default defineEventHandler(async (event) => {
  const storeIdentifier = getRouterParam(event, "slug") ?? "";
  console.log(
    `[api] GET /api/v1/store-services/${storeIdentifier} triggered`,
  );

  try {
    const numericId = Number.parseInt(storeIdentifier, 10);
    const idFilter = Number.isFinite(numericId) ? [{ id: numericId }] : [];
    const legacySortOrderFilter =
      Number.isFinite(numericId) && numericId > 0
        ? [{ sortOrder: numericId - 1 }]
        : [];

    const matchedStore = await prisma.store.findFirst({
      where: {
        isActive: true,
        services: {
          some: {},
        },
        OR: [
          {
            slug: storeIdentifier,
          },
          {
            name: storeIdentifier,
          },
          {
            title: storeIdentifier,
          },
          ...idFilter,
          ...legacySortOrderFilter,
        ],
      },
      include: storeInclude,
    });

    const service = matchedStore
      ? (await prisma.storeService.findFirst({
          where: {
            isActive: true,
            sortOrder: matchedStore.sortOrder,
          },
          include: serviceInclude,
        })) ??
        (await prisma.storeService.findFirst({
          where: {
            isActive: true,
            stores: {
              some: {
                storeId: matchedStore.id,
              },
            },
          },
          orderBy: {
            sortOrder: "asc",
          },
          include: serviceInclude,
        }))
      : await prisma.storeService.findFirst({
          where: {
            isActive: true,
            OR: [
              {
                slug: storeIdentifier,
              },
              ...idFilter,
              ...legacySortOrderFilter,
            ],
          },
          include: serviceInclude,
        });

    if (!service) {
      throw createError({
        statusCode: 404,
        statusMessage: "Store Service Not Found",
        message: "Store service not found.",
      });
    }

    const displayStore =
      matchedStore ??
      service.stores.find((item) => item.store.id === service.id)?.store ??
      service.stores[0]?.store ??
      null;

    const relatedServices = displayStore
      ? await prisma.storeService.findMany({
          where: {
            isActive: true,
            stores: {
              some: {
                storeId: displayStore.id,
              },
            },
          },
          orderBy: {
            sortOrder: "asc",
          },
          include: serviceInclude,
        })
      : [service];

    return storeServiceDetailResponseSchema.parse({
      Status: {
        Code: 0,
        Message: "",
      },
      Data: {
        service: serializeStoreService(service, displayStore),
        displayStore: displayStore ? serializeStore(displayStore) : null,
        layoutImages: displayStore ? getStringArray(displayStore.layoutImages) : [],
        facadeImage: displayStore?.facadeImage || undefined,
        services: relatedServices.map((relatedService) =>
          serializeStoreService(relatedService),
        ),
      },
    });
  } catch (error: unknown) {
    handleDatabaseError(error);
  }
});
