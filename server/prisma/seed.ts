import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const newsItems = [
  {
    to: "/news/official-limited",
    html: "<strong>官網限定</strong> 6/1(一)-6/30(二)　筆筆最高5% 單筆滿千回饋<b>100元券</b>(限量)",
  },
  {
    to: "/news/summer-sale",
    html: "<strong>期間限定</strong> 夏日生活選品優惠中　指定商品第二件<b>88折</b>",
  },
  {
    to: "/news/new-arrival",
    html: "<strong>新品上市</strong> 日系選物新品到貨　收納、餐具與外出用品同步登場",
  },
];

const categories = [
  {
    title: "生活用品",
    description: "簡潔實用的日常選品，讓居家空間回到乾淨舒服的狀態。",
    slug: "living",
    tag: "LIVING",
    image:
      "https://i.pinimg.com/1200x/ab/ec/94/abec946a0c178c3ae59969a860874e77.jpg",
  },
  {
    title: "服飾",
    description: "自然舒適的基本穿搭，適合每天長時間穿著。",
    slug: "clothes",
    tag: "CLOTHES",
    image:
      "https://i.pinimg.com/1200x/40/24/60/402460b6586e9f3dcd54da447b223b0b.jpg",
  },
  {
    title: "食品",
    description: "安心樸實的日常滋味，簡單但剛剛好。",
    slug: "food",
    tag: "FOOD",
    image:
      "https://i.pinimg.com/1200x/b9/e7/77/b9e777051d897cebe686bdd39767a45c.jpg",
  },
  {
    title: "外出用品",
    description: "通勤、旅行與日常外出的輕便小物。",
    slug: "outdoor",
    tag: "OUTDOOR",
    image:
      "https://i.pinimg.com/1200x/b9/f3/f5/b9f3f55801a4fdfa4110548fa4b9dc0c.jpg",
  },
];

const featuredProducts = [
  {
    name: "封蠟印章 梅結び",
    slug: "wax-seal-ume-musubi",
    price: 790,
    categorySlug: "living",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIO1xeB3hh8eYWfQSgBkQ-Sfx0Kvkiy89JqbIEh1wDmw&s=10",
  },
  {
    name: "SETOCRAFT 蜂蜜罐造型馬克杯/附匙",
    slug: "setocraft-honey-pot-mug",
    price: 490,
    categorySlug: "living",
    image:
      "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/66727add38f25a001905e349/800x.webp?source_format=jpg",
  },
  {
    name: "日系選物・貓咪筷架",
    slug: "japanese-cat-chopstick-rest",
    price: 390,
    categorySlug: "living",
    image:
      "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/6730c6d04d2874000ab5d723/800x.webp?source_format=jpg",
  },
  {
    name: "日系選物・大容量帆布包",
    slug: "japanese-large-canvas-bag",
    price: 790,
    categorySlug: "outdoor",
    image:
      "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/681c76141ea07f000bd9d909/800x.webp?source_format=png",
  },
  {
    name: "Minorutouki 美濃燒 格紋餐碗(日本製)",
    slug: "minorutouki-mino-ware-check-bowl",
    price: 490,
    categorySlug: "food",
    image:
      "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/67c918030cfbbb000fbf989c/800x.webp?source_format=jpg",
  },
  {
    name: "TOMO 貓貓烘衣球",
    slug: "tomo-cat-dryer-ball",
    price: 390,
    categorySlug: "living",
    image:
      "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/6751b9e6c9e27e0011f74244/800x.webp?source_format=jpg",
  },
  {
    name: "PALMART 貓咪三兄弟盤子",
    slug: "palmart-three-cats-plate",
    price: 790,
    categorySlug: "food",
    image:
      "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/67db8c643bdc1c000c866dad/800x.webp?source_format=jpg",
  },
  {
    name: "鴨鴨桌邊掛勾",
    slug: "duck-table-hook",
    price: 490,
    categorySlug: "living",
    image:
      "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/69f01a161b51f8000ec65f26/800x.webp?source_format=jpg",
  },
  {
    name: "日系選物・慵懶貓手機架",
    slug: "japanese-lazy-cat-phone-stand",
    price: 390,
    categorySlug: "living",
    image:
      "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/68b15f5ec223e40018a39c8d/800x.webp?source_format=jpg",
  },
];

