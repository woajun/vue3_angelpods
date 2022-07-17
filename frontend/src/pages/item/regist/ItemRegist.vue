<script lang="ts" setup>
import TopNav from "@/components/navs/TopNav.vue";
import AIcons from "@/components/AIcons.vue";
import MapModal from "./modal/ItemRegistMapModal.vue";
import { ref, reactive } from "vue";

const modalShow = ref(false);
const data = reactive<{
  latitude: number | null;
  longitude: number | null;
  location: string;
}>({
  latitude: null,
  longitude: null,
  location: "",
});

function setLocation(location: {
  latitude: number;
  longitude: number;
  address: string;
}) {
  data.latitude = location.latitude;
  data.longitude = location.longitude;
  data.location = location.address;
}
</script>
<template>
  <!-- nav -->
  <TopNav />
  <div style="padding-top: 50px"></div>

  <!-- 습득 게시물 등록 -->
  <form>
    <div class="container my-3"></div>
    <div class="text-center">
      <h3>습득 게시물 등록</h3>
    </div>

    <div class="container">
      <div class="form-control">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="col-12 mt-1">
              <div id="tab">
                <label class="fw-bold">사진</label>
                <ul id="preview" class="">
                  <li class="fileSelector mt-3">
                    <label
                      type="button"
                      for="photoBtnInput"
                      id="photoBtn"
                      class="border btn"
                    >
                      <AIcons type="camera" />
                      <br />
                      <span id="imgCntSpan">0</span>/10
                      <input
                        type="file"
                        id="photoBtnInput"
                        accept=".jpg, .jpeg, .png"
                      />
                    </label>
                  </li>
                  <!-- 선택 이미지 생성 -->
                </ul>
              </div>
            </div>

            <div class="col-12">
              <div class="row">
                <label class="fw-bold">카테고리</label>
                <div class="col-6">
                  <select id="cNum" name="cNum" class="form-select" required>
                    <option selected disabled value="">대분류</option>
                  </select>
                </div>
                <div class="col-6">
                  <select id="cdNum" name="cdNum" class="form-select" required>
                    <option selected disabled value="">소분류</option>
                  </select>
                </div>
              </div>
              <div class="mt-1" id="divSN" style="display: none">
                <input
                  class="form-control"
                  type="text"
                  id="sn"
                  name="sn"
                  size="50"
                  placeholder="일련번호"
                />
              </div>
            </div>

            <div class="col-12 mt-3">
              <label class="fw-bold">위치</label>
              <button
                type="button"
                class="form-control form-control-hover"
                @click="() => (modalShow = true)"
              >
                <div class="row justify-content-between">
                  <div class="col-8 text-start">
                    <span> 습득 장소를 선택하세요. </span>
                  </div>
                  <div class="col-4 text-end">
                    <AIcons type="arrow-light-square" />
                  </div>
                </div>
              </button>
            </div>

            <MapModal v-model="modalShow" @location="setLocation" />

            <div class="col-12 mt-1">
              <input
                v-model="data.location"
                type="text"
                class="form-control"
                placeholder="상세장소"
                required
              />
            </div>

            <div class="col-12 mt-3">
              <label class="fw-bold">글 내용</label>
              <input
                name="title"
                class="form-control"
                placeholder="글 제목"
                required
              />
              <textarea
                name="contents"
                class="form-control mt-1"
                placeholder="글 내용"
                style="height: 100px"
                required
              ></textarea>
            </div>

            <div class="col-12 mt-1"></div>

            <div class="row my-2">
              <div class="col-12 text-center">
                <div class="d-grid gap-2 col-6 mx-auto mt-2">
                  <input
                    class="btn btn-dark"
                    type="submit"
                    value="등록"
                    onclick="imgAddName()"
                  />
                </div>
                {{ data }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style>
#preview img {
  width: 73px;
  height: 73px;
  object-fit: cover;
}

#photoBtn {
  width: 73px;
  height: 73px;
  color: darkgrey;
  background-color: white;
}
#photoBtn:hover {
  background-color: #f1f1f1;
}

.form-control-hover:hover {
  background-color: #f1f1f1;
}
.selectImage {
  outline: 3px solid yellow;
}
/* 스크롤바 만들기 =============== */
#tab ul {
  white-space: nowrap;
  overflow-x: auto;
  text-align: start;
  padding: 0px;
  padding-bottom: 2px;
}
#tab ul li {
  display: inline-block;
  color: darkgrey;
}
#tab ul li img:hover:not(.fileSelector) {
  opacity: 0.3;
}
#tab ul li span:hover {
  opacity: 0.5;
}
/* 스크롤바===================== */
::-webkit-scrollbar {
  /* 스크롤바 전체 영역 */
  width: 5px;
}
::-webkit-scrollbar-track {
  /* 스크롤이 움직이는 영역  */
  background-color: #ffffff;
}
::-webkit-scrollbar-thumb {
  /*  스크롤  */
  background-color: rgb(212, 212, 212);
  border-radius: 30px;
}
::-webkit-scrollbar-button:start:decrement,
::-webkit-scrollbar-button:end:increment {
  /*  스크롤의 화살표가 포함된 영역   */
  display: block;
  height: 4px;
  background-color: rgb(255, 255, 255);
}

.maxPhoto {
  background-color: #f1f1f1 !important;
}
#preview input {
  display: none;
}
</style>
