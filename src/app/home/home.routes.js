

import Home from "./Home.vue";

const homeRoutes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
];

export default homeRoutes;
