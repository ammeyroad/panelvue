import { requiresAuth } from "@/shared/routes.meta";
import { canEdit } from "./customer-account.auth";

import GenericRouterView from "@/shared/components/GenericRouterView.vue";

import Swal from "sweetalert2"; // TODO refactor alert

const customerAccountRoutes = [
  {
    path: "accounts",
    component: GenericRouterView,
    children: [
      {
        path: "/",
        name: "CustomerAccountList",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "customer-account-list" */ "./customer-account-list/CustomerAccountList.vue"
          ),
      },
      {
        path: "create",
        name: "CustomerAccountCreate",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "customer-account-create" */ "./customer-account-create/CustomerAccountCreate.vue"
          ),
      },
    ],
  },
];

export const customerAccountDetailRoutes = [
  {
    path: ":id(\\d+)/edit",
    name: "CustomerAccountEdit",
    meta: { ...requiresAuth },
    props: route => ({
      bankId: route.params.bank_id,
      customerId: route.params.customer_id,
      id: route.params.id,
    }),
    component: () =>
      import(
        /* webpackChunkName: "customer-account-edit" */ "./customer-account-edit/CustomerAccountEdit.vue"
      ),
    beforeEnter: (to, from, next) => {
      const bankId = parseInt(to.params.bank_id);
      if (bankId === Number.NaN) {
        next(new Error("BankId bukan angka yang valid!"));
      }

      const authorized = canEdit(bankId);
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
];

export default customerAccountRoutes;
