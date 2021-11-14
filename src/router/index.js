import { createRouter, createWebHistory } from 'vue-router'
import Activities from '../views/Activities/Activities.vue'
import ActivityDetail from '../views/Activities/ActivitiesDetail.vue'
import ExpoDetail from '../views/Expos/ExpoDetail.vue'
import Expos from '../views/Expos/Expos.vue'
import Guide from '../views/Guides/Guide.vue'
import Guides from '../views/Guides/Guides.vue'
import Collaborators from '../views/Collaborators.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Reservations from '../views/Reservations.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true, requiresAdminCollab: true },
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
        meta: { requiresAuth: true, requiresAdminCollab: true }
    },
    {
        path: '/reservations',
        name: 'Reservations',
        component: Reservations,
        meta: { requiresAuth: true, requiresAdminCollab: true }
    },
    {
        path: '/activities',
        name: 'Activities',
        component: Activities,
        meta: { requiresAuth: true, requiresAdminCollab: true }
    },
    {
        path: '/activities/create',
        name: 'ActivityCreate',
        component: ActivityDetail,
        meta: { requiresAuth: true, requiresAdminCollab: true }
    },
    {
        path: '/activities/:id',
        name: 'ActivityDetail',
        component: ActivityDetail,
        props: true,
        meta: { requiresAuth: true, requiresAdminCollab: true }
    },
    {
        path: '/expos',
        name: 'Expos',
        component: Expos,
        meta: { requiresAuth: true, requiresAdminCollab: true },
    },
    {
        path: '/expos/create',
        name: 'ExpoCreate',
        component: ExpoDetail,
        props: true,
        meta: { requiresAuth: true, requiresAdminCollab: true },
    },
    {
        path: '/expos/:id',
        name: 'ExpoDetail',
        component: ExpoDetail,
        props: true,
        meta: { requiresAuth: true, requiresAdminCollab: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresUnauth: true }
    }
    ,
    {
        path: '/myreservations',
        name: 'GuideReservations',
        component: Guide,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach(async function(to, _, next){
    let response = await fetch('http://100.24.228.237:10021/api/users/admin/validateToken/', {
        method: "GET",
        headers: {
            auth_key: localStorage.getItem("token")
        }
    });
    let token = await response.json();
    let usertype = localStorage.getItem("usertype");

    if(token.error){
        localStorage.clear();
        token = null;
        usertype = ["empty"];
    }

    if (to.meta.requiresAuth && !token) { // Si no esta autenticado
        next({ name: 'Login' });
    } 
    else if (to.meta.requiresUnauth && token || to.meta.requiresAdmin && !usertype.includes("admin")) { // Si esta autenticado y quiere acceder al login
        next({ name: 'Home' });
    } 
    else if (to.meta.requiresAdminCollab && usertype.includes('guide')) {
        next({ name: 'GuideReservations' });
    } 
    else {
        next();
    }
})

export default router