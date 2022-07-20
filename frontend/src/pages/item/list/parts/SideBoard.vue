<script lang="ts" setup></script>
<template>
  <div id="layoutSidenav">
    <div id="layoutSidenav_nav" class="bg-light">
      <div class="container">
        <slot />
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
