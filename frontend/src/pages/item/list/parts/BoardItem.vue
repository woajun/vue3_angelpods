<script setup lang="ts">
import { defineProps } from "vue";
import type { Item } from "../MainBoard.vue";

interface Props {
  item: Item;
}
defineProps<Props>();
</script>
<template>
  <div class="boardItem list-group-item list-group-item-action py-1 mb-1">
    <div class="row">
      <div class="col-3 align-items-center d-flex px-1">
        <img class="rounded" alt="..." width="80px" height="80px" />
      </div>
      <div class="col-9 ps-2">
        <div class="d-flex align-items-center justify-content-between">
          <small class="text-muted overflow" style="width: 160px; height: 20px">
            {{ item.category.master }} <span> &#183; </span>
            {{ item.category.detail }} </small
          ><br />
          <small class="date text-muted"></small>
        </div>
        <strong class="overflow" style="width: 240px; height: 20px">
          {{ item.title }}
        </strong>
        <div class="d-flex align-items-center justify-content-between">
          <small class="text-muted">{{ item.address.dong }} </small><br />
        </div>
        <small class="overflow" style="width: 240px; height: 20px">
          {{ item.address.detail }}
        </small>
        <div class="d-flex align-items-center justify-content-between my-1">
          <small class="text-muted">채팅 {{ item.hit }}</small>
          <button
            class="btn btn-sm btn-outline-secondary me-1"
            onclick="location.href=`f_content_view.do?fbNum=${item.id}`"
            style="line-height: 1"
          >
            게시물보기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.overflow {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 250px;
}

.boardItem .btn-outline-secondary {
  font-size: 0.775rem;
}
</style>
