<script lang="ts" setup>
import BoardItem from "./item/BoardItem.vue";
</script>
<template>
  <div id="layoutSidenav">
    <div id="layoutSidenav_nav" class="bg-light">
      <div class="container">
        <!-- 습득물/분실물 -->
        <div class="row mt-1">
          <div class="col-6 d-grid pe-1">
            <a class="btn btn-secondary" href="#">습득물</a>
          </div>
          <div class="col-6 d-grid ps-1">
            <a class="btn btn-outline-secondary" href="l_list.do">분실물</a>
          </div>
        </div>

        <!-- 검색조건 -->

        <form name="searchForm" action="f_search.do" method="post">
          <div class="row">
            <div class="accordion my-2" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    id="searchAccordionBtn"
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <AIcons type="search" />
                    &nbsp; 검색조건을 설정해주세요.
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <table
                      id="searchTable"
                      class="table"
                      style="padding: 0px; border-color: rgb(255, 255, 255)"
                    >
                      <tbody>
                        <tr>
                          <th class="align-middle" style="width: 40px">분류</th>
                          <td>
                            <div class="input-group mt-1">
                              <select
                                id="cNum"
                                name="cNum"
                                class="form-select"
                                required
                              >
                                <option selected value="%">대분류</option>
                                <!-- <c:forEach items="${cList}" var="cDto">
                                    <option value="${cDto.cNum}">
                                      ${cDto.name}
                                    </option>
                                  </c:forEach> -->
                              </select>
                              <select
                                id="cdNum"
                                name="cdNum"
                                class="form-select"
                                required
                              >
                                <option selected value="%">소분류</option>
                                <!-- <c:forEach items="${cdList}" var="cdDto">
                                    <option
                                      class="cdItems"
                                      value="${cdDto.cdNum}"
                                      label="${cdDto.name}"
                                      hidden="true"
                                    >
                                      ${cdDto.cNum}/${cdDto.needSN}
                                    </option>
                                  </c:forEach> -->
                              </select>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th class="align-middle" style="width: 40px">지역</th>
                          <td>
                            <div class="input-group mt-1 gap-1">
                              <select
                                id="areaSido"
                                name="areaSido"
                                class="form-select"
                                required
                              >
                                <option selected value="%">시/도</option>
                                <!-- <c:forEach items="${area}" var="area">
                                    <option value="${area.sido}">
                                      ${area.sido}
                                    </option>
                                  </c:forEach> -->
                              </select>
                              <select
                                id="areaGue"
                                name="areaGue"
                                class="form-select"
                                required
                              >
                                <option selected value="%">구/군</option>
                                <!-- <c:forEach items="${area}" var="area">
                                    <option
                                      class="gueItems"
                                      value="${area.gue}"
                                      label="${area.gue}"
                                      hidden="true"
                                    >
                                      ${area.sido}/${area.gue}
                                    </option>
                                  </c:forEach> -->
                              </select>
                              <select
                                id="areaDong"
                                name="areaDong"
                                class="form-select"
                                required
                              >
                                <option selected value="%">동/읍</option>
                                <!-- <c:forEach items="${area}" var="area">
                                    <option
                                      class="dongItems"
                                      value="${area.dong}"
                                      label="${area.dong}"
                                      hidden="true"
                                    >
                                      ${area.sido}/${area.gue}/${area.dong}
                                    </option>
                                  </c:forEach> -->
                              </select>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th class="align-middle" style="width: 40px">검색</th>
                          <td>
                            <div class="input-group mt-1">
                              <select
                                name="slcSearch"
                                class="form-select"
                                style="flex: 0.3"
                              >
                                <option value="1" selected>제목</option>
                                <option value="2">내용</option>
                              </select>
                              <input
                                type="text"
                                name="strSearch"
                                class="form-control"
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="d-grid col-6 mx-auto mt-1">
                      <button type="submit" class="btn btn-primary">
                        검색
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <!-- 검색결과 -->
        <div style="position: relative; bottom: 0">
          <div id="board">
            <div class="scrollarea">
              <BoardItem></BoardItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.left-board {
  width: 400px;
}
#curPositionBtn {
  position: fixed;
  right: 4vh;
  top: 80px;
}

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

  #map {
    transform: translateX(240px);
  }
}

/* index 버튼 노랑색------------------------------------------------------ */

.btn-primary {
  color: #fff;
  background-color: #ffc800;
  border-color: #ffc800;
}
.btn-primary:hover {
  color: #fff;
  background-color: #d9aa00;
  border-color: #cca000;
}

.btn-check:focus + .btn-primary,
.btn-primary:focus {
  color: #fff;
  background-color: #d9aa00;
  border-color: #cca000;
  box-shadow: 0 0 0 0.25rem rgba(255, 208, 38, 0.5);
}

.make-contents-btn {
  /* position: absolute; */
  left: 80%;
  bottom: 10%;
  width: 100px;
  /* float : right; */
}

/* 숨기기 */
.hide {
  display: none;
}

a {
  text-decoration: none;
  color: rgb(20, 20, 20);
}
a:hover {
  text-decoration: none;
  color: gray;
}

/* 지도안에 인포박스 css */
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.wrap .btn-outline-secondary {
  font-size: 0.775rem;
}
.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  overflow: hidden;
}
.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
/* .info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')} */
.info .link {
  color: #5085bb;
}

#searchTable.table {
  margin-bottom: 0rem;
}

#searchTable.table > :not(caption) > * > * {
  padding: 0.1rem 0.1rem;
}

#searchAccordionBtn {
  padding: 0.7rem 1.25rem;
}

#board {
  display: flex;
  width: 100%;
  height: 75vh;
  height: -webkit-fill-available;
  max-height: 75vh;
  overflow-y: hidden;
}

.scrollarea {
  overflow-y: auto;
  width: 100%;
}

.overflow {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 250px;
}

.boardItem .btn-outline-secondary {
  font-size: 0.775rem;
}

/* ----------------bottom nav ------------------*/
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
  margin: 70px 0 200px 5px;
  padding: 5px;
  overflow-y: hidden;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
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
#placesList .item h5,
#placesList .item .info {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
#placesList .item .info {
  padding: 10px 0 10px 5px;
}
#placesList .info .gray {
  color: #8a8a8a;
}
#placesList .info .jibun {
  padding-left: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png)
    no-repeat;
}
#placesList .info .tel {
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
@media (min-width: 768px) {
  #menu_wrap {
    transform: translateX(400px);
  }
}
</style>
