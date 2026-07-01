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

export type ActivityListResponse = {
  categories: ActivityCategoryOption[];
  allArticles: ActivityArticle[];
  heroArticle: ActivityArticle;
  middleArticles: ActivityArticle[];
  sideArticles: ActivityArticle[];
  latestArticles: ActivityArticle[];
  featureArticle: ActivityArticle;
  surveyArticle: ActivityArticle;
};

export type ActivityDetailResponse = {
  activity: ActivityDetail | null;
  relatedActivities: ActivityDetail[];
};

type ActivityArticleContentSeed = {
  heroImage?: string;
  content: ActivityContentBlock[];
};

const activityCategories: ActivityCategoryOption[] = [
  {
    label: "全部",
    value: "all",
  },
  {
    label: "活動消息",
    value: "event",
  },
  {
    label: "新品資訊",
    value: "new",
  },
  {
    label: "生活提案",
    value: "life",
  },
  {
    label: "會員活動",
    value: "member",
  },
];

const activityArticles: ActivityArticle[] = [
  {
    id: 1,
    slug: "summer-life",
    title: "夏季生活展開：用自然材質打造清爽日常",
    description:
      "從居家收納、日常衣著到清爽香氛，整理出適合夏季的生活選品與活動提案。",
    category: "LIFE STYLE",
    categoryValue: "life",
    date: "2026.06.26",
    readTime: "7 min read",
    image:
      "https://i.pinimg.com/1200x/7b/b1/c5/7bb1c5640ddff347a196909ad0075854.jpg",
    to: "/activity/summer-life",
    location: "台北信義店 / 全台指定門市",
    relatedIds: [2, 3, 4],
  },
  {
    id: 2,
    slug: "weekend-workshop",
    title: "門市限定體驗：週末生活工作坊開放報名",
    description: "透過手作、整理與日常選品，重新感受生活中簡單而實用的美好。",
    category: "EVENT",
    categoryValue: "event",
    date: "2026.06.22",
    readTime: "3 min read",
    image:
      "https://i.pinimg.com/1200x/a4/ea/ab/a4eaab0d491295aa930f069e45da4f28.jpg",
    to: "/activity/weekend-workshop",
    location: "台北南西店",
    relatedIds: [1, 3, 5],
  },
  {
    id: 3,
    slug: "family-day",
    title: "親子生活日：一起學會整理與分享",
    description: "以親子共同參與的方式，從日常收納開始建立簡單的生活秩序。",
    category: "FAMILY",
    categoryValue: "life",
    date: "2026.06.18",
    readTime: "5 min read",
    image:
      "https://i.pinimg.com/736x/62/72/0a/62720ad6515b75ce7ebbfe71138fff2b.jpg",
    to: "/activity/family-day",
    location: "新北板橋店",
    relatedIds: [1, 2, 4],
  },
  {
    id: 4,
    slug: "member-bonus",
    title: "會員限定：夏季選品點數加贈活動",
    description: "指定期間內購買夏季生活選品，可享會員點數加贈。",
    category: "MEMBER",
    categoryValue: "member",
    date: "2026.06.16",
    readTime: "2 min read",
    image:
      "https://i.pinimg.com/1200x/0b/fb/de/0bfbdeb66052fb12e8bb8cc7f0d3836a.jpg",
    to: "/activity/member-bonus",
    location: "全台指定門市",
    relatedIds: [1, 2, 5],
  },
  {
    id: 5,
    slug: "new-summer-products",
    title: "新商品上市：清爽香氛與居家織品系列",
    description: "為夏季空間帶來更輕盈的氣味與觸感。",
    category: "NEW PRODUCT",
    categoryValue: "new",
    date: "2026.06.12",
    readTime: "3 min read",
    image:
      "https://i.pinimg.com/1200x/43/af/b3/43afb379bc21fb6104f35984bcd410d8.jpg",
    to: "/activity/new-summer-products",
    location: "線上商店 / 全台指定門市",
    relatedIds: [1, 3, 4],
  },
  {
    id: 6,
    slug: "reuse-life",
    title: "永續生活提案：從重複使用開始",
    description: "以可重複使用的日用品，減少日常中的一次性消耗。",
    category: "SUSTAINABILITY",
    categoryValue: "life",
    date: "2026.06.08",
    readTime: "4 min read",
    image:
      "https://www.foodnext.net/dispPageBox/getFile/GetImg.aspx?FileLocation=%2FPJ-FOODNEXT%2FFiles%2F&FileName=photo-85179-i.jpg",
    to: "/activity/reuse-life",
    location: "全台指定門市",
    relatedIds: [1, 5, 7],
  },
  {
    id: 7,
    slug: "summer-food",
    title: "期間限定：夏日飲品與食品選物活動開跑",
    description: "精選適合夏季的食品與飲品，陪伴日常裡的輕盈時光。",
    category: "EVENT",
    categoryValue: "event",
    date: "2026.06.30",
    readTime: "5 min read",
    image:
      "https://i.pinimg.com/1200x/9e/6f/ce/9e6fce3b7d1d81cd906890d3ca46739c.jpg",
    to: "/activity/summer-food",
    location: "全台指定門市",
    relatedIds: [1, 8, 9],
  },
  {
    id: 8,
    slug: "closet-lecture",
    title: "生活提案講座：整理衣櫃，也整理生活節奏",
    description: "從衣物分類、收納方式到穿搭規劃，建立更舒服的日常節奏。",
    category: "LIFE STYLE",
    categoryValue: "life",
    date: "2026.06.28",
    readTime: "6 min read",
    image:
      "https://i.pinimg.com/736x/ad/66/ac/ad66ac3a72014fd3f7b5578a7ba012cc.jpg",
    to: "/activity/closet-lecture",
    location: "台北信義店",
    relatedIds: [1, 3, 10],
  },
  {
    id: 9,
    slug: "fragrance-event",
    title: "門市活動：香氛試聞與居家氣味搭配",
    description: "透過不同香氣情境，找到適合居家空間的氣味搭配。",
    category: "EVENT",
    categoryValue: "event",
    date: "2026.06.25",
    readTime: "4 min read",
    image:
      "https://i.pinimg.com/1200x/3c/2e/90/3c2e90f31b6bc8235cb56ad7c51ea8fd.jpg",
    to: "/activity/fragrance-event",
    location: "台中勤美店",
    relatedIds: [1, 5, 7],
  },
  {
    id: 10,
    slug: "linen-style",
    title: "新品企劃：夏季棉麻穿搭系列介紹",
    description: "以自然材質與寬鬆剪裁，打造適合炎熱季節的日常穿著。",
    category: "NEW PRODUCT",
    categoryValue: "new",
    date: "2026.06.20",
    readTime: "3 min read",
    image:
      "https://i.pinimg.com/1200x/3d/35/4b/3d354bce76ad362138bdfffe7dd314a9.jpg",
    to: "/activity/linen-style",
    location: "線上商店 / 全台指定門市",
    relatedIds: [1, 5, 8],
  },
  {
    id: 11,
    slug: "weekend-gift",
    title: "會員專屬：週末滿額禮活動",
    description: "指定週末期間消費滿額，即可獲得會員限定小禮。",
    category: "MEMBER",
    categoryValue: "member",
    date: "2026.06.18",
    readTime: "2 min read",
    image:
      "https://i.pinimg.com/736x/ee/db/58/eedb584b73920760ba0f817969e63aa6.jpg",
    to: "/activity/weekend-gift",
    location: "全台指定門市",
    relatedIds: [4, 7, 10],
  },
  {
    id: 12,
    slug: "special-project",
    title: "探索本季限定活動與生活企劃",
    description:
      "從日常選品、生活體驗到期間限定活動，透過不同主題重新認識生活裡值得停下來感受的細節。",
    category: "SPECIAL PROJECT",
    categoryValue: "event",
    date: "2026.07.01",
    readTime: "6 min read",
    image:
      "https://storage.googleapis.com/www.taiwantradeshow.com.tw/firstPage/202603/T-39584656.png",
    to: "/activity/special-project",
    location: "線上專題 / 指定門市",
    relatedIds: [1, 7, 8],
  },
  {
    id: 13,
    slug: "survey",
    title: "從零開始的異世界活動，活動報名",
    description: "完成活動問卷與報名資料，探索更符合個人生活節奏的活動提案。",
    category: "MEMBER SURVEY",
    categoryValue: "member",
    date: "2026.07.03",
    readTime: "2 min read",
    image:
      "https://i.pinimg.com/1200x/30/e3/75/30e3756e7caf701e120c26b3f316f526.jpg",
    to: "/activity/survey",
    location: "線上活動",
    relatedIds: [4, 11, 12],
  },
];

