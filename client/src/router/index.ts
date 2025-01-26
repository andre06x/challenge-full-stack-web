/**
 * router/index.ts
 * Automatic routes for `./src/pages/*.vue`
 */

import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";
import Page404 from "@/pages/404.vue";

const customRoutes = [
  ...routes,
  {
    path: "/students",
    redirect: "/",
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => Page404,
    meta: { layout: false },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: customRoutes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;

// Estrutura de arquivos da pasta `src/pages`:
// - src/pages/students/index.vue
// - src/pages/students/create.vue
// - src/pages/students/[id].vue
