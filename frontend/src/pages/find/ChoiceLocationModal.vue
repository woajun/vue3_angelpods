<script setup lang="ts">
import AIcons from "@/components/AIcons.vue";
import KakaoMap from "@/components/map/KakaoMap.vue";
import { defineEmits, ref } from "vue";

/* global kakao */
const map = ref<kakao.maps.Map>();
const emit = defineEmits<{
  (e: "openModal", openModal: () => void): void;
}>();
const openModal = function () {
  setTimeout(function () {
    map.value?.relayout();
  }, 500);
};

const paintMarker = function (latlng: kakao.maps.LatLng) {
  const geocoder = new kakao.maps.services.Geocoder();
  geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      let detailAddr = result[0].road_address
        ? "<span>" + result[0].road_address.address_name + "</span></br>"
        : "";
      detailAddr +=
        '<span class="jibun gray"> ' +
        result[0].address.address_name +
        "</span>";
      let content =
        '<div class="bAddr" style="font-size:15px;">' +
        '<span class="">습득한 곳이 이곳인가요?</span></br>' +
        '<div class="info pb-0">' +
        detailAddr +
        '</br></div><div class="text-center">' +
        '<button type="button" class="btn btn-dark" data-bs-dismiss="modal" onclick="markerClick()">입력</button>' +
        "</div>" +
        "</div>";
      const markerOption: kakao.maps.MarkerOptions = {
        map: map.value,
        position: latlng,
      };
      new kakao.maps.Marker(markerOption);
    }
  });
};

emit("openModal", openModal);
</script>
<template>
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
          <h5 class="modal-title" id="staticBackdropLabel">위치선택</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <KakaoMap
            id="map"
            @emitMap="(aMap) => (map = aMap)"
            :mapClickEvent="paintMarker"
            :markerSetting="markerSetting"
            :markers="markers"
          />

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
                    <AIcons type="search" />
                  </button>
                </div>
              </form>
            </div>
            <hr />

            <div class="accordion accordion-flush" id="accordionFlushExample">
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
              <AIcons type="location" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
