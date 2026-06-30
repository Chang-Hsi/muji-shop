export type StoreRegionCode =
  | "taipei"
  | "newtaipei"
  | "taoyuan"
  | "taichung"
  | "kaohsiung";

export type StoreServiceCode =
  | "pickup"
  | "reservation"
  | "stock"
  | "parking"
  | "wifi"
  | "card";

export type StoreLocationItem = {
  id: number;
  name: string;
  slug: string;
  region: StoreRegionCode;
  regionLabel: string;
  address: string;
  phone: string;
  hours: string;

  // 門市列表、卡片、一般展示圖
  image: string;

  // 門市詳情頁「門市資訊」區塊使用的門面圖
  facadeImage?: string;

  // 門市詳情頁「門市空間與樓層資訊」使用的圖片
  // 之後接後端時，建議可做成 stores.layoutImages，
  // 或拆成 store_images table，並用 type: "layout" 區分。
  layoutImages?: string[];

  lat: number;
  lng: number;
  services: StoreServiceCode[];
};

export type StoreServiceItem = {
  id: number;
  title: string;
  slug: StoreServiceCode;
  category: string;
  badge?: string;
  description: string;
  detail: string;
  image: string;
  buttonText: string;
  availableStoreIds: number[];
  availableStores: string[];
  features: string[];
};

// TODO: 之後接後端時，這份 storeLocations 會對應到 stores table。
// 建議 stores table 至少保留：id、name、slug、region、regionLabel、address、phone、hours、image、facadeImage、lat、lng。
// image 可作為門市列表卡片圖，facadeImage 專門給門市詳情頁的門面圖使用。
// layoutImages 可先存在 stores table 的 JSON 欄位；若之後圖片很多，建議拆成 store_images table。
// services 不建議直接存成字串陣列，正式 DB 建議用多對多關聯：Store <-> StoreService。
export const storeLocations: StoreLocationItem[] = [
  {
    id: 1,
    name: "台北信義店",
    slug: "taipei-xinyi",
    region: "taipei",
    regionLabel: "台北市",
    address: "台北市信義區松高路 16 號",
    phone: "(02) 2720-5888",
    hours: "11:00 - 22:00",
    image:
      "https://i.pinimg.com/1200x/6a/ad/f2/6aadf2dbd57db309abe4ae93cca0825f.jpg",
    facadeImage: "https://i.pinimg.com/1200x/04/fb/0d/04fb0d60032ff4bdafece0dc65c83230.jpg",
    layoutImages: [
      "https://i.pinimg.com/736x/5d/86/c0/5d86c01e34b45a81d48946eedaf13244.jpg",
      "https://i.pinimg.com/736x/bc/9a/c2/bc9ac26211a9648a35cff276805945c7.jpg",
    ],
    lat: 25.0396,
    lng: 121.5673,
    services: ["pickup", "reservation", "stock", "parking", "wifi", "card"],
  },
  {
    id: 2,
    name: "台北南西店",
    slug: "taipei-nanxi",
    region: "taipei",
    regionLabel: "台北市",
    address: "台北市中山區南京西路 14 號",
    phone: "(02) 2521-1688",
    hours: "11:00 - 21:30",
    image:
      "https://i.pinimg.com/1200x/4a/d5/c6/4ad5c6a7be27628acdb886fd8c3e342b.jpg",
    facadeImage: "https://i.pinimg.com/1200x/45/3c/84/453c843627a10edaf619d556894bf3a4.jpg",
    layoutImages: [
      "https://i.pinimg.com/736x/5d/86/c0/5d86c01e34b45a81d48946eedaf13244.jpg",
      "https://i.pinimg.com/736x/bc/9a/c2/bc9ac26211a9648a35cff276805945c7.jpg",
    ],
    lat: 25.0522,
    lng: 121.5204,
    services: ["pickup", "stock", "wifi", "card"],
  },
  {
    id: 3,
    name: "新北板橋店",
    slug: "newtaipei-banqiao",
    region: "newtaipei",
    regionLabel: "新北市",
    address: "新北市板橋區縣民大道二段 7 號",
    phone: "(02) 8969-1888",
    hours: "11:00 - 22:00",
    image:
      "https://i.pinimg.com/1200x/2c/cc/28/2ccc28949cdf16b39f59b38a33c31f2c.jpg",
    facadeImage: "https://i.pinimg.com/1200x/cb/1f/4e/cb1f4e562ba89fc1d92d119a06dafaf6.jpg",
    layoutImages: [
      "https://i.pinimg.com/736x/5d/86/c0/5d86c01e34b45a81d48946eedaf13244.jpg",
      "https://i.pinimg.com/736x/bc/9a/c2/bc9ac26211a9648a35cff276805945c7.jpg",
    ],
    lat: 25.0143,
    lng: 121.4639,
    services: ["pickup", "reservation", "parking", "card"],
  },
  {
    id: 4,
    name: "桃園中壢店",
    slug: "taoyuan-zhongli",
    region: "taoyuan",
    regionLabel: "桃園市",
    address: "桃園市中壢區元化路 357 號",
    phone: "(03) 427-2688",
    hours: "11:00 - 22:00",
    image:
      "https://i.pinimg.com/736x/d8/25/ba/d825baeea5d89ecbd10259f7a4dcbebd.jpg",
    facadeImage: "https://i.pinimg.com/1200x/3b/c0/51/3bc05165d030437fb82e5d787af77443.jpg",
    layoutImages: [
      "https://i.pinimg.com/736x/5d/86/c0/5d86c01e34b45a81d48946eedaf13244.jpg",
      "https://i.pinimg.com/736x/bc/9a/c2/bc9ac26211a9648a35cff276805945c7.jpg",
    ],
    lat: 24.9622,
    lng: 121.2248,
    services: ["pickup", "stock", "parking", "card"],
  },
  {
    id: 5,
    name: "台中勤美店",
    slug: "taichung-qinmei",
    region: "taichung",
    regionLabel: "台中市",
    address: "台中市西區公益路 68 號",
    phone: "(04) 2326-3188",
    hours: "11:00 - 22:00",
    image:
      "https://i.pinimg.com/736x/2b/de/97/2bde976dcf23fd1749b656429febcaac.jpg",
    facadeImage: "https://i.pinimg.com/736x/db/8e/2d/db8e2de07393071475f1d6dd8bfe9030.jpg",
    layoutImages: [
      "https://i.pinimg.com/736x/5d/86/c0/5d86c01e34b45a81d48946eedaf13244.jpg",
      "https://i.pinimg.com/736x/bc/9a/c2/bc9ac26211a9648a35cff276805945c7.jpg",
    ],
    lat: 24.1512,
    lng: 120.6648,
    services: ["pickup", "reservation", "stock", "parking", "wifi", "card"],
  },
  {
    id: 6,
    name: "高雄漢神店",
    slug: "kaohsiung-hanshin",
    region: "kaohsiung",
    regionLabel: "高雄市",
    address: "高雄市前金區成功一路 266 號",
    phone: "(07) 215-5888",
    hours: "11:00 - 22:00",
    image:
      "https://i.pinimg.com/1200x/ff/ec/7f/ffec7fd12757cd86cd3d6da47ce7ecb2.jpg",
    facadeImage: "https://i.pinimg.com/736x/cf/55/f1/cf55f117b0b8bfd12e8e86b46e1999e8.jpg",
    layoutImages: [
      "https://i.pinimg.com/736x/5d/86/c0/5d86c01e34b45a81d48946eedaf13244.jpg",
      "https://i.pinimg.com/736x/bc/9a/c2/bc9ac26211a9648a35cff276805945c7.jpg",
    ],
    lat: 22.6197,
    lng: 120.2969,
    services: ["pickup", "stock", "parking", "card"],
  },
];

