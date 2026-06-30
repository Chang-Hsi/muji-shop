import type { Store, StoreService } from "@prisma/client";

type StoreWithServices = Store & {
  services: {
    storeService: StoreService;
  }[];
};

type StoreServiceWithStores = StoreService & {
  stores: {
    store: StoreWithServices;
  }[];
};

export function getStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export function serializeStore(store: StoreWithServices) {
  return {
    id: store.id,
    name: store.name || store.title,
    slug: store.slug,
    region: store.region,
    regionLabel: store.regionLabel,
    address: store.address,
    phone: store.phone,
    hours: store.hours,
    image: store.image,
    facadeImage: store.facadeImage || undefined,
    layoutImages: getStringArray(store.layoutImages),
    lat: store.lat,
    lng: store.lng,
    services: store.services.map((service) => service.storeService.slug),
  };
}

export function serializeStoreService(service: StoreServiceWithStores) {
  const stores = service.stores.map((item) => item.store);

  return {
    id: service.id,
    title: service.title,
    slug: service.slug,
    category: service.category,
    badge: service.badge || undefined,
    description: service.description,
    detail: service.detail,
    image: service.image,
    buttonText: service.buttonText,
    availableStoreIds: stores.map((store) => store.id),
    availableStores: stores.map((store) => store.name || store.title),
    features: getStringArray(service.features),
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
