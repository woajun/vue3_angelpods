<script lang="ts">
import { defineComponent } from "vue";
import FindList from "@/components/FindList.vue";
import KakaoMap from "./components/KakaoMap.vue";

export default defineComponent({
  name: "App",
  components: {
    // FindList,
    KakaoMap,
  },
});
</script>
<template>
  <KakaoMap />
  <!-- <FindList /> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