const activityDetailContentMap: Record<string, ActivityArticleContentSeed> = {
  "summer-life": {
    heroImage:
      "https://i.pinimg.com/1200x/7b/b1/c5/7bb1c5640ddff347a196909ad0075854.jpg",
    content: [
      {
        type: "paragraph",
        content:
          "夏季的生活不一定需要大幅度改變。從材質、氣味與收納方式開始，就能讓日常空間變得更輕盈，也讓身體與心情慢慢回到舒服的節奏。",
      },
      {
        type: "paragraph",
        content:
          "本次活動以「自然材質」為主題，整理適合夏季使用的居家用品、衣著選品與香氛提案，讓顧客可以在門市中實際感受不同材質帶來的觸感與氛圍。",
      },
      {
        type: "quote",
        content: "生活提案不是增加更多物品，而是讓每一件物品都回到適合的位置。",
      },
      {
        type: "heading",
        content: "從材質開始，降低夏季生活的厚重感",
      },
      {
        type: "paragraph",
        content:
          "棉、麻、木質與玻璃材質，都能在視覺與觸感上降低夏季生活的厚重感。透過實際展示，顧客可以比較不同材質在居家空間中的適用方式。",
      },
      {
        type: "image",
        src: "https://i.pinimg.com/736x/0c/60/2a/0c602aa97b576ff86a13131acd9d2c98.jpg",
        alt: "夏季生活選品",
        caption: "以自然材質與簡單收納，重新整理日常空間。",
        size: "wide",
      },
      {
        type: "textImage",
        title: "自然材質的夏季選品",
        content:
          "炎炎夏日，從日常穿著、軟裝收納到居家香氛，選擇亞麻、藤編等清爽且低負擔的自然材質，不僅能為視覺與肌膚降溫，更能讓整體居家生活在悶熱季節中，隨時維持最舒心、愜意的自在狀態。",
        image: {
          src: "https://i.pinimg.com/736x/60/9d/f9/609df9ea7046ee8c307c461692c97eb9.jpg",
          alt: "自然材質選品",
          caption: "",
        },
        imagePosition: "right",
      },
      {
        type: "heading",
        content: "亮點",
      },
      {
        type: "list",
        title: "本次活動內容",
        items: [
          "夏季居家收納與整理展示",
          "自然材質衣著與生活選品介紹",
          "門市限定香氛試聞體驗",
          "會員期間限定選品優惠",
        ],
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          {
            src: "https://i.pinimg.com/1200x/e5/57/b5/e557b58f55db9387b34183e71a88c737.jpg",
            alt: "活動空間示意",
            caption: "以清爽色系與自然材質，打造適合夏季的生活場景。",
          },
          {
            src: "https://i.pinimg.com/1200x/53/d2/5f/53d25f98726186fc9f2d7e2bd761b593.jpg",
            alt: "香氛與居家選品",
            caption: "透過氣味與觸感，重新整理居家感受。",
          },
        ],
      },
      {
        type: "callout",
        title: "報名提醒",
        content:
          "部分門市體驗活動名額有限，建議提前完成報名。實際活動時間、場次與參與方式，請依各門市現場公告為準。",
      },
    ],
  },

  "weekend-workshop": {
    content: [
      {
        type: "paragraph",
        content:
          "週末生活工作坊以門市空間為起點，透過簡單的整理、手作與選品體驗，帶領顧客重新觀察日常生活中的物品與使用習慣。",
      },
      {
        type: "paragraph",
        content:
          "活動將從日常用品的使用方式開始，安排不同主題的實作內容，讓參與者可以在短時間內完成一個能帶回生活中的小練習。",
      },
      {
        type: "quote",
        content: "工作坊的目的不是完成一件作品，而是重新理解生活中的使用方式。",
      },
      {
        type: "heading",
        content: "用手作重新感受生活",
      },
      {
        type: "image",
        src: "https://i.pinimg.com/736x/e3/e2/a5/e3e2a5a524443d8dec4c6149e4cf3a0f.jpg",
        alt: "週末生活工作坊",
        caption: "活動將依照不同門市空間安排體驗內容。",
        size: "wide",
      },
      {
        type: "list",
        title: "活動內容",
        items: [
          "日常收納方式介紹",
          "手作體驗與材料說明",
          "生活選品使用情境分享",
          "門市人員現場諮詢",
        ],
      },
      {
        type: "callout",
        title: "參加提醒",
        content:
          "工作坊採預約制，實際場次、名額與材料內容，請依活動報名頁與門市公告為準。",
      },
    ],
  },

  "family-day": {
    content: [
      {
        type: "paragraph",
        content:
          "親子生活日希望讓孩子在參與整理與分享的過程中，理解物品與生活的關係，也讓家長透過共同活動找到更自然的陪伴方式。",
      },
      {
        type: "paragraph",
        content:
          "本次活動以簡單的分類、收納與日常分享為核心，讓親子可以一起完成小任務，並把活動中的方法帶回家中使用。",
      },
      {
        type: "heading",
        content: "從孩子能理解的整理開始",
      },
      {
        type: "textImage",
        title: "親子共同參與",
        content:
          "以簡單分類、標籤與開放式收納為起點，讓孩子也能參與日常空間的整理，建立屬於家庭的生活節奏。",
        image: {
          src: "https://i.pinimg.com/736x/58/72/32/58723252a068b142de9b7330a8621417.jpg",
          alt: "親子生活日",
          caption: "透過共同參與，讓整理變成生活裡自然發生的事。",
        },
        imagePosition: "left",
      },
      {
        type: "list",
        title: "活動內容",
        items: [
          "親子整理小任務",
          "居家收納示範",
          "日常分享活動",
          "親子互動體驗",
        ],
      },
      {
        type: "callout",
        title: "活動提醒",
        content:
          "建議家長陪同孩子一同參與。部分體驗內容會依孩子年齡調整，請依現場安排為準。",
      },
    ],
  },

  "member-bonus": {
    content: [
      {
        type: "paragraph",
        content:
          "會員限定夏季選品點數加贈活動，針對指定生活選品推出期間限定回饋，讓日常購物也能累積更多會員優惠。",
      },
      {
        type: "paragraph",
        content:
          "活動期間內，會員購買指定夏季居家、香氛、衣著與食品選品，即可依消費條件獲得額外點數。",
      },
      {
        type: "heading",
        content: "指定選品點數加贈",
      },
      {
        type: "image",
        src: "https://i.pinimg.com/1200x/31/35/42/313542fe192dea66c5cc93af2b8a4955.jpg",
        alt: "會員限定活動",
        caption: "指定期間內購買夏季生活選品，可享會員點數加贈。",
        size: "wide",
      },
      {
        type: "list",
        title: "活動重點",
        items: [
          "會員限定參與",
          "指定商品點數加贈",
          "線上商店與指定門市適用",
          "點數可於後續消費折抵使用",
        ],
      },
      {
        type: "callout",
        title: "注意事項",
        content:
          "點數回饋條件、適用商品與使用期限，請依會員活動頁面與門市公告為準。",
      },
    ],
  },

  "new-summer-products": {
    content: [
      {
        type: "paragraph",
        content:
          "清爽香氛與居家織品系列以夏季空間為發想，透過輕盈材質、柔和氣味與簡潔色系，打造更舒適的日常環境。",
      },
      {
        type: "paragraph",
        content:
          "本次新品包含居家香氛、織品與生活小物，適合用於臥室、客廳與工作空間，為日常帶來更輕盈的氛圍。",
      },
      {
        type: "heading",
        content: "為夏季空間帶來輕盈感",
      },
      {
        type: "image",
        src: "https://i.pinimg.com/1200x/aa/ca/02/aaca026c8edf324112fb1a2c9729eae3.jpg",
        alt: "清爽香氛與居家織品系列",
        caption: "以氣味、觸感與色彩重新整理居家氛圍。",
        size: "wide",
      },
      {
        type: "list",
        title: "新品系列",
        items: [
          "夏季香氛系列",
          "輕薄居家織品",
          "自然色系收納用品",
          "季節限定生活小物",
        ],
      },
      {
        type: "callout",
        title: "上市提醒",
        content:
          "新品實際上市日期、販售門市與庫存狀況，請依線上商店與各門市公告為準。",
      },
    ],
  },

  "reuse-life": {
    content: [
      {
        type: "paragraph",
        content:
          "永續生活不一定要從大改變開始。選擇可重複使用的日用品，就是降低一次性消耗的第一步。",
      },
      {
        type: "paragraph",
        content:
          "本次提案整理日常中容易替換的用品，從購物袋、水瓶、收納容器到清潔工具，讓永續選擇更容易進入生活。",
      },
      {
        type: "quote",
        content: "重複使用不是限制生活，而是讓物品被更完整地使用。",
      },
      {
        type: "heading",
        content: "從日常用品開始",
      },
      {
        type: "image",
        src: "https://i.pinimg.com/1200x/55/57/15/555715d199138c9712d7dacec04192ca.jpg",
        alt: "永續生活提案",
        caption: "以可重複使用的日用品，減少日常中的一次性消耗。",
        size: "wide",
      },
      {
        type: "list",
        title: "提案內容",
        items: [
          "可重複使用容器介紹",
          "外出用品選物",
          "居家減塑小技巧",
          "永續生活選品展示",
        ],
      },
      {
        type: "callout",
        title: "生活提醒",
        content:
          "永續生活可以從一件物品開始，先選擇最常使用、最容易替換的品項，會更容易持續。",
      },
    ],
  },

  "summer-food": {
    content: [
      {
        type: "paragraph",
        content:
          "期間限定夏日飲品與食品選物活動，精選適合炎熱季節的清爽飲品、輕食與日常零食，陪伴夏季裡的輕盈時光。",
      },
      {
        type: "paragraph",
        content:
          "活動期間內，指定門市將規劃夏季食品專區，讓顧客可以依照不同場景挑選適合的飲品與食品。",
      },
      {
        type: "heading",
        content: "夏日飲品與食品選物",
      },
      {
        type: "image",
        src: "https://i.pinimg.com/1200x/45/13/b8/4513b8a25604262c973f69e8ca95e81f.jpg",
        alt: "夏日飲品與食品選物",
        caption: "精選適合夏季的食品與飲品，陪伴日常裡的輕盈時光。",
        size: "wide",
      },
      {
        type: "list",
        title: "活動亮點",
        items: [
          "夏季限定飲品",
          "清爽食品選物",
          "指定門市食品專區",
          "會員加購優惠",
        ],
      },
      {
        type: "callout",
        title: "販售提醒",
        content:
          "期間限定商品數量有限，實際販售品項與庫存請依門市與線上商店為準。",
      },
    ],
  },

  "closet-lecture": {
    content: [
      {
        type: "paragraph",
        content:
          "整理衣櫃不只是整理衣物，也是在整理每天出門前的選擇。透過分類、保留與收納，建立更清楚的生活節奏。",
      },
      {
        type: "paragraph",
        content:
          "本次講座將從衣物分類、穿搭頻率與收納方式開始，協助參與者重新檢視衣櫃與日常生活的關係。",
      },
      {
        type: "heading",
        content: "整理衣櫃，也整理生活節奏",
      },
      {
        type: "image",
        src: "https://i.pinimg.com/1200x/f9/7d/47/f97d4781aab1d753154e4daa2607f9c5.jpg",
        alt: "生活提案講座",
        caption: "從衣物分類、收納方式到穿搭規劃，建立更舒服的日常節奏。",
        size: "wide",
      },
      {
        type: "list",
        title: "講座內容",
        items: [
          "衣物分類方法",
          "換季收納建議",
          "日常穿搭規劃",
          "衣櫃空間整理技巧",
        ],
      },
      {
        type: "callout",
        title: "報名提醒",
        content:
          "講座名額有限，建議提前報名。實際講座時間與參與方式，請依活動頁公告為準。",
      },
    ],
  },

  "fragrance-event": {
    content: [
      {
        type: "paragraph",
        content:
          "香氛試聞與居家氣味搭配活動，將透過不同香氣情境，協助顧客找到適合玄關、客廳、臥室與工作空間的氣味。",
      },
      {
        type: "paragraph",
        content:
          "活動現場會依空間情境介紹香氣特色，讓顧客可以更直覺地比較不同氣味在居家環境中的適用方式。",
      },
      {
        type: "heading",
        content: "找到適合空間的氣味",
      },
      {
        type: "image",
        src: "https://i.pinimg.com/1200x/c3/64/57/c364571aba016a47a375174211d9c696.jpg",
        alt: "香氛試聞與居家氣味搭配",
        caption: "透過不同香氣情境，找到適合居家空間的氣味搭配。",
        size: "wide",
      },
      {
        type: "list",
        title: "活動內容",
        items: [
          "香氛試聞體驗",
          "居家空間氣味建議",
          "門市人員搭配說明",
          "指定香氛選品展示",
        ],
      },
      {
        type: "callout",
        title: "體驗提醒",
        content:
          "香氛感受因人而異，建議現場實際試聞後再選擇適合自己的氣味。",
      },
    ],
  },

  "linen-style": {
    content: [
      {
        type: "paragraph",
        content:
          "夏季棉麻穿搭系列以自然材質與寬鬆剪裁為核心，打造適合炎熱季節的日常穿著。",
      },
      {
        type: "paragraph",
        content:
          "本次新品企劃整理襯衫、褲款、洋裝與外搭單品，透過輕盈布料與簡潔輪廓，讓夏季穿搭更舒適。",
      },
      {
        type: "heading",
        content: "自然材質與寬鬆剪裁",
      },
      {
        type: "image",
        src: "https://www.urban-research.tw/special/240521-ur-all-women-summer-lookbook/img/sp.jpg",
        alt: "夏季棉麻穿搭系列",
        caption: "以自然材質與寬鬆剪裁，打造適合炎熱季節的日常穿著。",
        size: "wide",
      },
      {
        type: "list",
        title: "系列重點",
        items: [
          "棉麻襯衫與上衣",
          "寬鬆褲款與裙裝",
          "夏季外搭單品",
          "自然色系穿搭建議",
        ],
      },
      {
        type: "callout",
        title: "上市提醒",
        content:
          "不同尺寸與顏色庫存依門市而異，實際販售資訊請依線上商店與門市公告為準。",
      },
    ],
  },

  "weekend-gift": {
    content: [
      {
        type: "paragraph",
        content:
          "會員專屬週末滿額禮活動，讓會員在指定週末消費達成條件後，即可獲得限定小禮。",
      },
      {
        type: "paragraph",
        content:
          "活動以日常實用小物為主，適合作為夏季生活中的輕巧補充，也讓週末購物多一份驚喜。",
      },
      {
        type: "heading",
        content: "週末限定會員回饋",
      },
      {
        type: "image",
        src: "https://i.pinimg.com/736x/b8/30/45/b83045a5336af4b4a94d95c1c059f174.jpg",
        alt: "會員專屬週末滿額禮",
        caption: "指定週末期間消費滿額，即可獲得會員限定小禮。",
        size: "wide",
      },
      {
        type: "list",
        title: "活動內容",
        items: [
          "會員限定參加",
          "指定週末滿額贈禮",
          "線上與指定門市適用",
          "贈品數量有限送完為止",
        ],
      },
      {
        type: "callout",
        title: "注意事項",
        content:
          "滿額門檻、贈品內容與適用門市，請依會員活動頁與門市公告為準。",
      },
    ],
  },

  "special-project": {
    content: [
      {
        type: "paragraph",
        content:
          "本季限定活動與生活企劃，從日常選品、生活體驗到期間限定活動，透過不同主題重新認識生活裡值得停下來感受的細節。",
      },
      {
        type: "paragraph",
        content:
          "企劃內容將依照季節、門市與會員活動分階段更新，讓顧客可以用不同角度參與品牌所提出的生活提案。",
      },
      {
        type: "quote",
        content: "專題企劃是一次整理生活的入口，也是重新選擇日常節奏的開始。",
      },
      {
        type: "heading",
        content: "本季活動總覽",
      },
      {
        type: "image",
        src: "https://storage.googleapis.com/www.taiwantradeshow.com.tw/firstPage/202603/T-39584656.png",
        alt: "本季限定活動與生活企劃",
        caption: "從日常選品、生活體驗到期間限定活動，重新認識生活細節。",
        size: "wide",
      },
      {
        type: "list",
        title: "企劃內容",
        items: [
          "期間限定生活選品",
          "門市體驗活動",
          "會員限定回饋",
          "季節主題專題文章",
        ],
      },
      {
        type: "callout",
        title: "企劃提醒",
        content:
          "專題內容會依活動期間持續更新，實際活動與商品資訊請依各頁面公告為準。",
      },
    ],
  },

  survey: {
    content: [
      {
        type: "paragraph",
        content:
          "親愛的各位穿越者與親愛的露格尼卡王國冒險者們，誠摯歡迎你們參與本次由王選陣營聯合舉辦的《從零開始的異世界生活》超大型主題動畫實體活動！為了能夠在接下來的活動中，為每一位支持菜月昴、愛蜜莉雅、雷姆以及愛蜜莉雅陣營的粉絲們提供最極致的沉浸式體驗，我們特別設計了這份詳細的冒險者前置意願調查問卷。透過收集你們對於動畫經典場景重現的期待度、各個陣營的偏好程度，以及你們在異世界中所渴望體驗的主題活動類型，我們後續才能量身打造出最符合每位粉絲個人需求的專屬活動提案。無論你是渴望親身體驗白鯨攻略戰的緊湊刺激，還是想在羅茲瓦爾宅邸享受一場由拉姆與雷姆親手準備的優雅下午茶時光，請務必花費幾分鐘的時間，詳實填寫這份結合了活動問卷與報名資料的表單，讓我們一同開啟這趟充滿未知與感動的異世界全新篇章。",
      },
      {
        type: "paragraph",
        content:
          "本份精心設計的冒險者問卷內容相當豐富且全面，主要包含了四大核心板塊：首先是「活動參與意願調查」，用以評估大家對於實體互動、聲優見面會或限定周邊販售的狂熱程度；其次是「偏好主題挑選」，內容涵蓋了魔女教徒討伐戰、聖域篇章的記憶考驗、甚至是最新一季的水門都市樸利斯提拉防衛戰等經典橋段；再者為「活動門市與場次選擇」，我們規劃了多個模擬露格尼卡王國不同領地的實體據點，供各位依據自身的時間與地理位置進行最佳的抉擇；最後則是至關重要的「基本聯絡資料填寫」，這將作為未來發放活動邀請函與專屬魔法通信的依據。請特別注意，當你逐一填寫並仔細檢查上述所有核心內容後，系統將會引導你正式進入活動的報名流程，請務必確認所有資訊的真實性，以免錯失這場四年一度的異世界盛會。",
      },
      {
        type: "heading",
        content:
          "向銀髮少女與精靈起誓！立刻填寫這份命運交織的異世界冒險問卷，在無盡的輪迴與考驗之中，尋找到最適合你的專屬陣營活動與不可磨滅的強烈羈絆，與我們攜手改寫未來吧！",
      },
      {
        type: "image",
        src: "https://i.pinimg.com/736x/23/fe/8c/23fe8cd57ea5da69386b37c8e4a68524.jpg",
        alt: "從零開始的異世界生活特展與王選活動報名",
        caption:
          "請各位渴望打破命運輪迴的冒險者們，立刻完成這份關鍵的活動問卷與報名資料！透過你所選擇的每一項答案，我們將能更深入地探索並理解你個人的生活節奏與喜好，進而為你量身打造出最具沉浸感、彷彿親臨露格尼卡王國現場的專屬活動提案。無論需要經歷多少次的重來，我們都將在命運交織的起點再度相遇，展開屬於我們的全新冒險篇章。",
        size: "wide",
      },
      {
        type: "list",
        title: "露格尼卡王國冒險問卷核心考察內容一覽",
        items: [
          "【異世界活動主題深度偏好】：包含三大陣營主題區的選擇（愛蜜莉雅陣營的溫馨羅茲瓦爾宅邸、庫珥修陣營的威嚴討伐戰備、安娜塔西亞陣營的繁華商會），以及你最期待的動畫高能場景一比一還原區，不論是「從零開始」的淚崩告白名場面，還是震撼人心的昂與雷姆並肩作戰場景，都將依據你的投票結果進行重點打造。",
          "【時之沙漏・可參與時間時段】：為了配合各位在現實世界與異世界之間的日常作息平衡，我們特別規劃了多個不同的冒險時段。包含平日夜晚的「魔女結界夜間探索場」、週末白天的「王選爭霸全日狂歡場」，以及特殊節日限定的「魔獸襲擊緊急應變特典場」，請勾選出最符合你行程的時段，以便我們調配各場次的人流與活動節奏。",
          "【希望參與的王國領地門市】：本次活動將於多個據點同步展開擬真化運營。你可以選擇交通便利且充滿現代感的「中央王都主要據點（台北旗艦店）」、充滿異國浪漫風情的「水門都市分部據點（台中概念店）」、或是歷史悠久且環境清幽的「邊境伯爵領地據點（高雄特設店）」，請選擇你最方便前往的王國領地進行報名。",
          "【基本聯絡資料與魔法契約鑑定】：為了確保活動的安全性與中選通知的準確送達，請務必提供正確的冒險者真名（真實姓名）、魔法聯絡終端號碼（手機號碼）、以及用於接收王國羊皮紙信件的電子信箱。我們將會對所有資料進行嚴格的魔法加密保護，絕不外洩，這也是後續發送「入場憑證電子徽章」的唯一管道。",
        ],
      },
      {
        type: "callout",
        title: "【嫉妒魔女的死亡回歸警告・報名重要注意事項】",
        content:
          "請所有參與問卷調查的冒險者們特別注意，就如同菜月昂的「死亡回歸」無法輕易向外人訴說一樣，本活動的報名機制也有其嚴格的規範！單純填寫並送出此份意願問卷，『絕對不代表』你已經成功取得了活動的入場門票或報名成功。實際的參與資格、最終的中選名單、以及正式的活動參與通知，皆必須以主辦單位後續透過你所填寫的聯絡資訊（簡訊與電子信箱）所發送的『王國正式邀請函』為絕對依據。若因資料填寫錯誤導致通訊魔法無法送達，主辦單位將不負任何責任，亦無法像動畫情節般重來一次，請務必反覆檢查後再行送出！",
      },
    ],
  },
};

