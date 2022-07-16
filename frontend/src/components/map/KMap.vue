<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps, defineEmits } from "vue";
/* global kakao */
const container = ref<HTMLElement>();
const map = ref<kakao.maps.Map | null>(null);

interface Props {
  options?: kakao.maps.MapOptions;
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(["click"]);

function createMap() {
  if (!container.value) return;
  map.value = new window.kakao.maps.Map(container.value, {
    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  });
  kakao.maps.event.addListener(
    map.value,
    "click",
    (e: kakao.maps.event.MouseEvent) => emit("click", e)
  );
}

const resizeObserver = new ResizeObserver(() => {
  map.value?.relayout();
});

onMounted(() => {
  if (!container.value) return;
  kakao.maps.load(createMap);
  resizeObserver.observe(container.value);
});
</script>
<template>
  <div id="map" ref="container" />
  <slot :map="map"></slot>
</template>
<style>
#map {
  height: 100%;
  width: 100%;
}
</style>
