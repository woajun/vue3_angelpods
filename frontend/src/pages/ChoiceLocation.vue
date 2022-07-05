<script lang="ts" setup>
"a";
</script>
<template>
  <!-- nav -->
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top px-3">
    <a class="navbar-brand" href="../index.jsp">Angel Pods</a>
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
    </div>

    <div class="navbar-collapse collapse" id="navbarsExample03">
      <ul class="navbar-nav me-auto mb-2 mb-sm-0">
        <li class="nav-item">
          <a class="nav-link text-white" href="../find/list_view.jsp"
            >습득물보기</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#">분실물보기</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="f_write_view.do">습득신고</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#">분실신고</a>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        class="bi bi-camera-fill mt-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                        />
                        <path
                          d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"
                        /></svg
                      ><br />
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
              <label class="fw-bold">위치</label>
              <button
                type="button"
                class="form-control form-control-hover"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onclick="openMap();"
              >
                <div class="row justify-content-between">
                  <div class="col-8 text-start">
                    <span id="sidoGueDong"> 습득 장소를 선택하세요. </span>

                    <input
                      type="hidden"
                      id="lat"
                      name="lat"
                      value="${dto.lat}"
                    />
                    <input
                      type="hidden"
                      id="lng"
                      name="lng"
                      value="${dto.lng}"
                    />
                    <input
                      type="hidden"
                      id="sido"
                      name="sido"
                      value="${dto.sido}"
                    />
                    <input
                      type="hidden"
                      id="gue"
                      name="gue"
                      value="${dto.gue}"
                    />
                    <input
                      type="hidden"
                      id="dong"
                      name="dong"
                      value="${dto.dong}"
                    />
                  </div>
                  <div class="col-4 text-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      class="bi bi-arrow-right-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            <!-- Modal -->
            <div
              class="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      위치선택
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div id="map"></div>

                    <div id="menu_wrap" class="bg_white">
                      <div class="option">
                        <form onsubmit="searchPlaces(); return false;">
                          <div class="input-group">
                            <input
                              type="text"
                              class="form-control"
                              value="이태원 맛집"
                              id="keyword"
                              size="15"
                            />
                            <button
                              class="btn btn-outline-dark"
                              type="button"
                              onclick="searchPlaces();"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-search"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                                />
                              </svg>
                            </button>
                          </div>
                        </form>
                      </div>
                      <hr />

                      <div
                        class="accordion accordion-flush"
                        id="accordionFlushExample"
                      >
                        <div
                          class="accordion-item"
                          style="background-color: rgba(255, 255, 255, 0)"
                        >
                          <h2 class="accordion-header" id="flush-headingOne">
                            <button
                              id="placesListBtn"
                              class="accordion-button collapsed py-0"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                            >
                              접기/펴기
                            </button>
                          </h2>
                          <div
                            id="flush-collapseOne"
                            class="accordion-collapse collapse"
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <ul id="placesList"></ul>
                            <div id="pagination"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="curBtn text-end">
                      <button
                        type="button"
                        class="btn btn-dark"
                        onclick="curPositionBtn()"
                      >
                        현위치
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-geo-alt-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
