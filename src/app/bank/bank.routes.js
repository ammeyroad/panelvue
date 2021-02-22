import { requiresAuth } from "@/shared/routes.meta";

import GenericRouterView from "@/shared/components/GenericRouterView.vue";

import Bank from "./Bank.vue";
import bankBranchRoutes, {
  bankBranchDetailRoutes,
} from "./bank-branch/bank-branch.routes";
import bankAccountTypeRoutes, {
  bankAccountTypeDetailRoutes,
} from "./account-type/account-type.routes";
import { customerAccountDetailRoutes } from "../customer/customer-account/customer-account.routes";

const bankRoutes = [
  {
    path: "/banks",
    component: Bank,
    children: [
      {
        path: "/",
        name: "BankList",
        component: () =>
          import(
            /* webpackChunkName: "bank-list" */ "./bank-list/BankList.vue"
          ),
      },
      {
        path: "create",
        name: "BankCreate",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "bank-create" */ "./bank-create/BankCreate.vue"
          ),
      },
      ...bankBranchRoutes,
      {
        path: ":bank_id(\\d+)/branches",
        name: "BankBranchDetail",
        component: GenericRouterView,
        children: [...bankBranchDetailRoutes],
      },
      ...bankAccountTypeRoutes,
      {
        path: ":bank_id(\\d+)/account-types",
        name: "BankAccountTypeDetail",
        component: GenericRouterView,
        children: [...bankAccountTypeDetailRoutes],
      },
      {
        path: ":bank_id(\\d+)/customers",
        component: GenericRouterView,
        children: [
          {
            path: ":customer_id(\\d+)",
            component: GenericRouterView,
            children: [
              {
                path: "accounts",
                component: GenericRouterView,
                children: [...customerAccountDetailRoutes],
              },
            ],
          },
        ],
      },
      {
        path: ":id(\\d+)",
        name: "BankDetails",
        props: route => ({ id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "bank-details" */ "./bank-details/BankDetails.vue"
          ),
      },
      {
        path: ":id(\\d+)/edit",
        name: "BankEdit",
        meta: { ...requiresAuth },
        props: route => ({ id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "bank-edit" */ "./bank-edit/BankEdit.vue"
          ),
      },
    ],
  },
];

export default bankRoutes;
