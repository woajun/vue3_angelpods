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
  }
  set center(latlng: number[]) {
    this.map?.setCenter(new kakao.maps.LatLng(latlng[0], latlng[1]));
  }
}
