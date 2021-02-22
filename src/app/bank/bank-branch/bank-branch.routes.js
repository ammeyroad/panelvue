import { requiresAuth } from "@/shared/routes.meta";
import { canEdit, canView } from "./bank-branch.auth";

import Swal from "sweetalert2"; // TODO refactor alert

import GenericRouterView from "@/shared/components/GenericRouterView";

const bankBranchRoutes = [
  {
    path: "branches",
    component: GenericRouterView,
    children: [
      {
        path: "/",
        name: "BankBranchList",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "bank-branch-list" */ "./bank-branch-list/BankBranchList.vue"
          ),
      },
      {
        path: "create",
        name: "BankBranchCreate",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "bank-branch-create" */ "./bank-branch-create/BankBranchCreate.vue"
          ),
      },
    ],
  },
];

export const bankBranchDetailRoutes = [
  {
    path: ":id(\\d+)/edit",
    name: "BankBranchEdit",
    meta: { ...requiresAuth },
    props: route => ({ bankId: route.params.bank_id, id: route.params.id }),
    component: () =>
      import(
        /* webpackChunkName: "bank-branch-edit" */ "./bank-branch-edit/BankBranchEdit.vue"
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
  {
    path: ":id(\\d+)",
    name: "BankBranchDetails",
    meta: { ...requiresAuth },
    props: route => ({ bankId: route.params.bank_id, id: route.params.id }),
    component: () =>
      import(
        /* webpackChunkName: "bank-branch-details" */ "./bank-branch-details/BankBranchDetails.vue"
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
];

export default bankBranchRoutes;
