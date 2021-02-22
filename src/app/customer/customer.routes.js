import { requiresAuth } from "@/shared/routes.meta";
import { canEdit, canView } from "./customer.auth";

import Swal from "sweetalert2"; // TODO refactor alert
import Customer from "./Customer.vue";

import customerAccountRoutes from "./customer-account/customer-account.routes";

const customerRoutes = [
  {
    path: "/customers",
    component: Customer,
    children: [
      {
        path: "/",
        name: "CustomerList",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "customer-list" */ "./customer-list/CustomerList.vue"
          ),
      },
      {
        path: "create",
        name: "CustomerCreate",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "customer-create" */ "./customer-create/CustomerCreate.vue"
          ),
      },
      ...customerAccountRoutes,
      {
        path: ":bank_id(\\d+)/:id(\\d+)",
        name: "CustomerDetail",
        meta: { ...requiresAuth },
        props: route => ({ bankId: route.params.bank_id, id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "customer-detail" */ "./customer-detail/CustomerDetail.vue"
          ),
        beforeEnter: (to, from, next) => {
          const bankId = parseInt(to.params.bank_id);
          if (bankId === Number.NaN) {
            next(new Error("BankId bukan angka yang valid!"));
          }

          const canEdit = canView(bankId);
          if (!canEdit) {
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
        path: ":bank_id(\\d+)/:id(\\d+)/edit",
        name: "CustomerEdit",
        meta: { ...requiresAuth },
        props: route => ({ bankId: route.params.bank_id, id: route.params.id }),
        component: () =>
          import(
            /* webpackChunkName: "customer-edit" */ "./customer-edit/CustomerEdit.vue"
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
    ],
  },
];

export default customerRoutes;
