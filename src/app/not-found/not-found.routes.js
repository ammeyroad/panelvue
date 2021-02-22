const notFoundRoutes = [
  {
    path: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "not-found" */ "./NotFound.vue"),
  },
];

export default notFoundRoutes;
