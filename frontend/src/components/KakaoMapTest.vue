<script setup lang="ts">
import { ref } from "vue";
import KakaoMap from "./KakaoMap.vue";

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
</script>
<template>
  <div>
    <KakaoMap
      :center="{ latitude: 37.566826, longitude: 126.9786567, level: 3 }"
      @change-size="(e) => (changeSize = e)"
      @display-marker="(e) => (displayMarker = e)"
      @display-info-window="(e) => (displayInfoWindow = e)"
    />
    <div class="button-group">
      <button @click="changeSize!(0)">Hide</button>
      <button @click="changeSize!(400)">show</button>
      <button @click="displayMarker!(marker1)">marker set 1</button>
      <button @click="displayMarker!(marker2)">marker set 2</button>
      <button @click="displayMarker!([])">marker set 3 (empty)</button>
      <button @click="displayInfoWindow!(info)">infowindow</button>
    </div>
  </div>
</template>
