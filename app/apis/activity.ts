import { request } from "~/utils/request";
import type { ApiResponse } from "~/types/api";
import type {
  ActivityDetailData,
  ActivityListData,
} from "~/types/activity";

export function getActivities() {
  return request<ApiResponse<ActivityListData>>("/api/v1/activities", {
    method: "GET",
    auth: false,
  });
}

export function getActivityDetail(idOrSlug: string | number) {
  return request<ApiResponse<ActivityDetailData>>(
    `/api/v1/activities/${encodeURIComponent(String(idOrSlug))}`,
    {
      method: "GET",
      auth: false,
    },
  );
}
