import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
  },
  {
    path: '/search',
    component: () => import('@/components/CVSearch.vue'),
  },
  {
    path: '/cv',
    component: () => import('@/components/cv-entry/CVEntryStepper.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
