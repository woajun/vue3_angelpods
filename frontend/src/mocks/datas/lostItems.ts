interface DBItem {
  id: number;
  categoryID: number;
  title: string;
  img: string;
  address: string;
  detail: string;
  latitude: number;
  longitude: number;
  chat: number;
  date: string;
}

const lostItems: DBItem[] = [
  {
    id: 1,
    categoryID: 3,
    title: "에어팟주웠어요",
    img: "",
    address: "서울시 응봉동",
    detail: "",
    latitude: 37.552750666861805,
    longitude: 127.03128847657167,
    chat: 5,
    date: "2022-12-19 15:33:27",
  },
  {
    id: 2,
    categoryID: 4,
    title: "3세대 에어팟",
    img: "",
    address: "서울시 왕십리동",
    detail: "",
    latitude: 37.55701406375508,
    longitude: 127.0333868393793,
    chat: 9,
    date: "2022-12-19 16:32:01",
  },
];

export default lostItems;
export { DBItem };
