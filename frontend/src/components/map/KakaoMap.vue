<script setup lang="ts">
import { ref, defineProps, defineEmits, reactive, watch } from "vue";
import KakaoMap from "./kakaoMap";
const props = defineProps<{
  center?: { latitude: number; longitude: number };
  markerType?: "single-marker" | "multi-markers" | "custom-overlay";
  overlayOption?: OverlayOption;
  refresh?: boolean;
  relayout?: boolean;
}>();

interface OverlayOption {
  title?: string;
  imgUrl?: string;
  message?: string;
  address?: string;
  url?: string;
}

watch(
  () => props.relayout,
  (isRelayout) => {
    if (isRelayout) map.relayout();
  }
);

const emit = defineEmits(["here", "relayout"]);

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
  if (props.markerType) {
    map.setClickEvent(props.markerType, props.overlayOption);
  }
};

const here = function () {
  map.setCenter(33.452613, 126.570888);
};
emit("here", here);

window.kakao.maps.load(initMap);
initMap();
</script>

<template>
  <div id="map" ref="container" />
  <slot name="overlay" />
</template>
<style>
#map {
  height: 100%;
  width: 100%;
}
</style>
