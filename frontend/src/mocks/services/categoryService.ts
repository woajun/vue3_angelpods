import { Categories } from "@/globals";
import categoryRepository from "../repositories/categoryRepository";

const categoryService = {
  categoryRepository: categoryRepository,
  search: function (word: string): Categories[] {
    const spacingRemoved = word.replaceAll(" ", "");

    if (!spacingRemoved) {
      return [];
    }

    const filtered = categoryRepository.findBySearchName(spacingRemoved);

    return filtered.map((e) => this.getCategory(e.id));
  },

  getCategory: (id: number): Categories => {
    const result: Categories = [];

    let target: number | null = id;
    let flag = true;
    while (flag) {
      if (!target) {
        flag = false;
        break;
      }

      const found = categoryRepository.findById(target);

      if (!found) {
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
