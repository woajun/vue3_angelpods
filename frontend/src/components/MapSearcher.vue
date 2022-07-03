<script setup lang="ts">
"a";
</script>
<template>
  <div id="menu_wrap" class="bg_white">
    <div class="option">
      <form onsubmit="searchPlaces(); return false;">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="위치 검색"
            id="keyword"
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
