import idebisnis from "./idebisnis.vue";

import IdeBisnisForm from "./IdeBisnisForm.vue"
import IdeBisnisDaftar from "./IdeBisnisDaftar.vue";

const idebisnisRoutes = [
  {
    path: "/idebisnis", 
    component: idebisnis,
    children: [
      {
        path: "/idedaftar",
        name: "idebisnisdaftar",
        component: IdeBisnisDaftar,
         
      },
      {
        path: "/ideform",
        name: "idebisnisform",
        component: IdeBisnisForm,
      },
    ],
  },
];

export default idebisnisRoutes;
