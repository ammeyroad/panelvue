import { requiresAuth } from "@/shared/routes.meta";
import pelatihan from "./pelatihan.vue"


const pelatihanRoutes = [
  {
    path: "/pelatihan",
    component: pelatihan,
    children: [
      {
        path: "/",
        name: "pelatihanList",
        meta: { ...requiresAuth },
        component: () =>
          import(
            /* webpackChunkName: "pelatihanlist-list" */ "./pelatihan-list/pelatihanList.vue"
          ),
          
      },
      

    ],
  },
];

export default pelatihanRoutes;
