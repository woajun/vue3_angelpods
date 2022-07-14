<script lang="ts" setup>
import TopNav from "@/components/navs/TopNav.vue";
import AIcons from "@/components/AIcons.vue";
import ChoiceLocationModal from "./ChoiceLocationModal.vue";
import { ref } from "vue";

const modalShow = ref(false);
</script>
<template>
  <!-- nav -->
  <TopNav />
  <div style="padding-top: 50px"></div>

  <!-- 습득 게시물 등록 -->
  <form action="f_write_action.do" method="post" enctype="multipart/form-data">
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
                    <c:forEach items="${cList}" var="cDto">
                      <option value="${cDto.cNum}">${cDto.name}</option>
                    </c:forEach>
                  </select>
                </div>
                <div class="col-6">
                  <select id="cdNum" name="cdNum" class="form-select" required>
                    <option selected disabled value="">소분류</option>
                    <c:forEach items="${cdList}" var="cdDto">
                      <option
                        class="cdItems"
                        value="${cdDto.cdNum}"
                        label="${cdDto.name}"
                        hidden="true"
                      >
                        ${cdDto.cNum}/${cdDto.needSN}
                      </option>
                    </c:forEach>
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
              <label class="fw-bold">위치{{ modalShow }}</label>
              <button
                type="button"
                class="form-control form-control-hover"
                @click="() => (modalShow = true)"
              >
                <div class="row justify-content-between">
                  <div class="col-8 text-start">
                    <span id="sidoGueDong"> 습득 장소를 선택하세요. </span>
                  </div>
                  <div class="col-4 text-end">
                    <AIcons type="arrow-light-square" />
                  </div>
                </div>
              </button>
            </div>

            <ChoiceLocationModal v-model="modalShow" />

            <div class="col-12 mt-1">
              <input
                id="addrDetail"
                type="text"
                name="addrDetail"
                class="form-control"
                placeholder="상세장소"
                value="${param.addrDetail}"
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
/* ------------------------------------------- */
.maxPhoto {
  background-color: #f1f1f1 !important;
}
#preview input {
  display: none;
}
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 95%;
    margin: 1.75rem auto;
  }
}
.modal-header {
  padding: 0.4rem 1rem;
}
.modal-body {
  height: 80vh;
}
#map {
  width: 100%;
  height: 100%;
}
.bAddr {
  padding: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.curBtn {
  position: absolute;
  right: 3vh;
  top: 3vh;
  border-radius: 2px;
  z-index: 1;
  padding: 5px;
}
.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap a,
.map_wrap a:hover,
.map_wrap a:active {
  color: #000;
  text-decoration: none;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 500px;
}
#menu_wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  margin: 10px 0 40px 10px;
  padding: 5px;
  overflow-y: hidden;
  background: rgba(255, 255, 255, 0.7);
  z-index: 2;
  font-size: 12px;
  border-radius: 10px;
}
.bottom-zero {
  bottom: 0;
}
.bg_white {
  background: #fff;
}
#menu_wrap hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 2px solid #5f5f5f;
  margin: 3px 0;
}
#menu_wrap .option {
  margin: 5px;
}
#placesList {
  padding-inline-start: 15px;
}
#placesList li {
  list-style: none;
}
#placesList .item {
  position: relative;
  border-bottom: 1px solid #888;
  overflow: hidden;
  cursor: pointer;
  min-height: 65px;
}
#placesList .item span {
  display: block;
  margin-top: 4px;
}
.info {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.info {
  padding: 10px 0 0 0;
}
/* #placesList .info .gray {color:#8a8a8a;} */
.info .gray {
  color: #8a8a8a;
}
/* #placesList .info .jibun {padding-left:26px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;} */
.info .jibun {
  padding-left: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png)
    no-repeat;
}
.info .tel {
  color: #009900;
}
#placesList .item .markerbg {
  float: left;
  position: absolute;
  width: 36px;
  height: 37px;
  margin: 10px 0 0 10px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png)
    no-repeat;
}
#placesList .item .marker_1 {
  background-position: 0 -10px;
}
#placesList .item .marker_2 {
  background-position: 0 -56px;
}
#placesList .item .marker_3 {
  background-position: 0 -102px;
}
#placesList .item .marker_4 {
  background-position: 0 -148px;
}
#placesList .item .marker_5 {
  background-position: 0 -194px;
}
#placesList .item .marker_6 {
  background-position: 0 -240px;
}
#placesList .item .marker_7 {
  background-position: 0 -286px;
}
#placesList .item .marker_8 {
  background-position: 0 -332px;
}
#placesList .item .marker_9 {
  background-position: 0 -378px;
}
#placesList .item .marker_10 {
  background-position: 0 -423px;
}
#placesList .item .marker_11 {
  background-position: 0 -470px;
}
#placesList .item .marker_12 {
  background-position: 0 -516px;
}
#placesList .item .marker_13 {
  background-position: 0 -562px;
}
#placesList .item .marker_14 {
  background-position: 0 -608px;
}
#placesList .item .marker_15 {
  background-position: 0 -654px;
}
#pagination {
  margin: 10px auto;
  text-align: center;
}
#pagination a {
  display: inline-block;
  margin-right: 10px;
}
#pagination .on {
  font-weight: bold;
  cursor: default;
  color: #777;
}
#flush-collapseOne {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  margin: 80px 0px 0px 0px;
  overflow-y: auto;
}
.accordion-button {
  padding: 1rem 6rem;
  background-color: rgba(255, 255, 255, 0);
}
</style>
