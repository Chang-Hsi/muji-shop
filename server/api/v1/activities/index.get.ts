import { z } from "zod";
import { prisma } from "../../../utils/db";
import {
  handleDatabaseError,
  serializeActivityArticle,
  serializeActivityCategory,
} from "../../../utils/activity";

const activityCategorySchema = z.object({
  label: z.string(),
  value: z.enum(["all", "event", "new", "life", "member"]),
});

const activityArticleSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  categoryValue: z.enum(["all", "event", "new", "life", "member"]),
  date: z.string(),
  readTime: z.string(),
  image: z.string(),
  to: z.string(),
  location: z.string(),
  relatedIds: z.array(z.number()),
});

const activitiesResponseSchema = z.object({
  Status: z.object({
    Code: z.literal(0),
    Message: z.literal(""),
  }),
  Data: z.object({
    categories: z.array(activityCategorySchema),
    allArticles: z.array(activityArticleSchema),
    heroArticle: activityArticleSchema,
    middleArticles: z.array(activityArticleSchema),
    sideArticles: z.array(activityArticleSchema),
    latestArticles: z.array(activityArticleSchema),
    featureArticle: activityArticleSchema,
    surveyArticle: activityArticleSchema,
  }),
});

function findRequiredArticle(
  articles: ReturnType<typeof serializeActivityArticle>[],
  slug: string,
) {
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    throw createError({
      statusCode: 500,
      statusMessage: "Activity Seed Missing",
      message: `Activity article not found: ${slug}.`,
    });
  }

  return article;
}

export default defineEventHandler(async () => {
  console.log("[api] GET /api/v1/activities triggered");

  try {
    const [categories, articles] = await Promise.all([
      prisma.activityCategory.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          sortOrder: "asc",
        },
      }),
      prisma.activityArticle.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          sortOrder: "asc",
        },
      }),
    ]);

    const serializedArticles = articles.map(serializeActivityArticle);

    return activitiesResponseSchema.parse({
      Status: {
        Code: 0,
        Message: "",
      },
      Data: {
        categories: categories.map(serializeActivityCategory),
        allArticles: serializedArticles,
        heroArticle: findRequiredArticle(serializedArticles, "summer-life"),
        middleArticles: serializedArticles.filter((article) =>
          [2, 3].includes(article.id),
        ),
        sideArticles: serializedArticles.filter((article) =>
          [4, 5, 6].includes(article.id),
        ),
        latestArticles: serializedArticles.filter((article) =>
          [7, 8, 9, 10, 11].includes(article.id),
        ),
        featureArticle: findRequiredArticle(
          serializedArticles,
          "special-project",
        ),
        surveyArticle: findRequiredArticle(serializedArticles, "survey"),
      },
    });
  } catch (error: unknown) {
    handleDatabaseError(error);
  }
});
