interface OverlayOption {
  title?: string;
  imgUrl?: string;
  message?: string;
  address?: string;
  url?: string;
}
export default class KakaoMap {
  map: kakao.maps.Map | undefined;
  latlngs: kakao.maps.LatLng[];
  markers: kakao.maps.Marker[];
  overlays: kakao.maps.CustomOverlay[];
  constructor() {
    this.map = undefined;
    this.latlngs = [];
    this.markers = [];
    this.overlays = [];
  }
  set container(container: HTMLDivElement) {
    this.map = new window.kakao.maps.Map(container, {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    });
  }

  setCenter(lat: number, lng: number) {
    this.map?.setCenter(new kakao.maps.LatLng(lat, lng));
  }

  relayout() {
    setTimeout(() => this.map?.relayout(), 50);
    setTimeout(() => this.map?.relayout(), 100);
    setTimeout(() => this.map?.relayout(), 200);
    setTimeout(() => this.map?.relayout(), 300);
  }

  setClickEvent(type: string, overlayOption?: OverlayOption) {
    if (!this.map) return;
    switch (type) {
      case "single-marker": {
        singleMarkerEvent(this.map);
        break;
      }
      case "multi-markers": {
        multiMarkerEvent(this.map, this.markers);
        break;
      }
      case "custom-overlay": {
        customOverlay(this.map, this.overlays);
        break;
      }
      default: {
        console.log("nothing event");
      }
    }
  }
}
function singleMarkerEvent(map: kakao.maps.Map) {
  const marker = new kakao.maps.Marker({
    position: map.getCenter(),
  });
  marker.setMap(map);
  kakao.maps.event.addListener(
    map,
    "click",
    function (e: kakao.maps.event.MouseEvent) {
      const latlng = e.latLng;
      marker.setPosition(latlng);
    }
  );
}

function multiMarkerEvent(map: kakao.maps.Map, markers: kakao.maps.Marker[]) {
  kakao.maps.event.addListener(
    map,
    "click",
    function (e: kakao.maps.event.MouseEvent) {
      const marker = new kakao.maps.Marker({
        position: e.latLng,
      });
      marker.setMap(map);
      markers.push(marker);
    }
  );
}

function customOverlay(
  map: kakao.maps.Map,
  overlays: kakao.maps.CustomOverlay[]
) {
  const customOverlay = `
<div class="wrap">
      <div class="info">
          <div class="title">
              {op.title}
              <div class="close" title="닫기"></div>
          </div>
          <div class="body">
              <div class="img">
                  <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">
             </div>
              <div class="desc">
                  <div class="ellipsis">{op.message}</div>
                  <div class="jibun ellipsis">{op.address}</div>
                  <div><a href="{op.url}" target="_blank" class="link">홈페이지</a></div>
              </div>
          </div>
      </div>
  </div>`;

  const marker = new kakao.maps.Marker({
    position: map.getCenter(),
  });
  marker.setMap(map);

  const newDiv = document.createElement("div");
  const parse = new DOMParser().parseFromString(customOverlay, "text/html");
  const content = parse.childNodes[0].childNodes[1].childNodes[0];
  const closeBtn = content.childNodes[1].childNodes[1].childNodes[1];
  closeBtn.addEventListener("click", () => {
    overlays[0].setMap(null);
    overlays.pop();
  });
  newDiv.appendChild(content);

  kakao.maps.event.addListener(marker, "click", function () {
    const overlay = new kakao.maps.CustomOverlay({
      content: newDiv,
      map: map,
      position: marker.getPosition(),
    });

    overlay.setMap(map);
    overlays.push(overlay);
  });
}
