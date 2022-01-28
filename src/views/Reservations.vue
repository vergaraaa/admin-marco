<template>
    <div class="container mt-5">
        <div class="row">
            <template v-if="guidesLoaded && reservationsLoaded">
                <div class="row">
                    <div class="col-md-12">
                        <table class="table table-light table-striped table-bordered table-hover">  
                            <thead class="table-light"> 
                                <tr>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Guía</th>
                                    <th>Disponible</th>
                                    <th>Usuario</th>
                                    <th>Lugares</th>
                                    <th>Acciones</th>

                                </tr>
                            </thead>
                            <tbody style="text-align: center;">
                                <tr v-for="(reservation, index) in reservations" :key="reservation._id">
                                    <td>{{new Date(reservation.date).toLocaleString('es-ES', { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</td>
                                    <td>{{reservation.hour}}</td>
                                    <td>{{reservation.guide.name}}</td>
                                    <td>
                                        <i v-if="reservation.available" class="fas fa-check text-success"></i>
                                        <i v-else class="fas fa-times text-danger"></i>
                                        <!--Si se quiere desplegar true o false en vez de iconos
                                        {{reservation.available}}--> 
                                    </td>
                                    <td>{{reservation.user}}</td>
                                    <td>{{reservation.spots}}</td>
                                    <td>
                                        <template v-if="reservation.available">
                                            <i v-if="!isEditing" class="fas fa-edit px-2 text-primary" style="cursor: pointer;"  @click="handleClickEditReservation(reservation._id)"></i>
                                            <i v-else class="fas fa-edit px-2 text-#9E9E9E"> </i>
                                            <i class="fas fa-trash-alt px-2 text-danger" style="cursor: pointer;" @click="handleClickDeleteReservation(reservation._id, index)"
                                                data-dismiss="modalDeleteReservation" data-bs-toggle="modal" data-bs-target="#modalDeleteReservation">
                                            </i>
                                            <!-- En el caso de querer botones en vez de iconos
                                            <button class="btn btn-danger" @click="handleClickDeleteReservation(reservation._id, index)"
                                            data-dismiss="modalDeleteReservation" data-bs-toggle="modal" data-bs-target="#modalDeleteReservation">
                                                Eliminar
                                            </button>
                                            <button v-if="!isEditing" type="button" class="btn btn-primary" @click="handleClickEditReservation(reservation._id)" >
                                                Editar
                                            </button>
                                            <button v-else type="button" class="btn btn-primary" disabled=true>
                                                Editar
                                            </button>-->
                                        </template>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                </div>
                <form @submit.prevent="handleUploadReservation">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="date" class="form-label">Fecha:</label>
                            <input class="form-control" type="date" v-model="reservation.date" :min="minDate">
                        </div>
                        <div class="col-md-3">
                            <label for="hour" class="form-label">Hora:</label>
                            <select class="form-select" name="hour" id="hour" v-model="reservation.hour">
                                <option v-for="(hour, index) in hours" :key="index" >{{hour}}</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="guide" class="form-label">Guia:</label>
                            <select class="form-select" name="guide" id="guide" v-model="reservation.guide">
                                <option v-for="(guide, index) in guides" :key="index" :value="guide" :selected="guide == reservation.guide">{{guide.name}}</option>
                            </select>
                        </div>
                        <div class="col-md-3 align-self-end">
                            <button v-if="isEditing" type="submit" class="btn btn-success mx-2 mt-1">
                                Guardar 
                            </button>
                            <button v-else type="submit" class="btn btn-success mx-2 mt-1">
                                Crear
                            </button>
                            <button  type="button" class="btn btn-danger mt-1" @click="handleClickToggleReservation">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </form>
            </template>
            <template>
                <div class="row">
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <!-- MODAL DELETE RESERVATION -->
        <div class="modal fade" id="modalDeleteReservation" tabindex="-1" aria-labelledby="exampleModalCenterTitle" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title" id="exampleModalCenterTitle">¿Estás seguro la reservación del día {{tempDate}} a las {{tempHour}}?</h6>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Esta acción será permanente y no podrá revertirse.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="handleDeleteReservation">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
class Guide {
    constructor(name, lastname, email){
        this.name = name;
        this.lastname = lastname;
        this.email = email;
    }    
}
class Reservation {
    constructor(date,hour,guide,user,spots,available){
        this.date = date;
        this.hour = hour;
        this.guide = guide;
        this.user = user;
        this.spots = spots;
        this.available = available;
    }
}
export default {
    data(){
        return{
            guide: new Guide(),
            guides: [],
            reservation: new Reservation(),
            reservations: [],
            isActive: false,
            isEditing: false,
            guidesLoaded: false,
            reservationsLoaded: false,
            id: '',
            tempDate: '',
            tempHour: '',
            reservationName: '',
            hours: ["10:00 - 11:30", "11:30 - 13:00", "13:00 - 14:30", "14:30 - 16:00", "16:00 - 17:30"],
            minDate: new Date().setHours(0, 0, 0, 0)
        };
    },
    created(){
        this.getGuides();
        this.getReservations();
        let today = new Date(),
            day = today.getDate() + 1,
            month = today.getMonth()+1, //January is 0
            year = today.getFullYear();
        if(day >= new Date(year, month-1, 0).getDate()){
            day = 1;
            month++;
        }
        if(day < 10){
            day = '0' + day;
        } 
        if(month < 10){
            month = '0' + month;
        }
        this.minDate = year + '-' + month + '-' + day;
    },
    methods:{
        async getGuides() {
            const response = await fetch("https://admin.marco.org.mx/api/guides/");
            const data = await response.json();
            this.guides = data;
            this.guidesLoaded = true;
        },
        async getReservations() {
            const response = await fetch("https://admin.marco.org.mx/api/reservations/");
            const data = await response.json();
            this.reservations = data;
            this.reservationsLoaded = true;
        },
        async handleUploadReservation(){
            if(this.isEditing){
                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.reservation)
                }
                await fetch("https://admin.marco.org.mx/api/reservations/" + this.id, requestOptions);
            }
            else{
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.reservation)
                }
                const res = await fetch("https://admin.marco.org.mx/api/reservations/", requestOptions); 
                const data = await res.json();
                console.log(data);
            }
            this.getReservations();
            this.isEditing = false;
            this.reservation = new Reservation();
        },
        async handleClickEditReservation(id){
            this.id = id;
            this.isEditing = true;
            const res = await fetch("https://admin.marco.org.mx/api/reservations/" + id);
            const data = await res.json();
            this.reservation = new Reservation(
                data.date,
                data.hour,
                data.guide,
                data.user,
                data.spots,
                data.available
            );
            this.reservation.date = new Date(this.reservation.date).toISOString().substr(0, 10);            
        },
        handleClickDeleteReservation(id, index){
            this.id = id;
            this.tempDate = this.reservations[index].date;
            this.tempHour = this.reservations[index].hour;
        },
        async handleDeleteReservation(){
            const requestOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }
            await fetch('https://admin.marco.org.mx/api/reservations/' + this.id, requestOptions);
            this.getReservations();
            this.reservation = new Reservation();
        },
        handleClickToggleReservation(){
            this.id = "";
            this.isEditing = false;
            this.reservation = new Reservation();
        },
        toggle() {
            this.isActive = !this.isActive;
        },
    }
};
</script>
