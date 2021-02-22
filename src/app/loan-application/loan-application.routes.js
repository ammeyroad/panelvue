import { requiresAuth } from "@/shared/routes.meta";

import LoanApplication from "./LoanApplication.vue";

const loanApplicationRoutes = [
  {
    path: "/loan-applications",
    component: LoanApplication,
    children: [
      {
        path: "/",
        name: "LoanApplicationList",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "loan-application-list" */ "./loan-application-list/LoanApplicationList.vue"
          ),
      },
      {
        path: "create",
        name: "LoanApplicationCreate",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "loan-application-create" */ "./loan-application-create/LoanApplicationCreate.vue"
          ),
      },
      {
        path: ":bank_id/:id",
        name: "LoanApplicationDetail",
        meta: { ...requiresAuth },
        props: route => ({ bankId: route.params.bank_id, id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "loan-application-detail" */ "./loan-application-detail/LoanApplicationDetail.vue"
          ),
      },
      {
        path: ":bank_id/:id/edit",
        name: "LoanApplicationEdit",
        meta: { ...requiresAuth },
        props: route => ({ bankId: route.params.bank_id, id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "loan-application-edit" */ "./loan-application-edit/LoanApplicationEdit.vue"
          ),
      },
    ],
  },
];

export default loanApplicationRoutes;
