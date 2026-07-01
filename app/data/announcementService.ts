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

export type AnnouncementListResponse = {
  items: AnnouncementItem[];
  groups: AnnouncementMonthGroup[];
};

export type AnnouncementDetailResponse = {
  announcement: AnnouncementDetail | null;
};

type AnnouncementDetailContentSeed = {
  contentHtml: string;
};

const announcementItems: AnnouncementItem[] = [
  {
    id: 1,
    slug: "price-adjustment-glass-workshop",
    title: "美麗華門市春池玻璃工坊 價格調整公告",
    date: "2026.07.01",
  },
  {
    id: 2,
    slug: "a19-opening",
    title:
      "MINIMAL 環球A19門市6/26開幕 進駐桃園體育園區生活圈，打造結合通勤與休閒生活購物新據點",
    date: "2026.06.26",
  },
  {
    id: 3,
    slug: "logistics-delay",
    title: "新竹物流發生延遲公告",
    date: "2026.06.25",
  },
  {
    id: 4,
    slug: "warehouse-delivery-delay",
    title: "物流繁忙期倉庫配送時間影響公告",
    date: "2026.06.23",
  },
  {
    id: 5,
    slug: "essential-oil-series",
    title:
      "MINIMAL 推出「精油芬香洗沐系列」新品上市 從每日清潔開始 打造舒適的夏日生活",
    date: "2026.06.23",
  },
  {
    id: 6,
    slug: "daily-flower-market",
    title:
      "MINIMAL 推出「日常花束」贈禮提案 即日起-8/31，全台21間「良品市場」限時販售",
    date: "2026.05.18",
  },
  {
    id: 7,
    slug: "madras-check-series",
    title:
      "MINIMAL 「馬杜拉斯格紋」系列新品上市 390元起，推出服飾與配件，為夏日穿搭增添繽紛色彩",
    date: "2026.05.16",
  },
  {
    id: 8,
    slug: "dragon-boat-service-time",
    title: "2026 端午連假MINIMAL 官網購物門市及客服專線異動服務時間",
    date: "2026.04.16",
  },
  {
    id: 9,
    slug: "esg-farming",
    title:
      "MINIMAL 以永續ESG行動連結在地農業，「良品市場」友善農產推廣有成，獲農業部表揚肯定",
    date: "2026.04.06",
  },
  {
    id: 10,
    slug: "official-site-maintenance",
    title: "MINIMAL 官網盤點調整服務通知",
    date: "2026.03.05",
  },
  {
    id: 11,
    slug: "new-year-service-time",
    title: "2026跨年元旦期間 實體門市營業及客服專線異動服務時間",
    date: "2025.12.30",
  },
  {
    id: 12,
    slug: "popular-product-ranking",
    title: "MINIMAL 2025人氣商品排行榜公開",
    date: "2025.12.29",
  },
  {
    id: 13,
    slug: "new-era-opening",
    title: "MINIMAL 新時代台中門市12/23盛大開幕",
    date: "2025.11.23",
  },
  {
    id: 14,
    slug: "statement",
    title: "MINIMAL 聲明",
    date: "2025.10.22",
  },
  {
    id: 15,
    slug: "new-year-holiday-service",
    title: "2026元旦假期 官網購物門市及客服專線異動服務時間",
    date: "2025.10.19",
  },
  {
    id: 16,
    slug: "memorial-day-service",
    title: "2025行憲紀念日 官網購物門市及客服專線異動服務時間",
    date: "2025.09.19",
  },
  {
    id: 17,
    slug: "winter-dessert",
    title: "共享冬日甜點，逾50款可可與巧克力上市",
    date: "2025.09.18",
  },
  {
    id: 18,
    slug: "winter-clothing",
    title: "MINIMAL 冬日保暖穿搭提案，打造溫暖舒適穿著體驗",
    date: "2025.09.16",
  },
];

