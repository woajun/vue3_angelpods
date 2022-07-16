<script setup lang="ts">
import { defineProps, ref } from "vue";
import KMap from "@/components/map/KMap.vue";
import KMapMarker from "@/components/map/KMapMarker.vue";

defineProps<{
  modelValue: boolean;
}>();

const marker = ref();
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
          {{ marker }}
          <KMap>
            <template #marker="map">
              <KMapMarker v-model="marker" :map="map.map"> hello! </KMapMarker>
            </template>
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
