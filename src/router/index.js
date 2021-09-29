import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresUnauth: true }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async function(to, _, next){
    const token = localStorage.getItem("token");
    if (to.meta.requiresAuth && !token) { // Si no esta autenticado
        next({ name: 'Login' });
    } else if (to.meta.requiresUnauth && token) { // Si esta atenticado y quiere acceder al login
        next({ name: 'Home' });
    } else {
        next();
    }
})

export default router