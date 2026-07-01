import { z } from "zod";
import { prisma } from "../../../utils/db";
import {
  handleDatabaseError,
  serializeActivityDetail,
} from "../../../utils/activity";

const activityContentBlockSchema = z.any();

const activityDetailSchema = z.object({
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
  heroImage: z.string(),
  thumbnail: z.string(),
  content: z.array(activityContentBlockSchema),
});

const activityDetailResponseSchema = z.object({
  Status: z.object({
    Code: z.literal(0),
    Message: z.literal(""),
  }),
  Data: z.object({
    activity: activityDetailSchema.nullable(),
    relatedActivities: z.array(activityDetailSchema),
  }),
});

export default defineEventHandler(async (event) => {
  const idOrSlug = getRouterParam(event, "id") ?? "";
  console.log(`[api] GET /api/v1/activities/${idOrSlug} triggered`);

  try {
    const numericId = Number.parseInt(idOrSlug, 10);
    const idFilters = Number.isFinite(numericId)
      ? [
          {
            legacyId: numericId,
          },
          {
            id: numericId,
          },
        ]
      : [];

    const activity = await prisma.activityArticle.findFirst({
      where: {
        isActive: true,
        OR: [
          {
            slug: idOrSlug,
          },
          ...idFilters,
        ],
      },
    });

    const serializedActivity = activity
      ? serializeActivityDetail(activity)
      : null;

    const relatedArticles = serializedActivity
      ? await prisma.activityArticle.findMany({
          where: {
            isActive: true,
            legacyId: {
              in: serializedActivity.relatedIds,
            },
          },
          orderBy: {
            sortOrder: "asc",
          },
        })
      : await prisma.activityArticle.findMany({
          where: {
            isActive: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
          take: 3,
        });

    return activityDetailResponseSchema.parse({
      Status: {
        Code: 0,
        Message: "",
      },
      Data: {
        activity: serializedActivity,
        relatedActivities: relatedArticles.map(serializeActivityDetail),
      },
    });
  } catch (error: unknown) {
    handleDatabaseError(error);
  }
});
