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
        if (!content) return;
        const marker = new kakao.maps.Marker({
          position: map.getCenter(),
        });
        marker.setMap(map);
        kakao.maps.event.addListener(marker, "click", function () {
          const overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: marker.getPosition(),
          });
          overlay.setMap(map);
          overlays.push(overlay);
        });
        break;
      }
      default: {
        console.log("nothing event");
      }
    }
  }
}
