<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'Home' }" @click="currentTab = 0">Marco Admin</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <div class="navbar-nav">
                <template class="navbar-nav" v-if="token">
                    <router-link :to="{ name: 'Home' }" class="nav-link" :class="'Home' === $route.name ? 'active': ''">Home</router-link> -->
                    <router-link :to="{ name: 'About' }" class="nav-link" :class="'About' === $route.name ? 'active': ''">About</router-link> -->
                    <router-link :to="{ name: 'Login' }" class="nav-link" @click="handleLogout">Logout</router-link>
                </template>
                <template class="navbar-nav" v-else>
                    <router-link :to="{ name: 'Login' }" class="nav-link" :class="'Login' === $route.name ? 'active': ''">Login</router-link>
                </template>
                
            </div>
        </div>
    </div>
    </nav>
</template>

<script>
export default {
    name: 'Nav',
    data(){
        return{
            token: localStorage.getItem('token')
        }
    },
    created(){
        this.token = localStorage.getItem('token');
    },
    methods: {
        handleLogout(){
            localStorage.removeItem('token');
            this.$router.go();
        }
    }
}
</script>

<style>

</style>