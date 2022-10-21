import homepage from './components/homepage.vue'
import analysis from './components/analysis.vue'
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homepage
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: analysis
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;