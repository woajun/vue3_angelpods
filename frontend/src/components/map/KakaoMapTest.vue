<script setup lang="ts">
import { ref } from "vue";
import KakaoMap from "./KakaoMap.vue";

const center = ref();
const changeSize = ref<(size: number) => void>();
const displayMarker = ref<(markerPositions: any[]) => void>();
const displayInfoWindow = ref<(info: any) => void>();

const marker1 = [
  { latitude: 33.452278, longitude: 126.567803 },
  { latitude: 33.452671, longitude: 126.574792 },
  { latitude: 33.451744, longitude: 126.572441 },
];

const marker2 = [
  { latitude: 37.499590490909185, longitude: 127.0263723554437 },
  { latitude: 37.499427948430814, longitude: 127.02794423197847 },
  { latitude: 37.498553760499505, longitude: 127.02882598822454 },
  { latitude: 37.497625593121384, longitude: 127.02935713582038 },
  { latitude: 37.49629291770947, longitude: 127.02587362608637 },
  { latitude: 37.49754540521486, longitude: 127.02546694890695 },
  { latitude: 37.49646391248451, longitude: 127.02675574250912 },
];

const info = {
  content: '<div style="padding:5px;">Hello World!</div>',
  latitude: 33.450701,
  longitude: 126.570667,
};

function changeCenter(lat: number, lng: number) {
  center.value = { latitude: lat, longitude: lng };
}
</script>
<template>
  <div>
    <KakaoMap :center="center" :use-marker="true" />
    <button @click="changeCenter(33.452278, 126.567803)">1번</button>
    <button @click="changeCenter(37.498553760499505, 127.02882598822454)">
      2번
    </button>
  </div>
</template>
