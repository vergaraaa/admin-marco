
<template>
    <div class="container mt-5">
        <template v-if="nameLoaded && activitiesLoaded">
            <h1>Hola {{name}}, ¿qué hacemos hoy?</h1>
            <h5 class="font-weight-bold">#MuseoDeTodos</h5>
            <div class="row">
                <div class="col-md-5">
                    <img src="fondo_marco.jpg" class="img-fluid p-3">
                    <div class="d-grid gap-4">
                        <router-link class="btn btn-dark p-3 m-1 bg-marco" :to="{ name: 'Activities' }" role="button" >Administrar actividades</router-link>
                        <router-link class="btn btn-dark p-3 m-1 bg-marco" :to="{ name: 'Expos' }" role="button">Administrar exposiciones</router-link>
                    </div>
                </div>
                <div class="col-md-7">
                    <h2 class="text-center">Actividades del Mes</h2>
                    <div class="row px-4 pb-4 bg-marco">
                            <h3 class="text-center" style="color: white;"> {{month}} </h3>
                            <div class="col align-self-center" style="background: white;">
                                <table class="table table-bordered">
                                    <tr v-for="activity in activities" :key="activity._id">
                                        <td>{{ activity.name }}</td>
                                        <td>{{ new Date(activity.startDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric'}) }}</td>
                                    </tr>
                                </table>
                            </div>
                    </div>
                </div>
            </div>
        </template>   
        <template v-else>
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
    name: 'Home',
    data() {
        return {
            id: '',
            name: '',
            activities: [],
            month: '',
            nameLoaded: false,
            activitiesLoaded: false
        }
    },
    created() {
        this.getUserName();
        this.getActivities();
        this.month = new Date().toLocaleDateString('es-ES', {month: "long"}).toUpperCase();

    },
    methods: {
        async getUserName(){
            this.id = localStorage.getItem("id");
            const res = await fetch("http://100.24.228.237:10021/api/users/name/" + this.id);
            const data = await res.json();
            this.name = data.name;
            this.nameLoaded = true;
        },
        async getActivities() {
            const res = await fetch("http://100.24.228.237:10021/api/activities/month");
            const data = await res.json();
            this.activities = data;
            this.activitiesLoaded = true;
        }
    }
}
</script>

<style>
.bg-marco{
    background-color: #ec179b;
}

.spinner-border {
    width: 50px; 
    height: 50px;
    /* color: #ec179b; */
}
</style>

