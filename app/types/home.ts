// app/types/home.ts

export type HomeNewsItem = {
  id: number;
  html: string;
  image?: string;
  to?: string;
};

export type HomeCategoryItem = {
  title: string;
  description: string;
  to: string;
  tag: string;
  image: string;
};

export type HomeFeaturedProductItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  badge?: string;
  to?: string;
};

export type HomeStoreItem = {
  id: number;
  title: string;
  to: string;
  image: string;
};

export type HomeStoreGroup = {
  key: string;
  label: string;
  stores: HomeStoreItem[];
};

export type HomeData = {
  newsItems: HomeNewsItem[];
  categories: HomeCategoryItem[];
  featuredProducts: HomeFeaturedProductItem[];
  storeGroups: HomeStoreGroup[];
};
