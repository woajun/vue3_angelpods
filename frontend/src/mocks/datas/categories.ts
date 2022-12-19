interface DBCategory {
  id: number;
  parent: number | null;
  name: string;
  searchName: string;
}

const categories: DBCategory[] = [
  {
    id: 1,
    parent: null,
    name: "무선이어폰",
    searchName: "무선이어폰",
  },
  {
    id: 2,
    parent: 1,
    name: "에어팟",
    searchName: "무선이어폰에어팟",
  },
  {
    id: 3,
    parent: 2,
    name: "2세대",
    searchName: "무선이어폰에어팟2세대",
  },
  {
    id: 4,
    parent: 2,
    name: "3세대",
    searchName: "무선이어폰에어팟3세대",
  },
];

export default categories;
export { DBCategory };
