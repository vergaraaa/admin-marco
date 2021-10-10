<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-marco">
    <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'Home' }"><img src="../../public/logo_marco.png" style="width: 125px"></router-link>
        <button @click="handleToggle" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <div class="navbar-nav">
                <router-link :to="{ name: 'Home' }" class="nav-link px-3" :class="'Home' === $route.name ? 'active': ''">
                    <i class="fas fa-user-shield mx-1"></i> 
                    Marco Admin
                </router-link>
                <router-link :to="{ name: 'Collaborators' }" class="nav-link px-3" :class="'Collaborators' === $route.name ? 'active': ''">
                    <i class="fas fa-users mx-1"></i>
                    Colaboradores
                </router-link>
                <router-link :to="{ name: 'Expos' }" class="nav-link px-3" :class="'Expos' === $route.name ? 'active': ''">
                    <i class="far fa-images mx-1"></i>
                    Exposiciones
                </router-link>
            </div>
            <div class="navbar-nav ms-auto">
                <router-link :to="{ name: 'Login' }" class="nav-link px-3" @click="handleLogout">
                    <i class="fas fa-sign-out-alt mx-1"></i>
                    Logout
                </router-link>
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
            token: '',
            navOpen: false
        }
    },
    created(){
        this.token = localStorage.getItem('token');
    },
    methods: {
        handleLogout(){
            localStorage.removeItem('token');
            this.$router.go();
        },
        handleToggle(){
            this.navOpen = !this.navOpen;
        }
    },
    watch: {
    '$route' () {
            if(this.navOpen){
                document.getElementById("navbarNav").classList.toggle("show");
                this.navOpen = false;
            }
        },
    },
}
</script>

<style>
.bg-marco{
    background-color: #ec179b;
}
</style>