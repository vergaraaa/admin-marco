<template>
    <div class="container mt-5">
        <ExpoForm :id="id"/>
    </div>
</template>

<script>
import ExpoForm from '@/components/ExpoForm.vue';

export default {
    props: ["id"],
    components:{
        ExpoForm
    }
}
</script>

<style scoped>
.spinner-border {
    width: 50px; 
    height: 50px;
    /* color: #ec179b; */
}
</style>