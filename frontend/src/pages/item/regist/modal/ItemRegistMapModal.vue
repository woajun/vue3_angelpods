<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";
import KMap from "@/components/map/KMap.vue";
import KMapMarker from "@/components/map/KMapMarker.vue";
import KMapSearcher from "@/components/map/KMapSearcher.vue";
import AIcons from "@/components/AIcons.vue";
/* global kakao */

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue", "location"]);

const markerMessage = ref("");
const markerLatLng = ref<{ latitude: number; longitude: number } | null>(null);
const center = ref({
  latitude: 37.53401162895581,
  longitude: 126.99421849699539,
});

watch(markerLatLng, (latlng) => {
  if (!latlng) return;
  center.value = latlng;
  getAddress(latlng.latitude, latlng.longitude, updateMarkerMessage);
});

function updateMarkerMessage(addr: {
  address: kakao.maps.services.Address;
  road_address: kakao.maps.services.RoadAaddress | null;
}) {
  function checkEmpty(str: string | undefined) {
    if (str && str.length !== 0) return str;
    return undefined;
  }
  const p1 = checkEmpty(addr.road_address?.building_name);
  const p2 = checkEmpty(addr.road_address?.address_name);
  const p3 = addr.address.address_name;
  markerMessage.value = p1 ?? p2 ?? p3;
}

function getAddress(
  lat: number,
  lng: number,
  callback: (address: {
    address: kakao.maps.services.Address;
    road_address: kakao.maps.services.RoadAaddress | null;
  }) => void
) {
  const geocoder = new window.kakao.maps.services.Geocoder();
  geocoder.coord2Address(lng, lat, (r) => {
    callback(r[0]);
  });
}

function mapClickEvent(e: kakao.maps.event.MouseEvent) {
  markerLatLng.value = aLatLng(e.latLng.getLat(), e.latLng.getLng());
}

function submit() {
  if (!markerLatLng.value) return alert("습득 장소를  선택해주세요.");
  const location = {
    latitude: markerLatLng.value.latitude,
    longitude: markerLatLng.value.longitude,
    address: markerMessage.value,
  };
  emit("location", location);
  emit("update:modelValue", false);
}

function itemClick(item: kakao.maps.services.PlacesSearchResultItem) {
  markerLatLng.value = aLatLng(item.y, item.x);
}

function here() {
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    markerLatLng.value = aLatLng(coords.latitude, coords.longitude);
  });
}

function aLatLng(lat: number | string, lng: number | string) {
  return { latitude: Number(lat), longitude: Number(lng) };
}

function searchResult(data: kakao.maps.services.PlacesSearchResult) {
  if (!data[0]) return;
  markerLatLng.value = aLatLng(data[0].y, data[0].x);
}
</script>
<template>
  <!-- Modal -->
  <div :class="{ show: modelValue }" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">위치선택</h5>
          <button
            type="button"
            class="btn-close"
            @click="() => $emit('update:modelValue', false)"
          ></button>
        </div>
        <div class="modal-body">
          <KMap :center="center" @click="mapClickEvent" v-slot="map">
            <KMapSearcher @item-click="itemClick" @result="searchResult" />
            <KMapMarker :map="map.map" :position="markerLatLng">
              <div class="bAddr" style="font-size: 15px">
                <span>습득한 곳이 이곳인가요?</span>
                <div class="info pb-0">{{ markerMessage }}</div>
                <div class="text-center">
                  <button type="button" class="btn btn-dark" @click="submit">
                    입력
                  </button>
                </div>
              </div>
            </KMapMarker>
            <div class="curBtn text-end">
              <button type="button" class="btn btn-dark" @click="here">
                현위치
                <AIcons type="location" />
              </button>
            </div>
          </KMap>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.show {
  display: block;
}
.bAddr {
  padding: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  background-color: white;
}

/* ------------------------------------------- */

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 95%;
    margin: 1.75rem auto;
  }
}
.modal-header {
  padding: 0.4rem 1rem;
}
.modal-body {
  height: 80vh;
}
.curBtn {
  position: absolute;
  right: 3vh;
  top: 3vh;
  border-radius: 2px;
  z-index: 1;
  padding: 5px;
}
.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap a,
.map_wrap a:hover,
.map_wrap a:active {
  color: #000;
  text-decoration: none;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 500px;
}
</style>
