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

  setClickEvent(type: string, content?: string) {
    if (!this.map) return;
    const markers = this.markers;
    const map = this.map;
    const overlays = this.overlays;
    switch (type) {
      case "single-marker": {
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
        break;
      }
      case "multi-markers": {
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
        break;
      }
      case "custom-overlay": {
        const marker = new kakao.maps.Marker({
          position: map.getCenter(),
        });
        marker.setMap(map);

        const newDiv = document.createElement("div");
        const newContent = document.createTextNode("안녕?");
        newDiv.appendChild(newContent);

        const customContent = new DOMParser().parseFromString(
          `
<div class="wrap">
      <div class="info">
          <div class="title">
              카카오 스페이스닷원
              <div class="close" onclick="closeOverlay()" title="닫기"></div>
          </div>
          <div class="body">
              <div class="img">
                  <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">
             </div>
              <div class="desc">
                  <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                  <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                  <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>
              </div>
          </div>
      </div>
  </div>`,
          "text/html"
        );

        const htmlNode = customContent.childNodes[0];
        const bodyNode = htmlNode.childNodes[1];
        const banana = bodyNode.childNodes[0];
        console.log(banana);
        if (banana) {
          newDiv.appendChild(banana);
        }

        kakao.maps.event.addListener(marker, "click", function () {
          const overlay = new kakao.maps.CustomOverlay({
            content: newDiv,
            map: map,
            position: marker.getPosition(),
          });

          overlay.setMap(map);
          overlays.push(overlay);
        });
        break;
      }
      case "overlay": {
        console.log("aa");
        class Overlay extends kakao.maps.AbstractOverlay {
          position: kakao.maps.LatLng;
          node: HTMLElement;

          constructor(position: kakao.maps.LatLng) {
            super();
            this.position = position;
            this.node = document.createElement("div");

            const customContent = new DOMParser().parseFromString(
              `
<div class="wrap">
      <div class="info">
          <div class="title">
              카카오 스페이스닷원
              <div class="close" onclick="closeOverlay()" title="닫기"></div>
          </div>
          <div class="body">
              <div class="desc">
                  <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                  <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                  <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>
              </div>
          </div>
      </div>
  </div>`,
              "text/html"
            );

            const htmlNode = customContent.childNodes[0];
            const bodyNode = htmlNode.childNodes[1];
            const banana = bodyNode.childNodes[0];
            this.node.appendChild(banana);

            // this.node.appendChild(document.createTextNode(text));
          }

          public onAdd(): void {
            const panel = this.getPanels().overlayLayer;
            panel.appendChild(this.node);
          }

          public onRemove(): void {
            this.node.parentNode?.removeChild(this.node);
          }

          public draw(): void {
            const projection = this.getProjection();
            const point = projection.pointFromCoords(this.position);
            const width = this.node.offsetHeight;
            const height = this.node.offsetHeight;

            // this.node.style.left = point.x - width / 2 + "px";
            // this.node.style.top = point.x - height / 2 + "px";
          }
        }

        const marker = new Overlay(this.map.getCenter());
        marker.setMap(map);

        break;
      }
      default: {
        console.log("nothing event");
      }
    }
  }
}
