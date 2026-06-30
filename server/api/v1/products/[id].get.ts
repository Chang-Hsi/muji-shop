import { z } from "zod";
import { prisma } from "../../../utils/db";

const productDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  fullDescription: z.string(),
  price: z.number(),
  category: z.string(),
  material: z.string(),
  color: z.string(),
  image: z.string(),
  galleryImages: z.array(z.string()),
  swatches: z.array(
    z.object({
      label: z.string(),
      hex: z.string(),
    }),
  ),
  topics: z.array(z.string()),
  sales: z.number(),
  stock: z.number(),
  isNew: z.boolean(),
  isLimited: z.boolean(),
  specifications: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  careInstructions: z.string(),
});

const productResponseSchema = z.object({
  Status: z.object({
    Code: z.literal(0),
    Message: z.literal(""),
  }),
  Data: productDetailSchema,
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

export default defineEventHandler(async (event) => {
  const idOrSlug = getRouterParam(event, "id") ?? "";
  console.log(`[api] GET /api/v1/products/${idOrSlug} triggered`);

  try {
    const numericId = Number.parseInt(idOrSlug, 10);
    const product = await prisma.product.findFirst({
      where: {
        isActive: true,
        OR: [
          {
            slug: idOrSlug,
          },
          ...(Number.isFinite(numericId)
            ? [
                {
                  id: numericId,
                },
              ]
            : []),
        ],
      },
      include: {
        category: true,
        images: {
          where: {
            isActive: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
        },
        swatches: {
          orderBy: {
            sortOrder: "asc",
          },
        },
        topics: true,
        specifications: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: "Product Not Found",
        message: "Product not found.",
      });
    }

    return productResponseSchema.parse({
      Status: {
        Code: 0,
        Message: "",
      },
      Data: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description || "",
        fullDescription: product.fullDescription,
        price: product.price,
        category: product.category.slug,
        material: product.material,
        color: product.color,
        image: product.mainImage,
        galleryImages: product.images.length
          ? product.images.map((image) => image.url)
          : [product.mainImage],
        swatches: product.swatches.map((swatch) => ({
          label: swatch.label,
          hex: swatch.hex,
        })),
        topics: product.topics.map((topic) => topic.value),
        sales: product.sales,
        stock: product.stock,
        isNew: product.isNew,
        isLimited: product.isLimited,
        specifications: product.specifications.map((specification) => ({
          label: specification.label,
          value: specification.value,
        })),
        careInstructions: product.careInstructions,
      },
    });
  } catch (error: unknown) {
    handleDatabaseError(error);
  }
});
