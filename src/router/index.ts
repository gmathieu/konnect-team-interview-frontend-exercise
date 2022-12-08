import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/ServiceHubPage.vue"),
    },
    {
      path: "/service/:serviceId",
      name: "service",
      component: () => import("../views/ServiceItemPage.vue"),
      props: true,
    },
  ],
});

export default router;
