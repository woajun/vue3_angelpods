<script lang="ts" setup>
import BoardItem from "./item/BoardItem.vue";
import { reactive } from "vue";
import BoardSearcher from "./parts/BoardSearcher.vue";
import BoardNav from "./parts/BoardNav.vue";
export interface Item {
  id: number;
  category: { master: string; detail?: string };
  title: string;
  address: { dong: string; detail?: string };
  hit: number;
}

const items: Item[] = reactive([
  {
    id: 1,
    category: { master: "무선이어폰" },
    title: "에어팟주웠어요",
    address: { dong: "성수동", detail: "벤치뒤" },
    hit: 5,
  },
]);
</script>
<template>
  <div id="layoutSidenav">
    <div id="layoutSidenav_nav" class="bg-light">
      <div class="container">
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
      </div>
    </div>
  </div>
</template>
<style scoped>
#layoutSidenav {
  display: flex;
  height: 100vh;
}
#layoutSidenav #layoutSidenav_nav {
  flex-basis: 100%;
  width: 100%;
  flex-shrink: 0;
  transition: transform 0.15s ease-in-out;
  z-index: 1;
  transform: translateX(0px);
  margin-top: 55px;
}

.sb-sidenav-toggled #layoutSidenav #layoutSidenav_nav {
  transform: translateX(-100%);
}

@media (min-width: 768px) {
  #layoutSidenav #layoutSidenav_nav {
    transform: translateX(0px);
    flex-basis: 400px;
  }

  .sb-sidenav-toggled #layoutSidenav #layoutSidenav_nav {
    transform: translateX(0px);
  }
}
</style>