const catalogProducts = [
  {
    name: "橡木邊桌",
    slug: "oak-side-table",
    description: "適合床邊與閱讀角落的橡木小邊桌。",
    fullDescription:
      "以溫潤橡木紋理搭配簡潔輪廓，尺寸輕巧卻足以擺放檯燈、書本與日常杯盤，讓臥室或沙發旁多一處安定的收納平台。",
    price: 2480,
    categorySlug: "furniture",
    material: "wood",
    color: "brown",
    image: "https://www.crapo.jp/desk/5134/1.jpg",
    galleryImages: [
      "https://www.crapo.jp/desk/5134/1.jpg",
      "https://www.crapo.jp/desk/5134/3.jpg",
      "https://www.crapo.jp/desk/5134/4.jpg",
      "https://www.crapo.jp/desk/5134/8.jpg",
    ],
    swatches: [
      { label: "橡木棕", hex: "#8a684a" },
      { label: "自然米", hex: "#d8c7a7" },
    ],
    topics: ["bedroom"],
    sales: 92,
    stock: 18,
    isNew: true,
    isLimited: false,
    specifications: [
      { label: "尺寸", value: "寬 42 x 深 42 x 高 52 cm" },
      { label: "材質", value: "橡木貼皮與實木" },
      { label: "重量", value: "約 4.2 kg" },
      { label: "組裝", value: "需簡易組裝" },
    ],
    careInstructions:
      "請以柔軟乾布擦拭，避免長時間受潮或陽光直射。",
  },
  {
    name: "亞麻收納籃",
    slug: "linen-storage-basket",
    description: "可收納毛巾、毯子與日用小物的柔軟亞麻籃。",
    fullDescription:
      "以亞麻混紡布料製成，柔軟可折疊，適合收納毛巾、毯子、衣物與日常雜物，為層架與臥室增添自然織紋。",
    price: 690,
    categorySlug: "living",
    material: "linen",
    color: "beige",
    image:
      "https://img.pchome.com.tw/cs/items/DQAUFQA900JTUBV/000001_1773825688.jpg",
    galleryImages: [
      "https://img.pchome.com.tw/cs/items/DQAUFQA900JTUBV/000001_1773825688.jpg",
      "https://img.pchome.com.tw/cs/items/DQAUFQA900JTUBV/l000001_1773825689.jpg",
      "https://img.pchome.com.tw/cs/items/DQAUFQA900JTUBV/l000002_1773825690.jpg",
      "https://img.pchome.com.tw/cs/items/DQAUFQA900JTUBV/l000004_1773825690.jpg",
    ],
    swatches: [
      { label: "米色", hex: "#d8c7a7" },
      { label: "白色", hex: "#f8f7f2" },
    ],
    topics: ["bedroom", "linen"],
    sales: 135,
    stock: 32,
    isNew: false,
    isLimited: false,
    specifications: [
      { label: "尺寸", value: "寬 36 x 深 26 x 高 24 cm" },
      { label: "材質", value: "亞麻混紡" },
      { label: "重量", value: "約 0.6 kg" },
      { label: "組裝", value: "無需組裝" },
    ],
    careInstructions:
      "局部髒污請以中性清潔劑輕拭並陰乾，請勿漂白。",
  },
  {
    name: "白瓷圓盤",
    slug: "white-ceramic-plate",
    description: "霧面白釉的簡約陶瓷餐盤。",
    fullDescription:
      "以霧面白釉呈現乾淨質感，低矮盤緣適合日常主餐、甜點與分享料理，也能輕鬆搭配既有餐具。",
    price: 380,
    categorySlug: "living",
    material: "ceramic",
    color: "white",
    image:
      "https://i.pinimg.com/1200x/cf/99/df/cf99df4fd1b7b496eb4cc5002811bb50.jpg",
    galleryImages: [
      "https://i.pinimg.com/1200x/cf/99/df/cf99df4fd1b7b496eb4cc5002811bb50.jpg",
      "https://i.pinimg.com/736x/74/c5/2e/74c52eafe324be1894d27cdc2dcfdfed.jpg",
      "https://i.pinimg.com/736x/ec/98/a4/ec98a478af7b524fc0e49c9e3742028b.jpg",
    ],
    swatches: [
      { label: "白色", hex: "#f8f7f2" },
      { label: "灰色", hex: "#9ca3af" },
    ],
    topics: ["kitchen"],
    sales: 168,
    stock: 48,
    isNew: false,
    isLimited: false,
    specifications: [
      { label: "尺寸", value: "直徑 22 cm" },
      { label: "材質", value: "陶瓷" },
      { label: "重量", value: "約 420 g" },
      { label: "用途", value: "餐具" },
    ],
    careInstructions:
      "可使用洗碗機清洗。請避免急冷急熱，以保護釉面。",
  },
  {
    name: "天然棉襯衫",
    slug: "natural-cotton-shirt",
    description: "透氣舒適、版型寬鬆的日常棉襯衫。",
    fullDescription:
      "採用輕盈棉質布料，親膚透氣，寬鬆剪裁方便單穿或作為外搭，適合日常通勤與休閒外出。",
    price: 1280,
    categorySlug: "clothes",
    material: "cotton",
    color: "white",
    image:
      "https://img.pchome.com.tw/cs/items/DIAIDHA900HSKHN/000001_1725860785.jpg",
    galleryImages: [
      "https://img.pchome.com.tw/cs/items/DIAIDHA900HSKHN/000001_1725860785.jpg",
      "https://img.pchome.com.tw/cs/items/DIAIDHA900HSKHN/l000001_1725862310.jpg",
      "https://img.pchome.com.tw/cs/items/DIAIDHA900HSKHN/l000002_1725862310.jpg",
      "https://img.pchome.com.tw/cs/items/DIAIDHA900HSKHN/l000003_1725862311.jpg",
    ],
    swatches: [
      { label: "白色", hex: "#f8f7f2" },
      { label: "米色", hex: "#d8c7a7" },
    ],
    topics: ["outdoor", "linen"],
    sales: 121,
    stock: 24,
    isNew: true,
    isLimited: false,
    specifications: [
      { label: "尺寸", value: "S / M / L" },
      { label: "材質", value: "100% 棉" },
      { label: "版型", value: "寬鬆版型" },
      { label: "洗滌", value: "可機洗" },
    ],
    careInstructions:
      "請以冷水與相近顏色衣物一同洗滌，可陰乾或低溫烘乾。",
  },
  {
    name: "不鏽鋼保溫瓶 500ml",
    slug: "steel-bottle",
    description: "適合通勤與戶外使用的不鏽鋼保溫瓶。",
    fullDescription:
      "以耐用不鏽鋼打造，外型俐落、瓶蓋好握，500ml 容量適合通勤、散步與戶外活動時補充水分。",
    price: 890,
    categorySlug: "living",
    material: "steel",
    color: "gray",
    image:
      "https://howsie-shop.jp/cdn/shop/files/483990_8.jpg?v=1752541617&width=600",
    galleryImages: [
      "https://howsie-shop.jp/cdn/shop/files/483990_8.jpg?v=1752541617&width=600",
      "https://howsie-shop.jp/cdn/shop/files/483990_12.jpg?v=1752541628&width=600",
      "https://howsie-shop.jp/cdn/shop/files/483990_4.jpg?v=1752541606&width=600",
      "https://howsie-shop.jp/cdn/shop/files/483990_1.jpg?v=1752541597&width=600",
    ],
    swatches: [
      { label: "灰色", hex: "#9ca3af" },
      { label: "黑色", hex: "#1f1f1f" },
    ],
    topics: ["outdoor"],
    sales: 210,
    stock: 56,
    isNew: false,
    isLimited: false,
    specifications: [
      { label: "容量", value: "500 ml" },
      { label: "材質", value: "304 不鏽鋼" },
      { label: "保溫", value: "約 6 小時" },
      { label: "清潔", value: "建議手洗" },
    ],
    careInstructions:
      "請以柔軟海綿手洗，請勿使用漂白劑或研磨性清潔用品。",
  },
  {
    name: "木質收納層架",
    slug: "wood-storage-shelf",
    description: "可放置書籍、餐具與擺飾的木質開放層架。",
    fullDescription:
      "溫潤木質搭配開放式收納，適合小坪數空間、廚房與臥室使用，常用物品能一目了然、方便拿取。",
    price: 3200,
    categorySlug: "furniture",
    material: "wood",
    color: "brown",
    image:
      "https://image.rakuten.co.jp/incrasso/cabinet/original/nor/hb-04_2.jpg",
    galleryImages: [
      "https://image.rakuten.co.jp/incrasso/cabinet/original/nor/hb-04_2.jpg",
      "https://image.rakuten.co.jp/incrasso/cabinet/original/nor/hb-04_3.jpg",
      "https://image.rakuten.co.jp/incrasso/cabinet/original/nor/hb-04_4.jpg",
      "https://image.rakuten.co.jp/incrasso/cabinet/original/nor/hb-04_9.jpg",
    ],
    swatches: [
      { label: "木質棕", hex: "#8a684a" },
      { label: "自然米", hex: "#d8c7a7" },
    ],
    topics: ["bedroom", "kitchen"],
    sales: 74,
    stock: 14,
    isNew: false,
    isLimited: false,
    specifications: [
      { label: "尺寸", value: "寬 68 x 深 30 x 高 72 cm" },
      { label: "材質", value: "橡木貼皮與工程木" },
      { label: "重量", value: "約 8.5 kg" },
      { label: "組裝", value: "需簡易組裝" },
    ],
    careInstructions:
      "請定期除塵，潮濕物品請搭配杯墊或托盤使用，避免陽光直射。",
  },
  {
    name: "亞麻托特包",
    slug: "linen-tote-bag",
    description: "適合採買、裝書與外出的輕便亞麻托特包。",
    fullDescription:
      "可重複使用的亞麻托特包，提把柔軟、袋身輕盈，適合日常採買、裝書與短途外出。",
    price: 790,
    categorySlug: "clothes",
    material: "linen",
    color: "beige",
    image:
      "https://i.etsystatic.com/55220475/r/il/6c2b30/6781864525/il_794xN.6781864525_a1r7.jpg",
    galleryImages: [
      "https://i.etsystatic.com/55220475/r/il/6c2b30/6781864525/il_794xN.6781864525_a1r7.jpg",
      "https://i.etsystatic.com/55220475/r/il/2f25fc/7062091095/il_794xN.7062091095_8i2x.jpg",
      "https://i.etsystatic.com/55220475/r/il/9ff104/6840514578/il_794xN.6840514578_q1y6.jpg",
      "https://i.etsystatic.com/55220475/r/il/f969e5/6872704210/il_794xN.6872704210_l5as.jpg",
    ],
    swatches: [
      { label: "米色", hex: "#d8c7a7" },
      { label: "黑色", hex: "#1f1f1f" },
    ],
    topics: ["outdoor", "linen"],
    sales: 184,
    stock: 41,
    isNew: false,
    isLimited: false,
    specifications: [
      { label: "尺寸", value: "寬 38 x 高 42 cm" },
      { label: "材質", value: "亞麻帆布" },
      { label: "容量", value: "約 12 L" },
      { label: "清潔", value: "局部清潔" },
    ],
    careInstructions:
      "請局部清潔後自然風乾。天然亞麻會隨使用逐漸柔軟並產生自然皺褶。",
  },
  {
    name: "手作紙筆記本",
    slug: "handmade-paper-notebook",
    description: "適合速寫、筆記與日常計畫的手作紙筆記本。",
    fullDescription:
      "採用帶有纖維紋理的手作紙，適合速寫、書寫靈感、整理清單與安靜規劃日常。",
    price: 320,
    categorySlug: "creative",
    material: "cotton",
    color: "beige",
    image:
      "https://kinchandiy.com/wp-content/uploads/2025/03/k20250325_1.jpg?v=1742940148",
    galleryImages: [
      "https://kinchandiy.com/wp-content/uploads/2025/03/k20250325_1.jpg?v=1742940148",
      "https://kinchandiy.com/wp-content/uploads/2025/03/k20250325_2.jpg?v=1743460364",
      "https://kinchandiy.com/wp-content/uploads/2025/03/k20250325_4.jpg?v=1742940199",
      "https://kinchandiy.com/wp-content/uploads/2025/03/k20250325_20.jpg?v=1742940441",
    ],
    swatches: [
      { label: "紙本米", hex: "#d8c7a7" },
      { label: "暖棕", hex: "#8a684a" },
    ],
    topics: ["outdoor"],
    sales: 156,
    stock: 73,
    isNew: true,
    isLimited: false,
    specifications: [
      { label: "尺寸", value: "A5" },
      { label: "頁數", value: "96 頁" },
      { label: "材質", value: "棉質紙" },
      { label: "裝訂", value: "可攤平裝訂" },
    ],
    careInstructions:
      "請保持乾燥並避免陽光直射，以維持紙張質感。",
  },
  {
    name: "限定陶瓷擴香座",
    slug: "limited-ceramic-diffuser",
    description: "帶有沉靜霧面質感的限定陶瓷擴香座。",
    fullDescription:
      "為小空間設計的陶瓷擴香座，柔和器型搭配季節限定霧面色調，適合臥室、玄關與書桌角落。",
    price: 1180,
    categorySlug: "limited",
    material: "ceramic",
    color: "gray",
    image:
      "https://ondat.kr/web/product/big/202208/547a99249d1e4ec7434c67c96134b622.jpg",
    galleryImages: [
      "https://ondat.kr/web/product/big/202208/547a99249d1e4ec7434c67c96134b622.jpg",
      "https://ondat.kr/web/product/extra/big/202208/afeb90d10cd02ef708752116b8be2a67.jpg",
      "https://ondat.kr/web/product/extra/big/202204/409769262baf8e3835e6f721e6318243.jpg",
      "https://ondat.kr/web/product/extra/big/202308/ad44f4e83fa6d0bbf0b8aaab4e49a02e.jpg",
    ],
    swatches: [
      { label: "灰色", hex: "#9ca3af" },
      { label: "白色", hex: "#f8f7f2" },
    ],
    topics: ["bedroom"],
    sales: 66,
    stock: 9,
    isNew: true,
    isLimited: true,
    specifications: [
      { label: "尺寸", value: "直徑 8 x 高 10 cm" },
      { label: "材質", value: "陶瓷" },
      { label: "內容物", value: "擴香座 1 入" },
      { label: "用途", value: "室內香氛" },
    ],
    careInstructions:
      "請以柔軟布料擦拭。香氛油請避免直接接觸木質塗裝表面。",
  },
  {
    name: "黑色棉質長褲",
    slug: "black-cotton-pants",
    description: "直筒寬鬆版型的日常棉質長褲。",
    fullDescription:
      "採用棉質布料與俐落腰頭設計，直筒寬鬆褲型方便搭配襯衫、針織衫與日常上衣。",
    price: 1680,
    categorySlug: "clothes",
    material: "cotton",
    color: "black",
    image:
      "https://cdn.wconcept.com/products/resize/632x843/7210121/24/721012124_1.png",
    galleryImages: [
      "https://cdn.wconcept.com/products/resize/632x843/7210121/24/721012124_1.png",
      "https://cdn.wconcept.com/products/resize/632x843/7210121/24/721012124_2.png",
      "https://cdn.wconcept.com/products/resize/632x843/7210121/24/721012124_4.png",
      "https://cdn.wconcept.com/products/resize/632x843/7210121/24/721012124_5.png",
    ],
    swatches: [
      { label: "黑色", hex: "#1f1f1f" },
      { label: "灰色", hex: "#9ca3af" },
    ],
    topics: ["outdoor"],
    sales: 104,
    stock: 21,
    isNew: false,
    isLimited: false,
    specifications: [
      { label: "尺寸", value: "S / M / L / XL" },
      { label: "材質", value: "100% 棉" },
      { label: "版型", value: "直筒寬鬆" },
      { label: "洗滌", value: "可機洗" },
    ],
    careInstructions:
      "請翻面冷水機洗，深色衣物請分開洗滌。",
  },
  {
    name: "木柄清潔刷",
    slug: "wood-cleaning-brush",
    description: "適合廚房與居家清潔的小型木柄刷。",
    fullDescription:
      "小巧木柄搭配紮實刷毛，適合清潔水槽、檯面、餐具與居家角落，日常使用方便好握。",
    price: 260,
    categorySlug: "living",
    material: "wood",
    color: "brown",
    image:
      "https://i.etsystatic.com/33598976/r/il/b32186/8163702117/il_794xN.8163702117_godd.jpg",
    galleryImages: [
      "https://i.etsystatic.com/33598976/r/il/b32186/8163702117/il_794xN.8163702117_godd.jpg",
      "https://i.etsystatic.com/33598976/r/il/eef600/6570141022/il_794xN.6570141022_px3m.jpg",
      "https://i.etsystatic.com/33598976/r/il/8d5fdb/4001031994/il_794xN.4001031994_mhzs.jpg",
      "https://i.etsystatic.com/33598976/r/il/9b38a1/4048682245/il_794xN.4048682245_6o7w.jpg",
    ],
    swatches: [
      { label: "木質棕", hex: "#8a684a" },
      { label: "自然米", hex: "#d8c7a7" },
    ],
    topics: ["kitchen"],
    sales: 98,
    stock: 64,
    isNew: false,
    isLimited: false,
    specifications: [
      { label: "尺寸", value: "長 18 x 寬 6 cm" },
      { label: "材質", value: "櫸木與纖維刷毛" },
      { label: "用途", value: "廚房清潔" },
      { label: "保養", value: "使用後風乾" },
    ],
    careInstructions:
      "使用後請沖洗並置於通風處乾燥，避免長時間浸泡。",
  },
  {
    name: "布面休閒椅",
    slug: "fabric-lounge-chair",
    description: "木質椅架搭配柔軟布面座椅的低身休閒椅。",
    fullDescription:
      "支撐穩定的木質框架搭配柔軟布面座椅，適合閱讀角落、臥室與安靜休憩空間。",
    price: 5800,
    categorySlug: "furniture",
    material: "wood",
    color: "beige",
    image:
      "https://down-tw.img.susercontent.com/file/sg-11134201-824g0-mfb9rfavg2kt7c.webp",
    galleryImages: [
      "https://down-tw.img.susercontent.com/file/sg-11134201-824g0-mfb9rfavg2kt7c.webp",
      "https://down-tw.img.susercontent.com/file/sg-11134201-824ge-mfb9rgztdij108.webp",
      "https://down-tw.img.susercontent.com/file/sg-11134201-824iv-mfb9recrm2a4ed.webp",
    ],
    swatches: [
      { label: "布面米", hex: "#d8c7a7" },
      { label: "木質棕", hex: "#8a684a" },
    ],
    topics: ["bedroom"],
    sales: 59,
    stock: 7,
    isNew: false,
    isLimited: true,
    specifications: [
      { label: "尺寸", value: "寬 68 x 深 72 x 高 76 cm" },
      { label: "材質", value: "布面座椅與木質椅架" },
      { label: "重量", value: "約 11 kg" },
      { label: "組裝", value: "需簡易組裝" },
    ],
    careInstructions:
      "請定期吸除布面灰塵，若液體潑灑請立即以乾淨乾布按壓吸除。",
  },
];

