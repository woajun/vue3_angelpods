export default [
  {
    path: "/",
    component: () => import("../pages/item/list/MainBoard.vue"),
  },
  {
    path: "/regist",
    component: () => import("../pages/item/regist/ItemRegist.vue"),
  },
  {
    path: "/admin",
    component: () => import("../pages/admin/AdminIndex.vue"),
  },
];
