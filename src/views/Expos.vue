<template>
    <div class="container mt-5">
        <template v-if="expos.length">
            <div class="row">
                <div class="col-md-6" v-for="expo in expos" :key="expo._id">
                    <router-link :to="{ name: 'ExpoDetail', params: { id: expo._id }}" class="text-decoration-none text-black">
                        <div class="card mb-5">
                            <img :src="expo.images[0]" style="height: 20rem;" class="card-img-top">
                            <div class="card-body text-center">
                                <h5 class="card-title">{{expo.name}}</h5>
                                <p class="card-text">{{expo.author}}</p>
                                <p class="card-text"><small class="text-muted">{{expo.startDate}} - {{expo.endDate}}</small></p>
                            </div>
                        </div>
                    </router-link>
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
            expos: []
        }
    },
    methods:{
        async getExpos(){
            // const response = await fetch("https://api-marco.herokuapp.com/api/expos");
            const response = await fetch("http://localhost:3000/api/expos");
            const data = await response.json();
            this.expos = data;
        }
    },
    created() {
        this.getExpos();
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