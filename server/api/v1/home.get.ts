import { z } from "zod";
import { prisma } from "../../utils/db";

const homeResponseSchema = z.object({
  Status: z.object({
    Code: z.literal(0),
    Message: z.literal(""),
  }),
  Data: z.object({
    newsItems: z.array(
      z.object({
        id: z.number(),
        html: z.string(),
        image: z.string().optional(),
        to: z.string().optional(),
      }),
    ),
    categories: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        to: z.string(),
        tag: z.string(),
        image: z.string(),
      }),
    ),
    featuredProducts: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        image: z.string(),
        description: z.string().optional(),
        badge: z.string().optional(),
        to: z.string(),
      }),
    ),
    storeGroups: z.array(
      z.object({
        key: z.string(),
        label: z.string(),
        stores: z.array(
          z.object({
            id: z.number(),
            title: z.string(),
            to: z.string(),
            image: z.string(),
          }),
        ),
      }),
    ),
  }),
});

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

export default defineEventHandler(async () => {
  console.log("[api] GET /api/v1/home triggered");

  try {
    const [newsItems, categories, featuredProducts, storeGroups] =
      await Promise.all([
        prisma.homeNews.findMany({
          where: {
            isActive: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
        }),
        prisma.category.findMany({
          where: {
            isActive: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
        }),
        prisma.product.findMany({
          where: {
            isActive: true,
            isFeatured: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
        }),
        prisma.storeGroup.findMany({
          where: {
            isActive: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
          include: {
            stores: {
              where: {
                isActive: true,
              },
              orderBy: {
                sortOrder: "asc",
              },
            },
          },
        }),
      ]);

    return homeResponseSchema.parse({
      Status: {
        Code: 0,
        Message: "",
      },
      Data: {
        newsItems: newsItems.map((item) => ({
          id: item.id,
          html: item.html,
          image: item.image || undefined,
          to: item.to || undefined,
        })),
        categories: categories.map((category) => ({
          title: category.title,
          description: category.description,
          to: `/products?category=${category.slug}`,
          tag: category.tag,
          image: category.image,
        })),
        featuredProducts: featuredProducts.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.mainImage,
          description: product.description || undefined,
          badge: product.badge || undefined,
          to: `/products/${product.slug}`,
        })),
        storeGroups: storeGroups.map((group) => ({
          key: group.key,
          label: group.label,
          stores: group.stores.map((store) => ({
            id: store.id,
            title: store.title,
            to: `/stores/${store.slug}`,
            image: store.image,
          })),
        })),
      },
    });
  } catch (error: unknown) {
    handleDatabaseError(error);
  }
});
