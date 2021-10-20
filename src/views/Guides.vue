<template>
     <div class="container mt-5">
        <div class="row">
            <div class="col-md-5 mb-5">
                <div class="row px-4 pb-4 bg-marco">
                    <h3 class="text-center p-3" style="color: white;"> Guias activos </h3>
                    <div class="col align-self-center overflow-auto" style="background: white;">
                        <template v-if="dataLoaded">
                            <template v-if="guides.length">
                                <table class="table">
                                    <tbody>
                                        <tr v-for="(guide, index) in guides" :key="index">
                                            <td style="width: 75%">{{guide.name}} {{guide.lastname}}</td>
                                            <td style="width: 25%" class="text-center">
                                                <i class="fas fa-edit px-2 text-primary" style="cursor: pointer;"  @click="handleClickEditGuide(guide._id)"></i>
                                                <i class="fas fa-trash-alt px-2 text-danger" style="cursor: pointer;" @click="handleClickDeleteGuide(guide._id, index)"
                                                    data-dismiss="modalDelete" data-bs-toggle="modal" data-bs-target="#modalDelete"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </template>
                            <template v-else>
                                <div class="row p-3">
                                    <div class="col-md-12">
                                        <p class="h5 text-center">Parece que no hay ningún guia...</p>
                                    </div>
                                </div>
                            </template>
                        </template>
                        <template v-else>
                            <div class="row p-3">
                                <div class="d-flex justify-content-center align-items-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="col-md-5 offset-md-2">
                <div class="row px-4 pb-4 bg-marco">
                    <h3 class="text-center p-3" style="color: white;"> Registro de guias </h3>
                    <div class="col align-self-center" style="background: white;">
                        <div class="row mt-3">
                            <div class="col-md-11 mx-auto">
                                <form @submit.prevent="handleUploadGuide">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Nombre:</label>
                                        <input type="text" class="form-control" id="name" v-model="guide.name" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="lastname" class="form-label">Apellido:</label>
                                        <input type="text" class="form-control" id="name" v-model="guide.lastname" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Correo:</label>
                                        <input type="email" class="form-control" id="email" v-model="guide.email" required>
                                    </div>
                                    <div class="mb-3">
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                            <button v-if="isEditing" type="submit" class="btn btn-success px-5">
                                                Guardar 
                                            </button>
                                            <button v-else type="submit" class="btn btn-primary px-5">
                                                Registrar
                                            </button>
                                            <!-- BUTTON TRIGGER MODAL -->
                                            <button type="button" class="btn btn-danger px-5" @click="handleClickToggleGuide">
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 

        <!-- MODAL -->
        <div class="modal fade" id="modalDelete" tabindex="-1" aria-labelledby="exampleModalCenterTitle" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title" id="exampleModalCenterTitle">¿Estás seguro de que quieres eliminar a {{tempName}} {{tempLastname}}?</h6>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Esta acción será permanente y no podrá revertirse.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="handleDeleteGuide(guide._id)">Delete</button>
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
            dataLoaded: false,
            id: '',
            tempName:'',
            tempLastname: '',
            tempDate: '',
            tempHour: ''
        };
    },
    created(){
        this.getGuides();
        this.getReservations();
    },
    methods:{
        async getGuides() {
            const response = await fetch("http://100.24.228.237:10021/api/guides/");///////////////////////////////
            const data = await response.json();
            this.guides = data;
            this.dataLoaded = true;
        },
        async getReservations() {
            const response = await fetch("http://100.24.228.237:10021/api/reservations/");///////////////////////////////
            const data = await response.json();
            this.reservations = data;
            this.dataLoaded = true;
        },
        async handleUploadGuide(){
            if(this.isEditing){
                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.guide)
                }
                await fetch("http://100.24.228.237:10021/api/guides/" + this.id, requestOptions);/////////////////////////////////////////////
            }
            else{
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.guide)
                }
                await fetch("http://100.24.228.237:10021/api/guides/", requestOptions); ////////////////////////////
            }
            this.getGuides();
            this.isEditing = false;
            this.guide = new Guide();
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
                    body: JSON.stringify(this.reservations)
                }
                await fetch("http://100.24.228.237:10021/api/reservations/", requestOptions); ////////////////////////////
            }
            this.getReservations();
            this.isEditing = false;
            this.reservation = new Reservation();
        },
        async handleClickEditGuide(id){
            this.id = id;
            this.isEditing = true;
            const res = await fetch("http://100.24.228.237:10021/api/guides/" + id);//////////////////////
            const data = await res.json();
            this.guide = new Guide(
                data.name,
                data.lastname,
                data.email
            );
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
        handleClickDeleteGuide(id, index){
            this.id = id;
            this.tempName = this.guides[index].name;
            this.tempLastname = this.guides[index].lastname;
        },
        handleClickDeleteReservation(id, index){
            this.id = id;
            this.tempDate = this.reservations[index].date;
            this.tempHour = this.reservations[index].hour;
        },
        async handleDeleteGuide(){
            const requestOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }
            await fetch('http://100.24.228.237:10021/api/guides/' + this.id, requestOptions);
            this.getGuides();
            this.guide = new Guide();
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