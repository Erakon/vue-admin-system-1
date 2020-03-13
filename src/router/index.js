import Vue from "vue";
import VueRouter from "vue-router";
import IndexPage from "@/views/index";
import LoginPage from "@/views/login";
import ContentBody from "@/components/content-body";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    name: "index",
    path: "/index",
    components: {
      index: IndexPage
    },
    // 重定向到首屏
    redirect: "index/contentBody/firstScreen",
    props: {
      index: true
    },
    children: [
      {
        name: "contentBody",
        path: "contentBody",
        components: {
          contentBody: ContentBody
        },
        props: {
          contentBody: true
        },
        children: [
          {
            name: "firstScreen",
            path: "firstScreen",
            component: () => import("@/views/first-screen")
          },
          {
            name: "sysUserSearch",
            path: "sysUserSearch",
            component: () => import("@/views/sys-user-list-page")
          },
          {
            name: "sysPersonSearch",
            path: "sysPersonSearch",
            component: () => import("@/views/user-list-page")
          }
        ]
      }
    ]
  },
  {
    name: "login",
    path: "/login",
    components: {
      login: LoginPage
    }
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
