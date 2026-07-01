import type {
  ActivityArticle,
  ActivityCategory,
  ActivityCategoryOption,
  ActivityContentBlock,
  ActivityDetail,
} from "../../app/types/activity";

type ActivityCategoryRecord = {
  label: string;
  value: string;
};

type ActivityArticleRecord = {
  legacyId: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryValue: string;
  date: string;
  readTime: string;
  image: string;
  to: string;
  location: string;
  relatedIds: unknown;
  heroImage: string;
  thumbnail: string;
  content: unknown;
};

const activityCategoryValues = new Set([
  "all",
  "event",
  "new",
  "life",
  "member",
]);

export function getNumberArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is number => typeof item === "number")
    : [];
}

export function getActivityContentBlocks(value: unknown) {
  return Array.isArray(value) ? (value as ActivityContentBlock[]) : [];
}

export function getActivityCategory(value: string): ActivityCategory {
  return activityCategoryValues.has(value)
    ? (value as ActivityCategory)
    : "event";
}

export function serializeActivityCategory(
  category: ActivityCategoryRecord,
): ActivityCategoryOption {
  return {
    label: category.label,
    value: getActivityCategory(category.value),
  };
}

export function serializeActivityArticle(
  article: ActivityArticleRecord,
): ActivityArticle {
  return {
    id: article.legacyId,
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category,
    categoryValue: getActivityCategory(article.categoryValue),
    date: article.date,
    readTime: article.readTime,
    image: article.image,
    to: article.to,
    location: article.location,
    relatedIds: getNumberArray(article.relatedIds),
  };
}

export function serializeActivityDetail(
  article: ActivityArticleRecord,
): ActivityDetail {
  return {
    ...serializeActivityArticle(article),
    heroImage: article.heroImage,
    thumbnail: article.thumbnail,
    content: getActivityContentBlocks(article.content),
  };
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
