export default [
  {
    path: "/",
    component: () => import("../pages/find/FindList.vue"),
  },
  {
    path: "/find/create",
    component: () => import("../pages/find/ChoiceLocation.vue"),
  },
];
