<script setup lang="ts">
import { ref } from "vue";
import KakaoMap from "../../components/map/KakaoMap.vue";
import KakaoContent from "./KakaoContent.vue";

const center = ref({ latitude: 33.452278, longitude: 126.567803 });
// const content = ref<string>();
// const contentRef = ref<InstanceType<typeof KakaoContent> | null>(null);

function changeCenter(lat: number, lng: number) {
  center.value = { latitude: lat, longitude: lng };
}

// function logContent() {
//   console.log(contentRef.value);
//   console.log(contentRef.value?.$el);
//   console.log(contentRef.value?.$el.outerHTML);
//   contentRef.value?.open();
//   content.value = contentRef.value?.$el.outerHTML as string;
// }
</script>
<template>
  <div>
    <KakaoMap :center="center" marker-type="custom-overlay" :content="'안녕'" />
    <button @click="logContent">1번</button>
    <button @click="changeCenter(33.452278, 126.567803)">1번</button>
    <button @click="changeCenter(37.498553760499505, 127.02882598822454)">
      2번
    </button>
  </div>
</template>
<style>
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  overflow: hidden;
}
.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.info .link {
  color: #5085bb;
}
</style>
