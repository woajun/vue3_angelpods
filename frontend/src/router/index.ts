export default [
  {
    path: "/",
    component: () => import("../pages/item/list/ItemList.vue"),
  },
  {
    path: "/regist",
    component: () => import("../pages/item/regist/ItemRegist.vue"),
  },
];
