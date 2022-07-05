<script lang="ts">
import { defineComponent } from "vue";
import FindList from "@/components/FindList.vue";
import ChoiceLocation from "./pages/ChoiceLocation.vue";
// import KakaoMapTest from "./components/KakaoMapTest.vue";
export default defineComponent({
  name: "App",
  components: {
    ChoiceLocation,
  },
});
</script>
<template>
  <ChoiceLocation />
  <!-- <FindList /> -->
  <!-- <KakaoMapTest /> -->
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
