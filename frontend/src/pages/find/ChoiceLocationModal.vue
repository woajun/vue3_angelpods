<script setup lang="ts">
import { defineProps, reactive, ref } from "vue";
import KMap from "@/components/map/KMap.vue";
import KMapMarker from "@/components/map/KMapMarker.vue";
/* global kakao */

defineProps<{
  modelValue: boolean;
}>();

function mapClickEvent(e: kakao.maps.event.MouseEvent) {
  console.log(e.latLng);
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
            <KMapMarker :map="map.map"> hello! </KMapMarker>
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
</style>
