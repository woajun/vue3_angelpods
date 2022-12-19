<script setup lang="ts">
import AIcons from "@/components/AIcons.vue";
import { Category } from "@/globals";
import categoryService from "@/mocks/services/categoryService";
import { ref } from "vue";

// computed를 사용하면 한글 입력시 한 글자가 모두 채워져야 검색이 됨.
const categories = ref<Category[][]>([]);

const doSearchCategories = (e: Event) => {
  const word = (e.target as HTMLInputElement).value;

  categories.value = categoryService.search(word);
};
</script>
<template>
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
                    <th class="align-middle" style="width: 40px">카테고리</th>
                    <td>
                      <div class="input-group mt-1">
                        <input
                          class="form-control"
                          @input="doSearchCategories"
                        />
                      </div>
                      <ul>
                        <li v-for="(cList, i) in categories" :key="i">
                          <span v-for="(c, idx) in cList" :key="c.id">
                            <span v-if="idx !== 0">></span>{{ c.name }}
                          </span>
                        </li>
                      </ul>
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
                        </select>
                        <select
                          id="areaGue"
                          name="areaGue"
                          class="form-select"
                          required
                        >
                          <option selected value="%">구/군</option>
                        </select>
                        <select
                          id="areaDong"
                          name="areaDong"
                          class="form-select"
                          required
                        >
                          <option selected value="%">동/읍</option>
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
                <button type="submit" class="btn btn-primary">검색</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
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

#searchTable.table {
  margin-bottom: 0rem;
}

#searchTable.table > :not(caption) > * > * {
  padding: 0.1rem 0.1rem;
}

#searchAccordionBtn {
  padding: 0.7rem 1.25rem;
}
</style>
