import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from '../components/home/Home.vue';

const routes = [
  { path: '/', component: HomeView, children: [
    { path: 'course', name: 'Course', component: () => import('../components/course/Course.vue') },
    { path: 'image/upload', name: 'ImageUpload', component: () => import('../components/imageUpload/ImageUpload.vue') },
  ] },
  { path: '/login', name: 'Login', component: () => import('../components/login/Login.vue') },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach((to, from) => {
    const token = localStorage.getItem('token');
    if (!token && to.name !== 'Login') {
        console.log('重定向了!!')
        return {name: 'Login'}
    }
})

export default router;
