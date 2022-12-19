import { ItemCondition, Item } from "@/globals";
import lostItems, { DBItem } from "../datas/lostItems";
import categoryService from "./categoryService";

function convertDBItemToItem(dbItems: DBItem[]) {
  return dbItems.map((item) => ({
    id: item.id,
    category: categoryService.getCategory(item.categoryID),
    title: item.title,
    img: item.img,
    address: item.address,
    detail: item.detail,
    latlng: { latitude: item.latitude, longitude: item.longitude },
    chat: item.chat,
    date: item.date,
  }));
}

const itemService = {
  getLostItems: (condition: ItemCondition): Item[] => {
    const filtered = lostItems;
    return convertDBItemToItem(lostItems);
  },
};

export default itemService;
