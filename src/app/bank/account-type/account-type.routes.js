import { requiresAuth } from "@/shared/routes.meta";

import GenericRouterView from "@/shared/components/GenericRouterView.vue";

const accountTypeRoutes = [
  {
    path: "account-types",
    component: GenericRouterView,
    children: [
      {
        path: "/",
        name: "BankAccountTypeList",
        component: () =>
          import(
            /* webpackChunkName: "account-type-list" */ "./account-type-list/AccountTypeList.vue"
          ),
      },
      {
        path: "create",
        name: "BankAccountTypeCreate",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "account-type-create" */ "./account-type-create/AccountTypeCreate.vue"
          ),
      },
    ],
  },
];

export const bankAccountTypeDetailRoutes = [
  {
    path: ":id(\\d+)/edit",
    name: "BankAccountTypeEdit",
    props: route => ({ bankId: route.params.bank_id, id: route.params.id }),
    meta: { ...requiresAuth },
    component: () =>
      import(
        /* webpackChunkName: "account-type-edit" */ "./account-type-edit/AccountTypeEdit.vue"
      ),
  },
  {
    path: ":id(\\d+)",
    name: "BankAccountTypeDetails",
    props: route => ({ bankId: route.params.bank_id, id: route.params.id }),
    component: () =>
      import(
        /* webpackChunkName: "account-type-detail" */ "./account-type-detail/AccountTypeDetail.vue"
      ),
  },
];

export default accountTypeRoutes;
