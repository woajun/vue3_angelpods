<script lang="ts" setup></script>
<template>
  <div class="wrap">
    <div class="info">
      <div class="title">
        {op.title}
        <div class="close" title="닫기"></div>
      </div>
      <div class="body">
        <div class="img">
          <img src="" width="73" height="70" />
        </div>
        <div class="desc">
          <div class="ellipsis">{op.message}</div>
          <div class="jibun ellipsis">{op.address}</div>
          <div>
            <a href="{op.url}" target="_blank" class="link">홈페이지</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
