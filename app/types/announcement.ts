export type AnnouncementItem = {
  id: number;
  slug: string;
  title: string;
  date: string;
  isLatest?: boolean;
};

export type AnnouncementMonthGroup = {
  key: string;
  year: string;
  month: string;
  items: AnnouncementItem[];
};

export type AnnouncementDetail = AnnouncementItem & {
  contentHtml: string;
};

export type AnnouncementListData = {
  items: AnnouncementItem[];
  groups: AnnouncementMonthGroup[];
};

export type AnnouncementDetailData = {
  announcement: AnnouncementDetail | null;
};
