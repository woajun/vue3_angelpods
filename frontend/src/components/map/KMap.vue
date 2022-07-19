<script setup lang="ts">
import {
  onMounted,
  ref,
  withDefaults,
  defineProps,
  defineEmits,
  watch,
  StyleValue,
  provide,
} from "vue";
/* global kakao */
const container = ref<HTMLElement>();
const map = ref<kakao.maps.Map | null>(null);
provide("kMap", map);

interface Props {
  center: { latitude: number; longitude: number };
  style?: StyleValue;
  lock?: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(["click"]);

watch(
  () => props.center,
  ({ latitude, longitude }) => {
    map.value?.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
  }
);

function createMap() {
  if (!container.value) return;
  const aMap = new window.kakao.maps.Map(container.value, {
    center: new window.kakao.maps.LatLng(
      props.center.latitude,
      props.center.longitude
    ),
    level: 3,
  });
  kakao.maps.event.addListener(
    aMap,
    "click",
    (e: kakao.maps.event.MouseEvent) => emit("click", e)
  );
  if (props.lock) {
    aMap.setDraggable(false);
    aMap.setZoomable(false);
    aMap.setKeyboardShortcuts(false);
    aMap.setLevel(1);
  }
  map.value = aMap;
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
  <div id="map" ref="container" :style="props.style" />
  <slot :map="map"></slot>
</template>
<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