const storeGroups = [
  {
    key: "flagship",
    label: "旗艦店",
    stores: [
      {
        title: "Loft 涉谷旗艦店",
        slug: "dali-flagship",
        image:
          "https://i.pinimg.com/1200x/6a/ad/f2/6aadf2dbd57db309abe4ae93cca0825f.jpg",
      },
      {
        title: "Loft 松高旗艦店",
        slug: "songgao-flagship",
        image:
          "https://i.pinimg.com/1200x/4a/d5/c6/4ad5c6a7be27628acdb886fd8c3e342b.jpg",
      },
    ],
  },
  {
    key: "large",
    label: "大型店",
    stores: [
      {
        title: "美麗華門市",
        slug: "miramar",
        image:
          "https://i.pinimg.com/1200x/2c/cc/28/2ccc28949cdf16b39f59b38a33c31f2c.jpg",
      },
      {
        title: "LaLaport 南港門市",
        slug: "lalaport-nangang",
        image:
          "https://i.pinimg.com/736x/d8/25/ba/d825baeea5d89ecbd10259f7a4dcbebd.jpg",
      },
      {
        title: "裕隆城門市",
        slug: "yulon-city",
        image:
          "https://i.pinimg.com/736x/2b/de/97/2bde976dcf23fd1749b656429febcaac.jpg",
      },
      {
        title: "MOP林口門市",
        slug: "mop-linkou",
        image:
          "https://i.pinimg.com/1200x/ff/ec/7f/ffec7fd12757cd86cd3d6da47ce7ecb2.jpg",
      },
      {
        title: "LaLaport 台中門市",
        slug: "lalaport-taichung",
        image:
          "https://i.pinimg.com/1200x/bc/59/d9/bc59d9248133dd2ebef350c1659819ca.jpg",
      },
      {
        title: "岡山門市",
        slug: "gangshan",
        image:
          "https://i.pinimg.com/1200x/93/0d/4c/930d4c6a5b20628a80200a42e55187c5.jpg",
      },
      {
        title: "台東門市",
        slug: "taitung",
        image:
          "https://i.pinimg.com/1200x/28/03/4a/28034a180285cb264c43ef762411d45b.jpg",
      },
      {
        title: "金典門市",
        slug: "jingdian",
        image:
          "https://i.pinimg.com/736x/9e/df/60/9edf6059a55a07312a3c0d3538207559.jpg",
      },
    ],
  },
];

