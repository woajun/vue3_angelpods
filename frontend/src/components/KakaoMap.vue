<script setup lang="ts">
import { onMounted, ref, defineEmits, defineProps } from "vue";

interface LatLng {
  latitude: number;
  longitude: number;
}

interface Center extends LatLng {
  level: number;
}

interface Info extends LatLng {
  content: string;
}

const props = defineProps<{
  center?: Center;
  mapClickEvent?: (latlng: LatLng) => void;
}>();

const divMap = ref<HTMLDivElement | null>(null);
const map = ref<kakao.maps.Map>();
const markers = ref<kakao.maps.Marker[]>();
const infowindow = ref<kakao.maps.InfoWindow>();

const emit = defineEmits<{
  (e: "changeSize", changeSize: (size: number) => void): void;
  (
    e: "displayMarker",
    displayMarker: (markerPositions: LatLng[]) => void
  ): void;
  (e: "displayInfoWindow", displayInfoWindow: (content: Info) => void): void;
  (e: "emitMap", map: kakao.maps.Map): void;
}>();

const initMap = function () {
  if (!divMap.value) return;
  const aCenter = props.center;
  const latitude = aCenter?.latitude ?? 37.566826;
  const longitude = aCenter?.longitude ?? 126.9786567;
  const level = aCenter?.level ?? 3;
  const options = {
    center: new window.kakao.maps.LatLng(latitude, longitude),
    level: level,
  };
  map.value = new window.kakao.maps.Map(divMap.value, options);

  // 지도 클릭 이벤트
  kakao.maps.event.addListener(map.value, "click", mapClickEvent);
  emit("emitMap", map.value);
};

function mapClickEvent(mouseEvent: kakao.maps.event.MouseEvent) {
  const latlng = mouseEvent.latLng;
  console.log(latlng);
  if (!props.mapClickEvent) return;
  props.mapClickEvent({
    latitude: latlng.getLat(),
    longitude: latlng.getLng(),
  });
}

const changeSize = function (size: number) {
  const container = divMap.value;
  if (!container) return;
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;
  map.value?.relayout();
};

const displayMarker = function (rawLatLngs: LatLng[]) {
  if (markers.value && markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }

  const latLngs = rawLatLngs.map(
    (e) => new window.kakao.maps.LatLng(e.latitude, e.longitude)
  );

  if (!latLngs.length) return;

  const markerOptions = latLngs.map((position) => ({
    map: map.value,
    position,
  }));
  markers.value = markerOptions.map((o) => new window.kakao.maps.Marker(o));

  const bounds = new window.kakao.maps.LatLngBounds();
  latLngs.forEach((e) => bounds.extend(e));
  map.value?.setBounds(bounds);
};

const displayInfoWindow = function (info: Info) {
  if (infowindow.value) infowindow.value.close();
  const latlng = new window.kakao.maps.LatLng(info.latitude, info.longitude);
  infowindow.value = new window.kakao.maps.InfoWindow({
    map: map.value,
    position: latlng,
    content: info.content,
    removable: true,
  });
  map.value?.setCenter(latlng);
  map.value?.setLevel(3);
};

emit("changeSize", changeSize);
emit("displayMarker", displayMarker);
emit("displayInfoWindow", displayInfoWindow);

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    /* global kakao */
    const script = document.createElement("script");
    script.onload = () => window.kakao.maps.load(initMap);
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6980627efdafc9b33ee3f2e602c8f9da&libraries=services";
    document.head.appendChild(script);
  }
});
</script>

<template>
  <div ref="divMap" />
</template>
