<script setup lang="ts">
import AIcons from "@/components/AIcons.vue";
import { ref } from "vue";

const keyword = ref<string>();

const searchPlaces = function (_keyword: string) {
  console.log(_keyword);
  if (!_keyword.replace(/^\s+|\s+$/g, "")) {
    alert("키워드를 입력해주세요!");
    return;
  }
  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  //   ps.keywordSearch(keyword, placesSearchCB);
};
</script>
<template>
  <div id="menu_wrap" class="bg_white">
    <div class="option">
      <form @submit.prevent="searchPlaces(keyword ?? '')">
        <div class="input-group">
          <input
            v-model="keyword"
            type="text"
            class="form-control"
            placeholder="위치 검색"
            size="15"
          />
          <button class="btn btn-outline-dark" type="submit">
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
</template>
