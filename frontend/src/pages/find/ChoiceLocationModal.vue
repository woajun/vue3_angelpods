<script setup lang="ts">
import KakaoMap from "@/components/map/KakaoMap.vue";
import { defineProps, ref } from "vue";
import MapSearcher from "@/components/map/MapSearcher.vue";

defineProps<{
  modelValue: boolean;
}>();

const picked = ref();
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
          {{ picked }}
          <KakaoMap v-model:picked="picked" :relayout="modelValue" />
          <MapSearcher />
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
