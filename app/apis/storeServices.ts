import { request } from "~/utils/request";
import type { ApiResponse } from "~/types/api";
import type {
  GetStoreServicesParams,
  StoreServiceDetailData,
  StoreServicesData,
  StoresData,
} from "~/types/storeServices";

export function getStores() {
  return request<ApiResponse<StoresData>>("/api/v1/stores", {
    method: "GET",
    auth: false,
  });
}

export function getStoreServices(params: GetStoreServicesParams = {}) {
  return request<ApiResponse<StoreServicesData>>("/api/v1/store-services", {
    method: "GET",
    params,
    auth: false,
  });
}

export function getStoreServiceDetail(storeId: string | number) {
  return request<ApiResponse<StoreServiceDetailData>>(
    `/api/v1/store-services/${encodeURIComponent(String(storeId))}`,
    {
      method: "GET",
      auth: false,
    },
  );
}
