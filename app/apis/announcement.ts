import { request } from "~/utils/request";
import type { ApiResponse } from "~/types/api";
import type {
  AnnouncementDetailData,
  AnnouncementListData,
} from "~/types/announcement";

export function getAnnouncements() {
  return request<ApiResponse<AnnouncementListData>>("/api/v1/announcements", {
    method: "GET",
    auth: false,
  });
}

export function getAnnouncementDetail(idOrSlug: string | number) {
  return request<ApiResponse<AnnouncementDetailData>>(
    `/api/v1/announcements/${encodeURIComponent(String(idOrSlug))}`,
    {
      method: "GET",
      auth: false,
    },
  );
}
