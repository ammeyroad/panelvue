const loginRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "./Login.vue"),
  },
];

export default loginRoutes;
