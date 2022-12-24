interface LatLng {
  latitude: number;
  longitude: number;
}

interface Category {
  id: number;
  name: string;
}

type Categories = Category[];

interface Item {
  id: number;
  categories: Categories;
  title: string;
  img: string;
  address: string;
  detail: string;
  latlng: LatLng;
  chat: number;
  date: Date;
}

interface ItemCondition {
  categoryIDs: number[];
}

export { Item, Categories, LatLng, ItemCondition };
