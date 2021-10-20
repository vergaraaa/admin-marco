<template>
    <div id="nav" v-if="$route.name !== 'Login'">
        <Nav />
    </div>
    <router-view/>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
    components:{
        Nav
    },
    created(){
        document.body.style.background = "#f4ede7";
    }
}

</script>


<style>
.form-control:active, .form-control:focus {
    box-shadow: 0 0 0 0.2rem rgba(236, 23, 155, 0.5) !important;
    border-color: #ec179b;
}
</style>
