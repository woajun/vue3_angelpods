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
export interface Item {
  id: number;
  category: { master: string; detail?: string };
  title: string;
  address: { dong: string; detail?: string };
  hit: number;
}

const router = useRouter();

function routerPush(path: string) {
  router.push({
    path,
  });
}

const center = ref({ latitude: 37.566826, longitude: 126.9786567 });

const items: Item[] = reactive([
  {
    id: 1,
    category: { master: "무선이어폰" },
    title: "에어팟주웠어요",
    address: { dong: "성수동", detail: "벤치뒤" },
    hit: 5,
  },
]);

const mapClick = function (latlng: { latitude: number; longitude: number }) {
  console.log(latlng);
};
</script>
<template>
  <div style="display: flex">
    <SideBoard>
      <BoardNav />

      <BoardSearcher />

      <div style="position: relative; bottom: 0">
        <div id="board">
          <div class="scrollarea">
            <template v-for="item in items" :key="item.id">
              <BoardItem :item="item" />
            </template>
          </div>
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

#board {
  display: flex;
  width: 100%;
  height: 75vh;
  height: -webkit-fill-available;
  max-height: 75vh;
  overflow-y: hidden;
}

.scrollarea {
  overflow-y: auto;
  width: 100%;
}
</style>
