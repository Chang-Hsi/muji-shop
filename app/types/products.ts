export type ProductListItem = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  material: string;
  color: string;
  image: string;
  swatches: string[];
  topics: string[];
  sales: number;
  isNew: boolean;
  isLimited: boolean;
};

export type ProductSwatch = {
  label: string;
  hex: string;
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductDetailItem = Omit<ProductListItem, "swatches"> & {
  fullDescription: string;
  galleryImages: string[];
  swatches: ProductSwatch[];
  stock: number;
  specifications: ProductSpecification[];
  careInstructions: string;
};

export type ProductsData = {
  data: ProductListItem[];
  total: number;
};

export type ProductSortValue = "new" | "popular" | "priceLow" | "priceHigh";

export type ProductPriceRangeValue =
  | "all"
  | "under500"
  | "500to1500"
  | "1500to5000"
  | "over5000";

export type GetProductsParams = {
  category?: string | string[];
  material?: string | string[];
  color?: string | string[];
  topic?: string | string[];
  keyword?: string;
  price?: ProductPriceRangeValue;
  sort?: ProductSortValue;
  page?: number;
  pageSize?: number;
};
