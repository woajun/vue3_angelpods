<script setup lang="ts">
import { onMounted, ref, defineEmits } from "vue";
import { Maps } from "@/components/kakaoTypes";

const map = ref<Maps>();
const markers = ref<number[]>();
const infowindow = ref();

const emit = defineEmits<{
  (e: "changeSize", changeSize: (size: number) => void): void;
  (
    e: "displayMarker",
    displayMarker: (markerPositions: number[][]) => void
  ): void;
  (e: "displayInfoWindow", displayInfoWindow: (content: string) => void): void;
}>();

const initMap = function () {
  const container = document.getElementById("map");
  const options = {
    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
    level: 5,
  };

  //지도 객체를 등록합니다.
  //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  map.value = new window.kakao.maps.Map(container, options);
};

const changeSize = function (size: number) {
  const container = document.getElementById("map");
  if (!container) return;
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;
  map.value?.relayout();
};
emit("changeSize", changeSize);

const displayMarker = function (markerPositions: number[][]) {
  if (markers.value && markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }

  const positions = markerPositions.map(
    (position) => new window.kakao.maps.LatLng(...position)
  );

  console.log(positions);

  if (positions.length > 0) {
    markers.value = positions.map(
      (position) =>
        new window.kakao.maps.Marker({
          map: map.value,
          position,
        })
    );

    const bounds = positions.reduce(
      (bounds, latlng) => bounds.extend(latlng),
      new window.kakao.maps.LatLngBounds()
    );

    map.value?.setBounds(bounds);
  }
};

emit("displayMarker", displayMarker);

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

emit("displayInfoWindow", displayInfoWindow);

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => {
      return window.kakao.maps.load(initMap);
    };
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6980627efdafc9b33ee3f2e602c8f9da&libraries=services";
    document.head.appendChild(script);
  }
});
</script>

<template>
  <div id="map" />
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
