import categories from "../datas/categories";

const categoryService = {
  search: (word: string) => {
    const spacingRemoved = word.replaceAll(" ", "");
    return categories.filter((c) => c.searchName.includes(spacingRemoved));
  },
};

export default categoryService;
