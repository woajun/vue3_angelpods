import categories from "../datas/categories";
const categoryRepository = {
  findById(id: number) {
    return categories.find((c) => c.id === id);
  },
  findBySearchName(searchName: string) {
    return categories.filter((c) => c.searchName.includes(searchName));
  },
};

export default categoryRepository;
