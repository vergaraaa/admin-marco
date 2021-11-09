import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Collaborators from '../views/Collaborators.vue'
import Login from '../views/Login.vue'
import Expos from '../views/Expos.vue'
import ExpoDetail from '../views/ExpoDetail.vue'
import Guides from '../views/Guides.vue'
import Reservations from '../views/Reservations.vue'
import Activities from '../views/Activities.vue'
import ActivityDetail from '../views/ActivitiesDetail.vue'

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
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/guides',
        name: 'Guides',
        component: Guides,
        meta: { requiresAuth: true }
    },
    {
        path: '/reservations',
        name: 'Reservations',
        component: Reservations,
        meta: { requiresAuth: true }
    },
    {
        path: '/activities',
        name: 'Activities',
        component: Activities,
        meta: { requiresAuth: true }
    },
    {
        path: '/activities/create',
        name: 'ActivityCreate',
        component: ActivityDetail,
        meta: { requiresAuth: true }
    },
    {
        path: '/activities/:id',
        name: 'ActivityDetail',
        component: ActivityDetail,
        props: true,
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
        name: 'ExpoCreate',
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
    let response = await fetch('http://100.24.228.237:10021/api/users/admin/validateToken/', {
        method: "GET",
        headers: {
            auth_key: localStorage.getItem("token")
        }
    })
    let token = await response.json();
    let usertype = localStorage.getItem("usertype");

    if(token.error){
        localStorage.clear();
        token = null;
        usertype = ["empty"];
    }

    if (to.meta.requiresAuth && !token) { // Si no esta autenticado
        next({ name: 'Login' });
    } else if (to.meta.requiresUnauth && token || to.meta.requiresAdmin && !usertype.includes("admin")) { // Si esta autenticado y quiere acceder al login
        next({ name: 'Home' });
    } else {
        next();
    }
})

export default router