import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { store } from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("../views/CreateView.vue"),
    meta: {
      title: "Create",
    },
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterView.vue"),
    meta: {
      title: "Register",
    },
  },
  {
    path: "/workout-details/:workoutId",
    name: "WorkoutDetails",
    component: () => import("../views/WorkoutDetailsView.vue"),
    meta: {
      title: "WorkoutDetails",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function isProtectedRoute(to) {
  return to.name !== "Login" && to.name !== "Register";
}

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Active Tracker`;
  if (isProtectedRoute(to) && !store.state.userSession) {
    next({ name: "Login" });
  } else if (!isProtectedRoute(to) && store.state.userSession) {
    next({ name: "Home" });
  } else next();
});

export default router;
