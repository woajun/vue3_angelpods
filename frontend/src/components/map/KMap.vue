<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps } from "vue";
/* global kakao */
const container = ref();
const map = ref<kakao.maps.Map>();
interface Props {
  options?: kakao.maps.MapOptions;
}

const props = withDefaults(defineProps<Props>(), {});

function createMap() {
  map.value = new window.kakao.maps.Map(container.value, {
    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  });
}

const resizeObserver = new ResizeObserver(() => {
  map.value?.relayout();
});

onMounted(() => {
  kakao.maps.load(createMap);
  resizeObserver.observe(container.value);
});
</script>
<template>
  <div id="map" ref="container" />
  <slot />
</template>
<style>
#map {
  height: 100%;
  width: 100%;
}
</style>