const announcementDetailContentMap: Record<number, AnnouncementDetailContentSeed> = {
  1: {
    contentHtml: `
      <p>親愛的 MINIMAL 會員及顧客您好：</p>
      <p>感謝您長期以來對 MINIMAL 的支持與愛護。為了持續提供顧客優質的工藝體驗與維護良好的商品品質，我們在此謹向各位說明一項重要的營運調整。</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/1200x/46/b2/3d/46b23d93174a824224b0ac0367813c9b.jpg" alt="春池玻璃工坊" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>因應近年原物料供應價格波動及人工製造成本提升，<u>自 2026 年 7 月 1 日起，美麗華門市「春池玻璃工坊」之部分手作體驗課程及現場販售之玻璃製品將進行價格調整</u>。調整後之最新價格，將全面<strong>依美麗華門市現場標示與官方報名系統為準</strong>。</p>
      <p>我們深知每位顧客對春池玻璃永續工藝的喜愛，本次調整實屬不易。MINIMAL 與春池玻璃工坊將承諾持續精進服務品質，為您帶來更溫暖、更有溫度的手作時光。</p>
      <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; margin: 15px 0; color: #555;">
        <strong>【溫馨提醒】</strong><br>
        若您於 2026 年 7 月 1 日前已完成體驗課程預約並付款，其權益將不受本次價格調整影響。
      </blockquote>
      <p>對於本次調整所造成的困擾與不便，我們深感抱歉，亦敬請見諒。若有任何疑問，歡迎隨時洽詢美麗華門市現場人員，或與我們的線上客服團隊聯繫。謝謝您的理解。</p>
    `,
  },
  2: {
    contentHtml: `
      <p>期待已久！MINIMAL 正式進駐桃園青埔，全新據點盛大登場！</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/1200x/b0/49/59/b04959d718ac8acf7421e67243200838.jpg" alt="MINIMAL 環球A19門市" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p><strong>MINIMAL 環球A19門市將於 2026 年 6 月 26 日 正式開幕。</strong></p>
      <p>全新門市特別選址於桃園體育園區生活圈，緊鄰機場捷運 A19 站。我們致力於將簡約美學融入在地日常，透過明亮流暢的動線設計，<u>完美結合「每日通勤」與「休閒生活」的雙重購物需求</u>，為桃園地區的顧客打造一個全新、全方位的質感購物據點。</p>
      <h3>✨ 開幕限定驚喜活動 ✨</h3>
      <ul>
        <li><strong>活動一：</strong> 開幕首三日（6/26 - 6/28），單筆消費滿 1,000 元即贈「MINIMAL 經典帆布袋」乙個（每日限量，送完為止）。</li>
        <li><strong>活動二：</strong> 新加入 A19 門市 LINE 官方帳號，即可領取 <u>50元商品折價券</u>。</li>
      </ul>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/1200x/75/20/da/7520dadd63ccc538ceb662003f5f3905.jpg" alt="門市內部環境" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>不論是下班通勤時的順道補給，還是週末假期的愜意漫遊，MINIMAL 環球A19門市都將準備最完整的質感選品，誠摯歡迎您的蒞臨與參觀選購！</p>
    `,
  },
  3: {
    contentHtml: `
      <p>親愛的顧客您好：</p>
      <p>在此向您發布緊急物流配送異動公告。因 6/25 (四) 受極端天候與劇烈豪大雨影響，致使台灣部分地區實施停班停課措施（包含：嘉義縣部分地區、高雄市旗山區與美濃區、以及屏東縣春日鄉與霧臺鄉）。</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/5c/a4/ac/5ca4aca8b0303c7fdd4923ecb5451fe3.jpg" alt="物流天候影響" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>配合新竹物流之防災與行車安全政策，<strong>上述受災停班停課區域之包裹將暫停當日配送，整體配送時程預計將順延 <u>1 至 2 個工作天</u></strong>。我們將持續追蹤最新路況，並在確保物流夥伴安全的前提下，以最快速度將包裹送達您的手中。</p>
      <p>對於天候不可抗力因素造成的收件延遲，以及對您生活規劃帶來的困擾，我們深表遺憾與歉意，並衷心感謝您的耐心體諒與等候。</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      <p><strong>📞 客服諮詢專線與窗口：</strong></p>
      <ul>
        <li>客服專線：<strong>0800-50-51-51</strong></li>
        <li>客服信箱：<u>minimal-service@mail.com</u></li>
        <li>服務時間：週一至週五 9:00-12:00 / 13:00-18:00（例假日除外）</li>
      </ul>
    `,
  },
  4: {
    contentHtml: `
      <p>親愛的顧客您好：</p>
      <p>感謝您於 MINIMAL 官方網站訂購商品。適逢年中購物盛典與物流繁忙期，全台大宗物流物流量瞬間暴增，導致各大合作物流體系均出現超載現象。</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/0a/eb/3e/0aeb3ea13895bf06694135173b017f18.jpg" alt="倉庫繁忙期出貨" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>受此大環境影響，<u>後端倉庫的撿貨、包裝以及物流單位的收件、配送時間，皆可能較平時正常時程延長 <strong>3 至 5 個工作天</strong></u>。若您查詢訂單狀態顯示為「出貨中」但尚未收到包裹，敬請您耐心等候。</p>
      <p>我們的倉儲物流團隊目前已全面加派人手、全力趕工，並每日與物流單位嚴密確認配送進度。<strong>若您的訂單有急迫收件需求，建議您可多加利用全台實體門市進行選購。</strong></p>
      <p>造成您的不便與困擾，全體團隊致上最深的歉意。再次感謝您的包容與對 MINIMAL 的愛護。</p>
    `,
  },
  5: {
    contentHtml: `
      <p>陽光燦爛的夏季已然悄悄來到。在悶熱的季節裡，沐浴不僅僅是每日的清潔，更是洗滌整日疲憊、讓身心安頓的重要儀式。</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/3d/76/67/3d7667f46a1b821d76185805da466fe4.jpg" alt="精油芬香洗沐系列新品" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>MINIMAL 於今夏隆重推出全新<strong>「精油芬香洗沐系列」</strong>。本系列全產品堅持無添加人工色素與化學香精，<u>全面採用天然植物萃取精油調配</u>，帶來溫和、清爽且不緊繃的洗淨肌膚體驗。我們希望讓您從最基礎的每日清潔開始，藉由柔和的大自然香氣，打造一個專屬 summer 的舒適生活提案。</p>
      <h3>🌿 首波主打三大香調 🌿</h3>
      <ol>
        <li><strong>大西洋雪松與甜橙：</strong> 溫潤的木質調揉合微甜柑橘，彷彿漫步於黃昏的森林中。</li>
        <li><strong>極致草本薰衣草：</strong> 沉穩的草本氣息，最適合睡前沐浴，全面放鬆緊繃的神經。</li>
        <li><strong>薄荷與尤加利：</strong> 帶來微涼的沁爽感，瞬間揮別夏日的黏膩與悶熱。</li>
      </ol>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/d4/fd/64/d4fd640d2cd5f29e02f95d3ad9f7691c.jpg" alt="洗沐系列質地與包裝" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>本系列包含洗髮精、沐浴乳及洗手乳，<strong>即日起將於指定門市與官網線上商店陸續上架販售</strong>。實際販售品項與庫存配置，請依各門市現場公告與官網庫存顯示為準。歡迎前往實體門市體驗試聞！</p>
    `,
  },
  6: {
    contentHtml: `
      <p>生活，需要一點儀式感；而自然採集的鮮花，正是傳遞心意最溫柔的媒介。</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/1200x/11/2f/d5/112fd59d93cbf6f9fe038904f9bc41e0.jpg" alt="日常花束贈禮提案" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>MINIMAL 於今年夏天特別企劃，推出全新<strong>「日常花束」贈禮提案</strong>。我們捨棄了過度華麗的繁複包裝，改以質樸的再生牛皮紙，包裹住當季最新鮮、最舒心的在地花材。不論是想犒賞辛苦工作的自己，還是想為珍視的朋友送上一份不期而遇的驚喜，日常花束都能完美妝點生活空間。</p>
      <p><u>即日起至 2026 年 8 月 31 日，本系列將於全台 21 間限定「良品市場」門市進行限時販售。</u></p>
      <blockquote style="border-left: 4px solid #4caf50; padding-left: 10px; margin: 15px 0; color: #444; background: #f9f9f9;">
        <strong>【購買注意事項】</strong><br>
        1. 由於鮮花具備季節性與時效性，每日販售之花束種類、色彩及數量，<strong>皆依各門市現場實際供應為準</strong>。<br>
        2. 限時販售期間如遇颱風等天候影響產地供貨，部分門市可能會暫停當日供應，敬請見諒。
      </blockquote>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/3d/b6/c7/3db6c76210cda3bd2cbc17fc9e81540f.jpg" alt="良品市場現場販售狀況" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>誠摯邀請您前往指定的良品市場門市，挑選一束屬於今天的季節色彩，與我們一起分享大自然的美好。 </p>
    `,
  },
  7: {
    contentHtml: `
      <p>為悶熱沉悶的夏日街頭，注入一抹來自傳統工藝的繽紛活力！</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/fc/4e/77/fc4e77bded069037776d9eb85498240d.jpg" alt="馬杜拉斯格紋系列穿搭" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>MINIMAL 全新<strong>「馬杜拉斯格紋 (Madras Check)」系列服飾與配件</strong>正式上市！源自印度的經典馬杜拉斯格紋，以多色交織、層次豐富的獨特格子圖雜聞名。本次設計特別挑選了<u>輕盈透氣、吸濕排汗的天然純棉與亞麻混紡材質</u>，打造極度適合台灣濕熱夏季的日常穿著體驗。</p>
      <p>本系列商品陣容豐富，<strong>親民售價自 390 元起</strong>，輕鬆即可入手：</p>
      <ul>
        <li><strong>服飾系列：</strong> 包含男女款輕薄短袖襯衫、休閒連身裙、寬鬆通風的格紋短褲。</li>
        <li><strong>配件系列：</strong> 包含亮眼吸睛的格紋托特包、遮陽漁夫帽以及隨身手帕。</li>
      </ul>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/9a/e8/ce/9ae8cec3de0b315a8aae56b2f47c77eb.jpg" alt="格紋配件細節" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>現在就用繽紛的色彩演繹專屬您的夏日風格！實際販售價格、款式尺寸與門市庫存，請以全台實體門市與線上官方商店之實際公告為準。歡迎前來門市試穿體驗！</p>
    `,
  },
  8: {
    contentHtml: `
      <p>親愛的顧客您好：</p>
      <p>適逢 2026 年端午節連續假期，為了讓全體員工能與家人共度佳節，同時維持基本的客戶服務，MINIMAL 官方網站購物系統、全台實體門市以及客戶服務專線之服務時間將進行局部調整。以下為連假期間的服務異動說明，敬請各位顧客留意：</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/1200x/5f/e1/e5/5fe1e5f536c6a6e63f5bcf95053ac0c3.jpg" alt="端午連假服務異動" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <h3>📢 營運與服務調整詳情：</h3>
      <ol>
        <li><strong>官方網站購物：</strong> 連假期間網站依舊開放正常下單。但受限於物流端端午假期休假，<u>所有於連假期間成立之訂單，其處理與配送時程將統一順延至假期結束後之工作日處理</u>。</li>
        <li><strong>實體門市營業時間：</strong> 全台各百貨商場內之門市，將配合該商場之節慶營業時間調整。部分獨立街邊店之營業時間可能有所不同，前往時建議先致電門市確認。</li>
        <li><strong>客服專線異動：</strong> 端午連假期間，客服電話專線將<strong>暫停即時服務</strong>。若您有急事，請先寄信至官方客服信箱，我們將於連假結束後的週一依序回覆。</li>
      </ol>
      <p>因應上述服務時間調整，若您有緊急購物或退換貨需求，<u>建議您提早於連假前安排規劃</u>。MINIMAL 全體團隊在此預祝您端午佳節平安順心！</p>
    `,
  },
  9: {
    contentHtml: `
      <p>MINIMAL 始終堅信，企業的發展與環境的永續共生共榮。近年來，我們持續投入 <strong>ESG 永續行動（Environmental, Social, and Governance）</strong>，致力於連結台灣在地農業與扶植在地友善耕作的農友。</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/48/13/cc/4813cc2cd020f616ec04d7376a894991.jpg" alt="農業部頒獎肯定" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>我們非常榮幸地宣布，MINIMAL 透過旗下全台實體門市的<strong>「良品市場」</strong>，長期推廣無毒耕作、友善土地產銷履歷農產品，其成果斐然，<u>於近日正式榮獲中華民國農業部頒發的表揚肯定</u>！這份殊榮不僅屬於 MINIMAL 團隊，更屬於每一位在土地上辛勤耕耘的農夫，以及認同綠色消費、用購買行動給予支持的您。</p>
      <p>未來，MINIMAL 將秉持初心，持續深化與在地生產者的合作鏈結。我們將引進更多優質、減少碳足跡、且對環境友善的農特產品。相關友善農作物與產地好物，將<strong>依季節時序與產地收成狀況，陸續於各門市「良品市場」專區上架推出</strong>。</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/1200x/3c/74/b9/3c74b91b15ea382522b082db3c9b433b.jpg" alt="良品市場專區" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>歡迎您與我們一起，將對土地的友善關懷，轉化為餐桌上最自然純粹的日常美味。</p>
    `,
  },
  10: {
    contentHtml: `
      <p>親愛的 MINIMAL 官網會員您好：</p>
      <p>為了提供更穩定、更流暢且安全的線上購物環境，MINIMAL 官方網站系統將於近期進行<strong>全站商品盤點調整與伺服器系統結構優化維護</strong>。在系統盤點調整期間，部分線上服務功能將受到暫時性影響，具體公告如下：</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/cb/a7/26/cba726f398ac15038a5d566af728e04f.jpg" alt="官網系統維護調整" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <h3>⚠️ 盤點維護期間影響範圍說明：</h3>
      <ul>
        <li><strong>訂單出貨與退換貨：</strong> 盤點期間正常開放下單，但<u>訂單的包裝出貨、以及已申請退換貨的審核進度將會暫時停止，並於盤點結束後 2 日內補齊進度</u>。</li>
        <li><strong>會員權益與點數：</strong> 線上會員紅利點數查詢、優惠券折抵功能於維護高峰期可能會出現短暫無法使用的現象。</li>
        <li><strong>客服訊息回覆：</strong> 由於盤點需要對接後台數據，此期間客服團隊在查詢訂單細節時可能需要較長等待時間，整體回覆時程將會有所延長。</li>
      </ul>
      <p>我們對於維護期間給您帶來的所有不便致上最誠摯的歉意。系統預計於盤點完成後立即恢復常態營運。感謝您的耐心配合與對 MINIMAL 的體諒。</p>
    `,
  },
  11: {
    contentHtml: `
      <p>親愛的顧客您好：</p>
      <p>即將迎來充滿期待的 2026 跨年元旦假期！為了讓您在連續假期期間能順暢安排購物行程，MINIMAL 特別整理了全台實體門市的營業時間變動，以及官方客戶服務專線的異動服務時間公告。</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/1200x/01/ba/e2/01bae2bd003cc4c66a1515022a8f350e.jpg" alt="跨年元旦門市營業時間" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <h3>📌 跨年元旦假期營運指南：</h3>
      <p><strong>1. 實體門市營業時間：</strong><br>
      全台多數位於百貨商場（如新光三越、遠東百貨、購物中心等）內之 MINIMAL 門市，<u>其跨年夜 (12/31) 與元旦當天 (1/1) 的營業時間將全面配合該商場之跨年慶典或延長營業公告</u>。部分商場可能提前打烊或延後打烊，請顧客出發前務必確認該商場之最新公告。</p>
      <p><strong>2. 客服專線暫停服務：</strong><br>
      自 2025 年 12 月 31 日下午 14:00 起至 2026 年 1 月 2 日上午 09:00 止，<strong>文字客服與電話客服專線將暫停即時線上服務</strong>。假期期間若您有任何緊急問題（如欲取消訂單、更換尺寸等），請利用官網的「聯絡我們」表單或官方信箱留下來信，客服團隊將於 1 月 2 日恢復常態工作後，<u>嚴格依照信件接收時間之先後順序儘速為您回覆與處理</u>。</p>
      <p>感謝您的理解，MINIMAL 全體同仁在此預祝您新年快樂，萬事如意！</p>
    `,
  },
  12: {
    contentHtml: `
      <p>光陰似箭，轉眼間又到了一年的尾聲。在即將揮別 2025 年之際，MINIMAL 特別統計並整理了過去這一整年裡，最受全台顧客青睞、引發熱烈討論並瘋狂回購的<strong>「MINIMAL 2025 人氣商品排行榜」</strong>正式隆重公開！</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/1200x/ea/e9/28/eae92804f825f80e00370b0823e7db6b.jpg" alt="人氣商品排行榜公開" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>本次排行榜我們嚴格篩選了「生活居家用品」、「百搭服飾配件」、「良品市場食品」以及「空間香氛系列」四大核心領域。<u>以下為大家揭曉今年度不容錯過的冠亞軍明星商品</u>：</p>
      <h3>🏆 年度四大爆款明星單品 🏆</h3>
      <ul>
        <li><strong>【居家美學類第一名】：</strong> 超柔導濕有機棉床包四件組 —— 蟬聯 30 週銷售冠軍，極致親膚讓睡眠品質大幅提升。</li>
        <li><strong>【簡約服飾類第一名】：</strong> 莫代爾棉無側縫舒適一體成型內著 —— 穿過就回不去的零摩擦無痕體驗。</li>
        <li><strong>【生活香氛類第一名】：</strong> 天然大豆植物精油香氛蠟燭 (靜謐雪松) —— 現代人居家舒壓、打造空間儀式感的必備首選。</li>
        <li><strong>【良品市場類第一名】：</strong> 低溫慢烘綜合堅果家庭號 —— 堅持無調味原型食物，健康減脂期最棒的嘴饞良伴。</li>
      </ul>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/1200x/d2/49/df/d249dfcd76c5b526cf0358aca6f107e5.jpg" alt="得獎熱賣商品特寫" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>非常感謝所有顧客在 2025 年給予 MINIMAL 的每一份陪伴與真摯回饋。新的一年，我們將承諾持續開發更貼近生活本質、簡約且實用的日常物件。如果您還沒體驗過上述人氣好物，歡迎把握年終機會前往門市或官網參觀選購！</p>
    `,
  },
  13: {
    contentHtml: `
      <p>台中地區的顧客們，我們來了！MINIMAL 簡約生活美學地圖再度擴張！</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/1200x/0b/6d/a6/0b6da685feee98556cdadc4e43da2136.jpg" alt="新時代台中門市盛大開幕" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>經過數個月的精心籌備，<strong>MINIMAL 大魯閣新時代台中門市將於 12 月 23 日迎來盛大開幕！</strong></p>
      <p>新開幕的新時代台中門市，坐落於台中火車站旁的核心繁華商圈。全新空間以原木色调與清水混凝土交織，構築出開闊、寧靜且充滿呼吸感的購物環境。門市內將<u>完整引進全系列的質感日常用品、男女服飾、居家選品，並首度規劃了中台灣陣容最齊全的「良品市場」食品與在地農產專區</u>，期盼為台中地區的消費者帶來更全面、更具質感的全方位購物體驗。</p>
      <h3>🎁 台中新時代門市獨家歡慶活動：</h3>
      <ul>
        <li><strong>獨家活動一：</strong> 開幕當天至 12/25，凡現場消費滿 1,500 元，即可參加「幸運轉盤抽抽樂」乙次，有機會獲得最高面額 500 元之商品券。</li>
        <li><strong>獨家活動二：</strong> 台中門市限定販售！開幕當日推出「限量百搭服飾福袋」，超值內容不容錯過。</li>
      </ul>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/40/6e/1d/406e1d8dc4607dc60e5ead02eace46c2.jpg" alt="新時代門市空間陳列" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>不論是為自己的居住空間添購新器皿，還是挑選一份溫暖的冬日衣物，MINIMAL 新時代台中門市全體夥伴都已準備就緒，期待您的光臨，與我們一起開啟質樸生活的新篇章！</p>
    `,
  },
  14: {
    contentHtml: `
      <p><strong>【MINIMAL 官方鄭重聲明書】</strong></p>
      <p>針對近期各大社群媒體與網路論壇上，部分外界關注之商品標籤資訊不對稱及相關售後流程等事宜，MINIMAL 品牌總部對此高度重視。為了維護廣大消費者的正當權益，並秉持品牌一貫公開、透明且負責的態度，我們特此發表本聲明公告：</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/dc/9c/23/dc9c2316bcb0661ea3968d267ebb8189.jpg" alt="MINIMAL 品牌聲明" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>我們深知，顧客對 MINIMAL 的信任是品牌立足的核心。<u>針對本次事件所涉及的作業疏失，內部團隊已於第一時間全面啟動溯源稽查檢視流程</u>。我們正積極優化商品上架之標示規範、強化供應鏈端管理，並重新梳理客戶服務的對接管道，以確保未來商品資訊的絕對透明化與精準度，全面守護服務品質。</p>
      <p>我們誠摯且虛心地重視每一位消費者的寶貴意見與批評回饋。若有任何關於已購買商品之疑慮，<strong>歡迎隨時透過官方指定之客服渠道與我們聯繫</strong>，售後服務團隊將竭誠為您處理。</p>
      <blockquote style="border-left: 4px solid #f44336; padding-left: 10px; margin: 15px 0; color: #333; background: #fff5f5;">
        本品牌所有正確且合法的營運政策與產品更新資訊，<u>皆統一僅在 MINIMAL 官方網站 (this site) 進行發布與公告</u>。敬請廣大顧客切勿輕信未經證實之第三方網路傳言，以保障自身權益。
      </blockquote>
      <p>再次感謝社會各界的監督與鞭策，MINIMAL 將持續努力，不負大眾所託。</p>
    `,
  },
  15: {
    contentHtml: `
      <p>親愛的顧客您好：</p>
      <p>時光流轉，轉眼即將邁入新的一年。因應 2026 年元旦假期連假，MINIMAL 官方網路商店、實體門市及客戶服務部門之服務時間將有所變更。為確保您的購物體驗不受影響，請詳閱以下調整公告：</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/b5/39/f7/b539f792bdc4ba32611b948efab7a788.jpg" alt="2026元旦假期服務異動" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <h3>💡 假期購物與服務重點摘要：</h3>
      <ul>
        <li><strong>網路訂單出貨時程：</strong> 元旦假期期間（1/1 - 1/3）網站照常開放下單。然而受限於配合物流商之假期班表，<u>期間之訂單出貨作業、以及退換貨包裹的到府取件服務，均將順延至假期結束後之常態工作日依序進行</u>。</li>
        <li><strong>客戶服務管道：</strong> 客服電話專線與線上即時文字對話，於元旦連假期間將<strong>全面暫停服務</strong>。若有任何急需協助之業務，敬請善用官網之聯絡信箱，我們將於收假後第一時間主動回覆。</li>
      </ul>
      <p>基於上述調整，<u>我們強烈建議有跨年送禮需求、或特定出國旅遊需拿到商品的顧客，儘早提前安排您的購物與取貨時間</u>，以免因假期物流高峰而耽誤您的寶貴行程。感謝您的理解與支持。</p>
    `,
  },
  16: {
    contentHtml: `
      <p>親愛的顧客您好：</p>
      <p>謹此通知，因應 2025 年行憲紀念日假期，MINIMAL 全台實體門市之營運時間、官方網站購物系統出貨流程以及客服專線之服務時間，將會進行策略性的適度調整。造成不便之處，敬請見諒。</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/1200x/85/a0/15/85a0157bff5d7ebe6c6f945c9301be32.jpg" alt="行憲紀念日服務調整" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <h3>🚚 物流與訂單處理影響公告：</h3>
      <p>於行憲紀念日假期當天，官網線上購物平台之系統維持正常24小時運作。然而，<u>由於合作之大宗物流業者假期期間人力調配縮減，部分訂單的包裝處理與終端路網配送，其整體時程可能會受到 1 至 2 日之假期效應延宕</u>。</p>
      <p><strong>【包裹進度查詢提示】：</strong> 實際包裹之配送進度與預估送達時間，<strong>請一律以出貨通知簡訊中所隨附的「物流單號追蹤連結」之最新狀態為準</strong>。若對訂單有任何疑慮，歡迎隨時來信。我們將會在假期結束後陸續補齊客服進度。感謝您的耐心配合與包容。</p>
    `,
  },
  17: {
    contentHtml: `
      <p>當寒冷的冬風吹起，最幸福的事，莫過於和摯愛的人一起分享濃郁香甜的冬日甜點，讓溫暖從舌尖蔓延開來。</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/10/d3/a7/10d3a7b16c34d3ba8b3b3c89bb7b4e1a.jpg" alt="冬日可可與巧克力甜點上市" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>迎接溫馨的冬季，MINIMAL 於今年秋冬正式推出<strong>全新冬日甜點企劃，超過 50 款精選頂級可可與巧克力新品盛大上市！</strong></p>
      <p>本次冬日限定系列由我們的研發團隊精心挑選優質可可豆，<u>主打減糖、濃郁且多層次的口感設計</u>。從適合寒冷深夜獨自享用的熱可可飲品，到聚會派對上不可或缺的精緻手工巧克力點心，品項一應俱全：</p>
      <h3>🍫 冬季限定經典推薦：</h3>
      <ul>
        <li><strong>72% 醇黑低糖可可沖泡粉：</strong> 苦甜完美平衡，絲滑濃郁，冬日早晨的溫暖首選。</li>
        <li><strong>焦糖海鹽巧克力夾心酥：</strong> 鹹甜交織的獨特風味，搭配熱茶一同享用風味更佳。</li>
        <li><strong>榛果燕麥奶巧克力豆：</strong> 全植物性基底配方，蔬食者也能安心大口享用的健康甜品。</li>
      </ul>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/c1/cb/4b/c1cb4b340926bc4c6d1f46fac43301b3.jpg" alt="各式巧克力新品陳列" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>本系列所有新品<strong>即日起將於 MINIMAL 指定實體門市與線上官方商店陸續同步販售</strong>。由於部分手工巧克力屬於季節限定製作，每間門市的實際到貨品項與每日現場庫存皆不盡相同，建議您提早前往選購，一起與珍視的人共享這份專屬冬日的甜蜜恩賜！</p>
    `,
  },
  18: {
    contentHtml: `
      <p>凜冬將至，隨著氣溫逐漸轉涼，如何在保持簡約優雅的穿搭美學時，同時兼顧完美的禦寒保暖機能，是冬日生活的必修課。</p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/26/94/45/269445a0c52661861522f9e3dfb708e7.jpg" alt="冬日保暖穿搭提案" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>MINIMAL 傾心獻上全新的<strong>「冬日保暖穿搭提案」</strong>。本季設計團隊徹底貫徹了「輕盈、溫暖、無負擔」的洋蔥式穿搭核心思維，<u>全面精選柔軟透氣的羊毛混紡、高機能蓄熱保暖纖維、以及經防風潑水處理的科技面料</u>。我們致力於擺脫冬季厚重臃腫的傳統束縛，為您打造極具溫暖且舒適的日常穿著全新體驗。</p>
      <h3>🧥 本季穿搭提案三大核心系列：</h3>
      <ol>
        <li><strong>輕量極暖羽絨與防風外套：</strong> 兼具修飾身型的極簡剪裁，出門通勤對抗寒風一件搞定。</li>
        <li><strong>100% 美利奴羊毛針織系列：</strong> 極致細緻的羊毛纖維，單穿即能感受無與倫比的溫柔親膚感。</li>
        <li><strong>科技蓄熱吸濕發熱內著：</strong> 貼身輕薄卻具備絕佳升溫機能，打好冬日保暖的最完美基底。</li>
      </ol>
      <div style="text-align: center; margin: 15px 0;">
        <img src="https://i.pinimg.com/736x/12/e3/7e/12e37ec9b597d06a817f135591faa0b4.jpg" alt="衣物布料細節特寫" style="max-width: 100%; height: auto; border-radius: 4px;" />
      </div>
      <p>本年度冬日保暖穿搭系列已全面到店，<strong>實際販售之品項款式、顏色尺寸以及現場即時庫存，請一律依全台各實體門市及線上官網商店之實際公告與顯示為準</strong>。誠摯邀請您蒞臨門市親身試穿，尋找最適合您生活場景的冬日命定款！</p>
    `,
  },
};

