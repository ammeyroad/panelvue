import pelatihan from "./pelatihan.vue";

import PelatihanForm from "./PelatihanForm.vue"
import PelatihanDaftar from "./PelatihanDaftar.vue";

const pelatihanRoutes = [
  {
    path: "/pelatihan", 
    component: pelatihan,
    children: [
      {
        path: "/pelatihandaftar",
        name: "pelatihandaftar",
        component: PelatihanDaftar,
         
      },
      {
        path: "/pelatihanform",
        name: "pelatihanform",
        component: PelatihanForm,
      },
    ],
  },
];

export default pelatihanRoutes;
