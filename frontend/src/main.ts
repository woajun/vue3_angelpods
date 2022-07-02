import { createApp } from "vue";
import App from "./App.vue";
import { Kakao } from "@/components/kakaoTypes";

createApp(App).mount("#app");

declare global {
  interface Window {
    kakao: Kakao;
  }
}
