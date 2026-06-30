import { request } from "~/utils/request";
import type { ApiResponse } from "~/types/api";
import type {
  GetProductsParams,
  ProductDetailItem,
  ProductsData,
} from "~/types/products";

export function getProducts(params: GetProductsParams = {}) {
  return request<ApiResponse<ProductsData>>("/api/v1/products", {
    method: "GET",
    params,
    auth: false,
  });
}

export function getProductDetail(idOrSlug: string | number) {
  return request<ApiResponse<ProductDetailItem>>(
    `/api/v1/products/${encodeURIComponent(String(idOrSlug))}`,
    {
      method: "GET",
      auth: false,
    },
  );
}
