<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function routerPush(path: string) {
  router.push({
    path,
  });
}
</script>
<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top px-3">
    <a class="navbar-brand">Angel Pods</a>
    <div>
      <button
        class="navbar-toggler collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarsExample03"
        aria-controls="navbarsExample03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <button type="button" class="navbar-toggler sidebarToggle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="30"
          fill="currentColor"
          class="bi bi-map-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.502.502 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5V.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.498.498 0 0 0-.196 0L5 14.09zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1-.5-.1z"
          ></path>
        </svg>
        지도보기
      </button>
    </div>

    <div class="navbar-collapse collapse" id="navbarsExample03">
      <ul class="navbar-nav me-auto mb-2 mb-sm-0">
        <li class="nav-item">
          <a class="nav-link text-white" href="../find/list_view.jsp"
            >습득물보기</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="../lost/list_view.jsp"
            >분실물보기</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="../find/write_view.jsp"
            >습득신고</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="../lost/write_view.jsp"
            >분실신고</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" @click="routerPush('/admin')"
            >관리자</a
          >
        </li>
      </ul>
      <div id="nav-login" hidden="true">
        <a
          type="button"
          class="btn btn-light me-2 text-secondary fw-bold"
          href="../member/login.jsp?url=${pageContext.request.requestURL}"
          >로그인</a
        >
        <a
          type="button"
          class="btn btn-outline-light text-white"
          href="../member/join.jsp"
          >회원가입</a
        >
      </div>
      <div id="nav-logout" hidden="true" class="text-white">
        <a href="#" class="text-white">${name}</a> 님
        <a type="button" class="btn btn-outline-light" href="logout.do"
          >로그아웃</a
        >
      </div>
      <input id="validMem" value="${ValidMem}" hidden="true" />
    </div>
  </nav>
</template>
