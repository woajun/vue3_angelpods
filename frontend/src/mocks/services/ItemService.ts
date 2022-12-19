import { ItemCondition, Item } from "@/globals";
import lostItems from "../datas/lostItems";
import categoryService from "./categoryService";

const itemService = {
  getLostItems: (condition: ItemCondition): Item[] => {
    const found = lostItems.filter(
      (i) => i.categoryID === condition.categoryID
    );
    console.log(found);
    return found.map((item) => ({
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
  },
};

export default itemService;
