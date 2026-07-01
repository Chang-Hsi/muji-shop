import { z } from "zod";
import { prisma } from "../../../utils/db";
import {
  groupAnnouncementItems,
  handleDatabaseError,
  serializeAnnouncementItem,
} from "../../../utils/announcement";

const announcementItemSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  isLatest: z.boolean().optional(),
});

const announcementMonthGroupSchema = z.object({
  key: z.string(),
  year: z.string(),
  month: z.string(),
  items: z.array(announcementItemSchema),
});

const announcementsResponseSchema = z.object({
  Status: z.object({
    Code: z.literal(0),
    Message: z.literal(""),
  }),
  Data: z.object({
    items: z.array(announcementItemSchema),
    groups: z.array(announcementMonthGroupSchema),
  }),
});

export default defineEventHandler(async () => {
  console.log("[api] GET /api/v1/announcements triggered");

  try {
    const announcements = await prisma.announcementArticle.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        {
          date: "desc",
        },
        {
          sortOrder: "asc",
        },
      ],
    });

    const items = announcements.map(serializeAnnouncementItem);

    return announcementsResponseSchema.parse({
      Status: {
        Code: 0,
        Message: "",
      },
      Data: {
        items,
        groups: groupAnnouncementItems(items),
      },
    });
  } catch (error: unknown) {
    handleDatabaseError(error);
  }
});
