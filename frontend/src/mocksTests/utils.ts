const UTILS = {
  copy: function <T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  },
};

export default UTILS;
