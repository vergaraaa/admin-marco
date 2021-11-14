<template>
    <div class="container mt-5">
        
        <h1 class="text-center">
            <span @click="selectPrevious"><i style="cursor: pointer;" class="fas fa-chevron-circle-left"></i></span>
            <span class="mx-5">{{date}}</span>
            <span @click="selectNext"><i style="cursor: pointer;" class="fas fa-chevron-circle-right"></i></span>
        </h1>
        <h6 class="text-center mb-4">
            <span @click="selectToday" style="cursor: pointer;">Today</span>
        </h6>
        
        <template v-if="activitiesLoaded">
            <template v-if="activities.length">
                <div class="row">
                    <div class="col-md-3" v-for="activity in activities" :key="activity._id">
                        <router-link :to="{ name: 'ActivityDetail', params: { id: activity._id }}" class="text-decoration-none text-black">
                            <div class="card mb-5" style="height: 28rem">
                                <img :src="activity.image" style="height: 20rem;" class="card-img-top">
                                <div class="top-right">{{new Date(activity.startDate).getUTCDate({day: "2-digit"})}}</div>
                                <div class="card-body text-center">
                                    <h5 class="card-title">{{activity.name}}</h5>
                                    <p class="card-text">{{activity.author}}</p>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-5 d-flex" style="height: 28rem">
                            <div class="row mx-auto d-flex align-items-center justify-content-center">
                                <div class="col">
                                    <router-link :to="{ name: 'ActivityCreate' }" class="text-decoration-none text-black">
                                        <i class="fas fa-plus-circle fa-10x mb-3" style="color: lightgray"></i>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="row mb-5">
                    <div class="col-md-4 mx-auto text-center">
                        <div class="card p-3">
                            <p class="h5 mb-3">Parece que no hay ninguna actividad...</p>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                <router-link :to="{ name: 'ActivityCreate' }">
                                    <button type="btn" class="btn btn-primary px-5">
                                        ¡Agregar actividad!
                                    </button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
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
import moment from 'moment';

export default {
    data() {
        return { 
            activities: [],
            activitiesLoaded: false,
            month: '',
            date: ''
        }
    },
    methods:{
        async getActivities(){
            // const response = await fetch("https://api-marco.herokuapp.com/api/expos");
            // const response = await fetch("http://localhost:3000/api/expos");
            // const response = await fetch("http://172.31.0.24:10021/api/expos/");
            const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        month: moment(this.date).format('M'),
                        year: moment(this.date).format('YYYY')
                        })
                }
            const response = await fetch("http://100.24.228.237:10021/api/activities/month/", requestOptions);
            const data = await response.json();
            this.activities = data;
            this.activitiesLoaded = true;
        },
        selectPrevious(){
            this.date = moment(this.date).subtract(1, "month").format("MMMM YYYY");
            this.activitiesLoaded = false;
            this.getActivities();
        },
        selectToday(){
            this.date = moment().format("MMMM YYYY");
            this.activitiesLoaded = false;
            this.getActivities();
        },
        selectNext(){
            this.date = moment(this.date).add(1, "month").format("MMMM YYYY");
            this.activitiesLoaded = false;
            this.getActivities();
        }
    },
    created() {
        this.selectToday();
        var today = new Date();
        this.month = new Date(today).toLocaleDateString('es-ES', {month: "long"});
        this.date = moment().format("MMMM YYYY");
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

.top-right {
    position: absolute;
    top: 8px;
    right: 16px;
    background-color: #ec179b;
    color: white;
    padding: 5%;
    font-size: 1.5rem;
    border-radius: 5px;
}
</style>