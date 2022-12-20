interface LatLng {
  latitude: number;
  longitude: number;
}

interface Category {
  id: number;
  name: string;
}

interface Item {
  id: number;
  categories: Category[];
  title: string;
  img: string;
  address: string;
  detail: string;
  latlng: LatLng;
  chat: number;
  date: string;
}

interface ItemCondition {
  categoryIDs: number[];
}

export { Item, Category, LatLng, ItemCondition };
