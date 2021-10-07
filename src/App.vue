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

</style>
