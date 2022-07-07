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
  map.setClickEvent(props.markerType, props.content);
};

window.kakao.maps.load(initMap);
initMap();
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
