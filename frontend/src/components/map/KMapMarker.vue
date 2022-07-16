<script setup lang="ts">
import { defineProps, watch, ref } from "vue";
/* global kakao */
interface Props {
  map: kakao.maps.Map | null;
  position: kakao.maps.LatLng | null;
}
const props = defineProps<Props>();

watch(
  () => props.map,
  (map) => {
    if (map) initMarker(map);
  }
);

let marker: kakao.maps.Marker;

function initMarker(map: kakao.maps.Map) {
  marker = new window.kakao.maps.Marker({
    position: map.getCenter(),
  });
  marker.setMap(map);

  kakao.maps.event.addListener(map, "click", clickEvent);

  if (!infoWindow.value) return;
  const infowindows = new window.kakao.maps.InfoWindow({
    content: infoWindow.value,
    removable: true,
    position: map.getCenter(),
  });

  kakao.maps.event.addListener(marker, "click", () => {
    infowindows.open(map, marker);
  });
}

function clickEvent(click: kakao.maps.event.MouseEvent) {
  marker.setPosition(click.latLng);
}

const infoWindow = ref<HTMLDivElement>();
</script>
<template>
  <div ref="infoWindow">
    <slot />
  </div>
</template>
