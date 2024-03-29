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
  /** 맵의 중앙을 center에 위치시킨다. */
  center: { latitude: number; longitude: number };
  /** 지도의 확대 수준을 설정한다. 1~14 */
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
  /**
   * 주어진 영역이 화면 안에 전부 나타날 수 있도록 지도의 중심 좌표와 확대 수준을 설정한다.
   * 주어진 영역외에 추가로 padding값을 지정할 수 있다.
   * *padding값을 지정하지 않으면 기본값으로 상하좌우 32가 적용된다.
   */
  bounds?:
    | kakao.maps.LatLngBounds
    | {
        bounds: kakao.maps.LatLngBounds;
        paddingTop: number;
        paddingRight: number;
        paddingBottom: number;
        paddingLeft: number;
      };
  style?: StyleValue;
  lock?: boolean;
}

const props = withDefaults(defineProps<Props>(), {});

interface Emits {
  (e: "getLatLng", latlng: { latitude: number; longitude: number }): void;
  (e: "getCenter", latlng: kakao.maps.LatLng): void;
  (e: "getLevel", level: number): void;
}

const emit = defineEmits<Emits>();

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
    (e: kakao.maps.event.MouseEvent) =>
      emit("getLatLng", {
        latitude: e.latLng.getLat(),
        longitude: e.latLng.getLng(),
      })
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
