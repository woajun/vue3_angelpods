<script setup lang="ts">
import { onMounted, ref, defineProps, reactive, watch } from "vue";
import KakaoMap from "./kakaoMap";
const props = defineProps<{
  center?: { latitude: number; longitude: number };
  markerType: string;
  content?: string;
}>();

const container = ref<HTMLDivElement | null>(null);
const map = reactive(new KakaoMap());

watch(
  () => props.center,
  (latlng) => {
    if (!latlng) return;
    map.setCenter(latlng.latitude, latlng.longitude);
  }
);

const initMap = function () {
  if (!container.value) return;
  map.container = container.value;
  map.setClickEvent("overlay", props.content);
};

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    /* global kakao */
    const script = document.createElement("script");
    script.onload = () => window.kakao.maps.load(initMap);
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6980627efdafc9b33ee3f2e602c8f9da&libraries=services";
    document.head.appendChild(script);
  }
});
</script>

<template>
  <div id="map" ref="container" />
</template>
<style>
#map {
  height: 500px;
  width: 100%;
}
</style>
