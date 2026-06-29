<script setup lang="ts">
import HeroSection from "~/components/home/HeroSection.vue";
import LatestNewsSection from "~/components/home/LatestNewsSection.vue";
import CategorySection from "~/components/home/CategorySection.vue";
import FeaturedProductsSection from "~/components/home/FeaturedProductsSection.vue";
import StoreInfoSection from "~/components/home/StoreInfoSection.vue";

const newsItems = [
  {
    id: 1,
    to: "/news/official-limited",
    html: "<strong>官網限定</strong> 6/1(一)-6/30(二)　筆筆最高5% 單筆滿千回饋<b>100元券</b>(限量)",
  },
  {
    id: 2,
    to: "/news/summer-sale",
    html: "<strong>期間限定</strong> 夏日生活選品優惠中　指定商品第二件<b>88折</b>",
  },
  {
    id: 3,
    to: "/news/new-arrival",
    html: "<strong>新品上市</strong> 日系選物新品到貨　收納、餐具與外出用品同步登場",
  },
];

const categories = [
  {
    title: "生活用品",
    description: "簡潔實用的日常選品，讓居家空間回到乾淨舒服的狀態。",
    to: "/products?category=living",
    tag: "LIVING",
    image:
      "https://i.pinimg.com/1200x/ab/ec/94/abec946a0c178c3ae59969a860874e77.jpg",
  },
  {
    title: "服飾",
    description: "自然舒適的基本穿搭，適合每天長時間穿著。",
    to: "/products?category=clothes",
    tag: "CLOTHES",
    image:
      "https://i.pinimg.com/1200x/40/24/60/402460b6586e9f3dcd54da447b223b0b.jpg",
  },
  {
    title: "食品",
    description: "安心樸實的日常滋味，簡單但剛剛好。",
    to: "/products?category=food",
    tag: "FOOD",
    image:
      "https://i.pinimg.com/1200x/b9/e7/77/b9e777051d897cebe686bdd39767a45c.jpg",
  },
  {
    title: "外出用品",
    description: "通勤、旅行與日常外出的輕便小物。",
    to: "/products?topic=outdoor",
    tag: "OUTDOOR",
    image:
      "https://i.pinimg.com/1200x/b9/f3/f5/b9f3f55801a4fdfa4110548fa4b9dc0c.jpg",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "封蠟印章 梅結び",
    price: 790,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIO1xeB3hh8eYWfQSgBkQ-Sfx0Kvkiy89JqbIEh1wDmw&s=10",
  },
  {
    id: 2,
    name: "SETOCRAFT 蜂蜜罐造型馬克杯/附匙",
    price: 490,
    image: "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/66727add38f25a001905e349/800x.webp?source_format=jpg",
  },
  {
    id: 3,
    name: "日系選物・貓咪筷架",
    price: 390,
    image: "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/6730c6d04d2874000ab5d723/800x.webp?source_format=jpg",
  },
  {
    id: 4,
    name: "日系選物・大容量帆布包",
    price: 790,
    image: "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/681c76141ea07f000bd9d909/800x.webp?source_format=png",
  },
  {
    id: 5,
    name: "Minorutouki 美濃燒 格紋餐碗(日本製)",
    price: 490,
    image: "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/67c918030cfbbb000fbf989c/800x.webp?source_format=jpg",
  },
  {
    id: 6,
    name: "TOMO 貓貓烘衣球",
    price: 390,
    image: "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/6751b9e6c9e27e0011f74244/800x.webp?source_format=jpg",
  },
  {
    id: 7,
    name: "PALMART 貓咪三兄弟盤子",
    price: 790,
    image: "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/67db8c643bdc1c000c866dad/800x.webp?source_format=jpg",
  },
  {
    id: 8,
    name: "鴨鴨桌邊掛勾",
    price: 490,
    image: "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/69f01a161b51f8000ec65f26/800x.webp?source_format=jpg",
  },
  {
    id: 9,
    name: "日系選物・慵懶貓手機架",
    price: 390,
    image: "https://shoplineimg.com/55d3ecabe37ec6fbbf00003f/68b15f5ec223e40018a39c8d/800x.webp?source_format=jpg",
  },
];

const storeGroups = [
  {
    key: "flagship",
    label: "旗艦店",
    stores: [
      {
        id: 1,
        title: "Loft 涉谷旗艦店",
        to: "/stores/dali-flagship",
        image:
          "https://i.pinimg.com/1200x/6a/ad/f2/6aadf2dbd57db309abe4ae93cca0825f.jpg",
      },
      {
        id: 2,
        title: "Loft 松高旗艦店",
        to: "/stores/songgao-flagship",
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
        id: 3,
        title: "美麗華門市",
        to: "/stores/miramar",
        image:
          "https://i.pinimg.com/1200x/2c/cc/28/2ccc28949cdf16b39f59b38a33c31f2c.jpg",
      },
      {
        id: 4,
        title: "LaLaport 南港門市",
        to: "/stores/lalaport-nangang",
        image:
          "https://i.pinimg.com/736x/d8/25/ba/d825baeea5d89ecbd10259f7a4dcbebd.jpg",
      },
      {
        id: 5,
        title: "裕隆城門市",
        to: "/stores/yulon-city",
        image:
          "https://i.pinimg.com/736x/2b/de/97/2bde976dcf23fd1749b656429febcaac.jpg",
      },
      {
        id: 6,
        title: "MOP林口門市",
        to: "/stores/mop-linkou",
        image:
          "https://i.pinimg.com/1200x/ff/ec/7f/ffec7fd12757cd86cd3d6da47ce7ecb2.jpg",
      },
      {
        id: 7,
        title: "LaLaport 台中門市",
        to: "/stores/lalaport-taichung",
        image:
          "https://i.pinimg.com/1200x/bc/59/d9/bc59d9248133dd2ebef350c1659819ca.jpg",
      },
      {
        id: 8,
        title: "岡山門市",
        to: "/stores/gangshan",
        image:
          "https://i.pinimg.com/1200x/93/0d/4c/930d4c6a5b20628a80200a42e55187c5.jpg",
      },
      {
        id: 9,
        title: "台東門市",
        to: "/stores/taitung",
        image:
          "https://i.pinimg.com/1200x/28/03/4a/28034a180285cb264c43ef762411d45b.jpg",
      },
      {
        id: 10,
        title: "金典門市",
        to: "/stores/jingdian",
        image:
          "https://i.pinimg.com/736x/9e/df/60/9edf6059a55a07312a3c0d3538207559.jpg",
      },
    ],
  },
];
</script>

<template>
  <div>
    <HeroSection />

    <LatestNewsSection :news-items="newsItems" />

    <CategorySection :categories="categories" />

    <FeaturedProductsSection :products="featuredProducts" />

    <StoreInfoSection :store-groups="storeGroups" />
  </div>
</template>