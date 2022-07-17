<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import KMap from "@/components/map/KMap.vue";
import KMapMarker from "@/components/map/KMapMarker.vue";
import KMapSearcher from "@/components/map/KMapSearcher.vue";
import AIcons from "@/components/AIcons.vue";
/* global kakao */

defineProps<{
  modelValue: boolean;
}>();

const address = ref<kakao.maps.services.RoadAaddress | null>(null);
const markerLatLng = ref<
  kakao.maps.LatLng | null | { latitude: number; longitude: number }
>(null);
const center = ref({
  latitude: 37.53401162895581,
  longitude: 126.99421849699539,
});

watch(markerLatLng, (newLatLng) => {
  if (!newLatLng) return;
  if ("latitude" in newLatLng) {
    newLatLng = new kakao.maps.LatLng(newLatLng.latitude, newLatLng.longitude);
  }
  const geocoder = new window.kakao.maps.services.Geocoder();
  geocoder.coord2Address(newLatLng.getLng(), newLatLng.getLat(), (result) => {
    address.value = result[0].road_address;
  });
});

function mapClickEvent(e: kakao.maps.event.MouseEvent) {
  markerLatLng.value = e.latLng;
  center.value = { latitude: e.latLng.getLat(), longitude: e.latLng.getLng() };
}

function apple() {
  console.log("aaaaaaa");
}

function itemClick(item: kakao.maps.services.PlacesSearchResultItem) {
  const itemLatLng = { latitude: Number(item.y), longitude: Number(item.x) };
  center.value = itemLatLng;
  markerLatLng.value = itemLatLng;
}

function here() {
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const latlng = { latitude: coords.latitude, longitude: coords.longitude };
    center.value = latlng;
    markerLatLng.value = latlng;
  });
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
            <KMapSearcher :map="map.map" @item-click="itemClick" />
            <KMapMarker :map="map.map" :position="markerLatLng">
              <div class="bAddr" style="font-size: 15px">
                <span>습득한 곳이 이곳인가요?</span>
                <div class="info pb-0">{{ address?.address_name }}</div>
                <div class="text-center">
                  <button type="button" class="btn btn-dark" @click="apple">
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

.bAddr {
  padding: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
