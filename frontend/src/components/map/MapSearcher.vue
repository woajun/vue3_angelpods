<script setup lang="ts">
import AIcons from "@/components/AIcons.vue";
import { onMounted, ref } from "vue";

const keyword = ref<string>();

const searchPlaces = function (_keyword: string) {
  console.log(_keyword);
  if (!_keyword.replace(/^\s+|\s+$/g, "")) {
    alert("키워드를 입력해주세요!");
    return;
  }
  const ps = new window.kakao.maps.services.Places();
  ps.keywordSearch(_keyword, placesSearchCB);
};

function placesSearchCB(data, status, pagination) {
  const services = window.kakao.maps.services;
  if (status === services.Status.ZERO_RESULT) return alert("No result");
  if (status === services.Status.ERROR) return alert("Error");
  if (status !== services.Status.OK) return alert("Error");
  console.log(data);
  console.log(pagination);
  // displayPlaces(data);
  // displayPagination(pagination);

  // myCollapse.classList.add("show");
  // placesListBtn.setAttribute("aria-expanded", "true");
  // placesListBtn.classList.remove("collapsed");

  // chkCollapsed();
}
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
