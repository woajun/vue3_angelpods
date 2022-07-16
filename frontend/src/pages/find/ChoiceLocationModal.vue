<script setup lang="ts">
import { defineProps, reactive, ref } from "vue";
import KMap from "@/components/map/KMap.vue";
import KMapMarker from "@/components/map/KMapMarker.vue";
/* global kakao */

defineProps<{
  modelValue: boolean;
}>();

const markerLatLng = ref<kakao.maps.LatLng | null>(null);

function mapClickEvent(e: kakao.maps.event.MouseEvent) {
  markerLatLng.value = e.latLng;
}

function apple() {
  console.log("aaaaaaa");
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
          <KMap @click="mapClickEvent" v-slot="map">
            <KMapMarker :map="map.map" :position="markerLatLng">
              <div class="bAddr" style="font-size: 15px">
                <span>습득한 곳이 이곳인가요?</span>
                <div class="info pb-0"><br /></div>
                <div class="text-center">
                  <button type="button" class="btn btn-dark" @click="apple">
                    입력
                  </button>
                </div>
              </div>
            </KMapMarker>
          </KMap>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.show {
  display: block;
}
.bAddr {
  padding: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
