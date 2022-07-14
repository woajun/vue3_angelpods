<script setup lang="ts">
import AIcons from "@/components/AIcons.vue";
import KakaoMap from "@/components/map/KakaoMap.vue";
import { defineProps } from "vue";

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
          <KakaoMap
            id="map"
            @emitMap="(aMap) => (map = aMap)"
            :mapClickEvent="paintMarker"
            :markerSetting="markerSetting"
            :markers="markers"
          />

          <div id="menu_wrap" class="bg_white">
            <div class="option">
              <form onsubmit="searchPlaces(); return false;">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    value="이태원 맛집"
                    id="keyword"
                    size="15"
                  />
                  <button
                    class="btn btn-outline-dark"
                    type="button"
                    onclick="searchPlaces();"
                  >
                    <AIcons type="search" />
                  </button>
                </div>
              </form>
            </div>
            <hr />

            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div
                class="accordion-item"
                style="background-color: rgba(255, 255, 255, 0)"
              >
                <h2 class="accordion-header" id="flush-headingOne">
                  <button
                    id="placesListBtn"
                    class="accordion-button collapsed py-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    접기/펴기
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <ul id="placesList"></ul>
                  <div id="pagination"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="curBtn text-end">
            <button
              type="button"
              class="btn btn-dark"
              onclick="curPositionBtn()"
            >
              현위치
              <AIcons type="location" />
            </button>
          </div>
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
