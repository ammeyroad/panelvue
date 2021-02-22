import { requiresAuth } from "@/shared/routes.meta";
import { canEdit, canView, canCreate, canViewAll } from "./users.auth";

import Swal from "sweetalert2"; // TODO refactor alert
import Users from "./Users.vue";

const customerRoutes = [
  {
    path: "/users",
    component: Users,
    children: [
      {
        path: "/",
        name: "UsersList",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "users-list" */ "./users-list/UsersList.vue"
          ),
        beforeEnter: (to, from, next) => {
          const authorized = canViewAll();
          if (!authorized) {
            Swal.fire({
              title: "Otorisasi Gagal!",
              text: "Anda tidak punya otorisasi untuk mengakses halaman ini!",
              icon: "error",
            });
            next(false);
          } else {
            next();
          }
        },
      },
      {
        path: "create",
        name: "UserCreate",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "user-create" */ "./user-create/UserCreate.vue"
          ),
        beforeEnter: (to, from, next) => {
          const authorized = canCreate();
          if (!authorized) {
            Swal.fire({
              title: "Otorisasi Gagal!",
              text: "Anda tidak punya otorisasi untuk mengakses halaman ini!",
              icon: "error",
            });
            next(false);
          } else {
            next();
          }
        },
      },
      {
        path: ":id",
        name: "UserDetails",
        meta: { ...requiresAuth },
        props: route => ({ id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "user-details" */ "./user-details/UserDetails.vue"
          ),
        beforeEnter: (to, from, next) => {
          const authorized = canView();
          if (!authorized) {
            Swal.fire({
              title: "Otorisasi Gagal!",
              text: "Anda tidak punya otorisasi untuk mengakses halaman ini!",
              icon: "error",
            });
            next(false);
          } else {
            next();
          }
        },
      },
      {
        path: ":id/edit",
        name: "UserEdit",
        meta: { ...requiresAuth },
        props: route => ({ id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "user-edit" */ "./user-edit/UserEdit.vue"
          ),
        beforeEnter: (to, from, next) => {
          const authorized = canEdit();
          if (!authorized) {
            Swal.fire({
              title: "Otorisasi Gagal!",
              text: "Anda tidak punya otorisasi untuk mengakses halaman ini!",
              icon: "error",
            });
            next(false);
          } else {
            next();
          }
        },
      },
      {
        path: ":id/roles",
        name: "UserRoles",
        meta: { ...requiresAuth },
        props: route => ({ id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "user-roles" */ "./user-roles/UserRoles.vue"
          ),
        beforeEnter: (to, from, next) => {
          const authorized = canEdit();
          if (!authorized) {
            Swal.fire({
              title: "Otorisasi Gagal!",
              text: "Anda tidak punya otorisasi untuk mengakses halaman ini!",
              icon: "error",
            });
            next(false);
          } else {
            next();
          }
        },
      },
      {
        path: ":id/auths",
        name: "UserAuths",
        meta: { ...requiresAuth },
        props: route => ({ id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "user-auths" */ "./user-auths/UserAuths.vue"
          ),
        beforeEnter: (to, from, next) => {
          const authorized = canView();
          if (!authorized) {
            Swal.fire({
              title: "Otorisasi Gagal!",
              text: "Anda tidak punya otorisasi untuk mengakses halaman ini!",
              icon: "error",
            });
            next(false);
          } else {
            next();
          }
        },
      },
      {
        path: ":id/tokens",
        name: "UserTokens",
        meta: { ...requiresAuth },
        props: route => ({ id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "user-tokens" */ "./user-tokens/UserTokens.vue"
          ),
        beforeEnter: (to, from, next) => {
          const authorized = canView();
          if (!authorized) {
            Swal.fire({
              title: "Otorisasi Gagal!",
              text: "Anda tidak punya otorisasi untuk mengakses halaman ini!",
              icon: "error",
            });
            next(false);
          } else {
            next();
          }
        },
      },
    ],
  },
];

export default customerRoutes;
