import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Collaborators from '../views/Collaborators.vue'
import Login from '../views/Login.vue'
import Expos from '../views/Expos.vue'
import ExpoDetail from '../views/ExpoDetail.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/collaborators',
        name: 'Collaborators',
        component: Collaborators,
        meta: { requiresAuth: true }
    },
    {
        path: '/expos',
        name: 'Expos',
        component: Expos,
        meta: { requiresAuth: true },
    },
    {
        path: '/expos/create',
        name: 'ExposCreate',
        component: ExpoDetail,
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: '/expos/:id',
        name: 'ExpoDetail',
        component: ExpoDetail,
        props: true,
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