interface Condition {
  category: number;
}

const itemService = {
  getLostItems: (conditions: Condition[]) => {
    return conditions;
  },
};

export default itemService;
