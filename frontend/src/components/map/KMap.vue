<script setup lang="ts">
import {
  onMounted,
  ref,
  withDefaults,
  defineProps,
  defineEmits,
  watch,
} from "vue";
/* global kakao */
const container = ref<HTMLElement>();
const map = ref<kakao.maps.Map | null>(null);

interface Props {
  center: { latitude: number; longitude: number };
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
  map.value = new window.kakao.maps.Map(container.value, {
    center: new window.kakao.maps.LatLng(
      props.center.latitude,
      props.center.longitude
    ),
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
