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
    }
}

</script>


<style>

</style>
