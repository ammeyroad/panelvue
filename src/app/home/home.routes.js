import { requiresAuth } from "@/shared/routes.meta";

import Home from "./Home.vue";
import idebisnisdaftar from "./idebisnisdaftar.vue";
import idebisnistambah from "./idebisnistambah.vue";
import daftarpelatihan from "./daftarpelatihan.vue";




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
  {
    path: "/idebisnisdaftar",
    component: idebisnisdaftar,
    meta: { ...requiresAuth },
  },
  {
    path: "/idebisnistambah",
    component: idebisnistambah,
    meta: { ...requiresAuth },
  },
  {
    path: "/daftarpelatihan",
    component: daftarpelatihan,
    meta: { ...requiresAuth },
  },
  
];

export default homeRoutes;
