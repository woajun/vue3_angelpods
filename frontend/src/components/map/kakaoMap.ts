export default class KakaoMap {
  map: kakao.maps.Map | undefined;
  constructor() {
    this.map = undefined;
  }
  set container(container: HTMLDivElement) {
    this.map = new window.kakao.maps.Map(container, {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    });

    const marker = new kakao.maps.Marker({
      position: this.map.getCenter(),
    });
    marker.setMap(this.map);

    kakao.maps.event.addListener(
      this.map,
      "click",
      function (mouseEvent: kakao.maps.event.MouseEvent) {
        const latlng = mouseEvent.latLng;
        console.log(latlng);
        marker.setPosition(latlng);
      }
    );
  }
  setCenter(lat: number, lng: number) {
    this.map?.setCenter(new kakao.maps.LatLng(lat, lng));
  }
  clickEvent() {
    console.log("mapclick");
  }
}
