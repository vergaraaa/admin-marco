
<template>
    <div class="container mt-5">
        <template v-if="nameLoaded && activitiesLoaded && urlMenuLoaded &&  ticketPriceGeneralLoaded &&  ticketPriceSpecialLoaded">
            <h1>Hola {{name}}, ¿qué hacemos hoy?</h1>
            <h5 class="font-weight-bold">#MuseoDeTodos</h5>
            <div class="row">
                <div class="col-md-5">
                    <img src="fondo_marco.jpg" class="img-fluid p-3">
                    <div class="d-grid gap-4">
                        <router-link class="btn btn-dark p-3 m-1 bg-marco" :to="{ name: 'ActivityCreate' }" role="button">Crear nueva actividad</router-link>
                        <router-link class="btn btn-dark p-3 m-1 bg-marco" :to="{ name: 'ExpoCreate' }" role="button">Crear nueva exposición</router-link>
                    </div>
                </div>
                <div class="col-md-7">
                    <h2 class="text-center">Actividades del Mes</h2>
                    <div class="row px-4 pb-4 bg-marco">
                            <h3 class="text-center" style="color: white;"> {{month}} </h3>
                            <div class="col align-self-center" style="background: white;">
                                <table class="table table-bordered">
                                    <tr v-for="activity in activities" :key="activity._id">
                                        <td class="p-2" style="width: 75%">{{ activity.name }}</td>
                                        <td class="p-2" style="width: 25%">{{ new Date(activity.startDate).toLocaleDateString('es-ES', { month: 'long', day: 'numeric'}) }}</td>
                                    </tr>
                                </table>
                            </div>
                    </div>
                        <form @submit.prevent="handleUploadMenu">
                            <label for="urlMenu" class="form-label h4">Menú actual del restaurante: {{urlMenu}}</label>
                            <input type="text" class="form-control" id="urlMenu" v-model="urlMenuNew">
                            <button type="submit" class="btn btn-success mx-2 mt-1">
                                Guardar 
                            </button>
                        </form>
                        <form @submit.prevent="handleUploadTicket">
                            <label for="ticketPriceGeneral" class="form-label h4">Precio actual por boleto normal: {{ticketPriceGeneral}}</label>
                            <input type="number" class="form-control" id="ticketPriceGeneral" v-model="ticketPriceGeneralNew">
                            <button type="submit" class="btn btn-success mx-2 mt-1">
                                Guardar 
                            </button>
                        </form>
                        <form @submit.prevent="handleUploadTicketSpecial">
                            <label for="ticketPriceSpecial" class="form-label h4">Precio actual por boleto con descuento: {{ticketPriceSpecial}}</label>
                            <input type="number" class="form-control" id="ticketPriceSpecial" v-model="ticketPriceSpecialNew">
                            <button type="submit" class="btn btn-success mx-2 mt-1">
                                Guardar 
                            </button>
                        </form>
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
            urlMenu: '',
            urlMenuNew: '',
            ticketPriceGeneral: 0,
            ticketPriceGeneralNew: 0,
            ticketPriceSpecial: '',
            ticketPriceSpecialNew: 0,
            nameLoaded: false,
            activitiesLoaded: false,
            urlMenuLoaded: false,
            ticketPriceGeneralLoaded: false,
            ticketPriceSpecialLoaded: false
        }
    },
    created() {
        this.getUserName();
        this.getActivities();
        this.getMenu();
        this.getPrice();
        this.getPriceSpecial();
        this.month = new Date().toLocaleDateString('es-ES', {month: "long"}).toUpperCase();
    },
    methods: {
        async getUserName(){
            this.id = localStorage.getItem("id");
            const res = await fetch("https://admin.marco.org.mx/api/users/name/" + this.id, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
            const data = await res.json();
            this.name = data.name;
            this.nameLoaded = true;
        },
        async getActivities() {
            const res = await fetch("https://admin.marco.org.mx/api/activities/month", {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
            const data = await res.json();
            this.activities = data;
            this.activitiesLoaded = true;
        },
        async getMenu() {
            console.log('getting menu')
            const res = await fetch("https://admin.marco.org.mx/api/priceandmenu/urlMenu", {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                cache: 'no-cache'
            });
            const data = await res.json();
            this.urlMenu = data.urlMenu;
            this.urlMenuLoaded = true;
            this.urlMenuNew = "";
        },
        async getPrice() {
            console.log('getting price general')
            const res = await fetch("https://admin.marco.org.mx/api/priceandmenu/ticketPriceGeneral");
            const data = await res.json();
            this.ticketPriceGeneral = data.ticketPriceGeneral;
            this.ticketPriceGeneralLoaded = true;
            this.ticketPriceGeneralNew = 0;
        },
        async getPriceSpecial() {
            console.log('getting price special')
            const res = await fetch("https://admin.marco.org.mx/api/priceandmenu/ticketPriceDiscount", {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
            const data = await res.json();
            this.ticketPriceSpecial = data.ticketPriceDiscount;
            this.ticketPriceSpecialLoaded = true;
            this.ticketPriceSpecialNew = 0;
        },
        async handleUploadMenu(){
            await fetch('https://admin.marco.org.mx/api/priceandmenu/urlMenu', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    urlMenu: this.urlMenu,
                    newUrlMenu: this.urlMenuNew
                })
            });
            this.getMenu();
        },
        async handleUploadTicket(){
            await fetch('https://admin.marco.org.mx/api/priceandmenu/ticketPriceGeneral', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ticketPriceGeneral: this.ticketPriceGeneral,
                    newPrice: this.ticketPriceGeneralNew
                })
            });
            this.getPrice();
        },
        async handleUploadTicketSpecial(){
            await fetch('https://admin.marco.org.mx/api/priceandmenu/ticketPriceDiscount', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ticketPriceDiscount: this.ticketPriceSpecial,
                    newPrice: this.ticketPriceSpecialNew
                })
            });
            this.getPriceSpecial();
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

