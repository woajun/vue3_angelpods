<script setup lang="ts">
import { defineProps, watch, ref } from "vue";
/* global kakao */
interface Props {
  map: kakao.maps.Map | null;
  position: { latitude: number; longitude: number } | null;
}
const props = defineProps<Props>();
const marker = ref<kakao.maps.Marker | null>(null);
const contents = ref<HTMLElement | null>(null);
const infoWindow = ref<kakao.maps.InfoWindow | null>(null);

watch(
  () => props.map,
  (newMap) => {
    if (!newMap) return;
    marker.value = createMarker(newMap);
    if (!contents.value) return;
    infoWindow.value = createInfoWindow(newMap, contents.value);
  }
);

watch(
  () => props.position,
  (latlng) => {
    if (!props.map || !latlng || !marker.value) return;
    const position = new window.kakao.maps.LatLng(
      latlng.latitude,
      latlng.longitude
    );
    marker.value.setPosition(position);
    marker.value.setMap(props.map);

    if (infoWindow.value) infoWindow.value.open(props.map, marker.value);
  }
);

function createMarker(map: kakao.maps.Map) {
  return new window.kakao.maps.Marker({
    position: map.getCenter(),
  });
}

function createInfoWindow(map: kakao.maps.Map, content: HTMLElement) {
  if (!contents.value) return null;
  return new kakao.maps.InfoWindow({
    position: map.getCenter(),
    content: content,
  });
}
</script>
<template>
  <div ref="contents">
    <slot />
  </div>
</template>