function getAvailableStoreNames(storeIds: number[]) {
  return storeLocations
    .filter((store) => storeIds.includes(store.id))
    .map((store) => store.name);
}

// TODO: 之後接後端時，這份 storeServices 會對應到 store_services table。
// availableStoreIds 之後建議改成關聯表，例如 StoreServiceOnStore。
// 前端顯示可用 availableStores，但送後端或 seed 時建議用 id 關聯，避免門市改名後資料對不起來。
export const storeServices: StoreServiceItem[] = [
  {
    id: 1,
    title: "台北信義店",
    slug: "pickup",
    category: "購物服務",
    badge: "門市服務",
    description:
      "提供貼心的線上選購、門市取貨服務。不論是日常忙碌無法在家收件，或是希望在上下班順路提取商品，您都能自由彈性地安排時間。到店後即可快速領取，享受無縫接軌的購物體驗，讓日常生活採購變得更加輕鬆與便利。",
    detail:
      "門市自取服務適合不方便在家收件，或希望順路取貨的顧客。完成線上訂購後，可選擇提供服務的門市，商品到店後再前往取貨。",
    image:
      "https://i.pinimg.com/1200x/6a/ad/f2/6aadf2dbd57db309abe4ae93cca0825f.jpg",
    buttonText: "了解門市自取",
    availableStoreIds: [1, 2, 3, 4, 5, 6],
    availableStores: getAvailableStoreNames([1, 2, 3, 4, 5, 6]),
    features: ["線上選購", "指定門市取貨", "到店通知", "彈性取貨"],
  },
  {
    id: 2,
    title: "台北南西店",
    slug: "reservation",
    category: "購物服務",
    badge: "部分門市",
    description:
      "為了避免您滿懷期待前往門市，卻因商品售罄而撲空，我們特別推出便利的商品預約服務。不論是熱門搶手新品，還是需要現場確認尺寸與質感的家具擺飾，您都能在到店前先行線上預約保留，確保心儀的商品在門市等候您的到來。",
    detail:
      "商品預約服務可協助顧客在前往門市前先保留或確認商品狀態。適合熱門商品、家具、生活用品或需要現場確認尺寸與質感的品項。",
    image:
      "https://i.pinimg.com/1200x/4a/d5/c6/4ad5c6a7be27628acdb886fd8c3e342b.jpg",
    buttonText: "了解商品預約",
    availableStoreIds: [1, 3, 5],
    availableStores: getAvailableStoreNames([1, 3, 5]),
    features: ["商品保留", "到店確認", "熱門商品預約", "門市諮詢"],
  },
  {
    id: 3,
    title: "新北板橋店",
    slug: "stock",
    category: "查詢服務",
    badge: "門市服務",
    description:
      "出門購物前，建議您善用即時庫存查詢服務，輕鬆掌握指定門市的商品現貨狀況。這能有效幫助您精準規劃購物路線與安排取貨時間，避免白跑一趟。在出發前動動手指先確認，讓整個實體門市的採購行程更加順暢有效率。",
    detail:
      "庫存查詢可協助顧客確認商品是否仍有現貨。實際庫存會因現場銷售而變動，建議出發前再次確認，或與門市聯繫。",
    image:
      "https://i.pinimg.com/1200x/2c/cc/28/2ccc28949cdf16b39f59b38a33c31f2c.jpg",
    buttonText: "了解庫存查詢",
    availableStoreIds: [1, 2, 4, 5, 6],
    availableStores: getAvailableStoreNames([1, 2, 4, 5, 6]),
    features: ["門市庫存", "商品狀態", "即時查詢", "購物規劃"],
  },
  {
    id: 4,
    title: "桃園中壢店",
    slug: "parking",
    category: "到店服務",
    badge: "部分門市",
    description:
      "為了解決顧客開車前來採購時的停車煩惱，部分門市特別整合並提供周邊停車資訊。不論您是前來添購大型家具、大量生活用品，或是家族共同出遊採買，都能提前掌握車位狀況與優惠折抵規則，讓您開車出門購物輕鬆無負擔。",
    detail:
      "停車服務會依門市所在商場或周邊環境而不同。建議出發前先查看門市資訊，確認停車位置、費率與折抵規則。",
    image:
      "https://i.pinimg.com/736x/d8/25/ba/d825baeea5d89ecbd10259f7a4dcbebd.jpg",
    buttonText: "了解停車資訊",
    availableStoreIds: [1, 3, 4, 5, 6],
    availableStores: getAvailableStoreNames([1, 3, 4, 5, 6]),
    features: ["停車資訊", "大型商品採購", "商場停車", "交通便利"],
  },
  {
    id: 5,
    title: "台中勤美店",
    slug: "wifi",
    category: "門市設備",
    badge: "部分門市",
    description:
      "為了打造更貼心的智慧購物環境，部分門市內部提供免費且高速的無線網路 WiFi 服務。讓您在店內選購商品時，能隨時拿出手機查詢詳細的產品資訊、比對尺寸，或是出示行動會員卡折抵點數，享受網路不中斷的流暢實體消費體驗。",
    detail:
      "WiFi 服務可協助顧客在門市內查詢商品、會員資訊與線上內容。實際提供情況依門市環境與設備為準。",
    image:
      "https://i.pinimg.com/736x/2b/de/97/2bde976dcf23fd1749b656429febcaac.jpg",
    buttonText: "了解 WiFi 服務",
    availableStoreIds: [1, 2, 5],
    availableStores: getAvailableStoreNames([1, 2, 5]),
    features: ["門市 WiFi", "會員查詢", "線上商品資訊", "便利設備"],
  },
  {
    id: 6,
    title: "高雄漢神店",
    slug: "card",
    category: "付款服務",
    badge: "門市服務",
    description:
      "門市全面支援各大銀行信用卡以及時下主流的電子行動支付，讓結帳流程變得更加快速且安全。您不必再翻找錢包湊零錢，只需一指感應或掃碼即可完成付款，同時還能享有各大支付平台的專屬綁定優惠，為您帶來極致便利的購物尾聲。",
    detail:
      "可刷卡服務提供顧客更彈性的付款方式。實際支援的卡別、電子支付與活動優惠，可能依門市與期間活動有所不同。",
    image:
      "https://i.pinimg.com/1200x/ff/ec/7f/ffec7fd12757cd86cd3d6da47ce7ecb2.jpg",
    buttonText: "了解付款服務",
    availableStoreIds: [1, 2, 3, 4, 5, 6],
    availableStores: getAvailableStoreNames([1, 2, 3, 4, 5, 6]),
    features: ["信用卡", "電子支付", "快速結帳", "彈性付款"],
  },
];