function buildActivityDetails() {
  return activityArticles.map<ActivityDetail>((article) => {
    const detailContent = activityDetailContentMap[article.slug];

    return {
      ...article,
      heroImage: detailContent?.heroImage ?? article.image,
      thumbnail: article.image,
      content: detailContent?.content ?? [],
    };
  });
}

const activityDetails = buildActivityDetails();

function getRequiredActivityArticle(slug: string) {
  const article = activityArticles.find((item) => {
    return item.slug === slug;
  });

  if (!article) {
    throw new Error(`Activity article not found: ${slug}`);
  }

  return article;
}

function findActivityDetail(idOrSlug: string) {
  return (
    activityDetails.find((activity) => {
      return activity.slug === idOrSlug || String(activity.id) === idOrSlug;
    }) ?? null
  );
}

function getRelatedActivities(activity: ActivityDetail | null) {
  if (!activity) {
    return activityDetails.slice(0, 3);
  }

  const relatedByIds = activity.relatedIds
    .map((id) => {
      return activityDetails.find((item) => item.id === id);
    })
    .filter((item): item is ActivityDetail => Boolean(item));

  if (relatedByIds.length) {
    return relatedByIds;
  }

  return activityDetails
    .filter((item) => item.id !== activity.id)
    .slice(0, 3);
}

export const activityService = {
  async getActivityList(): Promise<ActivityListResponse> {
    return {
      categories: activityCategories,
      allArticles: activityArticles,

      // 原本 activityArticles[0] 會被 TS 判斷可能是 undefined，改用 slug 找指定資料
      heroArticle: getRequiredActivityArticle("summer-life"),

      middleArticles: activityArticles.filter((article) => {
        return [2, 3].includes(article.id);
      }),

      sideArticles: activityArticles.filter((article) => {
        return [4, 5, 6].includes(article.id);
      }),

      latestArticles: activityArticles.filter((article) => {
        return [7, 8, 9, 10, 11].includes(article.id);
      }),

      // 不要用 find(...)!，改用統一方法
      featureArticle: getRequiredActivityArticle("special-project"),

      // 不要用 find(...)!，改用統一方法
      surveyArticle: getRequiredActivityArticle("survey"),
    };
  },

  async getActivityDetail(idOrSlug: string): Promise<ActivityDetailResponse> {
    const activity = findActivityDetail(idOrSlug);

    return {
      activity,
      relatedActivities: getRelatedActivities(activity),
    };
  },
};