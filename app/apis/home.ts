// app/apis/home.ts

import { request } from "~/utils/request";
import type { ApiResponse } from "~/types/api";
import type { HomeData } from "~/types/home";

/** 首頁 - 取得首頁需要的資料 */
export function getHomeData() {
  return request<ApiResponse<HomeData>>("/api/v1/home", {
    method: "GET",
    auth: false,
  });
}