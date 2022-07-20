<script setup lang="ts"></script>
<template>
  <div class="boardItem list-group-item list-group-item-action py-1 mb-1">
    <div class="row">
      <div class="col-3 align-items-center d-flex px-1">
        <img class="rounded" alt="..." width="80px" height="80px" />
      </div>
      <div class="col-9 ps-2">
        <div class="d-flex align-items-center justify-content-between">
          <small class="text-muted overflow" style="width: 160px; height: 20px">
            ${dto.cName}<span> &#183; </span>${dto.cdName} </small
          ><br />
          <small class="date text-muted"></small>
        </div>
        <strong class="overflow" style="width: 240px; height: 20px"
          >${dto.title}</strong
        >
        <div class="d-flex align-items-center justify-content-between">
          <small class="text-muted">${dto.gue} ${dto.dong} </small><br />
        </div>
        <small class="overflow" style="width: 240px; height: 20px"
          >${dto.addrDetail}</small
        >
        <div class="d-flex align-items-center justify-content-between my-1">
          <small class="text-muted">채팅 ${dto.chatHit}</small>
          <button
            class="btn btn-sm btn-outline-secondary me-1"
            onclick="location.href='f_content_view.do?fbNum=${dto.fbNum}'"
            style="line-height: 1"
          >
            게시물보기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
