<template>
    <div class="container mt-5">
        <ActivitiesFrom :id="id"/>
    </div>
</template>

<script>
import ActivitiesFrom from '@/components/ActivitiesFrom';

export default {
    props: ["id"],
    components:{
        ActivitiesFrom
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