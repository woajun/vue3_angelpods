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
  category: Category[];
  title: string;
  img: string;
  address: string;
  detail: string;
  latlng: LatLng;
  chat: number;
  date: string;
}

interface ItemCondition {
  categoryID: number;
}

export { Item, Category, LatLng, ItemCondition };
