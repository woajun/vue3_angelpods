<script setup lang="ts">
import AIcons from "@/components/AIcons.vue";
import { ref, onMounted, defineEmits } from "vue";
/* global kakao */

const emit = defineEmits(["result", "itemClick"]);

const keyword = ref("");
const result = ref<kakao.maps.services.PlacesSearchResult>([]);
const placeService = ref<kakao.maps.services.Places | null>(null);

function searchPlaces() {
  if (!placeService.value) return;
  if (!keyword.value.replace(/^\s+|\s+$/g, ""))
    return alert("키워드를 입력해주세요!");

  placeService.value.keywordSearch(keyword.value, placesSearchCB);
}

function placesSearchCB(
  data: kakao.maps.services.PlacesSearchResult,
  status: kakao.maps.services.Status,
  pagination: kakao.maps.Pagination
) {
  const zero = kakao.maps.services.Status.ZERO_RESULT;
  const error = kakao.maps.services.Status.ERROR;
  if (status === zero) return alert("검색 결과가 존재하지 않습니다.");
  if (status === error) return alert("검색 결과 중 오류가 발생했습니다.");
  result.value = data;
  emit("result", data);
}

onMounted(() => {
  kakao.maps.load(() => {
    placeService.value = new window.kakao.maps.services.Places();
  });
});
</script>
<template>
  <div id="menu_wrap" class="bg_white">
    <div class="option">
      <div class="input-group">
        <input
          v-model="keyword"
          type="text"
          class="form-control"
          placeholder="위치 검색"
          size="15"
        />
        <button class="btn btn-outline-dark" @click="searchPlaces">
          <AIcons type="search" />
        </button>
      </div>
    </div>
    <hr />

    <div>
      <div style="background-color: rgba(255, 255, 255, 0)">
        <div>
          <ul>
            <li v-for="(item, i) in result" :key="i">
              <div class="info" @click="$emit('itemClick', item)">
                <h5>{{ item.place_name }}</h5>
                <template v-if="item.road_address_name">
                  <span>{{ item.road_address_name }}</span>
                  <span class="jibun gray">{{ item.address_name }}</span>
                </template>
                <template v-else>
                  <span>{{ item.address_name }}</span>
                </template>
                <span class="tel">{{ item.phone }}</span>
              </div>
            </li>
          </ul>
          <div id="pagination"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#menu_wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  margin: 10px 0 40px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 2;
  font-size: 12px;
  border-radius: 10px;
}
.bottom-zero {
  bottom: 0;
}
.bg_white {
  background: #fff;
}
#menu_wrap hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 2px solid #5f5f5f;
  margin: 3px 0;
}
#menu_wrap .option {
  margin: 5px;
}
#placesList {
  padding-inline-start: 15px;
}
#placesList li {
  list-style: none;
}
#placesList .item {
  position: relative;
  border-bottom: 1px solid #888;
  overflow: hidden;
  cursor: pointer;
  min-height: 65px;
}
#placesList .item span {
  display: block;
  margin-top: 4px;
}
.info {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.info {
  padding: 10px 0 0 0;
}
/* #placesList .info .gray {color:#8a8a8a;} */
.info .gray {
  color: #8a8a8a;
}
/* #placesList .info .jibun {padding-left:26px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;} */
.info .jibun {
  padding-left: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png)
    no-repeat;
}
.info .tel {
  color: #009900;
}

#pagination {
  margin: 10px auto;
  text-align: center;
}
#pagination a {
  display: inline-block;
  margin-right: 10px;
}
#pagination .on {
  font-weight: bold;
  cursor: default;
  color: #777;
}
#flush-collapseOne {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  margin: 80px 0px 0px 0px;
  overflow-y: auto;
}
.accordion-button {
  padding: 1rem 6rem;
  background-color: rgba(255, 255, 255, 0);
}
</style>
