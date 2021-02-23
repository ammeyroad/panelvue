import { requiresAuth } from "@/shared/routes.meta";

import Home from "./Home.vue";

const homeRoutes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
    meta: { ...requiresAuth },
  },
];

export default homeRoutes;
