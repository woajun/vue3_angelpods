<script setup lang="ts">
import { onMounted, ref, defineProps, reactive } from "vue";

class KakaoMap {
  map: kakao.maps.Map | undefined;
  constructor() {
    this.map = undefined;
  }
  set container(container: HTMLDivElement) {
    this.map = new window.kakao.maps.Map(container, {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    });
  }
  set center(latlng: number[]) {
    this.map?.setCenter(new kakao.maps.LatLng(latlng[0], latlng[1]));
  }
}

const props = defineProps<{
  latitude: number;
  longitude: number;
  level: number;
}>();

const container = ref<HTMLDivElement | null>(null);
const map = reactive(new KakaoMap());

const initMap = function () {
  if (!container.value) return;
  map.container = container.value;
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
