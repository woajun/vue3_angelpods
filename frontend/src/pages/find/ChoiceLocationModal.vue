<script setup lang="ts">
import KakaoMap from "@/components/map/KakaoMap.vue";
import { defineProps } from "vue";
import MapSearcher from "@/components/map/MapSearcher.vue";

defineProps<{
  modelValue: boolean;
}>();
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
          <KakaoMap :relayout="modelValue" :marker-type="'custom-overlay'">
            <template #overlay>
              <div class="wrap">
                <div class="info">
                  <div class="title">
                    {op.title}
                    <div class="close" title="닫기"></div>
                  </div>
                  <div class="body">
                    <div class="img">
                      <img
                        src="https://cfile181.uf.daum.net/image/250649365602043421936D"
                        width="73"
                        height="70"
                      />
                    </div>
                    <div class="desc">
                      <div class="ellipsis">{op.message}</div>
                      <div class="jibun ellipsis">{op.address}</div>
                      <div>
                        <a href="{op.url}" target="_blank" class="link"
                          >홈페이지</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </KakaoMap>

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
