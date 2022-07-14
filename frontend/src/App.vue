<script lang="ts" setup>
import TopNav from "./components/navs/TopNav.vue";
import BottomNav from "./components/navs/BottomNav.vue";
</script>
<template>
  <TopNav></TopNav>
  <RouterView></RouterView>
  <BottomNav></BottomNav>
</template>
