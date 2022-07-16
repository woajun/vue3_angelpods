<script setup lang="ts">
import { defineProps, defineEmits, watch } from "vue";
/* global kakao */
interface Props {
  modelValue?: object;
  map?: kakao.maps.Map;
}
const props = defineProps<Props>();
defineEmits(["update:modelValue"]);

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
}

function clickEvent(e: kakao.maps.event.MouseEvent) {
  const latlng = e.latLng;
  marker.setPosition(latlng);
}
</script>
<template>
  <div></div>
</template>