async function main() {
  await prisma.productSpecification.deleteMany();
  await prisma.productTopic.deleteMany();
  await prisma.productSwatch.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.store.deleteMany();
  await prisma.storeGroup.deleteMany();
  await prisma.category.deleteMany();
  await prisma.homeNews.deleteMany();

  await prisma.homeNews.createMany({
    data: newsItems.map((item, index) => ({
      ...item,
      sortOrder: index,
    })),
  });

  const categoryMap = new Map<string, number>();

  for (const [index, category] of categories.entries()) {
    const createdCategory = await prisma.category.create({
      data: {
        ...category,
        sortOrder: index,
      },
    });

    categoryMap.set(createdCategory.slug, createdCategory.id);
  }

  const requiredProductCategories = [
    {
      title: "創作小物",
      description: "適合書寫、手作與整理靈感的簡單工具。",
      slug: "creative",
      tag: "CREATIVE",
      image:
        "https://kinchandiy.com/wp-content/uploads/2025/03/k20250325_1.jpg?v=1742940148",
    },
    {
      title: "家具",
      description: "適合收納、閱讀與日常生活的溫潤家具。",
      slug: "furniture",
      tag: "FURNITURE",
      image: "https://www.crapo.jp/desk/5134/1.jpg",
    },
    {
      title: "限定商品",
      description: "數量有限的季節選品與限定設計。",
      slug: "limited",
      tag: "LIMITED",
      image:
        "https://ondat.kr/web/product/big/202208/547a99249d1e4ec7434c67c96134b622.jpg",
    },
  ];

  for (const category of requiredProductCategories) {
    if (categoryMap.has(category.slug)) {
      continue;
    }

    const createdCategory = await prisma.category.create({
      data: {
        ...category,
        sortOrder: categoryMap.size,
      },
    });

    categoryMap.set(createdCategory.slug, createdCategory.id);
  }

  for (const [index, product] of catalogProducts.entries()) {
    const categoryId = categoryMap.get(product.categorySlug);

    if (!categoryId) {
      throw new Error(`Category not found for product: ${product.name}`);
    }

    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        price: product.price,
        description: product.description,
        fullDescription: product.fullDescription,
        material: product.material,
        color: product.color,
        sales: product.sales,
        stock: product.stock,
        isNew: product.isNew,
        isLimited: product.isLimited,
        careInstructions: product.careInstructions,
        mainImage: product.image,
        categoryId,
        isFeatured: index < 8,
        sortOrder: index,
        images: {
          create: product.galleryImages.map((image, imageIndex) => ({
            url: image,
            alt: product.name,
            sortOrder: imageIndex,
          })),
        },
        swatches: {
          create: product.swatches.map((swatch, swatchIndex) => ({
            ...swatch,
            sortOrder: swatchIndex,
          })),
        },
        topics: {
          create: product.topics.map((topic) => ({
            value: topic,
          })),
        },
        specifications: {
          create: product.specifications.map((specification, specIndex) => ({
            ...specification,
            sortOrder: specIndex,
          })),
        },
      },
    });
  }

  for (const [index, product] of featuredProducts.entries()) {
    const categoryId = categoryMap.get(product.categorySlug);

    if (!categoryId) {
      throw new Error(`Category not found for product: ${product.name}`);
    }

    await prisma.product.create({
      data: {
        name: product.name,
        slug: `legacy-${product.slug}`,
        price: product.price,
        mainImage: product.image,
        categoryId,
        isActive: false,
        sortOrder: index,
        images: {
          create: {
            url: product.image,
            alt: product.name,
            sortOrder: 0,
          },
        },
      },
    });
  }

  for (const [groupIndex, group] of storeGroups.entries()) {
    await prisma.storeGroup.create({
      data: {
        key: group.key,
        label: group.label,
        sortOrder: groupIndex,
        stores: {
          create: group.stores.map((store, storeIndex) => ({
            ...store,
            sortOrder: storeIndex,
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
