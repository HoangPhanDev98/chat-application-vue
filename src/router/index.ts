import { checkAuth } from "@/utils";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "CreateRoom",
    component: () =>
      import(
        /* webpackChunkName: "CreateRoom" */ "../views/chat/CreateRoom.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/chat/:id",
    name: "Chat",
    component: () =>
      import(/* webpackChunkName: "Chat" */ "../views/chat/Chat.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/auth/Login.vue"),
  },
  {
    path: "/auth/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "Signup" */ "../views/auth/Signup.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = checkAuth();
    if (to.name !== "Login" && !isAuthenticated) {
      next({ name: "Login", query: { redirect: to.fullPath } });
    } else if (
      (to.name === "Login" || to.name === "Login") &&
      isAuthenticated
    ) {
      next({ name: "CreateRoom" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
