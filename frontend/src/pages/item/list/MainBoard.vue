<script setup lang="ts">
import AIcons from "@/components/AIcons.vue";
import { useRouter } from "vue-router";
import KMap from "@/components/map/KMap.vue";
import KMapMarker from "@/components/map/KMapMarker.vue";
import { ref, reactive } from "vue";
import SideBoard from "./parts/SideBoard.vue";
import BoardNav from "./parts/BoardNav.vue";
import BoardItem from "./parts/BoardItem.vue";
import BoardSearcher from "./parts/BoardSearcher.vue";
import itemService from "@/mocks/services/ItemService";
import { Item, LatLng, ItemCondition } from "@/globals";

const router = useRouter();

function routerPush(path: string) {
  router.push({
    path,
  });
}

const center = ref<LatLng>({ latitude: 37.566826, longitude: 126.9786567 });
const condition: ItemCondition = { categoryIDs: [3] };
const items = reactive<Item[]>(itemService.getLostItems(condition));

const mapClick = function (latlng: LatLng) {
  console.log(latlng);
};
</script>
<template>
  <div style="display: flex">
    <SideBoard>
      <BoardNav />
      <BoardSearcher />
      <div class="board">
        <div class="scrollarea">
          <template v-for="item in items" :key="item.id">
            <BoardItem :item="item" />
          </template>
        </div>
      </div>
    </SideBoard>
    <KMap
      :center="center"
      :style="{
        height: '100vh',
        position: 'fixed',
        'padding-left': '480px',
      }"
      @getLatLng="mapClick"
    >
      <KMapMarker :position="center"></KMapMarker>
      <!-- 현위치 버튼 -->
      <button
        id="curPositionBtn"
        type="button"
        class="btn btn-primary"
        onclick="curPositionBtn()"
      >
        현위치
        <AIcons type="location" />
      </button>
      <!-- 글쓰기 버튼 -->
      <button
        id="btn_write"
        type="button"
        @click="routerPush('/regist')"
        class="btn btn-primary btn-xl"
        style="position: fixed; right: 4vh"
      >
        글쓰기
      </button>
    </KMap>
  </div>
</template>
<style scoped>
#curPositionBtn {
  position: fixed;
  right: 4vh;
  top: 80px;
}

.btn-primary {
  color: #fff;
  background-color: #ffc800;
  border-color: #ffc800;
}
.btn-primary:hover {
  color: #fff;
  background-color: #d9aa00;
  border-color: #cca000;
}

.btn-check:focus + .btn-primary,
.btn-primary:focus {
  color: #fff;
  background-color: #d9aa00;
  border-color: #cca000;
  box-shadow: 0 0 0 0.25rem rgba(255, 208, 38, 0.5);
}

.board {
  position: relative;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 75vh;
  max-height: 75vh;
  overflow-y: hidden;
}

.scrollarea {
  overflow-y: auto;
  width: 100%;
}
</style>
