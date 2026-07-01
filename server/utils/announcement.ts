import type {
  AnnouncementDetail,
  AnnouncementItem,
  AnnouncementMonthGroup,
} from "../../app/types/announcement";

type AnnouncementRecord = {
  legacyId: number;
  slug: string;
  title: string;
  date: string;
  isLatest: boolean;
  contentHtml: string;
};

export function serializeAnnouncementItem(
  announcement: AnnouncementRecord,
): AnnouncementItem {
  return {
    id: announcement.legacyId,
    slug: announcement.slug,
    title: announcement.title,
    date: announcement.date,
    ...(announcement.isLatest ? { isLatest: true } : {}),
  };
}

export function serializeAnnouncementDetail(
  announcement: AnnouncementRecord,
): AnnouncementDetail {
  return {
    ...serializeAnnouncementItem(announcement),
    contentHtml: announcement.contentHtml,
  };
}

function getAnnouncementYearMonth(date: string) {
  const [year = "", month = ""] = date.split(".");

  return {
    year,
    month,
    key: `${year}-${month}`,
  };
}

export function groupAnnouncementItems(items: AnnouncementItem[]) {
  const groupMap = new Map<string, AnnouncementMonthGroup>();

  items.forEach((item) => {
    const dateGroup = getAnnouncementYearMonth(item.date);
    const existedGroup = groupMap.get(dateGroup.key);

    if (existedGroup) {
      existedGroup.items.push(item);
      return;
    }

    groupMap.set(dateGroup.key, {
      key: dateGroup.key,
      year: dateGroup.year,
      month: dateGroup.month,
      items: [item],
    });
  });

  return Array.from(groupMap.values())
    .map((group) => ({
      ...group,
      items: [...group.items].sort((current, next) =>
        next.date.localeCompare(current.date),
      ),
    }))
    .sort((current, next) => next.key.localeCompare(current.key));
}

export function isRecord(value: unknown): value is Record<string, unknown> {
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

export function handleDatabaseError(error: unknown): never {
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
