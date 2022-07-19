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
              <!-- <c:forEach items="${list}" var="dto"> -->
              <!-- <div class="boardItem list-group-item list-group-item-action py-1 mb-1">
                    <div class="row">
                      <div class="col-3 align-items-center d-flex px-1">
                        <img  class="rounded"  src="${pageContext.request.contextPath}/images/findBoard/${dto.thumbnailImage}" alt="..." width=80px height=80px/>
                      </div>
                      <div class="col-9 ps-2">
                          <div class="d-flex align-items-center justify-content-between">
                            <small class="text-muted overflow" style="width: 160px; height: 20px;">
                              ${dto.cName}<span> &#183; </span>${dto.cdName} </small><br/>
                            <small class="date text-muted"></small>
                          </div>
                          <strong class=" overflow" style="width: 240px; height: 20px;">${dto.title}</strong>
                          <div class="d-flex align-items-center justify-content-between">
                            <small class="text-muted">${dto.gue} ${dto.dong} </small><br/>
                          </div>
                          <small class="overflow" style="width: 240px;height: 20px;">${dto.addrDetail}</small>
                          <div class="d-flex align-items-center justify-content-between my-1">
                            <small class="text-muted">채팅 ${dto.chatHit}</small>
                            <button class="btn btn-sm btn-outline-secondary me-1" onclick="location.href='f_content_view.do?fbNum=${dto.fbNum}'" style="line-height:1;"> 게시물보기 </button>
                          </div>
                      </div>
                    </div>
                    <input type="hidden" class = "fbNum" value="${dto.fbNum}">
                    <input type="hidden" class = "userId" value="${dto.userId}">
                    <input type="hidden" class = "thumbnailImage" value="${pageContext.request.contextPath}/images/findBoard/${dto.thumbnailImage}">
                    <input type="hidden" class = "timestamp" value="${dto.timestamp}">
                    <input type="hidden" class = "sido" value="${dto.sido}">
                    <input type="hidden" class = "gue" value="${dto.gue}">
                    <input type="hidden" class = "dong" value="${dto.dong}">
                    <input type="hidden" class = "addrDetail" value="${dto.addrDetail}">
                    <input type="hidden" class = "title" value="${dto.title}">
                    <input type="hidden" class = "contents" value="${dto.contents}">
                    <input type="hidden" class = "sn" value="${dto.sn}">
                    <input type="hidden" class = "lat" value="${dto.lat}">
                    <input type="hidden" class = "lng" value="${dto.lng}">
                    <input type="hidden" class = "hit" value="${dto.hit}">
                    <input type="hidden" class = "chatHit" value="${dto.chatHit}">
                    <input type="hidden" class = "fState" value="${dto.fState}">
                  </div> -->
              <!-- </c:forEach> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
