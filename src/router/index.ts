import { useCVStore } from '@/stores/cv-store';
import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/layouts/default/Default.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/components/CVSearch.vue'),
  },
  {
    path: '/cv',
    name: 'cv-view',
    component: () => import('@/components/CVView.vue'),
    beforeEnter: () => {
      if (!storeToRefs(useCVStore()).cvAvailable.value) {
        return false;
      }
    },
  },
  {
    path: '/cv-entry',
    name: 'cv-entry',
    component: () => import('@/components/cv-entry/CVEntryStepper.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const { cvAvailable } = storeToRefs(useCVStore());
  if (to.name === 'cv-view' && !cvAvailable.value) {
    next({ name: 'cv-entry' });
  } else {
    next();
  }
});

export default router;
