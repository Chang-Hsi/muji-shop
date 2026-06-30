import { z } from "zod";
import { prisma } from "../../../utils/db";

const productListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  material: z.string(),
  color: z.string(),
  image: z.string(),
  swatches: z.array(z.string()),
  topics: z.array(z.string()),
  sales: z.number(),
  isNew: z.boolean(),
  isLimited: z.boolean(),
});

const productsResponseSchema = z.object({
  Status: z.object({
    Code: z.literal(0),
    Message: z.literal(""),
  }),
  Data: z.object({
    data: z.array(productListItemSchema),
    total: z.number(),
  }),
});

type QueryValue = string | number | boolean | null | undefined;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getErrorCode(error: unknown) {
  if (!isRecord(error)) {
    return "";
  }

  return typeof error.code === "string" ? error.code : "";
}

function getErrorMessage(error: unknown) {
  if (!isRecord(error)) {
    return "";
  }

  return typeof error.message === "string" ? error.message : "";
}

function handleDatabaseError(error: unknown): never {
  const code = getErrorCode(error);
  const message = getErrorMessage(error);

  if (code === "ECONNREFUSED" || message.includes("ECONNREFUSED")) {
    throw createError({
      statusCode: 503,
      statusMessage: "Database Unavailable",
      message:
        "Cannot connect to PostgreSQL. Start the local database, then run npm run db:push and npm run db:seed.",
    });
  }

  if (code === "P2021" || code === "42P01") {
    throw createError({
      statusCode: 500,
      statusMessage: "Database Schema Missing",
      message:
        "Database tables are missing. Run npm run db:push and npm run db:seed.",
    });
  }

  throw error;
}

function toStringArray(value: unknown) {
  const values = Array.isArray(value) ? value : [value];

  return values
    .filter((item): item is QueryValue => item !== undefined && item !== null)
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function toPositiveInt(value: unknown, fallback: number) {
  const parsed = Number.parseInt(String(value ?? ""), 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function getPriceFilter(value: string) {
  if (value === "under500") {
    return {
      lte: 500,
    };
  }

  if (value === "500to1500") {
    return {
      gte: 500,
      lte: 1500,
    };
  }

  if (value === "1500to5000") {
    return {
      gte: 1500,
      lte: 5000,
    };
  }

  if (value === "over5000") {
    return {
      gte: 5000,
    };
  }

  return undefined;
}

function getOrderBy(value: string) {
  if (value === "popular") {
    return [{ sales: "desc" as const }, { id: "desc" as const }];
  }

  if (value === "priceLow") {
    return [{ price: "asc" as const }, { id: "desc" as const }];
  }

  if (value === "priceHigh") {
    return [{ price: "desc" as const }, { id: "desc" as const }];
  }

  return [{ isNew: "desc" as const }, { id: "desc" as const }];
}

export default defineEventHandler(async (event) => {
  console.log("[api] GET /api/v1/products triggered");

  try {
    const query = getQuery(event);
    const categories = toStringArray(query.category);
    const materials = toStringArray(query.material);
    const colors = toStringArray(query.color);
    const topics = toStringArray(query.topic);
    const keyword = toStringArray(query.keyword)[0] ?? "";
    const price = toStringArray(query.price)[0] ?? "all";
    const sort = toStringArray(query.sort)[0] ?? "new";
    const page = toPositiveInt(query.page, 1);
    const pageSize = Math.min(toPositiveInt(query.pageSize, 100), 100);
    const priceFilter = getPriceFilter(price);

    const where = {
      isActive: true,
      ...(categories.length
        ? {
            category: {
              slug: {
                in: categories,
              },
            },
          }
        : {}),
      ...(materials.length
        ? {
            material: {
              in: materials,
            },
          }
        : {}),
      ...(colors.length
        ? {
            color: {
              in: colors,
            },
          }
        : {}),
      ...(topics.length
        ? {
            topics: {
              some: {
                value: {
                  in: topics,
                },
              },
            },
          }
        : {}),
      ...(priceFilter
        ? {
            price: priceFilter,
          }
        : {}),
      ...(keyword
        ? {
            OR: [
              {
                name: {
                  contains: keyword,
                  mode: "insensitive" as const,
                },
              },
              {
                description: {
                  contains: keyword,
                  mode: "insensitive" as const,
                },
              },
              {
                category: {
                  title: {
                    contains: keyword,
                    mode: "insensitive" as const,
                  },
                },
              },
              {
                category: {
                  slug: {
                    contains: keyword,
                    mode: "insensitive" as const,
                  },
                },
              },
              {
                material: {
                  contains: keyword,
                  mode: "insensitive" as const,
                },
              },
              {
                color: {
                  contains: keyword,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: getOrderBy(sort),
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          category: true,
          swatches: {
            orderBy: {
              sortOrder: "asc",
            },
          },
          topics: true,
        },
      }),
      prisma.product.count({
        where,
      }),
    ]);

    return productsResponseSchema.parse({
      Status: {
        Code: 0,
        Message: "",
      },
      Data: {
        data: products.map((product) => ({
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description || "",
          price: product.price,
          category: product.category.slug,
          material: product.material,
          color: product.color,
          image: product.mainImage,
          swatches: product.swatches.map((swatch) => swatch.hex),
          topics: product.topics.map((topic) => topic.value),
          sales: product.sales,
          isNew: product.isNew,
          isLimited: product.isLimited,
        })),
        total,
      },
    });
  } catch (error: unknown) {
    handleDatabaseError(error);
  }
});
