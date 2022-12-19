import { Category } from "@/globals";
import categories from "../datas/categories";

const categoryService = {
  search: (word: string) => {
    const spacingRemoved = word.replaceAll(" ", "");
    return categories.filter((c) => c.searchName.includes(spacingRemoved));
  },

  getCategory: (id: number): Category[] => {
    const result: Category[] = [];

    let target: number | null = id;
    let flag = true;
    while (flag) {
      const found = categories.find((c) => c.id === target);

      if (found === undefined) {
        flag = false;
        break;
      }

      result.push({
        id: found.id,
        name: found.name,
      });

      target = found.parent;
    }

    return result.reverse();
  },
};

export default categoryService;