function getAnnouncementYearMonth(date: string) {
  const [year = "", month = ""] = date.split(".");

  return {
    year,
    month,
    key: `${year}-${month}`,
  };
}

function groupAnnouncementItems(items: AnnouncementItem[]) {
  const groupMap = new Map<string, AnnouncementMonthGroup>();

  items.forEach((item) => {
    const dateGroup = getAnnouncementYearMonth(item.date);
    const existedGroup = groupMap.get(dateGroup.key);

    if (existedGroup) {
      existedGroup.items.push(item);
      return;
    }

    groupMap.set(dateGroup.key, {
      key: dateGroup.key,
      year: dateGroup.year,
      month: dateGroup.month,
      items: [item],
    });
  });

  return Array.from(groupMap.values())
    .map((group) => {
      return {
        ...group,
        items: [...group.items].sort((current, next) => {
          return next.date.localeCompare(current.date);
        }),
      };
    })
    .sort((current, next) => {
      return next.key.localeCompare(current.key);
    });
}

function findAnnouncementById(id: number) {
  return (
    announcementItems.find((item) => {
      return item.id === id;
    }) ?? null
  );
}

export const announcementService = {
  async getAnnouncementList(): Promise<AnnouncementListResponse> {
    const sortedItems = [...announcementItems].sort((current, next) => {
      return next.date.localeCompare(current.date);
    });

    return {
      items: sortedItems,
      groups: groupAnnouncementItems(sortedItems),
    };
  },

  async getAnnouncementDetail(id: number | string): Promise<AnnouncementDetailResponse> {
    const announcementId = Number(id);

    if (Number.isNaN(announcementId)) {
      return {
        announcement: null,
      };
    }

    const announcement = findAnnouncementById(announcementId);

    if (!announcement) {
      return {
        announcement: null,
      };
    }

    const detailContent = announcementDetailContentMap[announcement.id];

    return {
      announcement: {
        ...announcement,
        contentHtml: detailContent?.contentHtml ?? "",
      },
    };
  },
};