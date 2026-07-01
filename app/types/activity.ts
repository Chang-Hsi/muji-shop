export type ActivityCategory = "all" | "event" | "new" | "life" | "member";

export type ActivityCategoryOption = {
  label: string;
  value: ActivityCategory;
};

export type ActivityContentBlock =
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "heading";
      content: string;
    }
  | {
      type: "quote";
      content: string;
      author?: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      size?: "normal" | "wide";
    }
  | {
      type: "gallery";
      columns?: 2 | 3;
      images: {
        src: string;
        alt: string;
        caption?: string;
      }[];
    }
  | {
      type: "textImage";
      title?: string;
      content: string;
      image: {
        src: string;
        alt: string;
        caption?: string;
      };
      imagePosition?: "left" | "right";
    }
  | {
      type: "list";
      title?: string;
      items: string[];
    }
  | {
      type: "callout";
      title?: string;
      content: string;
    };

export type ActivityArticle = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryValue: ActivityCategory;
  date: string;
  readTime: string;
  image: string;
  to: string;
  location: string;
  relatedIds: number[];
};

export type ActivityDetail = ActivityArticle & {
  heroImage: string;
  thumbnail: string;
  content: ActivityContentBlock[];
};

export type ActivityListData = {
  categories: ActivityCategoryOption[];
  allArticles: ActivityArticle[];
  heroArticle: ActivityArticle;
  middleArticles: ActivityArticle[];
  sideArticles: ActivityArticle[];
  latestArticles: ActivityArticle[];
  featureArticle: ActivityArticle;
  surveyArticle: ActivityArticle;
};

export type ActivityDetailData = {
  activity: ActivityDetail | null;
  relatedActivities: ActivityDetail[];
};
