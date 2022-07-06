<script setup lang="ts">
import { ref } from "vue";
import KakaoMap from "./KakaoMap.vue";

const center = ref();
const changeSize = ref<(size: number) => void>();
const displayMarker = ref<(markerPositions: any[]) => void>();
const displayInfoWindow = ref<(info: any) => void>();

const marker1 = [
  { latitude: 33.452278, longitude: 126.567803 },
  { latitude: 33.452671, longitude: 126.574792 },
  { latitude: 33.451744, longitude: 126.572441 },
];

const marker2 = [
  { latitude: 37.499590490909185, longitude: 127.0263723554437 },
  { latitude: 37.499427948430814, longitude: 127.02794423197847 },
  { latitude: 37.498553760499505, longitude: 127.02882598822454 },
  { latitude: 37.497625593121384, longitude: 127.02935713582038 },
  { latitude: 37.49629291770947, longitude: 127.02587362608637 },
  { latitude: 37.49754540521486, longitude: 127.02546694890695 },
  { latitude: 37.49646391248451, longitude: 127.02675574250912 },
];

const info = {
  content: '<div style="padding:5px;">Hello World!</div>',
  latitude: 33.450701,
  longitude: 126.570667,
};

const content =
  '<div class="wrap">' +
  '    <div class="info">' +
  '        <div class="title">' +
  "            카카오 스페이스닷원" +
  '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
  "        </div>" +
  '        <div class="body">' +
  '            <div class="img">' +
  '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
  "           </div>" +
  '            <div class="desc">' +
  '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
  '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
  '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
  "            </div>" +
  "        </div>" +
  "    </div>" +
  "</div>";

function changeCenter(lat: number, lng: number) {
  center.value = { latitude: lat, longitude: lng };
}
</script>
<template>
  <div>
    <KakaoMap
      :center="center"
      marker-type="custom-overlay"
      :content="content"
    />
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
