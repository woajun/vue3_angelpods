<script setup lang="ts">
import { ref } from "vue";
import KakaoMap from "./KakaoMap.vue";

const doChangeSize = ref<null | ((size: number) => void)>();

const changeSize = function (size: number) {
  doChangeSize.value ? doChangeSize.value(size) : "";
};

const marker1 = [
  [33.452278, 126.567803],
  [33.452671, 126.574792],
  [33.451744, 126.572441],
];

const marker2 = [
  [37.499590490909185, 127.0263723554437],
  [37.499427948430814, 127.02794423197847],
  [37.498553760499505, 127.02882598822454],
  [37.497625593121384, 127.02935713582038],
  [37.49629291770947, 127.02587362608637],
  [37.49754540521486, 127.02546694890695],
  [37.49646391248451, 127.02675574250912],
];
</script>
<template>
  <div>
    <KakaoMap @change-size="(e) => (doChangeSize = e)" />
    <div class="button-group">
      <button @click="changeSize(0)">Hide</button>
      <button @click="changeSize(400)">show</button>
      <button @click="displayMarker(marker1)">marker set 1</button>
      <button @click="displayMarker(marker2)">marker set 2</button>
      <button @click="displayMarker([])">marker set 3 (empty)</button>
      <button @click="displayInfoWindow">infowindow</button>
    </div>
  </div>
</template>
