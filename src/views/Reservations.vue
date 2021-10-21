<template>
    <div class="container mt-5">
        <div class="row">
            <template v-if="guidesLoaded && reservationsLoaded">
                <div class="row">
                    <div class="col-md-12">
                        <table class="table table-bordered">
                            <thead>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Guía</th>
                                <th>Disponible</th>
                                <th>Usuario</th>
                                <th>Lugares</th>
                                <th>Acciones</th>
                            </thead>
                            <tbody>
                                <tr v-for="(reservation, index) in reservations" :key="reservation._id">
                                    <td>{{reservation.date}}</td>
                                    <td>{{reservation.hour}}</td>
                                    <td>{{reservation.guide.name}}</td>
                                    <td>{{reservation.available}}</td>
                                    <td>{{reservation.user}}</td>
                                    <td>{{reservation.spots}}</td>
                                    <td>
                                        <template v-if="reservation.available">
                                            <button class="btn btn-danger" @click="handleClickDeleteReservation(reservation._id, index)"
                                            data-dismiss="modalDeleteReservation" data-bs-toggle="modal" data-bs-target="#modalDeleteReservation">
                                                Eliminar
                                            </button>
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
                            <input type="date" class="form-control" name="date" id="date" :min="minDate" v-model="reservation.date">
                        </div>
                        <div class="col-md-3">
                            <select class="form-control" name="hour" id="hour" v-model="reservation.hour">
                                <option v-for="(hour, index) in hours" :key="index" >{{hour}}</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <select class="form-control" name="guide" id="guide" v-model="reservation.guide">
                                <option v-for="(guide, index) in guides" :key="index" :value="guide">{{guide.name}}</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <button type="submit" class="btn btn-primary">Guardar</button>
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
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="handleDeleteReservation()">Delete</button>
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
            tempDate: new Date(),
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
            const response = await fetch("http://100.24.228.237:10021/api/guides/");///////////////////////////////
            const data = await response.json();
            this.guides = data;
            this.guidesLoaded = true;
        },
        async getReservations() {
            const response = await fetch("http://100.24.228.237:10021/api/reservations/");///////////////////////////////
            const data = await response.json();
            this.reservations = data;
            console.log(this.reservations);
            this.reservationsLoaded = true;
        },
        async handleUploadReservation(){
            if(this.isEditing){
                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.reservation)
                }
                await fetch("http://100.24.228.237:10021/api/reservations/" + this.id, requestOptions);/////////////////////////////////////////////
            }
            else{
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.reservation)
                }
                const res = await fetch("http://100.24.228.237:10021/api/reservations/", requestOptions); ////////////////////////////
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
            const res = await fetch("http://100.24.228.237:10021/api/reservations/" + id);//////////////////////
            const data = await res.json();
            this.reservation = new Reservation(
                data.date,
                data.hour,
                data.guide,
                data.user,
                data.spots,
                data.available
            );
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
            await fetch('http://100.24.228.237:10021/api/reservations/' + this.id, requestOptions);
            this.getReservations();
            this.reservation = new Reservation();
        },
        handleClickToggleGuide(){
            this.id = "";
            this.isEditing = false;
            this.guide = new Guide();
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

<style>

</style>