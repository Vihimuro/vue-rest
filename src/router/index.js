import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/NotFound.vue";
import Unauthorized from "../views/Unauthorized.vue";

import Role from "../models/role";
import Store from "../store";

const routes = [
  {
    path: "/",
    name: "login-name",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/login",
    name: "login-name",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register-name",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/profile",
    name: "profile-name",
    component: () => import("../views/Profile.vue"),
    meta: { roles: [Role.ADMIN, Role.USER] },
  },
  {
    path: "/home",
    name: "home-name",
    component: () => import("../views/Home.vue"),
    meta: { roles: [Role.ADMIN] },
  },
  {
    path: "/404",
    name: "not-found",
    component: NotFound,
  },
  {
    path: "/401",
    name: "unauthorized-name",
    component: Unauthorized,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const { roles } = to.meta;
  const currentUser = Store.getters["user"];

  if (roles) {
    if (!currentUser) {
      return next({ path: "/login" });
    }

    if (roles.length && !roles.includes(currentUser.role)) {
      return next({ path: "/401" });
    }
  }

  next();
});

export default router;
