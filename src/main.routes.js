import _ from "lodash";

import Vue from "vue";
import VueRouter from "vue-router";

import accountApplicationRoutes from "@/app/account-application/account-application.routes";
import bankRoutes from "@/app/bank/bank.routes";

import customerRoutes from "@/app/customer/customer.routes";
import homeRoutes from "@/app/home/home.routes";
import loanApplicationRoutes from "@/app/loan-application/loan-application.routes";
import loginRoutes from "@/app/login/login.routes";
import usersRoutes from "@/app/users/users.routes";
import notFoundRoutes from "@/app/not-found/not-found.routes";
import pelatihanRoutes from "@/app/pelatihan/pelatihan.routes";



import store from "@/store";

Vue.use(VueRouter);

const routes = [
  ...accountApplicationRoutes,
  ...bankRoutes,
  ...customerRoutes,
  ...homeRoutes,
  ...loanApplicationRoutes,
  ...loginRoutes,
  ...usersRoutes,
  ...notFoundRoutes,
  ...pelatihanRoutes,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(...[, , savedPosition]) {
    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => _.get(record, "meta.requiresAuth", false))) {
    if (!store.getters.isLoggedIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
