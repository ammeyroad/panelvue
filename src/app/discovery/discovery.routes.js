import discovery from "./discovery.vue";

import DiscoveryForm from "./DiscoveryForm.vue"
import DiscoveryDaftar from "./DiscoveryDaftar.vue";

const discoveryRoutes = [
  {
    path: "/discovery", 
    component: discovery,
    children: [
      {
        path: "/discoverydaftar",
        name: "discoverydaftar",
        component: DiscoveryDaftar,
         
      },
      {
        path: "/discoveryform",
        name: "discoveryform",
        component: DiscoveryForm,
      },
    ],
  },
];

export default discoveryRoutes;
