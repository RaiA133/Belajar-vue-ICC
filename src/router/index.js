import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/home.vue"
import About from "../pages/about.vue"
import Contact from "../pages/contact.vue"

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/contact",
    component: Contact,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});