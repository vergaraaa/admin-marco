<template>
    <div class="container mt-5">
        <template v-if="activities.length">
            <div class="row">
                <div class="col-md-6" v-for="activity in activities" :key="activity._id">
                    <router-link :to="{ name: 'ExpoDetail', params: { id: activity._id }}" class="text-decoration-none text-black">
                        <div class="card mb-5" style="height: 28rem">
                            <img :src="activity.image" style="height: 20rem;" class="card-img-top">
                            <div class="card-body text-center">
                                <h5 class="card-title">{{activity.name}}</h5>
                                <p class="card-text">{{activity.author}}</p>
                                <p class="card-text"><small class="text-muted">{{activity.startDate}}</small></p>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="col-md-6">
                    <div class="mb-5 d-flex" style="height: 28rem">
                        <div class="row mx-auto d-flex align-items-center justify-content-center">
                            <div class="col">
                                <router-link :to="{ name: 'ExposCreate' }" class="text-decoration-none text-black">
                                    <i class="fas fa-plus-circle fa-10x mb-3" style="color: lightgray"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else class="">
            <div class="row">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return { 
            activities: []
        }
    },
    methods:{
        async getActivities(){
            // const response = await fetch("https://api-marco.herokuapp.com/api/expos");
            // const response = await fetch("http://localhost:3000/api/expos");
            // const response = await fetch("http://172.31.0.24:10021/api/expos/");
            const response = await fetch("http://100.24.228.237:10021/api/activities/");
            const data = await response.json();
            this.activities = data;
        }
    },
    created() {
        this.getActivities();
    }
}
</script>

<style scoped>
body{
    background-color: #f4ede7;
}
.spinner-border {
    width: 50px; 
    height: 50px;
    /* color: #ec179b; */
}
</style>