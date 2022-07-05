<script setup lang="ts">
import { onMounted, ref, defineEmits, defineProps } from "vue";

interface LatLng {
  latitude: number;
  longitude: number;
}

interface Center extends LatLng {
  level: number;
}

const divMap = ref<HTMLDivElement | null>(null);
const map = ref<kakao.maps.Map>();
const markers = ref<kakao.maps.Marker[]>();
const infowindow = ref();

const emit = defineEmits<{
  (e: "changeSize", changeSize: (size: number) => void): void;
  (
    e: "displayMarker",
    displayMarker: (markerPositions: LatLng[]) => void
  ): void;
  (e: "displayInfoWindow", displayInfoWindow: (content: string) => void): void;
}>();

const initMap = function () {
  if (!divMap.value) return;
  const {
    latitude = 37.566826,
    longitude = 126.9786567,
    level = 3,
  } = props.center;
  const options = {
    center: new window.kakao.maps.LatLng(latitude, longitude),
    level: level,
  };
  map.value = new window.kakao.maps.Map(divMap.value, options);
};

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
  markers.value = latLngs.map((position) => {
    const markerOption = {
      map: map.value,
      position,
    };
    return new window.kakao.maps.Marker(markerOption);
  });

  const bounds = new window.kakao.maps.LatLngBounds();
  latLngs.forEach((e) => bounds.extend(e));
  map.value?.setBounds(bounds);
};

const displayInfoWindow = function (content: string) {
  if (infowindow.value && infowindow.value.getMap()) {
    //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
    map.value?.setCenter(infowindow.value.getPosition());
    return;
  }

  var iwContent = content, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition = new window.kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
    iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

  infowindow.value = new window.kakao.maps.InfoWindow({
    map: map.value, // 인포윈도우가 표시될 지도
    position: iwPosition,
    content: iwContent,
    removable: iwRemoveable,
  });

  map.value?.setCenter(iwPosition);
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
const props = defineProps<{
  center: Center;
}>();
</script>

<template>
  <div ref="divMap" />
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
