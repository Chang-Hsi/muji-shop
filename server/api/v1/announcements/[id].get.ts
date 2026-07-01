import { z } from "zod";
import { prisma } from "../../../utils/db";
import {
  handleDatabaseError,
  serializeAnnouncementDetail,
} from "../../../utils/announcement";

const announcementDetailSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  isLatest: z.boolean().optional(),
  contentHtml: z.string(),
});

const announcementDetailResponseSchema = z.object({
  Status: z.object({
    Code: z.literal(0),
    Message: z.literal(""),
  }),
  Data: z.object({
    announcement: announcementDetailSchema.nullable(),
  }),
});

export default defineEventHandler(async (event) => {
  const idOrSlug = getRouterParam(event, "id") ?? "";
  console.log(`[api] GET /api/v1/announcements/${idOrSlug} triggered`);

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

    const announcement = await prisma.announcementArticle.findFirst({
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

    return announcementDetailResponseSchema.parse({
      Status: {
        Code: 0,
        Message: "",
      },
      Data: {
        announcement: announcement
          ? serializeAnnouncementDetail(announcement)
          : null,
      },
    });
  } catch (error: unknown) {
    handleDatabaseError(error);
  }
});
