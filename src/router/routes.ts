import { ACCESS_ENUM } from "../access/accessEnum.ts";
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    meta: {
      title: "主页",
    },
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "关于",
    meta: {
      title: "关于",
    },
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/admin/user",
    name: "用户管理",
    component: () => import("../layouts/BasicLayout.vue"),
    meta: {
      access: ACCESS_ENUM.ADMIN,
      requiresAuth: true, // 是否不需要基础布局
    },
    children: [
      {
        path: "/admin/user/list",
        name: "用户列表",
        component: () => import("../views/admin/user/UserListPage.vue"),
        meta: {
          title: "用户列表",
        },
      },
    ],
  },
  {
    path: "/noAuth",
    name: "无权限",
    meta: {
      title: "无权限",
      hideInMenu: true,
    },
    component: () => import("../views/NoAuth.vue"),
  },
  {
    path: "/user",
    name: "用户",
    component: () => import("../layouts/UserLayout.vue"),
    meta: {
      title: "用户",
      hideInMenu: true,
      requiresAuth: true, // 是否不需要基础布局
    },
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: () => import("../views/user/UserLoginPage.vue"),
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: () => import("../views/user/UserRegisterPage.vue"),
      },
    ],
  },
];

export default routes;
