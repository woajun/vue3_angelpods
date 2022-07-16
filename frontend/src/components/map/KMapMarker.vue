<script setup lang="ts">
import { defineProps, watch, ref } from "vue";
/* global kakao */
interface Props {
  map: kakao.maps.Map | null;
  position: kakao.maps.LatLng | null;
}
const props = defineProps<Props>();
const marker = ref<kakao.maps.Marker | null>(null);

watch(
  () => props.map,
  (newMap) => {
    if (!newMap) return;
    marker.value = new window.kakao.maps.Marker({
      position: newMap.getCenter(),
    });
  }
);

watch(
  () => props.position,
  (latlng) => {
    if (!props.map || !latlng) return;
    rePosition(latlng);
    marker.value?.setMap(props.map);
  }
);

function rePosition(latlng: kakao.maps.LatLng) {
  marker.value?.setPosition(latlng);
}
</script>
<template>
  <div ref="infoWindow">
    <slot />
  </div>
</template>
