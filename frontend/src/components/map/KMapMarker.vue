<script setup lang="ts">
import { defineProps, watch, ref, inject, Ref } from "vue";
/* global kakao */
interface Props {
  position: { latitude: number; longitude: number } | null;
}
const props = defineProps<Props>();
const marker = ref<kakao.maps.Marker | null>(null);
const contents = ref<HTMLElement | null>(null);
const infoWindow = ref<kakao.maps.InfoWindow | null>(null);
const map = inject<Ref<kakao.maps.Map | null>>("kMap", ref(null));

watch(
  () => map.value,
  (map) => {
    if (!map) return;
    marker.value = createMarker(map);
    marker.value.setMap(map);
    if (!contents.value || contents.value.innerHTML.length === 0) return;
    infoWindow.value = createInfoWindow(map, contents.value);
  }
);

watch(
  () => props.position,
  (latlng) => {
    if (!latlng || !marker.value) return;
    const position = new window.kakao.maps.LatLng(
      latlng.latitude,
      latlng.longitude
    );
    marker.value.setPosition(position);
    if (infoWindow.value && map?.value)
      infoWindow.value.open(map.value, marker.value);
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
