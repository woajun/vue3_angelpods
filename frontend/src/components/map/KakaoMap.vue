<script setup lang="ts">
import { onMounted, ref, defineProps } from "vue";

const props = defineProps<{
  latitude: number;
  longitude: number;
  level?: number;
}>();

const container = ref<HTMLDivElement | null>(null);
const map = ref<kakao.maps.Map>();

const initMap = function () {
  if (!container.value) return;
  const options = {
    center: new window.kakao.maps.LatLng(props.latitude, props.longitude),
    level: props.level,
  };
  map.value = new window.kakao.maps.Map(container.value, options);
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
