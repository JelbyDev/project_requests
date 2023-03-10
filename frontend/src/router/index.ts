import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';

const router = createRouter({
  routes: [
    {
      path: '',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/projects/:projectId',
      name: 'project',
      component: () => import('@/pages/ProjectPage.vue'),
    },
    {
      path: '/requests/:requestId',
      name: 'request',
      component: () => import('@/pages/RequestPage.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue'),
    },
  ],
  history: createWebHashHistory(),
});

export default router;
