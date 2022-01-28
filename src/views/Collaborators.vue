<template>
    <div class="container mt-5">
        <!-- <button :class="[isActive ? 'btn btn-success' : 'btn btn-primary']" color="[isActive ? 'green' : 'blue']" @click="toggle">
            {{isActive ? 'Es puto' : 'Edgar'}}
        </button> -->
        <div class="row">
            <div class="col-md-5 mb-5">
                <div class="row px-4 pb-4 bg-marco">
                    <h3 class="text-center p-3" style="color: white;"> Colaboradores activos </h3>
                    <div class="col align-self-center" style="background: white;">
                        <template v-if="dataLoaded">
                            <template v-if="collaborators.length">
                                <table class="table">
                                    <tbody>
                                        <tr v-for="(collaborator, index) in collaborators" :key="index">
                                            <td style="width: 75%">{{collaborator.name}} {{collaborator.lastname}}</td>
                                            <td style="width: 25%" class="text-center">
                                                <i class="fas fa-edit px-2 text-primary" style="cursor: pointer;"  @click="handleClickEdit(collaborator._id)"></i>
                                                <i class="fas fa-trash-alt px-2 text-danger" style="cursor: pointer;" @click="handleClickDelete(collaborator._id, index)"
                                                    data-dismiss="modalDelete" data-bs-toggle="modal" data-bs-target="#modalDelete"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </template>
                            <template v-else>
                                <div class="row p-3">
                                    <div class="col-md-12">
                                        <p class="h5 text-center">Parece que no hay ningún colaborador...</p>
                                        <!-- <div class="d-grid col-4 mx-auto">
                                            <button class="btn btn-primary" type="button" @click="handleToggle">¡Añadir uno!</button>
                                        </div> -->
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
                    <h3 class="text-center p-3" style="color: white;"> Registro de colaboradores </h3>
                    <div class="col align-self-center" style="background: white;">
                        <div class="row mt-3">
                            <div class="col-md-11 mx-auto">
                                <form @submit.prevent="handleUpload">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Nombre:</label>
                                        <input type="text" class="form-control" id="name" v-model="collaborator.name" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="lastname" class="form-label">Apellido:</label>
                                        <input type="text" class="form-control" id="lastname" v-model="collaborator.lastname" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Correo:</label>
                                        <input type="email" class="form-control" id="email" v-model="collaborator.email" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="password" class="form-label">Password:</label>
                                        <input type="password" class="form-control" id="password" v-model="collaborator.password" required>
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
                                            <button type="button" class="btn btn-danger px-5" @click="handleClickToggle">
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
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="handleDelete(collaborator._id)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

class Collaborator {
    constructor(name, lastname, email, password){
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.usertype = ["collaborator"];
    }
}

export default {
    data() {
        return {
            collaborator: new Collaborator(),
            collaborators: [],
            isActive: false,
            isEditing: false,
            dataLoaded: false,
            id: '',
            tempName: '',
            tempLastname: ''
        };
    },
    created() {
        this.getCollaborators();
    },
    methods: {
        async getCollaborators() {
            // const response = await fetch("https://api-marco.herokuapp.com/api/expos");
            // const response = await fetch("http://localhost:3000/api/expos");
            // const response = await fetch("http://172.31.0.24:10021/api/expos/");
            const response = await fetch("https://admin.marco.org.mx/api/collaborators/");
            const data = await response.json();
            this.collaborators = data;
            this.dataLoaded = true;
        },
        async handleUpload(){
            if(this.isEditing){
                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.collaborator)
                }
                await fetch("https://admin.marco.org.mx/api/users/" + this.id, requestOptions);
            }
            else{
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.collaborator)
                }
                await fetch("https://admin.marco.org.mx/api/users/", requestOptions);
            }
            this.getCollaborators();
            this.isEditing = false;
            this.collaborator = new Collaborator();
        },
        async handleClickEdit(id){
            this.id = id;
            this.isEditing = true;
            const res = await fetch("https://admin.marco.org.mx/api/users/" + id);
            const data = await res.json();
            this.collaborator = new Collaborator(
                data.name,
                data.lastname,
                data.email
            );
        },
        handleClickDelete(id, index){
            this.id = id;
            this.tempName = this.collaborators[index].name;
            this.tempLastname = this.collaborators[index].lastname;
        },
        async handleDelete(){
            const requestOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }
            await fetch('https://admin.marco.org.mx/api/users/' + this.id, requestOptions);
            this.getCollaborators();
            this.collaborator = new Collaborator();
        },
        handleClickToggle(){
            this.id = "";
            this.isEditing = false;
            this.collaborator = new Collaborator();
        },
        toggle() {
            this.isActive = !this.isActive;
        },
    }
};
</script>