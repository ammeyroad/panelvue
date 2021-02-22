import { requiresAuth } from "@/shared/routes.meta";

import AccountApplication from "./AccountApplication.vue";

const accountApplicationRoutes = [
  {
    path: "/account-applications",
    component: AccountApplication,
    children: [
      {
        path: "/",
        name: "AccountApplicationList",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "account-application-list" */ "./account-application-list/AccountApplicationList.vue"
          ),
      },
      {
        path: "create",
        name: "AccountApplicationCreate",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "account-application-create" */ "./account-application-create/AccountApplicationCreate.vue"
          ),
      },
      {
        path: ":bank_id/:id",
        name: "AccountApplicationDetails",
        meta: { ...requiresAuth },
        props: route => ({ bankId: route.params.bank_id, id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "account-application-detail" */ "./account-application-detail/AccountApplicationDetail.vue"
          ),
      },
      {
        path: ":bank_id/:id/edit",
        name: "AccountApplicationEdit",
        meta: { ...requiresAuth },
        props: route => ({ bankId: route.params.bank_id, id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "account-application-edit" */ "./account-application-edit/AccountApplicationEdit.vue"
          ),
      },
    ],
  },
];

export default accountApplicationRoutes;
