import { ItemCondition, Item } from "@/globals";
import lostItems from "../datas/lostItems";

const itemService = {
  getLostItems: (condition: ItemCondition) => {
    return lostItems.filter(
      (i: Item) =>
        i.category.findIndex((c) => c.id === condition.categoryID) > -1
    );
  },
};

export default itemService;
