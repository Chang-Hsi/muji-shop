import type { StoreRegionCode, StoreServiceCode } from "~/data/storeServices";

export type StoreServiceStoreItem = {
  id: number;
  name: string;
  slug: string;
  region: StoreRegionCode;
  regionLabel: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  facadeImage?: string;
  layoutImages: string[];
  lat: number;
  lng: number;
  services: StoreServiceCode[];
};

export type StoreServiceItem = {
  id: number;
  storeId?: number;
  storeSlug?: string;
  storeName?: string;
  title: string;
  slug: StoreServiceCode;
  category: string;
  badge?: string;
  description: string;
  detail: string;
  image: string;
  buttonText: string;
  availableStoreIds: number[];
  availableStores: string[];
  features: string[];
};

export type StoreServicesData = {
  data: StoreServiceItem[];
  total: number;
};

export type StoreServiceDetailData = {
  service: StoreServiceItem;
  displayStore: StoreServiceStoreItem | null;
  layoutImages: string[];
  facadeImage?: string;
  services: StoreServiceItem[];
};

export type StoresData = {
  data: StoreServiceStoreItem[];
  total: number;
};

export type GetStoreServicesParams = {
  keyword?: string;
};
